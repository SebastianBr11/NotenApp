import { observable } from '@legendapp/state'
import {
	FosClassType,
	SingleGradeType as FosSingleGradeType,
	SubjectType as FosSubjectType,
} from './types/fos'
import {
	GymnasiumClassType,
	SingleGradeType as GymnasiumSingleGradeType,
	SubjectType as GymnasiumSubjectType,
} from './types/gymnasium'

import { IS_DEV } from '@/constants/isDev'
import { calculateAmountOfSubjects } from '@/util/school'
import { EXAMPLE_CLASSES } from './dev-data'

export type ClassType = FosClassType | GymnasiumClassType
export type SemesterType = ClassType['subjects'][0]['semesters'][0]
export type SingleGradeType = FosSingleGradeType | GymnasiumSingleGradeType

const lastUsedClass = observable(0)
const classes = observable<ClassType[]>(IS_DEV ? EXAMPLE_CLASSES : [])

function addClass(newClass: ClassType) {
	// grades.classes.set(oldClasses => [...oldClasses, newClass])
	// grades.classes.push(newClass)
	console.log(classes)
}

function addSubject(
	classNumber: number,
	newSubject: FosSubjectType | GymnasiumSubjectType,
) {
	// grades.classes[classNumber].subjects.set(oldSubjects => [
	// 	...oldSubjects,
	// 	newSubject,
	// ])
	classes[classNumber].subjects.push(newSubject)
}

function addGrade(
	classNumber: number,
	subjectNumber: number,
	semester: 1 | 2,
	newGrade: SingleGradeType,
) {
	const subject = classes[classNumber].subjects.find(
		subject => subject.id.get() === subjectNumber,
	)

	if (!subject) {
		return false
	}

	const subjectSemester = subject.semesters[semester - 1]
	const alreadyHasPrimaryGrade = !!subjectSemester.primaryGrade.get()

	if (newGrade.type === 'Schulaufgabe' && alreadyHasPrimaryGrade) {
		return false
	}

	if (newGrade.type === 'Schulaufgabe') {
		subjectSemester.primaryGrade.set(newGrade)
		return true
	} else {
		subjectSemester.secondaryGrades.set(oldGrades => [...oldGrades, newGrade])
		return true
	}
}

const amountOfSubjects = observable(() =>
	calculateAmountOfSubjects(classes.get()),
)

const amountOfClasses = observable(() => classes.length)

const grades = {
	classes,
	lastUsedClass,
	amountOfSubjects,
	amountOfClasses,
	addClass,
	addSubject,
	addGrade,
}

export default grades
