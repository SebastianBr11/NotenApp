import React from 'react'
import { Text } from 'react-native'
import { createStyleSheet, useStyles } from 'react-native-unistyles'

type SubmitButtonProps = React.ComponentProps<typeof Text> & {
	children: React.ReactNode
}

export default function ErrorText({ children, ...props }: SubmitButtonProps) {
	const { styles } = useStyles(stylesheet)

	return (
		<Text style={styles.errorText} {...props}>
			{children}
		</Text>
	)
}

const stylesheet = createStyleSheet(theme => ({
	errorText: {
		color: 'red',
		marginLeft: theme.spacing.md,
		marginTop: theme.spacing.md,
	},
}))
