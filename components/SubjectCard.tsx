import { GradesType } from '@/storage/grades'
import { calculateAverageOfSemesters } from '@/util/gradeCalcFos'
import { useBottomSheetModal } from '@gorhom/bottom-sheet'
import { Link } from 'expo-router'
import { StyleSheet } from 'react-native'
import { Text, View } from './Themed'

type SubjectCardProps = {
	subject: GradesType['school']['subjects']['0']
}

export default function SubjectCard({
	subject: { name, semesters },
}: SubjectCardProps) {
	const { dismissAll } = useBottomSheetModal()

	const avg = calculateAverageOfSemesters(semesters)

	return (
		<Link
			href={{
				pathname: '/subjects/[subject]',
				params: { subject: name },
			}}
			onPress={dismissAll}
		>
			<View style={styles.card} lightColor='#eee' darkColor='#222'>
				<Text style={styles.subjectName}>{name}</Text>
				<View style={styles.semesterBadge} lightColor='blue' darkColor='blue'>
					<Text lightColor='#fff'>{}</Text>
				</View>
				<Text>{avg}</Text>
			</View>
		</Link>
	)
}

const styles = StyleSheet.create({
	card: {
		width: 300,
		// borderColor: 'blue',
		// borderWidth: 2,
		borderRadius: 4,
		padding: 20,
		alignItems: 'flex-start',
	},
	subjectName: {
		fontSize: 23,
		fontWeight: '800',
	},
	semesterBadge: {
		fontSize: 14,
		paddingHorizontal: 10,
		paddingVertical: 4,
		borderRadius: 100,
		elevation: 1,
	},
})
