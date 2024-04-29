import { useBottomSheetModal } from '@gorhom/bottom-sheet'
import { Link } from 'expo-router'
import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { createStyleSheet, useStyles } from 'react-native-unistyles'

import { ifDarkElse } from '@/constants/themes'
import { t } from '@/util/localization'

export default function AddClassButton() {
	const { styles } = useStyles(stylesheet)

	const { dismissAll } = useBottomSheetModal()

	return (
		<View style={styles.buttonWrapper}>
			<Link href='/add-class' onPress={dismissAll} asChild>
				<TouchableOpacity activeOpacity={0.5} style={styles.button}>
					<Text style={styles.buttonText}>
						{t('screen-grades:add-new-class')}
					</Text>
				</TouchableOpacity>
			</Link>
		</View>
	)
}

const stylesheet = createStyleSheet(theme => ({
	buttonWrapper: {
		flex: 1,
		backgroundColor: theme.colors.bg2,
	},
	button: {
		backgroundColor: ifDarkElse(
			theme,
			theme.colors.main[700],
			theme.colors.main[200],
		),
		paddingVertical: theme.spacing['4xl'],
	},
	buttonText: {
		color: theme.colors.mainText1,
		fontSize: theme.fontSizes.lg,
		textAlign: 'center',
		fontWeight: theme.fontWeights.regular,
	},
}))
