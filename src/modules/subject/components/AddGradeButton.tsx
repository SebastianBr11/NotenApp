import { ifDarkElse } from '@/constants/themes'
import { Feather } from '@expo/vector-icons'
import React from 'react'
import { Pressable, PressableStateCallbackType } from 'react-native'
import { createStyleSheet, useStyles } from 'react-native-unistyles'

type AddGradeButtonProps = {
	onPress: () => void
}

export default function AddGradeButton({ onPress }: AddGradeButtonProps) {
	const { styles, theme } = useStyles(stylesheet)

	return (
		<Pressable
			style={styles.button}
			hitSlop={theme.spacing['xl']}
			onPress={onPress}
		>
			<Feather
				name='plus'
				size={theme.spacing['4xl']}
				color={theme.colors.mainText1}
			/>
		</Pressable>
	)
}

const stylesheet = createStyleSheet(theme => ({
	button: ({ pressed }: PressableStateCallbackType) => ({
		position: 'absolute',
		right: theme.spacing['5xl'],
		bottom: theme.spacing['6xl'],
		height: 1.5 * theme.spacing['6xl'],
		aspectRatio: 1,
		backgroundColor: ifDarkElse(
			theme,
			pressed ? theme.colors.main[900] : theme.colors.main[700],
			pressed ? theme.colors.main[300] : theme.colors.main[200],
		),
		borderRadius: theme.spacing['6xl'],
		alignItems: 'center',
		justifyContent: 'center',
	}),
}))
