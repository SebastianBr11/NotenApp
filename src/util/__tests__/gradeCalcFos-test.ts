import {
	calculateAverage,
	calculateAverageOfSemester,
	calculateWeightedAmountOfSecondaryGrades,
} from '../gradeCalcFos'

import { SemesterType } from '@/storage/grades'
describe('calculateWeightedAmountOfSecondaryGrades()', () => {
	it('calculates the correct weighted amount of grades for a mix of grade types', () => {
		const semester: SemesterType = {
			primaryGrade: { grade: 1, points: 15, type: 'Schulaufgabe' },
			secondaryGrades: [
				{ grade: 2, points: 10, type: 'Kurzarbeit' },
				{ grade: 3, points: 9, type: 'Mündlich' },
			],
		}

		expect(calculateWeightedAmountOfSecondaryGrades(semester)).toBe(3)

		const semester2: SemesterType = {
			secondaryGrades: [
				{ grade: 2, points: 10, type: 'Kurzarbeit' },
				{ grade: 2, points: 10, type: 'Kurzarbeit' },
				{ grade: 2, points: 10, type: 'Kurzarbeit' },
				{ grade: 2, points: 10, type: 'Kurzarbeit' },
			],
		}

		expect(calculateWeightedAmountOfSecondaryGrades(semester2)).toBe(8)
	})
})

describe('calculateAverage()', () => {
	it('calculates the correct averages', () => {
		expect(
			calculateAverage({
				points: 20,
				amount: 2,
			}),
		).toBe(10)

		expect(
			calculateAverage({
				points: 30,
				amount: 12,
			}),
		).toBe(2.5)

		expect(
			calculateAverage({
				points: 35,
				amount: 3,
			}),
		).toBe(35 / 3)

		expect(
			calculateAverage({
				points: 34,
				amount: 3,
			}),
		).toBe(34 / 3)
	})
})

describe('calculateAverageOfSemester()', () => {
	it('calculates the correct average points of a semester', () => {
		const semester: SemesterType = {
			primaryGrade: { grade: 1, points: 15, type: 'Schulaufgabe' },
			secondaryGrades: [
				{ grade: 2, points: 10, type: 'Kurzarbeit' },
				{ grade: 3, points: 9, type: 'Mündlich' },
			],
		}

		expect(calculateAverageOfSemester(semester)).toBe(
			(15 + (10 + 10 + 9) / 3) / 2,
		)

		const semester2: SemesterType = {
			primaryGrade: { grade: 1, points: 15, type: 'Schulaufgabe' },
			secondaryGrades: [
				{ grade: 2, points: 10, type: 'Kurzarbeit' },
				{ grade: 2, points: 12, type: 'Kurzarbeit' },
				{ grade: 3, points: 9, type: 'Mündlich' },
				{ grade: 4, points: 5, type: 'Mündlich' },
			],
		}

		// Secondary Grades:
		// 10*2 + 12*2 + 9 + 5
		// = 20 + 24 + 14
		// = 44 + 14 = 58
		// 58 / (2*2 + 2) = 58 / 6
		// Primary and Secondary Grades:
		// (15 + 58/6) / 2
		expect(calculateAverageOfSemester(semester2)).toBe((15 + 58 / 6) / 2)
	})
})
