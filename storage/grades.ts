import { ObservableObject, computed, observable } from '@legendapp/state'

import { calculateAmountOfSubjects } from '@/util/school'

export type SingleGradeType = {
	type: 'Schulaufgabe' | 'Kurzarbeit' | 'Mündlich'
	points: number
	grade: 1 | 2 | 3 | 4 | 5 | 6
}

export type SemesterType = {
	singleGrades: SingleGradeType[]
}

export type ClassType = {
	id: number
	year: string
	type: 'FOS' | 'Gymnasium'
	subjects: {
		name: string
		id: number
		semesters: [SemesterType, SemesterType]
	}[]
}

export type GradesType = {
	amountOfSubjects: number
	amountOfClasses: number
	classes: ClassType[]
}

export const lastUsedClass = observable(0)

export const schools: ObservableObject<GradesType> = observable<GradesType>({
	amountOfSubjects: computed(() => calculateAmountOfSubjects(schools.get())),
	amountOfClasses: computed(() => schools.classes.length),
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
						{ singleGrades: [{ type: 'Schulaufgabe', points: 15, grade: 1 }] },
						{ singleGrades: [{ type: 'Kurzarbeit', points: 15, grade: 1 }] },
					],
				},
				{
					name: 'Mathe',
					id: 2,
					semesters: [
						{ singleGrades: [{ type: 'Schulaufgabe', points: 15, grade: 1 }] },
						{ singleGrades: [{ type: 'Kurzarbeit', points: 15, grade: 1 }] },
					],
				},
				{
					name: 'Englisch',
					id: 3,
					semesters: [
						{ singleGrades: [{ type: 'Schulaufgabe', points: 15, grade: 1 }] },
						{ singleGrades: [{ type: 'Kurzarbeit', points: 15, grade: 1 }] },
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
						{ singleGrades: [{ type: 'Schulaufgabe', points: 15, grade: 1 }] },
						{ singleGrades: [{ type: 'Kurzarbeit', points: 15, grade: 1 }] },
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
						{ singleGrades: [{ type: 'Schulaufgabe', points: 15, grade: 1 }] },
						{ singleGrades: [{ type: 'Kurzarbeit', points: 15, grade: 1 }] },
					],
				},
				{
					name: 'Englisch',
					id: 6,
					semesters: [
						{ singleGrades: [{ type: 'Schulaufgabe', points: 15, grade: 1 }] },
						{ singleGrades: [{ type: 'Kurzarbeit', points: 15, grade: 1 }] },
					],
				},
				{
					name: 'Mathe',
					id: 7,
					semesters: [
						{ singleGrades: [{ type: 'Schulaufgabe', points: 15, grade: 1 }] },
						{ singleGrades: [{ type: 'Kurzarbeit', points: 15, grade: 1 }] },
					],
				},
				{
					name: 'Physik',
					id: 8,
					semesters: [
						{ singleGrades: [{ type: 'Schulaufgabe', points: 15, grade: 1 }] },
						{ singleGrades: [{ type: 'Kurzarbeit', points: 15, grade: 1 }] },
					],
				},
				{
					name: 'Geschichte',
					id: 9,
					semesters: [
						{ singleGrades: [{ type: 'Schulaufgabe', points: 15, grade: 1 }] },
						{ singleGrades: [{ type: 'Kurzarbeit', points: 15, grade: 1 }] },
					],
				},
				{
					name: 'Religion',
					id: 10,
					semesters: [
						{ singleGrades: [{ type: 'Schulaufgabe', points: 15, grade: 1 }] },
						{ singleGrades: [{ type: 'Kurzarbeit', points: 15, grade: 1 }] },
					],
				},
			],
		},
	],
})
