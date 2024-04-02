import { observable } from '@legendapp/state'

export type SingleGradeType = {
	type: 'Schulaufgabe' | 'Kurzarbeit' | 'Mündlich'
	points: number
	grade: 1 | 2 | 3 | 4 | 5 | 6
}

export type SemesterType = {
	singleGrades: Array<SingleGradeType>
}

export type GradesType = {
	classes: Array<{
		name?: string
		year: number
		type: 'FOS' | never
		subjects: Array<{
			name: string
			id: number
			semesters: [SemesterType, SemesterType]
		}>
	}>
}

export const lastUsedClass = observable(0)

export const schools = observable<GradesType>({
	classes: [
		{
			year: 11,
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
			year: 12,
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
			year: 13,
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
