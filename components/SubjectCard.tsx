import { GradesType } from '@/storage/grades'
import { calculateAverageOfSemesters } from '@/util/gradeCalcFos'
import { useBottomSheetModal } from '@gorhom/bottom-sheet'
import { Link } from 'expo-router'
import { Text, TouchableOpacity, View } from 'react-native'
import { createStyleSheet, useStyles } from 'react-native-unistyles'

type SubjectCardProps = {
	subject: GradesType['school']['subjects']['0']
}

export default function SubjectCard({
	subject: { name, semesters },
}: SubjectCardProps) {
	const { styles } = useStyles(stylesheet)

	const { dismissAll } = useBottomSheetModal()

	const avg = calculateAverageOfSemesters(semesters)

	return (
		<Link
			href={{
				pathname: '/subjects/[subject]',
				params: { subject: name },
			}}
			onPress={dismissAll}
			asChild
		>
			<TouchableOpacity activeOpacity={0.8} style={styles.card}>
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
		flex: 1,
		borderRadius: theme.spacing.xl,
		padding: theme.spacing['4xl'],
		flexDirection: 'row',
		gap: theme.spacing.xl,
		alignItems: 'center',
		backgroundColor: theme.colors.bg2,
		color: theme.colors.text1,
		borderWidth: 1,
		borderColor: theme.colors.mainBg4,
		borderStyle: 'dashed',
	},
	subjectName: {
		color: theme.colors.text3,
		fontSize: 23,
		fontWeight: '700',
	},
	semesterBadge: {
		fontSize: 14,
		paddingHorizontal: 10,
		paddingVertical: 4,
		borderRadius: 100,
		elevation: 1,
		backgroundColor: theme.colors.mainBg3,
	},
	semesterBadgeText: {
		color: theme.colors.mainText2,
	},
}))
