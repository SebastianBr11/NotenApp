import React from 'react'
import { Text, TouchableOpacity } from 'react-native'
import { createStyleSheet, useStyles } from 'react-native-unistyles'

import { ifDarkElse } from '@/constants/themes'

type SubmitButtonProps = React.ComponentProps<typeof TouchableOpacity> & {
	children: React.ReactNode
}

export default function SubmitButton({
	children,
	...props
}: SubmitButtonProps) {
	const { styles } = useStyles(stylesheet)

	return (
		<TouchableOpacity
			style={styles.submitButton}
			activeOpacity={0.5}
			{...props}
		>
			<Text style={styles.submitText}>{children}</Text>
		</TouchableOpacity>
	)
}

const stylesheet = createStyleSheet(theme => ({
	submitButton: {
		backgroundColor: theme.colors.main[500],
		paddingVertical: theme.spacing.xl,
		paddingHorizontal: theme.spacing['4xl'],
		marginTop: theme.spacing['2xl'],
		borderRadius: theme.spacing.sm,
		alignSelf: 'flex-start',
	},
	submitText: {
		fontWeight: theme.fontWeights.bold,
		fontSize: theme.fontSizes.xl,
		color: ifDarkElse(theme, theme.colors.main[950], theme.colors.main[100]),
	},
}))
