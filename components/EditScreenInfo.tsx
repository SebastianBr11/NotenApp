import React from 'react'
import { FlatList, StyleSheet } from 'react-native'

import { View } from './Themed'

import { grades } from '@/storage/grades'
import SubjectCard from './SubjectCard'

export default function EditScreenInfo({ path }: { path: string }) {
	const yearGrades = grades.school.subjects.get()
	return (
		<View style={styles.mainView}>
			<FlatList
				contentContainerStyle={styles.list}
				data={yearGrades}
				keyExtractor={item => item.name}
				renderItem={({ item }) => <SubjectCard subject={item} />}
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	mainView: {
		width: '100%',
		marginTop: 5,
	},
	list: {
		// borderColor: 'red',
		// borderWidth: 5,
		gap: 8,
		flexDirection: 'column',
		alignItems: 'center',
	},
})
