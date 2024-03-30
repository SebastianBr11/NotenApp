import { GradesType } from '@/storage/grades'
import { Link } from 'expo-router'
import { StyleSheet } from 'react-native'
import { Text, View } from './Themed'

type SubjectCardProps = {
	subject: GradesType['school']['subjects']['0']
}

export default function SubjectCard({
	subject: { name, semesters },
}: SubjectCardProps) {
	return (
		<Link
			href={{
				pathname: '/subjects/[subject]',
				params: { subject: name },
			}}
		>
			<View style={styles.card} lightColor='#eee' darkColor='#222'>
				<Text style={styles.subjectName}>{name}</Text>
				<View style={styles.semesterBadge} lightColor='blue'>
					<Text lightColor='#fff'>1. Schuljahr</Text>
				</View>
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
