import { observer } from '@legendapp/state/react'
import React from 'react'
import { Alert } from 'react-native'
import DraggableFlatList from 'react-native-draggable-flatlist'
import { createStyleSheet, useStyles } from 'react-native-unistyles'

import ClassItem from './ClassItem'

import { t } from '@/i18n/util'
import grades$ from '@/storage/grades'

export default observer(ClassList)

function ClassList() {
	const { styles } = useStyles(stylesheet)

	const classes = grades$.classes$.get()

	const onDeleteClass = (classId: string) => {
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
						grades$.classes$.set(oldClasses =>
							oldClasses.filter(c => c.id !== classId),
						)
						grades$.lastUsedClass$.setFromIndex(0)
					},
				},
			],
		)
	}

	return (
		<DraggableFlatList
			data={classes}
			keyExtractor={item => {
				return item.id
			}}
			renderItem={({ item, drag, isActive }) => (
				<ClassItem {...{ item, drag, isActive, onDelete: onDeleteClass }} />
			)}
			contentContainerStyle={styles.list}
			onDragEnd={({ data }) => grades$.classes$.set(data)}
		/>
	)
}

const stylesheet = createStyleSheet(theme => ({
	list: {
		gap: theme.spacing['3xl'],
		marginHorizontal: theme.spacing['3xl'],
	},
}))
