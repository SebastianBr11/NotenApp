import { Text, View } from 'react-native'
import { createStyleSheet, useStyles } from 'react-native-unistyles'

type CardBadgeProps = {
	children: React.ReactNode
}

export default function CardBadge({ children }: CardBadgeProps) {
	const { styles } = useStyles(stylesheet)

	return (
		<View style={styles.semesterBadge}>
			<Text style={styles.semesterBadgeText}>{children}</Text>
		</View>
	)
}
const stylesheet = createStyleSheet(theme => ({
	semesterBadge: {
		fontSize: theme.fontSizes.sm,
		paddingHorizontal: theme.spacing.lg,
		paddingVertical: theme.spacing.sm,
		borderRadius: theme.spacing['6xl'],
		elevation: 1,
		backgroundColor: theme.colors.mainBg3,
	},
	semesterBadgeText: {
		color: theme.colors.mainText2,
		fontWeight: theme.fontWeights.black,
	},
}))
