import { Stack, useLocalSearchParams } from 'expo-router'
import React from 'react'
import { Alert, View } from 'react-native'
import { createStyleSheet, useStyles } from 'react-native-unistyles'

import BottomSheetModal from '@/components/BottomSheetModal'
import { useSetupBottomSheetModal } from '@/hooks/useSetupBottomSheetModal'
import { t } from '@/i18n/util'
import AddGradeButton from '@/modules/subject/components/AddGradeButton'
import AddGradeForm, {
	FormData,
} from '@/modules/subject/components/AddGradeForm'
import GradesList from '@/modules/subject/components/GradesList'
import { SingleGradeType, schools } from '@/storage/grades'
import { calculateGradeFromPoints } from '@/util/school'
import { BottomSheetView } from '@gorhom/bottom-sheet'
import { observer } from '@legendapp/state/react'

export default observer(SubjectScreen)

function SubjectScreen() {
	const { styles } = useStyles(stylesheet)
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
				points: Number(data.points) as SingleGradeType['points'],
				id: 0, // TODO: Generate ids instead of just using 0
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
			>
				<BottomSheetView>
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
}))
