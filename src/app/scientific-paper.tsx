import { t } from '@/i18n/util'
import EditScientificPaperForm from '@/modules/scientific-paper/components/EditScientificPaperForm'
import grades$, { SingleGradeType } from '@/storage/grades'
import { calculateGradeFromPoints } from '@/util/school'
import { observer } from '@legendapp/state/react'
import { View } from 'react-native'
import { createStyleSheet, useStyles } from 'react-native-unistyles'

export default observer(ScientificPaperScreen)
function ScientificPaperScreen() {
	const { styles } = useStyles(stylesheet)

	const currentClass = grades$.lastUsedClass$
	const scientificPaper = currentClass.value.scientificPaper.get() ?? {
		grade: 6,
		points: 0,
		title: t('scientific-paper:default-title'),
	}

	const handleChangeTitle = (title: string) => {
		currentClass.value.scientificPaper.assign({ ...scientificPaper, title })
	}

	const handleChangePoints = (points: number) => {
		currentClass.value.scientificPaper.assign({
			...scientificPaper,
			points: points as SingleGradeType['points'],
			grade: calculateGradeFromPoints(points as SingleGradeType['points']),
		})
	}

	return (
		<View style={styles.container}>
			<EditScientificPaperForm
				onChangeTitle={handleChangeTitle}
				onChangePoints={handleChangePoints}
				scientificPaper={scientificPaper}
			/>
		</View>
	)
}

const stylesheet = createStyleSheet(theme => ({
	container: {
		flex: 1,
		backgroundColor: theme.colors.bg1,
		paddingTop: theme.spacing['2xl'],
	},
}))
