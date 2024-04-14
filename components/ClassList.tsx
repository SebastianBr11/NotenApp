import { observer } from '@legendapp/state/react'
import React from 'react'
import { Alert, View } from 'react-native'
import DraggableFlatList from 'react-native-draggable-flatlist'
import { createStyleSheet, useStyles } from 'react-native-unistyles'

import ClassItem from './ClassItem'

import { lastUsedClass, schools } from '@/storage/grades'

export default observer(ClassList)

function ClassList() {
	const { styles } = useStyles(stylesheet)

	const classes = schools.classes.get()

	const onDeleteClass = (classId: number) => {
		const classToDelete = classes.find(c => c.id === classId)

		Alert.alert(
			'Delete Class?',
			`Are you sure you want to delete the class ${classToDelete?.type} ${classToDelete?.year}?`,
			[
				{
					text: 'Cancel',
					style: 'cancel',
				},
				{
					text: 'Delete',
					style: 'destructive',
					onPress: () => {
						schools.classes.set(oldClasses =>
							oldClasses.filter(c => c.id !== classId),
						)
						lastUsedClass.set(0)
					},
				},
			],
		)
	}

	return (
		<View>
			<DraggableFlatList
				data={classes}
				keyExtractor={item => item.id.toString()}
				renderItem={({ item, drag, isActive, getIndex }) => (
					<ClassItem
						{...{ item, drag, isActive, getIndex, onDelete: onDeleteClass }}
					/>
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
