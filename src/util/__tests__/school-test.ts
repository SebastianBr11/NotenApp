import { calculateAmountOfSubjects } from '../school'

import { ClassType } from '@/storage/grades'

describe('calculateAmountOfSubjects', () => {
	it('calculates the correct amount of subjects', () => {
		const classes: ClassType[] = [
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
								primaryGrade: { type: 'Schulaufgabe', points: 15, grade: 1 },
								secondaryGrades: [],
							},
							{
								secondaryGrades: [{ type: 'Kurzarbeit', points: 15, grade: 1 }],
							},
						],
					},
					{
						name: 'Mathe',
						id: 2,
						semesters: [
							{
								primaryGrade: { type: 'Schulaufgabe', points: 15, grade: 1 },
								secondaryGrades: [],
							},
							{
								secondaryGrades: [{ type: 'Kurzarbeit', points: 15, grade: 1 }],
							},
						],
					},
					{
						name: 'Englisch',
						id: 3,
						semesters: [
							{
								primaryGrade: { type: 'Schulaufgabe', points: 15, grade: 1 },
								secondaryGrades: [],
							},
							{
								secondaryGrades: [{ type: 'Kurzarbeit', points: 15, grade: 1 }],
							},
						],
					},
					{
						name: 'Englisch',
						id: 4,
						semesters: [
							{
								primaryGrade: { type: 'Schulaufgabe', points: 15, grade: 1 },
								secondaryGrades: [],
							},
							{
								secondaryGrades: [{ type: 'Kurzarbeit', points: 15, grade: 1 }],
							},
						],
					},
				],
			},
		]

		expect(calculateAmountOfSubjects(classes)).toBe(4)
	})
})
