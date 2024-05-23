import { formatNumber, t } from '@/i18n/util'
import React from 'react'
import { Text, View } from 'react-native'
import { createStyleSheet, useStyles } from 'react-native-unistyles'

type SubjectAverageProps = {
	average: number
}

export default function SubjectAverage({ average }: SubjectAverageProps) {
	const { styles } = useStyles(stylesheet)

	return (
		<View style={styles.averageContainer}>
			<Text style={styles.averageText}>{t('screen-subject:average')}</Text>
			<Text style={styles.average}>
				{formatNumber(average)}{' '}
				<Text style={styles.averagePointsText}>
					{t('screen-subject:points')}
				</Text>
			</Text>
		</View>
	)
}

const stylesheet = createStyleSheet(theme => ({
	averageContainer: {
		paddingHorizontal: theme.spacing['6xl'],
		paddingTop: theme.spacing['4xl'],
		paddingBottom: theme.spacing['3xl'],
		backgroundColor: theme.colors.bg2,
		gap: theme.spacing['xl'],
		borderRadius: theme.spacing['6xl'],
	},
	averageText: {
		color: theme.colors.text5,
		fontSize: theme.fontSizes.base,
		fontWeight: theme.fontWeights.regular,
		lineHeight: theme.fontSizes.base,
		textTransform: 'uppercase',
	},
	average: {
		fontSize: theme.fontSizes['6xl'],
		fontWeight: theme.fontWeights.black,
		lineHeight: theme.fontSizes['6xl'],
		letterSpacing: -1.2,
		color: theme.colors.text1,
	},
	averagePointsText: {
		color: theme.colors.text2,
		fontWeight: theme.fontWeights.regular,
		fontSize: theme.fontSizes['2xl'],
	},
}))
