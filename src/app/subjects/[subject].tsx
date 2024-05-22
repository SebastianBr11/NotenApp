import { observer } from '@legendapp/state/react'
import { Stack, useLocalSearchParams } from 'expo-router'
import React from 'react'
import { Alert, Text, View } from 'react-native'
import { createStyleSheet, useStyles } from 'react-native-unistyles'

import { t } from '@/i18n/util'
import { useSetupBottomSheetModal } from '@/modules/overview/components/useSetupBottomSheetModal'
import AddGradeButton from '@/modules/subject/components/AddGradeButton'
import AddGradeForm, {
	FormData,
} from '@/modules/subject/components/AddGradeForm'
import SemesterView from '@/modules/subject/components/SemesterView'
import { schools } from '@/storage/grades'
import { calculateAverageOfSemesters } from '@/util/gradeCalcFos'
import { calculateGradeFromPoints } from '@/util/school'
import { BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet'

export default observer(SubjectScreen)

function SubjectScreen() {
	const { styles, theme } = useStyles(stylesheet)
	const {
		bottomSheetModalRef,
		handlePresentModalPress,
		handleSheetChanges,
		snapPoints,
	} = useSetupBottomSheetModal({ snapPoints: ['80%'] })

	const { subject: subjectId, selectedClass } = useLocalSearchParams()
	const classes = schools.classes.get()

	const {
		name,
		semesters: [semesterOne, semesterTwo],
	} = classes[Number(selectedClass)].subjects.find(
		subject => subject.id === Number(subjectId),
	)!

	const handleAddGrade = (data: FormData) => {
		console.log('adding')
		const didSucceed = schools.addGrade(
			Number(selectedClass),
			Number(subjectId),
			1,
			{
				grade: calculateGradeFromPoints(Number(data.points)),
				type: data.type,
				points: Number(data.points),
			},
		)

		console.log(didSucceed)

		if (!didSucceed) {
			Alert.alert(
				'Es ist ein Fehler aufgetreten!',
				'Es gibt bereits eine Schulaufgabe in diesem Schuljahr',
			)
		}
	}

	return (
		<View style={styles.container}>
			<Stack.Screen options={{ headerTitle: name }} />

			<View style={styles.averageContainer}>
				<Text style={styles.averageText}>{t('screen-subject:average')}</Text>
				<Text style={styles.average}>
					{calculateAverageOfSemesters([semesterOne, semesterTwo])}{' '}
					<Text style={styles.averagePointsText}>
						{t('screen-subject:points')}
					</Text>
				</Text>
			</View>

			<View style={styles.semesterContainer}>
				<SemesterView semesterNumber={1} semester={semesterOne} />
				<SemesterView semesterNumber={2} semester={semesterTwo} />
			</View>

			<BottomSheetModal
				ref={bottomSheetModalRef}
				snapPoints={snapPoints}
				onChange={handleSheetChanges}
				handleIndicatorStyle={{ backgroundColor: theme.colors.text1 }}
				handleStyle={{
					backgroundColor: theme.colors.bg2,
					borderTopStartRadius: 20,
					borderTopEndRadius: 20,
				}}
				backgroundStyle={{ backgroundColor: theme.colors.bg2 }}
			>
				<BottomSheetView style={styles.bottomSheetContainer}>
					<AddGradeForm onSubmit={handleAddGrade} />
				</BottomSheetView>
			</BottomSheetModal>

			<AddGradeButton onPress={handlePresentModalPress} />
		</View>
	)
}

const stylesheet = createStyleSheet(theme => ({
	container: {
		flex: 1,
		backgroundColor: theme.colors.bg1,
		paddingTop: theme.spacing['2xl'],
		gap: theme.spacing['3xl'],
	},
	averageContainer: {
		paddingHorizontal: theme.spacing['6xl'],
		paddingTop: theme.spacing['4xl'],
		paddingBottom: theme.spacing['3xl'],
		backgroundColor: theme.colors.bg2,
		gap: theme.spacing['xl'],
		borderRadius: theme.spacing['6xl'],
	},
	averageText: {
		color: theme.colors.text5,
		fontSize: theme.fontSizes.base,
		fontWeight: theme.fontWeights.regular,
		lineHeight: theme.fontSizes.base,
		textTransform: 'uppercase',
	},
	average: {
		fontSize: theme.fontSizes['6xl'],
		fontWeight: theme.fontWeights.black,
		lineHeight: theme.fontSizes['6xl'],
		letterSpacing: -1.2,
		color: theme.colors.text1,
	},
	averagePointsText: {
		color: theme.colors.text2,
		fontWeight: theme.fontWeights.regular,
		fontSize: theme.fontSizes['2xl'],
	},
	semesterContainer: {
		width: '100%',
		paddingHorizontal: theme.spacing['6xl'],
		paddingVertical: theme.spacing['4xl'],
		gap: theme.spacing['5xl'],
	},
	bottomSheetContainer: {
		flex: 1,
	},
}))
