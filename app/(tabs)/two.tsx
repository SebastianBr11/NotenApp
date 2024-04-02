import { View } from 'react-native'

import EditScreenInfo from '@/components/EditScreenInfo'
import { createStyleSheet, useStyles } from 'react-native-unistyles'

export default function TabTwoScreen() {
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
		justifyContent: 'center',
	},
})
