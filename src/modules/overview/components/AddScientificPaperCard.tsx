import CardContainer from '@/components/card/CardContainer'
import CardText from '@/components/card/CardText'
import { router } from 'expo-router'
import { createStyleSheet, useStyles } from 'react-native-unistyles'
export default function AddScientificPaperCard() {
	const { styles } = useStyles(stylesheet)

	const navigateToScientificPaperScreen = () => {
		router.push('/scientific-paper')
	}

	return (
		<CardContainer onPress={navigateToScientificPaperScreen}>
			<CardText style={styles.text}>
				Add details about your scientific paper
			</CardText>
		</CardContainer>
	)
}
const stylesheet = createStyleSheet(theme => ({
	text: {
		color: theme.colors.text6,
	},
}))
