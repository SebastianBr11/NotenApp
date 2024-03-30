import { GradesType, SemesterType, SingleGradeType } from '@/storage/grades'

/*
 * FOS Calculation first calculates the average of secondary
 * grades like Kurzarbeiten and oral grades and uses that
 * result together with the Schulaufgabe to calculate the
 * whole average
 */

type CalculateAverageProps = GradesType['school']['subjects']['0']['semesters']

export const calculateAverageOfSemesters = ([
	...semesters
]: CalculateAverageProps) => {
	const averageOfFirstSemester = calculateAverageOfSemester(semesters['0'])
	const averageOfSecondSemester = calculateAverageOfSemester(semesters['1'])

	const average = calculateAverage({
		points: averageOfFirstSemester + averageOfSecondSemester,
		amount: 2,
	})

	return average
}

export const calculateAverageOfSemester = (semester: SemesterType) => {
	let primaryGrade = 0
	const sumOfSecondaryPoints = semester.singleGrades.reduce((acc, grade) => {
		if (grade.type !== 'Schulaufgabe') {
			return acc + getSecondaryGradeFactor(grade) * grade.points
		}

		// Even though there should only be one Schulaufgabe per semester
		// Gracefully handle the case of there being multiple by
		// continuously calculating the average
		if (primaryGrade !== 0) {
			primaryGrade = calculateAverage({
				points: primaryGrade + grade.points,
				amount: 2,
			})
		} else {
			primaryGrade = grade.points
		}
		return acc
	}, 0)

	const averageOfSecondaryGrades = calculateAverage({
		points: sumOfSecondaryPoints,
		amount: calculateAmountOfSecondaryGrades(semester),
	})

	// If there's no primary grade, just use the secondary average
	if (primaryGrade === 0) {
		return averageOfSecondaryGrades
	} else {
		return calculateAverage({
			points: averageOfSecondaryGrades + primaryGrade,
			amount: 2,
		})
	}
}

export const calculateAverage = ({
	points,
	amount,
}: {
	points: number
	amount: number
}) => {
	return Math.round(points / amount)
}

export const calculateAmountOfSecondaryGrades = (semester: SemesterType) => {
	return semester.singleGrades.reduce((acc, grade) => {
		let addAmount = 0
		if (grade.type !== 'Schulaufgabe') {
			addAmount = getSecondaryGradeFactor(grade)
		}
		return acc + addAmount
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
