import { GradesType, SemesterType } from '@/storage/grades'

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
	let primaryGrade
	const sumOfSecondaryPoints = semester.singleGrades.reduce(
		(acc, grade) =>
			grade.type === 'Schulaufgabe'
				? (primaryGrade = grade.points)
				: acc + grade.points,
		0,
	)

	console.log(sumOfSecondaryPoints)

	const averageOfSecondaryGrades = calculateAverage({
		points: sumOfSecondaryPoints,
		amount: calculateAmountOfSecondaryGrades(semester),
	})

	// If there's no primary grade, just use the secondary average
	if (!primaryGrade) {
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
		switch (grade.type) {
			case 'Kurzarbeit':
				addAmount = 1
				break
			case 'Mündlich':
				addAmount = 0.5
			default:
		}
		return acc + addAmount
	}, 0)
}
