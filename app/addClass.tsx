import React from 'react'
import { Text, View } from 'react-native'
import { createStyleSheet, useStyles } from 'react-native-unistyles'

export default function AddClassScreen() {
	const { styles } = useStyles(stylesheet)

	return (
		<View>
			<Text>AddClassScreen</Text>
		</View>
	)
}

const stylesheet = createStyleSheet({})
