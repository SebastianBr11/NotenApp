import { ClassType } from '@/storage/grades'

export const calculateAmountOfSubjects = (classes: ClassType[]) => {
	return classes.reduce((acc, cur) => acc + cur.subjects.length, 0)
}
