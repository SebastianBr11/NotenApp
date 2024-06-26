import { toTwoSignificantFigures } from './number'

import { SemesterType, SingleGradeType } from '@/storage/grades'

/*
 * FOS Calculation first calculates the average of secondary
 * grades like Kurzarbeiten and oral grades and uses that
 * result together with the Schulaufgabe to calculate the
 * whole average
 */

type CalculateAverageProps = SemesterType[]

export const calculateAverageOfSemesters = ([
	...semesters
]: CalculateAverageProps) => {
	const firstSemester = semesters[0]
	const secondSemester = semesters[1]

	if (semesterHasGrades(firstSemester) && !semesterHasGrades(secondSemester)) {
		return toTwoSignificantFigures(calculateAverageOfSemester(firstSemester))
	} else if (
		!semesterHasGrades(firstSemester) &&
		semesterHasGrades(secondSemester)
	) {
		return toTwoSignificantFigures(calculateAverageOfSemester(secondSemester))
	}

	const averageOfFirstSemester = calculateAverageOfSemester(firstSemester)
	const averageOfSecondSemester = calculateAverageOfSemester(secondSemester)

	const average = calculateAverage({
		points:
			Math.round(averageOfFirstSemester) + Math.round(averageOfSecondSemester),
		amount: 2,
	})

	return toTwoSignificantFigures(average)
}

export const calculateAverageOfSemester = (semester: SemesterType) => {
	const primaryGrade = semester.primaryGrade?.points
	const hasPrimaryGrade = primaryGrade !== undefined && primaryGrade !== null
	const hasSecondaryGrade = semester.secondaryGrades.length > 0

	const weightedAmountOfSecondaryGrades =
		calculateWeightedAmountOfSecondaryGrades(semester)

	if (!hasPrimaryGrade && !hasSecondaryGrade) {
		return 0
	}

	if (hasPrimaryGrade && !hasSecondaryGrade) {
		return primaryGrade
	}

	const sumOfSecondaryPoints = semester.secondaryGrades.reduce((acc, grade) => {
		return acc + getSecondaryGradeFactor(grade) * grade.points
	}, 0)

	const averageOfSecondaryGrades = calculateAverage({
		points: sumOfSecondaryPoints,
		amount: weightedAmountOfSecondaryGrades,
	})

	if (!hasPrimaryGrade && hasSecondaryGrade) {
		return averageOfSecondaryGrades
	}

	return calculateAverage({
		points: averageOfSecondaryGrades + primaryGrade!,
		amount: 2,
	})
}

export const calculateAverage = ({
	points,
	amount,
}: {
	points: number
	amount: number
}) => {
	return points / amount
}

export const calculateWeightedAmountOfSecondaryGrades = (
	semester: SemesterType,
) => {
	return semester.secondaryGrades.reduce((acc, grade) => {
		return acc + getSecondaryGradeFactor(grade)
	}, 0)
}

export const getSecondaryGradeFactor = (singleGrade: SingleGradeType) => {
	switch (singleGrade.type) {
		case 'Schulaufgabe':
			throw new Error('Schulaufgabe is not a secondary grade type')
		case 'Kurzarbeit':
			return 2
		case 'Mündlich':
			return 1
	}
}

const semesterHasGrades = (semester: SemesterType) => {
	return !!semester.primaryGrade || semester.secondaryGrades.length !== 0
}
