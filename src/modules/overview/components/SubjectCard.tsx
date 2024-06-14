import { useBottomSheetModal } from '@gorhom/bottom-sheet'
import { Link } from 'expo-router'
import { Text, TouchableOpacity, View } from 'react-native'
import { createStyleSheet, useStyles } from 'react-native-unistyles'

import { ifDarkElse } from '@/constants/themes'
import { ClassType } from '@/storage/grades'
import { calculateAverageOfSemesters } from '@/util/gradeCalcFos'

type SubjectCardProps = {
	subject: ClassType['subjects'][0]
	selectedClassId: string
}

export default function SubjectCard({
	subject: { name, id, semesters },
	selectedClassId,
}: SubjectCardProps) {
	const { styles } = useStyles(stylesheet)

	const { dismissAll } = useBottomSheetModal()

	const avg = calculateAverageOfSemesters(semesters)

	return (
		<Link
			href={{
				pathname: '/subjects/[subjectId]',
				params: { subjectId: id, selectedClassId },
			}}
			onPress={dismissAll}
			asChild
		>
			<TouchableOpacity activeOpacity={0.5} style={styles.card}>
				<Text style={styles.subjectName}>{name}</Text>
				<View style={styles.semesterBadge}>
					<Text style={styles.semesterBadgeText}>{avg}</Text>
				</View>
			</TouchableOpacity>
		</Link>
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
	subjectName: {
		color: theme.colors.text3,
		fontSize: theme.spacing['3xl'],
		fontWeight: theme.fontWeights.regular,
	},
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
