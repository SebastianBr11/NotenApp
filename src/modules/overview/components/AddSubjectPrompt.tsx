import React from 'react'
import { Text, View } from 'react-native'
import { createStyleSheet, useStyles } from 'react-native-unistyles'

import { t } from '@/i18n/util'

export default function AddSubjectPrompt() {
	const { styles } = useStyles(stylesheet)

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<Text style={styles.headerText}>
					{t('screen-grades:no-subject-added')}
				</Text>
			</View>
		</View>
	)
}

const stylesheet = createStyleSheet(theme => ({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	header: {
		justifyContent: 'center',
		paddingHorizontal: theme.spacing.lg,
	},
	headerText: {
		fontSize: theme.fontSizes['5xl'],
		lineHeight: 1.1 * theme.fontSizes['5xl'],
		fontWeight: theme.fontWeights.black,
		letterSpacing: -1.2,
		color: theme.colors.text4,
		textAlign: 'center',
	},
}))
