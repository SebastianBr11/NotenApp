import {
	BottomSheetFooter,
	BottomSheetModal,
	BottomSheetView,
} from '@gorhom/bottom-sheet'
import { observer } from '@legendapp/state/react'
import React from 'react'
import { View } from 'react-native'
import { createStyleSheet, useStyles } from 'react-native-unistyles'

import AddClassButton from './AddClassButton'
import AddClassPrompt from './AddClassPrompt'
import AddSubjectCard from './AddSubjectCard'
import ClassesView from './ClassesView'
import SchoolClassSelector from './SchoolClassSelector'
import SubjectCardView from './SubjectCardView'

import { useSetupBottomSheetModal } from '@/modules/overview/components/useSetupBottomSheetModal'
import { lastUsedClass, schools } from '@/storage/grades'

export default observer(GradesOverview)

function GradesOverview() {
	const { styles, theme } = useStyles(stylesheet)

	const selectedClass = lastUsedClass.get()

	const {
		bottomSheetModalRef,
		handlePresentModalPress,
		handleSheetChanges,
		snapPoints,
	} = useSetupBottomSheetModal()

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
			<BottomSheetModal
				ref={bottomSheetModalRef}
				index={1}
				snapPoints={snapPoints}
				onChange={handleSheetChanges}
				handleIndicatorStyle={{ backgroundColor: theme.colors.text1 }}
				handleStyle={{
					backgroundColor: theme.colors.bg2,
					borderTopStartRadius: 20,
					borderTopEndRadius: 20,
				}}
				backgroundStyle={{ backgroundColor: theme.colors.bg2 }}
				footerComponent={props => (
					<BottomSheetFooter {...props}>
						<AddClassButton />
					</BottomSheetFooter>
				)}
			>
				<BottomSheetView style={styles.bottomSheetContainer}>
					<ClassesView />
				</BottomSheetView>
			</BottomSheetModal>
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
	bottomSheetContainer: {
		flex: 1,
	},
}))
