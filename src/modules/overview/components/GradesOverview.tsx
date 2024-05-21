import { observer } from '@legendapp/state/react'
import React from 'react'
import { View } from 'react-native'
import { createStyleSheet, useStyles } from 'react-native-unistyles'

import AddClassPrompt from './AddClassPrompt'
import AddSubjectCard from './AddSubjectCard'
import SchoolClassSelector from './SchoolClassSelector'
import SubjectCardView from './SubjectCardView'

import { lastUsedClass, schools } from '@/storage/grades'
import ClassesModal from './ClassesModal'
import { useSetupBottomSheetModal } from './useSetupBottomSheetModal'

export default observer(GradesOverview)

function GradesOverview() {
	const { styles } = useStyles(stylesheet)

	const {
		bottomSheetModalRef,
		handlePresentModalPress,
		handleSheetChanges,
		snapPoints,
	} = useSetupBottomSheetModal()

	const selectedClass = lastUsedClass.get()

	return (
		<View style={styles.mainView}>
			{schools.classes.length > 0 ? (
				<>
					<View style={styles.listWrapper}>
						<SubjectCardView />
						<AddSubjectCard classNumber={selectedClass} />
					</View>
					<SchoolClassSelector onPress={handlePresentModalPress} />
				</>
			) : (
				<AddClassPrompt />
			)}
			<ClassesModal
				bottomSheetModalRef={bottomSheetModalRef}
				snapPoints={snapPoints}
				onChange={handleSheetChanges}
			/>
		</View>
	)
}

const stylesheet = createStyleSheet(theme => ({
	mainView: {
		width: '100%',
		paddingVertical: theme.spacing['2xl'],
		flex: 1,
		flexDirection: 'column',
		backgroundColor: theme.colors.bg1,
		gap: theme.spacing['4xl'],
	},
	listWrapper: {
		flex: 1,
		gap: theme.spacing['3xl'],
		marginHorizontal: theme.spacing['3xl'],
	},
}))
