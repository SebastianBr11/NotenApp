import { View } from 'react-native'
import { createStyleSheet, useStyles } from 'react-native-unistyles'

type FormScreenContainerProps = {
	children: React.ReactNode
}

export default function FormScreenForm({ children }: FormScreenContainerProps) {
	const { styles } = useStyles(stylesheet)

	return <View style={styles.formWrapper}>{children}</View>
}

const stylesheet = createStyleSheet(theme => ({
	formWrapper: {
		flexGrow: 1,
		flexBasis: 'auto',
		gap: theme.spacing['2xl'],
	},
}))
