import { observer } from '@legendapp/state/react'
import React from 'react'
import { Alert } from 'react-native'
import DraggableFlatList from 'react-native-draggable-flatlist'
import { createStyleSheet, useStyles } from 'react-native-unistyles'

import ClassItem from './ClassItem'

import { lastUsedClass, schools } from '@/storage/grades'
import { t } from '@/util/localization'

export default observer(ClassList)

function ClassList() {
	const { styles } = useStyles(stylesheet)

	const classes = schools.classes.get()

	const onDeleteClass = (classId: number) => {
		const classToDelete = classes.find(c => c.id === classId)

		Alert.alert(
			t('screen-grades:delete-class'),
			t('screen-grades:delete-class-prompt', {
				type: classToDelete?.type,
				year: classToDelete?.year,
			}),
			[
				{
					text: t('screen-grades:delete-class-cancel'),
					style: 'cancel',
				},
				{
					text: t('screen-grades:delete-class-confirm'),
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
	)
}

const stylesheet = createStyleSheet(theme => ({
	list: {
		gap: theme.spacing['3xl'],
		marginHorizontal: theme.spacing['3xl'],
	},
}))
