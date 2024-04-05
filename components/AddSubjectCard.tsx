import { useBottomSheetModal } from '@gorhom/bottom-sheet'
import { Link } from 'expo-router'
import { Text, TouchableOpacity } from 'react-native'
import { createStyleSheet, useStyles } from 'react-native-unistyles'

import { ifDarkElse } from '@/constants/themes'

type AddSubjectCardProps = {
	classNumber: number
}

export default function AddSubjectCard({ classNumber }: AddSubjectCardProps) {
	const { styles } = useStyles(stylesheet)

	const { dismissAll } = useBottomSheetModal()

	return (
		<Link
			href={{
				pathname: '/addSubject',
			}}
			onPress={dismissAll}
			asChild
		>
			<TouchableOpacity activeOpacity={0.5} style={styles.card}>
				<Text style={styles.subjectName}>Add new subject</Text>
			</TouchableOpacity>
		</Link>
	)
}

const stylesheet = createStyleSheet(theme => ({
	card: {
		borderRadius: theme.spacing.xl,
		padding: theme.spacing['2xl'],
		gap: theme.spacing.xl,
		alignItems: 'center',
		justifyContent: 'center',
		color: theme.colors.text1,
		borderWidth: 1,
		borderColor: ifDarkElse(
			theme,
			theme.colors.secondary[400],
			theme.colors.secondary[600],
		),
	},
	subjectName: {
		textTransform: 'uppercase',
		letterSpacing: 1,
		color: ifDarkElse(
			theme,
			theme.colors.secondary[400],
			theme.colors.secondary[600],
		),
		fontSize: theme.fontSizes.lg,
		fontWeight: '700',
	},
}))
