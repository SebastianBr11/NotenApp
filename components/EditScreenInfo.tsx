import React from 'react'
import { FlatList, StyleSheet } from 'react-native'

import { View } from './Themed'

import { grades } from '@/storage/grades'
import SubjectCard from './SubjectCard'

export default function EditScreenInfo() {
	const { subjects: yearGrades, year, type } = grades.school.get()
	return (
		<View style={styles.mainView} darkColor='#111'>
				<View style={styles.headerContainer} darkColor='#111'>
					<View style={styles.headerYearContainer}>
						<Text style={styles.header}>Jahr {year}</Text>
						<Feather name='edit' size={32} color='#fff' />
					</View>
					<Text style={styles.subHeader}>{type}</Text>
				</View>
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
		paddingTop: 5,
		flex: 1,
	},
	headerContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-around',
		paddingVertical: 15,
	},
	headerYearContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 10,
	},
	header: {
		fontSize: 40,
		fontWeight: '900',
		letterSpacing: -1.2,
	},
	subHeader: {
		fontSize: 30,
	},
	list: {
		// borderColor: 'red',
		// borderWidth: 5,
		gap: 8,
		flexDirection: 'column',
		alignItems: 'center',
	},
})
