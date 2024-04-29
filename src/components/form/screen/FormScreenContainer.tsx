import { View } from 'react-native'
import { createStyleSheet, useStyles } from 'react-native-unistyles'

type FormScreenContainerProps = {
	children: React.ReactNode
}

export default function FormScreenContainer({
	children,
}: FormScreenContainerProps) {
	const { styles } = useStyles(stylesheet)

	return <View style={styles.container}>{children}</View>
}

const stylesheet = createStyleSheet(theme => ({
	container: {
		flex: 1,
		// alignItems: 'center',
		paddingHorizontal: theme.spacing['4xl'],
		paddingVertical: theme.spacing['4xl'],
		gap: theme.spacing['5xl'],
		backgroundColor: theme.colors.bg1,
	},
}))
