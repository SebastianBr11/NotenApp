import React from 'react'
import { Text, View } from 'react-native'
import { createStyleSheet, useStyles } from 'react-native-unistyles'

import ClassList from './ClassList'

export default function ClassesView() {
	const { styles } = useStyles(stylesheet)

	return (
		<View style={styles.container}>
			<Text style={styles.headerText}>Manage Classes</Text>
			<ClassList />
		</View>
	)
}

const stylesheet = createStyleSheet(theme => ({
	container: {
		gap: theme.spacing['3xl'],
		paddingVertical: theme.spacing['3xl'],
	},
	headerText: {
		fontSize: theme.fontSizes['2xl'],
		fontWeight: theme.fontWeights.bold,
		color: theme.colors.text2,
		alignSelf: 'center',
	},
}))