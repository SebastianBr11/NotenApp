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
import SubjectGrades from '@/modules/subject/components/SubjectGrades'
import grades, { SingleGradeType } from '@/storage/grades'
import { calculateGradeFromPoints } from '@/util/school'
import { BottomSheetView } from '@gorhom/bottom-sheet'
import { observer } from '@legendapp/state/react'

export default observer(SubjectScreen)

function SubjectScreen() {
	const { styles } = useStyles(stylesheet)
	const { bottomSheetModalRef, handlePresentModalPress, handleSheetChanges } =
		useSetupBottomSheetModal()

	const { subjectId, selectedClassId } = useLocalSearchParams()
	const classes = grades.classes.get()

	const subject = classes
		.find(c => c.id === selectedClassId)
		?.subjects.find(subj => subj.id === subjectId)!

	const handleAddGrade = (data: FormData) => {
		const didSucceed = grades.addGrade(
			selectedClassId + '',
			subjectId + '',
			data.semester,
			{
				grade: calculateGradeFromPoints(Number(data.points)),
				type: data.type,
				points: Number(data.points) as SingleGradeType['points'],
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
			<Stack.Screen options={{ headerTitle: subject.name }} />

			<SubjectGrades subject={subject} />

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
