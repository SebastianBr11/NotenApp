import { OralExamType, WrittenExamType } from '@/storage/types/fos'
import {
	calculateAverage,
	calculateAverageOfSemester,
	calculateClassAverage,
	calculateExamAverage,
	calculateWeightedAmountOfSecondaryGrades,
} from '../gradeCalcFos'

import { ClassType, SemesterType } from '@/storage/grades'
import { toTwoSignificantFigures } from '../number'

let id = 0

const getId = () => `${id++}`

beforeEach(() => {
	id = 0
})

describe('calculateClassAverage()', () => {
	it('calculates the correct average of a class with no exams', () => {
		const classToUse: ClassType = {
			id: getId(),
			type: 'FOS',
			year: '12',
			subjects: [
				{
					name: 'Test',
					id: getId(),
					semesters: [
						{
							primaryGrade: {
								grade: 1,
								points: 15,
								type: 'Schulaufgabe',
								id: getId(),
							},
							secondaryGrades: [
								{ grade: 2, points: 10, type: 'Kurzarbeit', id: getId() },
								{ grade: 3, points: 9, type: 'Mündlich', id: getId() },
							],
						},
						{
							primaryGrade: {
								grade: 1,
								points: 14,
								type: 'Schulaufgabe',
								id: getId(),
							},
							secondaryGrades: [
								{ grade: 2, points: 11, type: 'Kurzarbeit', id: getId() },
								{ grade: 3, points: 9, type: 'Mündlich', id: getId() },
							],
						},
					],
				},
			],
		}

		const semesterOneAverage = Math.round(((10 + 9) / 2 + 15) / 2)
		const semesterTwoAverage = Math.round(((11 + 9) / 2 + 14) / 2)

		expect(calculateClassAverage(classToUse)).toBe(
			toTwoSignificantFigures(
				17 / 3 - (5 * (semesterOneAverage + semesterTwoAverage)) / 30,
			),
		)
	})

	it('calculates the correct average of a class with a written exam', () => {
		const classToUse: ClassType = {
			id: getId(),
			type: 'FOS',
			year: '12',
			subjects: [
				{
					name: 'Test',
					id: getId(),
					writtenExam: {
						grade: 1,
						points: 12,
						type: 'Schriftliche Prüfung',
						id: getId(),
					},
					semesters: [
						{
							primaryGrade: {
								grade: 1,
								points: 15,
								type: 'Schulaufgabe',
								id: getId(),
							},
							secondaryGrades: [
								{ grade: 2, points: 10, type: 'Kurzarbeit', id: getId() },
								{ grade: 3, points: 9, type: 'Mündlich', id: getId() },
							],
						},
						{
							primaryGrade: {
								grade: 1,
								points: 14,
								type: 'Schulaufgabe',
								id: getId(),
							},
							secondaryGrades: [
								{ grade: 2, points: 11, type: 'Kurzarbeit', id: getId() },
								{ grade: 3, points: 9, type: 'Mündlich', id: getId() },
							],
						},
					],
				},
				{
					name: 'Test2',
					id: getId(),
					semesters: [
						{
							primaryGrade: {
								grade: 1,
								points: 15,
								type: 'Schulaufgabe',
								id: getId(),
							},
							secondaryGrades: [
								{ grade: 2, points: 10, type: 'Kurzarbeit', id: getId() },
								{ grade: 3, points: 9, type: 'Mündlich', id: getId() },
							],
						},
						{
							primaryGrade: {
								grade: 1,
								points: 14,
								type: 'Schulaufgabe',
								id: getId(),
							},
							secondaryGrades: [
								{ grade: 2, points: 11, type: 'Kurzarbeit', id: getId() },
								{ grade: 3, points: 9, type: 'Mündlich', id: getId() },
							],
						},
					],
				},
			],
		}

		const subject1SemesterOneAverage = Math.round(((10 + 9) / 2 + 15) / 2)
		const subject1SemesterTwoAverage = Math.round(((11 + 9) / 2 + 14) / 2)

		const subject2SemesterOneAverage = Math.round(((10 + 9) / 2 + 15) / 2)
		const subject2SemesterTwoAverage = Math.round(((11 + 9) / 2 + 14) / 2)

		const examAverage = 12

		const achievedPoints =
			subject1SemesterOneAverage +
			subject1SemesterTwoAverage +
			subject2SemesterOneAverage +
			subject2SemesterTwoAverage +
			examAverage

		// 4 Semesters and one exam which is worth as much as 2 semesters
		// 15 points max per semester
		const maxPossiblePoints = 15 * (4 + 2 * 1)

		expect(calculateClassAverage(classToUse)).toBe(
			toTwoSignificantFigures(
				17 / 3 - (5 * achievedPoints) / maxPossiblePoints,
			),
		)
	})
})

describe('calculateExamAverage()', () => {
	it('calculates the correct average points of both a written exam and an oral exam', () => {
		const writtenExam: WrittenExamType = {
			points: 15,
			id: getId(),
			grade: 1,
			type: 'Schriftliche Prüfung',
		}
		const oralExam: OralExamType = {
			points: 10,
			id: getId(),
			grade: 2,
			type: 'Mündliche Prüfung',
		}

		expect(calculateExamAverage({ writtenExam, oralExam })).toBe(
			(15 * 2 + 10) / 3,
		)
	})

	it('calculates the correct average points of only a written exam ', () => {
		const writtenExam: WrittenExamType = {
			points: 15,
			id: getId(),
			grade: 1,
			type: 'Schriftliche Prüfung',
		}

		expect(calculateExamAverage({ writtenExam })).toBe(15)
	})

	it('calculates the correct average points of only an oral exam ', () => {
		const oralExam: OralExamType = {
			points: 13,
			id: getId(),
			grade: 1,
			type: 'Mündliche Prüfung',
		}

		expect(calculateExamAverage({ oralExam })).toBe(13)
	})
})

describe('calculateWeightedAmountOfSecondaryGrades()', () => {
	it('calculates the correct weighted amount of grades for a mix of grade types', () => {
		const semester: SemesterType = {
			primaryGrade: { grade: 1, points: 15, type: 'Schulaufgabe', id: getId() },
			secondaryGrades: [
				{ grade: 2, points: 10, type: 'Kurzarbeit', id: getId() },
				{ grade: 3, points: 9, type: 'Mündlich', id: getId() },
			],
		}

		expect(calculateWeightedAmountOfSecondaryGrades(semester)).toBe(3)

		const semester2: SemesterType = {
			secondaryGrades: [
				{ grade: 2, points: 10, type: 'Kurzarbeit', id: getId() },
				{ grade: 2, points: 10, type: 'Kurzarbeit', id: getId() },
				{ grade: 2, points: 10, type: 'Kurzarbeit', id: getId() },
				{ grade: 2, points: 10, type: 'Kurzarbeit', id: getId() },
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
			primaryGrade: { grade: 1, points: 15, type: 'Schulaufgabe', id: getId() },
			secondaryGrades: [
				{ grade: 2, points: 10, type: 'Kurzarbeit', id: getId() },
				{ grade: 3, points: 9, type: 'Mündlich', id: getId() },
			],
		}

		expect(calculateAverageOfSemester(semester)).toBe(
			(15 + (10 + 10 + 9) / 3) / 2,
		)

		const semester2: SemesterType = {
			primaryGrade: { grade: 1, points: 15, type: 'Schulaufgabe', id: getId() },
			secondaryGrades: [
				{ grade: 2, points: 10, type: 'Kurzarbeit', id: getId() },
				{ grade: 2, points: 12, type: 'Kurzarbeit', id: getId() },
				{ grade: 3, points: 9, type: 'Mündlich', id: getId() },
				{ grade: 4, points: 5, type: 'Mündlich', id: getId() },
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
