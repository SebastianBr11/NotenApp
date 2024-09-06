import { OralExamType, WrittenExamType } from '@/storage/types/fos'
import { toTwoSignificantFigures } from './number'

import { ClassType, SemesterType, SingleGradeType } from '@/storage/grades'

/*
 * FOS Calculation first calculates the average of secondary
 * grades like Kurzarbeiten and oral grades and uses that
 * result together with the Schulaufgabe to calculate the
 * whole average
 */

// TODO: Factor in exam grades
export const calculateClassAverage = (classToUse: ClassType) => {
	let amountOfExams = 0

	let sumOfPoints = classToUse.subjects.reduce((sum, subject) => {
		if (subject.writtenExam || subject.oralExam) {
			amountOfExams++
		}

		return (
			sum +
			calculateAverageOfSemester(subject.semesters[0]) +
			calculateAverageOfSemester(subject.semesters[1]) +
			calculateExamAverage({
				writtenExam: subject.writtenExam,
				oralExam: subject.oralExam,
			})
		)
	}, 0)

	const shouldFactorInScientificPaper = !!classToUse.scientificPaper

	const amountOfSemesters = classToUse.subjects.length * 2

	// amountOfExams * 2 because one exam counts as much as 2 semesters
	// *15 for max points possible being 15
	const maxPossiblePoints =
		(amountOfSemesters +
			(shouldFactorInScientificPaper ? 2 : 0) +
			amountOfExams * 2) *
		15

	if (shouldFactorInScientificPaper) {
		sumOfPoints += 2 * classToUse.scientificPaper!.points
	}

	return toTwoSignificantFigures(17 / 3 - 5 * (sumOfPoints / maxPossiblePoints))
}

type CalculateExamAverageType = {
	writtenExam?: WrittenExamType
	oralExam?: OralExamType
}

export const calculateExamAverage = ({
	writtenExam,
	oralExam,
}: CalculateExamAverageType) => {
	const writtenExamPoints = writtenExam?.points ?? 0
	const oralExamPoints = oralExam?.points ?? 0

	if (!writtenExam && !oralExam) {
		return 0
	}

	const onlyWrittenExam = writtenExam && !oralExam
	const onlyOralExam = oralExam && !writtenExam

	return toTwoSignificantFigures(
		calculateAverage({
			points: 2 * writtenExamPoints + oralExamPoints,
			amount: onlyWrittenExam ? 2 : onlyOralExam ? 1 : 3,
		}),
	)
}

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
