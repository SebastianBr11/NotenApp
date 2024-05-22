import { SemesterType } from '@/storage/grades'
import {
	calculateAverageOfSemester,
	calculateAverageOfSemesters,
} from '@/util/gradeCalcFos'
import { toTwoSignificantFigures } from '@/util/number'
import React from 'react'
import { SectionList, View } from 'react-native'
import { createStyleSheet, useStyles } from 'react-native-unistyles'
import GradeView from './GradeView'
import SemesterSectionHeader from './SemesterSectionHeader'
import SubjectAverage from './SubjectAverage'

type GradesListProps = {
	semesters: [SemesterType, SemesterType]
}

export default function GradesList({ semesters }: GradesListProps) {
	const { styles } = useStyles(stylesheet)

	return (
		<SectionList
			sections={semesters.map((semester, index) => ({
				data: semester.secondaryGrades,
				semesterNumber: index + 1,
			}))}
			contentContainerStyle={styles.gradesList}
			ListHeaderComponent={
				<SubjectAverage average={calculateAverageOfSemesters(semesters)} />
			}
			ListHeaderComponentStyle={styles.listHeader}
			renderItem={({ item }) => (
				<View style={styles.horizontalInset}>
					<GradeView singleGrade={item} />
				</View>
			)}
			renderSectionHeader={({ section: { semesterNumber } }) => (
				<View style={[styles.sectionHeader, styles.horizontalInset]}>
					<SemesterSectionHeader
						semesterNumber={semesterNumber}
						semesterAverage={toTwoSignificantFigures(
							calculateAverageOfSemester(semesters[semesterNumber - 1]),
						)}
					/>
					{semesters[semesterNumber - 1].primaryGrade ? (
						<GradeView
							singleGrade={semesters[semesterNumber - 1].primaryGrade!}
						/>
					) : null}
				</View>
			)}
		/>
	)
}

const stylesheet = createStyleSheet(theme => ({
	listHeader: {
		marginBottom: theme.spacing['3xl'],
	},
	sectionHeader: {
		gap: theme.spacing['3xl'],
	},
	gradesList: {
		gap: theme.spacing['2xl'],
		paddingBottom: theme.spacing['6xl'],
	},
	horizontalInset: {
		paddingHorizontal: theme.spacing['6xl'],
	},
}))
