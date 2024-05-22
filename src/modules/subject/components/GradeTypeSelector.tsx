import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { createStyleSheet, useStyles } from 'react-native-unistyles'

import { ifDarkElse } from '@/constants/themes'
import { SingleGradeType } from '@/storage/grades'

type GradeTypeSelectorProps = {
	onChange: (...event: any[]) => void
	value: SingleGradeType['type']
}

export default function GradeTypeSelector({
	onChange,
	value: selectedType,
}: GradeTypeSelectorProps) {
	const { styles } = useStyles(stylesheet)

	const onSelectType = (type: GradeTypeSelectorProps['value']) => {
		onChange(type)
	}

	return (
		<View style={styles.container}>
			<TouchableOpacity
				onPress={() => onSelectType('Schulaufgabe')}
				activeOpacity={0.5}
				style={styles.typeWrapper(selectedType === 'Schulaufgabe', false)}
			>
				<Text style={styles.typeText(selectedType === 'Schulaufgabe', false)}>
					Schulaufgabe
				</Text>
			</TouchableOpacity>
			<TouchableOpacity
				onPress={() => onSelectType('Kurzarbeit')}
				activeOpacity={0.5}
				style={styles.typeWrapper(selectedType === 'Kurzarbeit', false)}
			>
				<Text style={styles.typeText(selectedType === 'Kurzarbeit', false)}>
					Kurzarbeit
				</Text>
			</TouchableOpacity>
			<TouchableOpacity
				onPress={() => onSelectType('Mündlich')}
				activeOpacity={0.5}
				style={styles.typeWrapper(selectedType === 'Mündlich', false)}
			>
				<Text style={styles.typeText(selectedType === 'Mündlich', false)}>
					Mündlich
				</Text>
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
