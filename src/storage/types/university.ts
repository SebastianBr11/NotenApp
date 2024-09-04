type Grade = {
	id: string
	grade:
		| 1.0
		| 1.3
		| 1.7
		| 2.0
		| 2.3
		| 2.7
		| 3.0
		| 3.3
		| 3.7
		| 4.0
		| 4.3
		| 4.7
		| 5.0
}
export type UniversityClassType = {
	id: string
	degree: string
	type: 'UNI'
	courses: CourseType[]
	scientificPaper?: Grade & {
		title: string
	}
}

export type CourseType = {
	id: string
	ects: number
	name: string
	grade?: Grade
	didPass?: boolean
}
