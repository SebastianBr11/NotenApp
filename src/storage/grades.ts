import { Observable, ObservableObject, observable } from '@legendapp/state'
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

import { calculateAmountOfSubjects } from '@/util/school'

export type ClassType = FosClassType | GymnasiumClassType
export type SemesterType = ClassType['subjects'][0]['semesters'][0]
export type SingleGradeType = FosSingleGradeType | GymnasiumSingleGradeType

export type GradesType = {
	amountOfSubjects: Observable<number>
	amountOfClasses: Observable<number>
	classes: ClassType[]
	addClass: (newClass: ClassType) => void
	addSubject: (
		classNumber: number,
		newSubject: FosSubjectType | GymnasiumSubjectType,
	) => void
	addGrade: (
		classNumber: number,
		subjectNumber: number,
		semester: 1 | 2,
		newGrade: SingleGradeType,
	) => boolean
}

export const lastUsedClass = observable(0)

export const schools: ObservableObject<GradesType> = observable<GradesType>({
	addClass: newClass => {
		schools.classes.set(oldClasses => [...oldClasses, newClass])
	},
	addSubject: (classNumber, newSubject) => {
		schools.classes[classNumber].subjects.set(oldSubjects => [
			...oldSubjects,
			newSubject,
		])
	},
	addGrade: (classNumber, subjectNumber, semester, newGrade) => {
		const subject = schools.classes[classNumber].subjects.find(
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
	},

	amountOfSubjects: observable(() =>
		calculateAmountOfSubjects(schools.classes.get()),
	),
	amountOfClasses: observable(() => schools.classes.length),
	classes: [
		{
			id: 1,
			year: '11',
			type: 'FOS',
			subjects: [
				{
					name: 'Deutsch',
					id: 1,
					semesters: [
						{
							primaryGrade: {
								id: 1,
								type: 'Schulaufgabe',
								points: 15,
								grade: 1,
							},
							secondaryGrades: [
								{ id: 2, type: 'Kurzarbeit', points: 12, grade: 2 },
								{ id: 3, type: 'Kurzarbeit', points: 15, grade: 1 },
							],
						},
						{
							secondaryGrades: [
								{ id: 4, type: 'Kurzarbeit', points: 15, grade: 1 },
								{ id: 5, type: 'Kurzarbeit', points: 12, grade: 2 },
							],
						},
					],
				},
				{
					name: 'Mathe',
					id: 2,
					semesters: [
						{
							secondaryGrades: [],
						},
						{
							secondaryGrades: [
								{ id: 6, type: 'Kurzarbeit', points: 15, grade: 1 },
							],
						},
					],
				},
				{
					name: 'Englisch',
					id: 3,
					semesters: [
						{
							primaryGrade: {
								id: 7,
								type: 'Schulaufgabe',
								points: 15,
								grade: 1,
							},
							secondaryGrades: [],
						},
						{
							secondaryGrades: [
								{ id: 8, type: 'Kurzarbeit', points: 15, grade: 1 },
							],
						},
					],
				},
			],
		},
		{
			id: 2,
			year: '12',
			type: 'FOS',
			subjects: [
				{
					name: 'Deutsch',
					id: 4,
					semesters: [
						{
							primaryGrade: {
								id: 9,
								type: 'Schulaufgabe',
								points: 15,
								grade: 1,
							},
							secondaryGrades: [],
						},
						{
							secondaryGrades: [
								{ id: 10, type: 'Kurzarbeit', points: 15, grade: 1 },
							],
						},
					],
				},
			],
		},
		{
			id: 3,
			year: '13',
			type: 'FOS',
			subjects: [
				{
					name: 'Deutsch',
					id: 5,
					semesters: [
						{
							primaryGrade: {
								id: 11,
								type: 'Schulaufgabe',
								points: 15,
								grade: 1,
							},
							secondaryGrades: [],
						},
						{
							secondaryGrades: [
								{ id: 12, type: 'Kurzarbeit', points: 15, grade: 1 },
							],
						},
					],
				},
				{
					name: 'Englisch',
					id: 6,
					semesters: [
						{
							primaryGrade: {
								id: 13,
								type: 'Schulaufgabe',
								points: 15,
								grade: 1,
							},
							secondaryGrades: [],
						},
						{
							secondaryGrades: [
								{ id: 14, type: 'Kurzarbeit', points: 15, grade: 1 },
							],
						},
					],
				},
				{
					name: 'Mathe',
					id: 7,
					semesters: [
						{
							primaryGrade: {
								id: 15,
								type: 'Schulaufgabe',
								points: 15,
								grade: 1,
							},
							secondaryGrades: [],
						},
						{
							secondaryGrades: [
								{ id: 16, type: 'Kurzarbeit', points: 15, grade: 1 },
							],
						},
					],
				},
				{
					name: 'Physik',
					id: 8,
					semesters: [
						{
							primaryGrade: {
								id: 17,
								type: 'Schulaufgabe',
								points: 15,
								grade: 1,
							},
							secondaryGrades: [],
						},
						{
							secondaryGrades: [
								{ id: 18, type: 'Kurzarbeit', points: 15, grade: 1 },
							],
						},
					],
				},
				{
					name: 'Geschichte',
					id: 9,
					semesters: [
						{
							primaryGrade: {
								id: 19,
								type: 'Schulaufgabe',
								points: 15,
								grade: 1,
							},
							secondaryGrades: [],
						},
						{
							secondaryGrades: [
								{ id: 20, type: 'Kurzarbeit', points: 15, grade: 1 },
							],
						},
					],
				},
				{
					name: 'Religion',
					id: 10,
					semesters: [
						{
							primaryGrade: {
								id: 21,
								type: 'Schulaufgabe',
								points: 15,
								grade: 1,
							},
							secondaryGrades: [],
						},
						{
							secondaryGrades: [
								{ id: 22, type: 'Kurzarbeit', points: 15, grade: 1 },
							],
						},
					],
				},
			],
		},
	],
})
