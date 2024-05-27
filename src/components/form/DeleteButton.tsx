import React from 'react'
import { Text, TouchableOpacity } from 'react-native'
import { createStyleSheet, useStyles } from 'react-native-unistyles'

type DeleteButtonProps = React.ComponentProps<typeof TouchableOpacity> & {
	children: React.ReactNode
}

export default function DeleteButton({
	children,
	...props
}: DeleteButtonProps) {
	const { styles } = useStyles(stylesheet)

	return (
		<TouchableOpacity
			style={styles.deleteButton}
			activeOpacity={0.5}
			{...props}
		>
			<Text style={styles.deleteText}>{children}</Text>
		</TouchableOpacity>
	)
}

const stylesheet = createStyleSheet(theme => ({
	deleteButton: {
		borderColor: 'red',
		borderWidth: 1,
		paddingVertical: theme.spacing.xl,
		paddingHorizontal: theme.spacing['4xl'],
		marginTop: theme.spacing['2xl'],
		borderRadius: theme.spacing.sm,
		alignSelf: 'flex-start',
	},
	deleteText: {
		fontWeight: theme.fontWeights.bold,
		fontSize: theme.fontSizes.xl,
		color: 'red',
	},
}))
