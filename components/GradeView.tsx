import React from 'react'
import { Text, View } from 'react-native'
import { createStyleSheet, useStyles } from 'react-native-unistyles'

import { SingleGradeType } from '@/storage/grades'

type GradeViewType = {
	singleGrade: SingleGradeType
}

export default function GradeView({ singleGrade }: GradeViewType) {
	const { styles } = useStyles(stylesheet)

	return (
		<View>
			<Text style={styles.text}>{singleGrade.type}</Text>
			<Text>{singleGrade.points}</Text>
		</View>
	)
}

const stylesheet = createStyleSheet(theme => ({
	text: {
		fontSize: theme.fontSizes['4xl'],
	},
}))
