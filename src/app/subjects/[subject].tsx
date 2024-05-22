import { observer } from '@legendapp/state/react'
import { Stack, useLocalSearchParams } from 'expo-router'
import React from 'react'
import { Alert, View } from 'react-native'
import { createStyleSheet, useStyles } from 'react-native-unistyles'

import { t } from '@/i18n/util'
import { useSetupBottomSheetModal } from '@/modules/overview/components/useSetupBottomSheetModal'
import AddGradeButton from '@/modules/subject/components/AddGradeButton'
import AddGradeForm, {
	FormData,
} from '@/modules/subject/components/AddGradeForm'
import GradesList from '@/modules/subject/components/GradesList'
import { schools } from '@/storage/grades'
import { calculateGradeFromPoints } from '@/util/school'
import { BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet'

export default observer(SubjectScreen)

function SubjectScreen() {
	const { styles, theme } = useStyles(stylesheet)
	const { bottomSheetModalRef, handlePresentModalPress, handleSheetChanges } =
		useSetupBottomSheetModal()

	const { subject: subjectId, selectedClass } = useLocalSearchParams()
	const classes = schools.classes.get()

	const { name, semesters } = classes[Number(selectedClass)].subjects.find(
		subject => subject.id === Number(subjectId),
	)!

	const handleAddGrade = (data: FormData) => {
		const didSucceed = schools.addGrade(
			Number(selectedClass),
			Number(subjectId),
			data.semester,
			{
				grade: calculateGradeFromPoints(Number(data.points)),
				type: data.type,
				points: Number(data.points),
			},
		)

		if (didSucceed) {
			bottomSheetModalRef.current?.dismiss()
		} else {
			Alert.alert(
				t('screen-subject:error-title'),
				t('screen-subject:error-message'),
			)
		}
	}

	return (
		<View style={styles.container}>
			<Stack.Screen options={{ headerTitle: name }} />

			<GradesList semesters={semesters} />

			<BottomSheetModal
				ref={bottomSheetModalRef}
				enableDynamicSizing
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
	},
	bottomSheetContainer: {},
}))
