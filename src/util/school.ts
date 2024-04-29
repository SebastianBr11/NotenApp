import { GradesType } from '@/storage/grades'

export const calculateAmountOfSubjects = (schools: GradesType) => {
	return schools.classes.reduce((acc, cur) => acc + cur.subjects.length, 0)
}
