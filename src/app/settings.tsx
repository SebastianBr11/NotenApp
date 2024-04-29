import React from 'react'
import { Text, View } from 'react-native'
import { createStyleSheet, useStyles } from 'react-native-unistyles'

export default function SettingsScreen() {
	const {} = useStyles(stylesheet)

	return (
		<View>
			<Text>SettingsScreen</Text>
		</View>
	)
}

const stylesheet = createStyleSheet({})
