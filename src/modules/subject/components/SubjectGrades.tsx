import BottomSheetModal from '@/components/BottomSheetModal'
import { useSetupBottomSheetModal } from '@/hooks/useSetupBottomSheetModal'
import grades, { SingleGradeType, SubjectType } from '@/storage/grades'
import {
	calculateAverageOfSemester,
	calculateAverageOfSemesters,
} from '@/util/gradeCalcFos'
import { toTwoSignificantFigures } from '@/util/number'
import { BottomSheetView } from '@gorhom/bottom-sheet'
import React, { useState } from 'react'
import { SectionList, View } from 'react-native'
import { createStyleSheet, useStyles } from 'react-native-unistyles'
import EditGradeForm from './EditGradeForm'
import GradeView from './GradeView'
import SemesterSectionHeader from './SemesterSectionHeader'
import SubjectAverage from './SubjectAverage'

type SelectedGrade = SingleGradeType & {
	semester: 1 | 2
	isPrimary: boolean
}

type SubjectGradesProps = {
	subject: SubjectType
}

export default function SubjectGrades({ subject }: SubjectGradesProps) {
	const { styles } = useStyles(stylesheet)

	// Default value just to make typescript happy
	const [selectedGrade, setSelectedGrade] = useState<SelectedGrade>({
		grade: 1,
		points: 15,
		type: 'Schulaufgabe',
		semester: 1,
		id: '0',
		isPrimary: true,
	})

	const { bottomSheetModalRef, handlePresentModalPress, handleSheetChanges } =
		useSetupBottomSheetModal()

	const handleShowGrade = ({
		grade,
		semester,
		isPrimary,
	}: {
		grade: SingleGradeType
		semester: 1 | 2
		isPrimary: boolean
	}) => {
		setSelectedGrade({ semester, isPrimary, ...grade })
		handlePresentModalPress()
	}

	const handleChangeGradePoints = (newPoints: number) => {
		const semester$ = grades.lastUsedClass.value.subjects.find(
			s => s.id.get() === subject.id,
		)?.semesters[selectedGrade.semester - 1]

		if (!semester$) {
			console.log("No semester found for subject. This shouldn't be possible")
			return
		}

		if (selectedGrade.isPrimary) {
			semester$.primaryGrade.set({ ...selectedGrade, points: newPoints })
		} else {
			semester$.secondaryGrades
				.find(grade => grade.id.get() === selectedGrade.id)
				?.points.set(newPoints)
		}

		console.log(newPoints)
	}

	const handleDeleteGrade = () => {}

	return (
		<>
			<SectionList
				sections={subject.semesters.map((semester, index) => ({
					data: semester.secondaryGrades,
					semesterNumber: (index + 1) as 1 | 2,
				}))}
				keyExtractor={item => String(item.id)}
				contentContainerStyle={styles.gradesList}
				ListHeaderComponent={
					<SubjectAverage
						average={calculateAverageOfSemesters(subject.semesters)}
					/>
				}
				ListHeaderComponentStyle={styles.listHeader}
				renderItem={({ item, section: { semesterNumber } }) => (
					<View style={styles.horizontalInset}>
						<GradeView
							onPress={() =>
								handleShowGrade({
									grade: item,
									semester: semesterNumber,
									isPrimary: false,
								})
							}
							singleGrade={item}
						/>
					</View>
				)}
				renderSectionHeader={({ section: { semesterNumber } }) => (
					<View style={[styles.sectionHeader, styles.horizontalInset]}>
						<SemesterSectionHeader
							semesterNumber={semesterNumber}
							semesterAverage={toTwoSignificantFigures(
								calculateAverageOfSemester(
									subject.semesters[semesterNumber - 1],
								),
							)}
						/>
						{subject.semesters[semesterNumber - 1].primaryGrade ? (
							// For some reason typescript doesn't infer that we're checking
							// that the grade is defined
							<GradeView
								onPress={() =>
									handleShowGrade({
										grade: subject.semesters[semesterNumber - 1].primaryGrade!,
										semester: semesterNumber,
										isPrimary: true,
									})
								}
								singleGrade={
									subject.semesters[semesterNumber - 1].primaryGrade!
								}
							/>
						) : null}
					</View>
				)}
			/>
			<BottomSheetModal
				ref={bottomSheetModalRef}
				enableDynamicSizing
				onChange={handleSheetChanges}
			>
				<BottomSheetView>
					<EditGradeForm
						onChangePoints={handleChangeGradePoints}
						onDelete={handleDeleteGrade}
						currentGrade={selectedGrade}
						// Add a key so that React remounts the component
						// since the value of points is only supplied as
						// a default in the form and rerenders
						// wouldn't change it
						key={selectedGrade.id}
					/>
				</BottomSheetView>
			</BottomSheetModal>
		</>
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
