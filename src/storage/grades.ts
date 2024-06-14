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
import { randomUUID } from 'expo-crypto'
import { EXAMPLE_CLASSES } from './dev-data'

export type ClassType = FosClassType | GymnasiumClassType
export type SemesterType = ClassType['subjects'][0]['semesters'][0]
export type SingleGradeType = FosSingleGradeType | GymnasiumSingleGradeType

const classes = observable<ClassType[]>(IS_DEV ? EXAMPLE_CLASSES : [])

const lastUsedClass = observable({
	value: () => {
		return classes.get()[lastUsedClass.index.get()]
	},
	setFromIndex: (newIndex: number) => {
		lastUsedClass.index.set(newIndex)
	},
	setFromId: (newId: string) => {
		lastUsedClass.index.set(classes.get().findIndex(c => c.id === newId))
	},
	index: 0, // Default Value
})

function addClass(newClass: Omit<ClassType, 'id'>) {
	// Setting the classes observable directly even though it's recommended
	// by Legend State authors to mutate the state directly, since that causes an error
	// for some reason
	classes.set(oldClasses => [...oldClasses, { ...newClass, id: randomUUID() }])

	// This would be the recommended approach, but it doesn't work:
	// classes.push({ ...newClass, id: randomUUID() })
}

function addSubject(
	classId: string,
	newSubject: Omit<FosSubjectType | GymnasiumSubjectType, 'id'>,
) {
	const id = randomUUID()
	classes
		.find(c => c.id.peek() === classId)
		?.subjects.push({ ...newSubject, id })

	return id
}

function addGrade(
	classId: string,
	subjectId: string,
	semester: 1 | 2,
	newGrade: Omit<SingleGradeType, 'id'>,
) {
	const subject = classes
		.find(c => c.id.peek() === classId)
		?.subjects.find(subject => subject.id.peek() === subjectId)

	if (!subject) {
		return false
	}

	const subjectSemester = subject.semesters[semester - 1]
	const alreadyHasPrimaryGrade = !!subjectSemester.primaryGrade.get()

	if (newGrade.type === 'Schulaufgabe' && alreadyHasPrimaryGrade) {
		return false
	}

	const id = randomUUID()

	if (newGrade.type === 'Schulaufgabe') {
		// TypeScript wants id to be an Observable for some reason,
		// so we're ignoring the error
		// @ts-ignore
		subjectSemester.primaryGrade.set({ ...newGrade, id })
		return true
	} else {
		// Here as well
		// Also the same issue occurs as in the function `addClass` in line 37
		// @ts-ignore
		subjectSemester.secondaryGrades.set(oldGrades => [
			...oldGrades,
			{ ...newGrade, id },
		])
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
