import React from 'react'
import { Text, View } from 'react-native'
import { createStyleSheet, useStyles } from 'react-native-unistyles'

import { ifDarkElse } from '@/constants/themes'
import { SingleGradeType } from '@/storage/grades'

type GradeViewType = {
	singleGrade: SingleGradeType
}

export default function GradeView({ singleGrade }: GradeViewType) {
	const { styles } = useStyles(stylesheet)

	return (
		<View style={styles.container}>
			<Text style={styles.gradeTypeText}>{singleGrade.type}</Text>
			<Text style={styles.pointsText}>{singleGrade.points}</Text>
		</View>
	)
}

const stylesheet = createStyleSheet(theme => ({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		backgroundColor: theme.colors.bg2,
		paddingVertical: theme.spacing['3xl'],
		paddingHorizontal: 2 * theme.spacing['3xl'],
		borderRadius: theme.spacing['4xl'],
		borderColor: ifDarkElse(
			theme,
			theme.colors.main[800],
			theme.colors.main[300],
		),
		borderWidth: 1,
	},
	gradeTypeText: {
		fontSize: theme.fontSizes['xl'],
		color: theme.colors.text4,
		fontWeight: theme.fontWeights.regular,
	},
	pointsText: {
		fontSize: theme.fontSizes.lg,
		color: theme.colors.text3,
		fontWeight: theme.fontWeights.black,
	},
}))
