import EditScreenInfo from '@/components/EditScreenInfo'
import { View } from 'react-native'
import { createStyleSheet, useStyles } from 'react-native-unistyles'

export default function TabOneScreen() {
	const { styles } = useStyles(stylesheet)

	return (
		<View style={styles.container}>
			<EditScreenInfo />
		</View>
	)
}

const stylesheet = createStyleSheet({
	container: {
		flex: 1,
		alignItems: 'center',
	},
})
