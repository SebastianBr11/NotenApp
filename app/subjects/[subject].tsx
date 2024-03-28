import { grades } from '@/storage/grades'
import { Stack, useLocalSearchParams } from 'expo-router'
import React from 'react'
import { Text, View } from 'react-native'

export default function SubjectScreen() {
	const { subject: slug } = useLocalSearchParams()
	console.log(slug)
	const subject = grades.school.subjects
		.get()
		.find(subject => subject.name === slug)
	console.log(subject, slug)
	return (
		<View>
			<Stack.Screen options={{ headerTitle: subject?.name }} />
			<Text>Slug: {subject?.semester}</Text>
		</View>
	)
}
