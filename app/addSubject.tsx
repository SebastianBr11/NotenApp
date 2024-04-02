import { StatusBar } from 'expo-status-bar'
import { Platform, Text, View } from 'react-native'

import { createStyleSheet, useStyles } from 'react-native-unistyles'

export default function ModalScreen() {
	const { styles } = useStyles(stylesheet)

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Modal</Text>

			{/* Use a light status bar on iOS to account for the black space above the modal */}
			<StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
		</View>
	)
}

const stylesheet = createStyleSheet({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	title: {
		fontSize: 20,
		fontWeight: 'bold',
	},
})
