import { Grade } from './grade'

export type GymnasiumClassType = {
	id: string
	year: string
	type: 'Gymnasium'
	subjects: SubjectType[]
	scientificPaper?: {
		title: string
		points: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15
		grade: 1 | 2 | 3 | 4 | 5 | 6
	}
}

type PrimaryGradeType = Grade & {
	type: 'Schulaufgabe'
}

type SecondaryGradeType = Grade & {
	type: 'Kurzarbeit' | 'Mündlich'
}

export type WrittenExamType = Grade & {
	type: 'Schriftliche Prüfung'
}

export type OralExamType = Grade & {
	type: 'Mündliche Prüfung'
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
	writtenExam?: WrittenExamType
	oralExam?: OralExamType
}
