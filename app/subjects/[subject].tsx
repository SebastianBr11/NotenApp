import GradeView from '@/components/GradeView'
import { schools } from '@/storage/grades'
import { Stack, useLocalSearchParams } from 'expo-router'
import React from 'react'
import { FlatList, Text, View } from 'react-native'
import { createStyleSheet, useStyles } from 'react-native-unistyles'

export default function SubjectScreen() {
	const { styles } = useStyles(stylesheet)

	const { subject: subjectId, selectedClass } = useLocalSearchParams()
	const classes = schools.classes.get()

	const {
		name,
		semesters: [semesterOne, semesterTwo],
	} = classes[Number(selectedClass)].subjects.find(
		subject => subject.id === Number(subjectId),
	)!

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
