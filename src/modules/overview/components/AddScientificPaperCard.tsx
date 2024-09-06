import CardContainer from '@/components/card/CardContainer'
import CardText from '@/components/card/CardText'
import { t } from '@/i18n/util'
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
				{t('screen-grades:add-scientific-paper-details')}
			</CardText>
		</CardContainer>
	)
}
const stylesheet = createStyleSheet(theme => ({
	text: {
		color: theme.colors.text6,
	},
}))
