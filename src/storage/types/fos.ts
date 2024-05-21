export type FosClassType = {
	id: number
	year: string
	type: 'FOS'
	subjects: SubjectType[]
}

type PrimaryGradeType = {
	type: 'Schulaufgabe'
	points: number
	grade: 1 | 2 | 3 | 4 | 5 | 6
}

type SecondaryGradeType = {
	type: 'Kurzarbeit' | 'Mündlich'
	points: number
	grade: 1 | 2 | 3 | 4 | 5 | 6
}

export type SingleGradeType = PrimaryGradeType | SecondaryGradeType

type SemesterType = {
	primaryGrade?: PrimaryGradeType
	secondaryGrades: SecondaryGradeType[]
}

export type SubjectType = {
	name: string
	id: number
	semesters: [SemesterType, SemesterType]
	scientificPaper?: {
		points: number
		grade: 1 | 2 | 3 | 4 | 5 | 6
	}
}
