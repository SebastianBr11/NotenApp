import React from 'react'
import { Text, View } from 'react-native'
import { createStyleSheet, useStyles } from 'react-native-unistyles'

type FormScreenHeaderProps = {
	children: React.ReactNode
}

export default function FormScreenHeader({ children }: FormScreenHeaderProps) {
	const { styles } = useStyles(stylesheet)

	return (
		<View style={styles.headerContainer}>
			<Text style={styles.headerText}>{children}</Text>
		</View>
	)
}

const stylesheet = createStyleSheet(theme => ({
	headerContainer: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	headerText: {
		fontSize: theme.fontSizes['5xl'],
		lineHeight: theme.fontSizes['5xl'],
		fontWeight: theme.fontWeights.black,
		letterSpacing: -1,
		color: theme.colors.text4,
		textAlign: 'center',
	},
}))
