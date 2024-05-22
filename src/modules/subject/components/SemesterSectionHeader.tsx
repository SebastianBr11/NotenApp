import { formatNumber, t } from '@/i18n/util'
import React from 'react'
import { Text, View } from 'react-native'
import { createStyleSheet, useStyles } from 'react-native-unistyles'

type SemesterSecionHeaderProps = {
	semesterNumber: number
	semesterAverage: number
}

export default function SemesterSectionHeader({
	semesterNumber,
	semesterAverage,
}: SemesterSecionHeaderProps) {
	const { styles } = useStyles(stylesheet)

	const semesterNumberText = semesterNumber === 1 ? 'I' : 'II'

	return (
		<View style={styles.semesterHeader}>
			<Text style={styles.semesterHeaderText}>
				{t('screen-subject:semester')} {semesterNumberText}
			</Text>
			<Text style={styles.semesterHeaderAverage}>
				{formatNumber(semesterAverage)} {t('screen-subject:points')}
			</Text>
		</View>
	)
}

const stylesheet = createStyleSheet(theme => ({
	semesterHeader: {
		flexDirection: 'row',
		alignItems: 'baseline',
		justifyContent: 'space-between',
	},
	semesterHeaderText: {
		color: theme.colors.text2,
		fontSize: theme.fontSizes['2xl'],
		fontWeight: theme.fontWeights.regular,
		letterSpacing: -0.5,
	},
	semesterHeaderAverage: {
		color: theme.colors.text1,
		fontSize: theme.fontSizes.xl,
		fontWeight: theme.fontWeights.bold,
	},
}))
