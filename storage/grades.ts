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
	school: {
		name?: string
		year: number
		type: 'FOS' | never
		subjects: Array<{
			name: string
			semesters: [SemesterType, SemesterType]
		}>
	}
}

export const grades = observable<GradesType>({
	school: {
		year: 10,
		type: 'FOS',
		subjects: [
			{
				name: 'Deutsch',
				semesters: [
					{ singleGrades: [{ type: 'Schulaufgabe', points: 15, grade: 1 }] },
					{ singleGrades: [{ type: 'Kurzarbeit', points: 15, grade: 1 }] },
				],
			},
			{
				name: 'Mathe',
				semesters: [
					{ singleGrades: [{ type: 'Schulaufgabe', points: 15, grade: 1 }] },
					{ singleGrades: [{ type: 'Kurzarbeit', points: 15, grade: 1 }] },
				],
			},
			{
				name: 'Englisch',
				semesters: [
					{ singleGrades: [{ type: 'Schulaufgabe', points: 15, grade: 1 }] },
					{ singleGrades: [{ type: 'Kurzarbeit', points: 15, grade: 1 }] },
				],
			},
		],
	},
})
