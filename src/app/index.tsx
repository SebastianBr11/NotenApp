import { View } from 'react-native'
import { createStyleSheet, useStyles } from 'react-native-unistyles'

import GradesOverview from '@/modules/overview/components/GradesOverview'

export default function TabOneScreen() {
	const { styles } = useStyles(stylesheet)

	return (
		<View style={styles.container}>
			<GradesOverview />
		</View>
	)
}

const stylesheet = createStyleSheet({
	container: {
		flex: 1,
		alignItems: 'center',
	},
})
