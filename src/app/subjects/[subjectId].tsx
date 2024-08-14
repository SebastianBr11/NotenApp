import { Stack, router, useLocalSearchParams } from 'expo-router'
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
import SubjectScreenActions from '@/modules/subject/components/SubjectScreenActions'
import grades$, { SingleGradeType } from '@/storage/grades'
import { calculateGradeFromPoints } from '@/util/school'
import { BottomSheetView } from '@gorhom/bottom-sheet'
import { observer } from '@legendapp/state/react'

export default observer(SubjectScreen)

function SubjectScreen() {
	const { styles } = useStyles(stylesheet)
	const { bottomSheetModalRef, handlePresentModalPress, handleSheetChanges } =
		useSetupBottomSheetModal()

	const { subjectId } = useLocalSearchParams()
	const currentClass = grades$.lastUsedClass$.get()

	const subject = currentClass.value.subjects.find(
		subj => subj.id === subjectId,
	)!

	const handleAddGrade = (data: FormData) => {
		const didSucceed = grades$.addGrade(subjectId + '', data.semester, {
			grade: calculateGradeFromPoints(
				Number(data.points) as SingleGradeType['points'],
			),
			type: data.type,
			points: Number(data.points) as SingleGradeType['points'],
		})

		if (didSucceed) {
			bottomSheetModalRef.current?.dismiss()
		} else {
			Alert.alert(
				t('screen-subject:error-title'),
				t('screen-subject:error-message'),
			)
		}
	}

	const handleEditSubject = () => {}

	const handleDeleteSubject = () => {
		Alert.alert(
			t('screen-subject:delete-subject'),
			t('screen-subject:delete-subject-message', { subject: subject.name }),
			[
				{
					text: t('screen-subject:delete-subject-cancel'),
					style: 'cancel',
				},
				{
					text: t('screen-subject:delete-subject-confirm'),
					style: 'destructive',
					onPress: () => {
						const subject$ = grades$.findSubject(subjectId + '')
						if (subject$) {
							subject$.delete()
							router.replace('/')
						}
					},
				},
			],
		)
	}

	return (
		<View style={styles.container}>
			<Stack.Screen
				options={{
					headerTitle: subject.name,
					headerRight: () => (
						<SubjectScreenActions
							onEdit={handleEditSubject}
							onDelete={handleDeleteSubject}
						/>
					),
				}}
			/>

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
