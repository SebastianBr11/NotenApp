import { ifDarkElse } from '@/constants/themes'
import { TouchableOpacity } from 'react-native'
import { createStyleSheet, useStyles } from 'react-native-unistyles'

type CardContainerProps = {
	children: React.ReactNode
	onPress: () => void
}

export default function CardContainer({
	children,
	onPress,
}: CardContainerProps) {
	const { styles } = useStyles(stylesheet)

	return (
		<TouchableOpacity onPress={onPress} activeOpacity={0.5} style={styles.card}>
			{children}
		</TouchableOpacity>
	)
}
const stylesheet = createStyleSheet(theme => ({
	card: {
		borderRadius: theme.spacing.xl,
		padding: theme.spacing['4xl'],
		flexDirection: 'row',
		gap: theme.spacing.xl,
		alignItems: 'center',
		backgroundColor: ifDarkElse(
			theme,
			theme.colors.gray[800],
			theme.colors.gray[100],
		),
		color: theme.colors.text1,
		borderWidth: 1,
		borderColor: ifDarkElse(
			theme,
			theme.colors.gray[600],
			theme.colors.gray[300],
		),
	},
}))
