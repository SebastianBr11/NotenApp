import { observable } from '@legendapp/state'

export type GradesType = {
	school: {
		name?: string
		year: number
		subjects: [
			{
				name: string
				semester: 1 | 2
				singleGrades: [
					{ type: string; points: number; grade: 1 | 2 | 3 | 4 | 5 | 6 },
				]
			},
		]
	}
}

export const grades = observable<GradesType>({
	school: {
		year: 10,
		subjects: [
			{
				name: 'Deutsch',
				semester: 1,
				singleGrades: [{ type: 'Schulaufgabe', points: 15, grade: 1 }],
			},
		],
	},
})
