import { ClassType } from '@/storage/grades'

export const calculateAmountOfSubjects = (classes: ClassType[]) => {
	return classes.reduce((acc, cur) => acc + cur.subjects.length, 0)
}

// TODO: Add tests
export const calculateGradeFromPoints = (points: number) => {
	if (points === 0) {
		return 6
	} else if (points <= 3) {
		return 5
	} else if (points <= 6) {
		return 4
	} else if (points <= 9) {
		return 3
	} else if (points <= 12) {
		return 2
	} else if (points <= 15) {
		return 1
	}

	return 6
}
