import {
	BottomSheetFooter,
	BottomSheetModal,
	BottomSheetModalProps,
	BottomSheetView,
} from '@gorhom/bottom-sheet'
import React from 'react'
import { createStyleSheet, useStyles } from 'react-native-unistyles'
import AddClassButton from './AddClassButton'
import ClassesView from './ClassesView'

type ClassesModalProps = Pick<
	BottomSheetModalProps,
	'snapPoints' | 'onChange'
> & {
	bottomSheetModalRef: React.RefObject<BottomSheetModal>
}

export default function ClassesModal({
	bottomSheetModalRef,
	snapPoints,
	onChange,
}: ClassesModalProps) {
	const { styles, theme } = useStyles(stylesheet)

	return (
		<BottomSheetModal
			ref={bottomSheetModalRef}
			index={1}
			snapPoints={snapPoints}
			onChange={onChange}
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
	)
}

const stylesheet = createStyleSheet(theme => ({
	bottomSheetContainer: {
		flex: 1,
	},
}))
