import React, { forwardRef } from 'react'
import { createStyleSheet, useStyles } from 'react-native-unistyles'

import {
	BottomSheetModal as OriginalBottomSheetModal,
	BottomSheetModalProps as OriginalBottomSheetModalProps,
} from '@gorhom/bottom-sheet'
import { BottomSheetModalMethods } from '@gorhom/bottom-sheet/lib/typescript/types'

type BottomSheetModalProps = OriginalBottomSheetModalProps

export default forwardRef<BottomSheetModalMethods, BottomSheetModalProps>(
	function BottomSheetModal(
		{ children, ...props }: BottomSheetModalProps,
		ref,
	) {
		const { styles } = useStyles(stylesheet)

		return (
			<OriginalBottomSheetModal
				handleIndicatorStyle={styles.handleIndicator}
				handleStyle={styles.handle}
				backgroundStyle={styles.background}
				{...props}
				ref={ref}
			>
				{children}
			</OriginalBottomSheetModal>
		)
	},
)

const stylesheet = createStyleSheet(theme => ({
	handleIndicator: {
		backgroundColor: theme.colors.text1,
	},
	handle: {
		backgroundColor: theme.colors.bg2,
		borderTopStartRadius: theme.spacing['3xl'],
		borderTopEndRadius: theme.spacing['3xl'],
	},
	background: {
		backgroundColor: theme.colors.bg2,
	},
}))
