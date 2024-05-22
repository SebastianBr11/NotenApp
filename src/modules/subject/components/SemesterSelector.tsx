import React, { useState } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { createStyleSheet, useStyles } from 'react-native-unistyles'

import { ifDarkElse } from '@/constants/themes'

type SemesterSelectorProps = {
	onChange: () => void
	value: 1 | 2
}

export default function SemesterSelector({
	onChange,
	value,
}: SemesterSelectorProps) {
	const { styles } = useStyles(stylesheet)

	const [selectedType, setSelectedType] = useState(value)

	const onSelectType = (type: SemesterSelectorProps['value']) => {
		onChange()
		setSelectedType(type)
	}

	return (
		<View style={styles.container}>
			<TouchableOpacity
				onPress={() => onSelectType(1)}
				activeOpacity={0.5}
				style={styles.typeWrapper(selectedType === 1, false)}
			>
				<Text style={styles.typeText(selectedType === 1, false)}>1</Text>
			</TouchableOpacity>
			<TouchableOpacity
				onPress={() => onSelectType(2)}
				activeOpacity={0.5}
				style={styles.typeWrapper(selectedType === 2, false)}
			>
				<Text style={styles.typeText(selectedType === 2, false)}>2</Text>
			</TouchableOpacity>
		</View>
	)
}

const stylesheet = createStyleSheet(theme => ({
	container: {
		width: '80%',
		marginLeft: 'auto',
		marginRight: 'auto',
		padding: theme.spacing['2xl'],
		borderRadius: theme.spacing.lg,
		flexDirection: 'row',
		gap: theme.spacing['2xl'],
	},
	typeWrapper: (isSelected: boolean, isDisabled: boolean) => ({
		flexGrow: 1,
		flexBasis: '0%',
		aspectRatio: 7 / 6,
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
	typeText: (isSelected: boolean, isDisabled: boolean) => ({
		fontSize: theme.fontSizes.lg,
		fontWeight: theme.fontWeights.bold,
		color: isDisabled
			? theme.colors.gray[400]
			: isSelected
				? ifDarkElse(theme, theme.colors.main[100], theme.colors.main[500])
				: theme.colors.text2,
	}),
}))
