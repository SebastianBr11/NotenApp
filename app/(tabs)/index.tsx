import { StyleSheet } from 'react-native'

import EditScreenInfo from '@/components/EditScreenInfo'
import { View } from '@/components/Themed'

export default function TabOneScreen() {
	return (
		<View style={styles.container}>
			<EditScreenInfo />
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
	},
})
