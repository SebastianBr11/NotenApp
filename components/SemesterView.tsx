import React from 'react'
import { FlatList, Text, View } from 'react-native'
import { createStyleSheet, useStyles } from 'react-native-unistyles'

import GradeView from './GradeView'

import { SemesterType } from '@/storage/grades'
import { calculateAverageOfSemester } from '@/util/gradeCalcFos'

type SemesterViewProps = {
	semester: SemesterType
	semesterNumber: number
}

export default function SemesterView({
	semester,
	semesterNumber,
}: SemesterViewProps) {
	const { styles } = useStyles(stylesheet)

	const semesterNumberText = semesterNumber === 1 ? 'I' : 'II'

	return (
		<View style={styles.container}>
			<View style={styles.semesterHeader}>
				<Text style={styles.semesterHeaderText}>
					Semester {semesterNumberText}
				</Text>
				<Text style={styles.semesterHeaderAverage}>
					{calculateAverageOfSemester(semester)} points
				</Text>
			</View>
			<FlatList
				contentContainerStyle={styles.gradesList}
				data={semester.singleGrades}
				renderItem={({ item }) => <GradeView singleGrade={item} />}
			/>
		</View>
	)
}

const stylesheet = createStyleSheet(theme => ({
	container: {
		gap: theme.spacing['3xl'],
	},
	semesterHeader: {
		flexDirection: 'row',
		alignItems: 'baseline',
		justifyContent: 'space-between',
	},
	semesterHeaderText: {
		color: theme.colors.text2,
		fontSize: theme.fontSizes['2xl'],
		fontWeight: theme.fontWeights.regular,
		letterSpacing: -0.5,
	},
	semesterHeaderAverage: {
		color: theme.colors.text1,
		fontSize: theme.fontSizes.xl,
		fontWeight: theme.fontWeights.bold,
	},
	gradesList: {
		gap: theme.spacing['2xl'],
		paddingBottom: theme.spacing.lg,
	},
}))
