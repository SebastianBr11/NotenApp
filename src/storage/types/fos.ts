import { Grade } from './grade'

export type FosClassType = {
	id: string
	year: string
	type: 'FOS'
	subjects: SubjectType[]
}

type PrimaryGradeType = Grade & {
	type: 'Schulaufgabe'
}

type SecondaryGradeType = Grade & {
	type: 'Kurzarbeit' | 'Mündlich'
}

export type SingleGradeType = PrimaryGradeType | SecondaryGradeType

type SemesterType = {
	primaryGrade?: PrimaryGradeType
	secondaryGrades: SecondaryGradeType[]
}

export type SubjectType = {
	name: string
	id: string
	semesters: [SemesterType, SemesterType]
	scientificPaper?: {
		points: number
		grade: 1 | 2 | 3 | 4 | 5 | 6
	}
}
