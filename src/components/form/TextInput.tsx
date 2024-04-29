import React, { useState } from 'react'
import { FieldError } from 'react-hook-form'
import {
	TextInput as OriginalTextInput,
	TextInputProps as OriginalTextInputProps,
} from 'react-native'
import { createStyleSheet, useStyles } from 'react-native-unistyles'

type TextInputProps = OriginalTextInputProps & {
	formState: {
		error?: FieldError
	}
}

export default function TextInput({
	formState: { error },
	...props
}: TextInputProps) {
	const { styles, theme } = useStyles(stylesheet)

	const [isFocused, setIsFocused] = useState(false)

	return (
		<OriginalTextInput
			{...props}
			onFocus={() => setIsFocused(true)}
			onBlur={() => setIsFocused(false)}
			style={[
				styles.textInput,
				error ? styles.inputErrored : isFocused ? styles.inputFocused : null,
			]}
			placeholderTextColor={theme.colors.text6}
		/>
	)
}

const stylesheet = createStyleSheet(theme => ({
	textInput: {
		borderWidth: 1,
		borderColor: theme.colors.text4,
		backgroundColor: theme.colors.bg3,
		padding: theme.spacing.lg,
		paddingHorizontal: theme.spacing['2xl'],
		borderRadius: theme.spacing.lg,
		fontSize: theme.fontSizes.lg,
		color: theme.colors.text2,
		fontWeight: theme.fontWeights.thin,
	},
	inputErrored: {
		borderColor: 'red',
	},
	inputFocused: {
		borderColor: theme.colors.main[500],
	},
}))
