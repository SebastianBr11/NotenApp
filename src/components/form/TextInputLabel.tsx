import React from 'react'
import { Text } from 'react-native'
import { createStyleSheet, useStyles } from 'react-native-unistyles'

export default function TextInputLabel({
	children,
}: {
	children: React.ReactNode
}) {
	const { styles } = useStyles(stylesheet)

	return <Text style={styles.inputLabel}>{children}</Text>
}

const stylesheet = createStyleSheet(theme => ({
	inputLabel: {
		fontSize: theme.fontSizes.base,
		fontWeight: theme.fontWeights.regular,
		color: theme.colors.text4,
		marginBottom: theme.spacing.lg,
		marginLeft: theme.spacing.md,
	},
}))
