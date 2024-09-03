import React from 'react'
import { Text, View } from 'react-native'
import { createStyleSheet, useStyles } from 'react-native-unistyles'

type FormScreenHeaderProps = {
	children: React.ReactNode
	size?: 'sm' | 'lg'
}

export default function FormScreenHeader({
	children,
	size,
}: FormScreenHeaderProps) {
	const { styles } = useStyles(stylesheet)

	return (
		<View style={styles.headerContainer}>
			<Text style={styles.headerText(size ?? 'lg')}>{children}</Text>
		</View>
	)
}

const stylesheet = createStyleSheet(theme => ({
	headerContainer: {
		flexBasis: 'auto',
		flexGrow: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	headerText: (size: 'sm' | 'lg') => ({
		fontSize: size === 'sm' ? theme.fontSizes['3xl'] : theme.fontSizes['5xl'],
		lineHeight: size === 'sm' ? theme.fontSizes['3xl'] : theme.fontSizes['5xl'],
		fontWeight: theme.fontWeights.black,
		letterSpacing: -1,
		color: theme.colors.text4,
		textAlign: 'center',
	}),
}))
