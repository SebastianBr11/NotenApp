import { calculateAmountOfSubjects } from '../school'

import { GradesType } from '@/storage/grades'

describe('calculateAmountOfSubjects', () => {
	it('calculates the correct amount of subjects', () => {
		const schools: GradesType = {
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
									singleGrades: [
										{ type: 'Schulaufgabe', points: 15, grade: 1 },
									],
								},
								{
									singleGrades: [{ type: 'Kurzarbeit', points: 15, grade: 1 }],
								},
							],
						},
						{
							name: 'Mathe',
							id: 2,
							semesters: [
								{
									singleGrades: [
										{ type: 'Schulaufgabe', points: 15, grade: 1 },
									],
								},
								{
									singleGrades: [{ type: 'Kurzarbeit', points: 15, grade: 1 }],
								},
							],
						},
						{
							name: 'Englisch',
							id: 3,
							semesters: [
								{
									singleGrades: [
										{ type: 'Schulaufgabe', points: 15, grade: 1 },
									],
								},
								{
									singleGrades: [{ type: 'Kurzarbeit', points: 15, grade: 1 }],
								},
							],
						},
						{
							name: 'Englisch',
							id: 4,
							semesters: [
								{
									singleGrades: [
										{ type: 'Schulaufgabe', points: 15, grade: 1 },
									],
								},
								{
									singleGrades: [{ type: 'Kurzarbeit', points: 15, grade: 1 }],
								},
							],
						},
					],
				},
			],
			amountOfSubjects: 4,
			amountOfClasses: 1,
		}

		expect(calculateAmountOfSubjects(schools)).toBe(schools.amountOfSubjects)
	})
})
