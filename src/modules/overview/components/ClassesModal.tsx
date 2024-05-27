import BottomSheetModal from '@/components/BottomSheetModal'
import {
	BottomSheetFooter,
	BottomSheetModalProps,
	BottomSheetView,
} from '@gorhom/bottom-sheet'
import { BottomSheetModalMethods } from '@gorhom/bottom-sheet/lib/typescript/types'
import React from 'react'
import { createStyleSheet, useStyles } from 'react-native-unistyles'
import AddClassButton from './AddClassButton'
import ClassesView from './ClassesView'

type ClassesModalProps = Pick<
	BottomSheetModalProps,
	'snapPoints' | 'onChange'
> & {
	bottomSheetModalRef: React.RefObject<BottomSheetModalMethods>
}

export default function ClassesModal({
	bottomSheetModalRef,
	snapPoints,
	onChange,
}: ClassesModalProps) {
	const { styles } = useStyles(stylesheet)

	return (
		<BottomSheetModal
			ref={bottomSheetModalRef}
			index={1}
			snapPoints={snapPoints}
			onChange={onChange}
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
