import { Link, Stack } from 'expo-router'
import { Text, View } from 'react-native'
import { createStyleSheet, useStyles } from 'react-native-unistyles'

export default function NotFoundScreen() {
	const { styles } = useStyles(stylesheet)
	return (
		<>
			<Stack.Screen options={{ title: 'Oops!' }} />
			<View style={styles.container}>
				<Text style={styles.title}>This screen doesn't exist.</Text>

				<Link href='/' style={styles.link}>
					<Text style={styles.linkText}>Go to home screen!</Text>
				</Link>
			</View>
		</>
	)
}

const stylesheet = createStyleSheet(theme => ({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		padding: 20,
	},
	title: {
		fontSize: 20,
		fontWeight: theme.fontWeights.bold,
	},
	link: {
		marginTop: 15,
		paddingVertical: 15,
	},
	linkText: {
		fontSize: 14,
		color: '#2e78b7',
	},
}))
