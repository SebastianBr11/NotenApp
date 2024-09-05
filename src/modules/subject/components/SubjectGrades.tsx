import BottomSheetModal from '@/components/BottomSheetModal'
import { useSetupBottomSheetModal } from '@/hooks/useSetupBottomSheetModal'
import { t } from '@/i18n/util'
import grades$, { SingleGradeType, SubjectType } from '@/storage/grades'
import {
	calculateAverageOfSemester,
	calculateAverageOfSemesters,
} from '@/util/gradeCalcFos'
import { toTwoSignificantFigures } from '@/util/number'
import { BottomSheetView } from '@gorhom/bottom-sheet'
import React, { useState } from 'react'
import { SectionList, View } from 'react-native'
import { createStyleSheet, useStyles } from 'react-native-unistyles'
import Average from './Average'
import EditGradeForm from './EditGradeForm'
import GradeView from './GradeView'
import SemesterSectionHeader from './SemesterSectionHeader'

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
		grades$.updateGrade(subject.id, selectedGrade.semester, selectedGrade.id, {
			points: newPoints as SingleGradeType['points'],
		})
	}

	const handleDeleteGrade = () => {
		grades$.deleteGrade(subject.id, selectedGrade.semester, selectedGrade.id)
		bottomSheetModalRef.current?.dismiss()
	}

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
					<Average
						average={calculateAverageOfSemesters(subject.semesters)}
						unit={t('screen-subject:points')}
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
