import { Text } from 'react-native'
import { createStyleSheet, useStyles } from 'react-native-unistyles'

type CardTextProps = React.ComponentProps<typeof Text> & {
	children: React.ReactNode
}
export default function CardText({ children, style, ...props }: CardTextProps) {
	const { styles } = useStyles(stylesheet)

	return (
		<Text style={[styles.text, style]} {...props}>
			{children}
		</Text>
	)
}
const stylesheet = createStyleSheet(theme => ({
	text: {
		color: theme.colors.text3,
		fontSize: theme.spacing['3xl'],
		fontWeight: theme.fontWeights.regular,
	},
}))
