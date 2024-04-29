import {
	calculateAmountOfSecondaryGrades,
	calculateAverage,
	calculateAverageOfSemester,
} from '../gradeCalcFos'

import { SemesterType } from '@/storage/grades'

describe('calculateAmountOfSecondaryGrades()', () => {
	it('calculates the correct amount of grades for a mix of grade types', () => {
		const semester: SemesterType = {
			singleGrades: [
				{ grade: 1, points: 15, type: 'Schulaufgabe' },
				{ grade: 2, points: 10, type: 'Kurzarbeit' },
				{ grade: 3, points: 9, type: 'Mündlich' },
			],
		}

		expect(calculateAmountOfSecondaryGrades(semester)).toBe(3)

		const semester2: SemesterType = {
			singleGrades: [
				{ grade: 2, points: 10, type: 'Kurzarbeit' },
				{ grade: 2, points: 10, type: 'Kurzarbeit' },
				{ grade: 2, points: 10, type: 'Kurzarbeit' },
				{ grade: 2, points: 10, type: 'Kurzarbeit' },
			],
		}

		expect(calculateAmountOfSecondaryGrades(semester2)).toBe(8)
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
		).toBe(3)

		expect(
			calculateAverage({
				points: 35,
				amount: 3,
			}),
		).toBe(12)

		expect(
			calculateAverage({
				points: 34,
				amount: 3,
			}),
		).toBe(11)
	})
})

describe('calculateAverageOfSemester()', () => {
	it('calculates the correct average points of a semester', () => {
		const semester: SemesterType = {
			singleGrades: [
				{ grade: 1, points: 15, type: 'Schulaufgabe' },
				{ grade: 2, points: 10, type: 'Kurzarbeit' },
				{ grade: 3, points: 9, type: 'Mündlich' },
			],
		}

		expect(calculateAverageOfSemester(semester)).toBe(
			Math.round((15 + Math.round((10 + 10 + 9) / 3)) / 2),
		)

		const semester2: SemesterType = {
			singleGrades: [
				{ grade: 1, points: 15, type: 'Schulaufgabe' },
				{ grade: 2, points: 10, type: 'Kurzarbeit' },
				{ grade: 2, points: 12, type: 'Kurzarbeit' },
				{ grade: 3, points: 9, type: 'Mündlich' },
				{ grade: 4, points: 5, type: 'Mündlich' },
			],
		}

		// 10*2 + 12*2 + 9 + 5
		// = 20 + 24 + 14
		// = 44 + 14 = 58
		// 58 / (2*2 + 2) = 58 / 6
		// (15 + 10) / 2 = 13
		expect(calculateAverageOfSemester(semester2)).toBe(13)
	})
})
