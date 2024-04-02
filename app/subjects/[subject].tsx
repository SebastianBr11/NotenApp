import GradeView from '@/components/GradeView'
import { grades } from '@/storage/grades'
import { Stack, useLocalSearchParams } from 'expo-router'
import React from 'react'
import { FlatList, Text, View } from 'react-native'
import { createStyleSheet, useStyles } from 'react-native-unistyles'

export default function SubjectScreen() {
	const { styles } = useStyles(stylesheet)

	const { subject: slug } = useLocalSearchParams()
	const school = grades.school.get()

	const {
		name,
		semesters: [semesterOne, semesterTwo],
	} = school.subjects.find(subject => subject.name === slug)!

	// console.log(subject, slug)

	return (
		<View style={styles.container}>
			<Stack.Screen options={{ headerTitle: name }} />
			<Text>Semester One</Text>
			<FlatList
				data={semesterOne.singleGrades}
				renderItem={({ item }) => <GradeView singleGrade={item} />}
			/>
		</View>
	)
}

const stylesheet = createStyleSheet({
	container: {
		flex: 1,
		alignItems: 'center',
	},
})
