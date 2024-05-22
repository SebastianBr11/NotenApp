import React from 'react'
import { View } from 'react-native'
import { createStyleSheet, useStyles } from 'react-native-unistyles'

type RadioButtonGroupProps = {
	children: React.ReactNode
}

export default function RadioButtonGroup({ children }: RadioButtonGroupProps) {
	const { styles } = useStyles(stylesheet)

	return <View style={styles.container}>{children}</View>
}

const stylesheet = createStyleSheet(theme => ({
	container: {
		flexWrap: 'wrap',
		marginHorizontal: 'auto',
		padding: theme.spacing['2xl'],
		borderRadius: theme.spacing.lg,
		flexDirection: 'row',
		gap: theme.spacing['2xl'],
	},
}))
