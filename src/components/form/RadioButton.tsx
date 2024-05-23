import { ifDarkElse } from '@/constants/themes'
import React from 'react'
import { Text, TouchableOpacity } from 'react-native'
import { createStyleSheet, useStyles } from 'react-native-unistyles'

type RadioButtonProps<T extends string | number> = {
	value: T
	onSelect: (newValue: T) => void
	selected: boolean
	disabled?: boolean
}

export default function RadioButton<T extends string | number>({
	value,
	onSelect,
	selected,
	disabled = false,
}: RadioButtonProps<T>) {
	const { styles } = useStyles(stylesheet)

	return (
		<TouchableOpacity
			activeOpacity={0.5}
			onPress={() => onSelect(value)}
			style={styles.radioButton(selected, disabled)}
			disabled={disabled}
		>
			<Text style={styles.text(selected, disabled)}>{value}</Text>
		</TouchableOpacity>
	)
}

const stylesheet = createStyleSheet(theme => ({
	radioButton: (isSelected: boolean, isDisabled: boolean) => ({
		flexGrow: 1,
		flexBasis: 'auto',
		paddingHorizontal: theme.spacing.xl,
		paddingVertical: theme.spacing.lg,
		backgroundColor: isDisabled
			? ifDarkElse(theme, theme.colors.gray[800], theme.colors.gray[200])
			: isSelected
				? ifDarkElse(theme, theme.colors.main[800], theme.colors.main[200])
				: theme.colors.bg3,
		borderRadius: theme.spacing.lg,
		justifyContent: 'center',
		alignItems: 'center',
		borderWidth: 1,
		borderColor: isDisabled
			? theme.colors.gray[400]
			: isSelected
				? theme.colors.main[300]
				: ifDarkElse(theme, theme.colors.gray[400], theme.colors.gray[300]),
	}),
	text: (isSelected: boolean, isDisabled: boolean) => ({
		fontSize: theme.fontSizes.lg,
		fontWeight: theme.fontWeights.bold,
		color: isDisabled
			? theme.colors.gray[400]
			: isSelected
				? ifDarkElse(theme, theme.colors.main[100], theme.colors.main[500])
				: theme.colors.text2,
		textAlign: 'center',
	}),
}))
