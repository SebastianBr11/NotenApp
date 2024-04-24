import { Link } from 'expo-router'
import React from 'react'
import { Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { createStyleSheet, useStyles } from 'react-native-unistyles'

import { t } from '@/util/localization'

export default function AddClassPrompt() {
	const { styles } = useStyles(stylesheet)

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<Text style={styles.headerText}>
					{t('screen-grades:no-classes-created')}
				</Text>
			</View>
			<View style={styles.buttonContainer}>
				<Link href='/addClass' asChild>
					<TouchableOpacity activeOpacity={0.5} style={styles.button}>
						<Text style={styles.buttonText}>
							{t('screen-grades:create-class')}
						</Text>
					</TouchableOpacity>
				</Link>
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
		flex: 2,
		justifyContent: 'center',
	},
	headerText: {
		fontSize: theme.fontSizes['6xl'],
		lineHeight: theme.fontSizes['6xl'],
		fontWeight: theme.fontWeights.black,
		letterSpacing: -1.2,
		color: theme.colors.text4,
		textAlign: 'center',
	},
	buttonContainer: {
		flex: 1,
	},
	button: {
		backgroundColor: theme.colors.mainBg3,
		paddingVertical: theme.spacing['2xl'],
		paddingHorizontal: theme.spacing['2xl'] * 2,
		borderRadius: theme.spacing.lg,
	},
	buttonText: {
		color: theme.colors.mainText3,
		fontSize: theme.fontSizes['2xl'],
	},
}))
