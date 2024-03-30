import { SemesterType } from '@/storage/grades'
import { calculateAmountOfSecondaryGrades } from '../gradeCalcFos'

describe('calculateAmountOfSecondaryGrades()', () => {
	it('calculates the correct amount of grades for a mix of grade types', () => {
		const semester: SemesterType = {
			singleGrades: [
				{ grade: 1, points: 15, type: 'Schulaufgabe' },
				{ grade: 2, points: 10, type: 'Kurzarbeit' },
				{ grade: 3, points: 9, type: 'Mündlich' },
			],
		}

		expect(calculateAmountOfSecondaryGrades(semester)).toBe(1.5)

		const semester2: SemesterType = {
			singleGrades: [
				{ grade: 2, points: 10, type: 'Kurzarbeit' },
				{ grade: 2, points: 10, type: 'Kurzarbeit' },
				{ grade: 2, points: 10, type: 'Kurzarbeit' },
				{ grade: 2, points: 10, type: 'Kurzarbeit' },
			],
		}

		expect(calculateAmountOfSecondaryGrades(semester2)).toBe(4)
	})
})
