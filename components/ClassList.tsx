import React from 'react'
import { View } from 'react-native'
import DraggableFlatList from 'react-native-draggable-flatlist'
import { createStyleSheet, useStyles } from 'react-native-unistyles'

import ClassItem from './ClassItem'

import { schools } from '@/storage/grades'

export default function ClassList() {
	const { styles } = useStyles(stylesheet)

	const classes = schools.classes.get()

	return (
		<View>
			<DraggableFlatList
				data={classes}
				keyExtractor={item => item.id.toString()}
				renderItem={({ item, drag, isActive, getIndex }) => (
					<ClassItem {...{ item, drag, isActive, getIndex }} />
				)}
				contentContainerStyle={styles.list}
				onDragEnd={({ data }) => schools.classes.set(data)}
			/>
		</View>
	)
}

const stylesheet = createStyleSheet(theme => ({
	list: {
		gap: theme.spacing['3xl'],
		flexGrow: 1,
		marginHorizontal: theme.spacing['3xl'],
	},
}))
