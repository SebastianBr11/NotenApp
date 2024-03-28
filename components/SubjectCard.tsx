import { GradesType } from '@/storage/grades'
import { Link } from 'expo-router'
import { StyleSheet, Text, View } from 'react-native'

type SubjectCardProps = {
	subject: GradesType['school']['subjects']['0']
}

export default function SubjectCard({
	subject: { name, semester, singleGrades },
}: SubjectCardProps) {
	return (
		<Link
			href={{
				pathname: '/subjects/[subject]',
				params: { subject: name },
			}}
		>
			<View style={styles.card}>
				<Text style={styles.subjectName}>{name}</Text>
				<Text style={styles.semesterBadge}>{semester}. Schuljahr</Text>
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
		backgroundColor: '#eee',
		alignItems: 'flex-start',
	},
	subjectName: {
		fontSize: 23,
		fontWeight: '800',
	},
	semesterBadge: {
		backgroundColor: 'blue',
		fontSize: 14,
		color: '#fff',
		paddingHorizontal: 10,
		paddingVertical: 4,
		borderRadius: 100,
		elevation: 1,
	},
})
