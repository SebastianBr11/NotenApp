import { Text, View } from '@/components/Themed'
import { grades } from '@/storage/grades'
import { Stack, useLocalSearchParams } from 'expo-router'
import React from 'react'
import { StyleSheet } from 'react-native'

export default function SubjectScreen() {
	const { subject: slug } = useLocalSearchParams()
	const subject = grades.school.subjects
		.get()
		.find(subject => subject.name === slug)
	// console.log(subject, slug)

	return (
		<View style={styles.container}>
			<Stack.Screen options={{ headerTitle: subject?.name }} />
			<Text>Slug: {subject?.semesters[0].singleGrades[0].grade}</Text>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
	},
})
