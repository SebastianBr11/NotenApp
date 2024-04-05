import { Text, View } from 'react-native'
import { createStyleSheet, useStyles } from 'react-native-unistyles'

export default function TabTwoScreen() {
	const { styles } = useStyles(stylesheet)
	return (
		<View style={styles.container}>
			<Text>Calendar</Text>
		</View>
	)
}

const stylesheet = createStyleSheet({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
})
