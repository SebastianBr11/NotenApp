import { BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet'
import { observer } from '@legendapp/state/react'
import { useFocusEffect } from 'expo-router'
import React, { useCallback, useMemo, useRef, useState } from 'react'
import { BackHandler, View } from 'react-native'
import { createStyleSheet, useStyles } from 'react-native-unistyles'

import AddSubjectCard from './AddSubjectCard'
import ClassesView from './ClassesView'
import SchoolClassSelector from './SchoolClassSelector'
import SubjectCardList from './SubjectCardList'

import { lastUsedClass } from '@/storage/grades'

export default observer(EditScreenInfo)

function EditScreenInfo() {
	const { styles, theme } = useStyles(stylesheet)

	const selectedClass = lastUsedClass.get()

	const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false)

	const bottomSheetModalRef = useRef<BottomSheetModal>(null)

	const snapPoints = useMemo(() => ['25%', '50%'], [])

	const handlePresentModalPress = useCallback(() => {
		bottomSheetModalRef.current?.present()
	}, [])
	const handleSheetChanges = useCallback((index: number) => {
		console.log('handleSheetChanges', index)
		if (index > -1) {
			setIsBottomSheetOpen(true)
		} else {
			setIsBottomSheetOpen(false)
		}
	}, [])

	useFocusEffect(
		useCallback(() => {
			const onBackPress = () => {
				if (isBottomSheetOpen) {
					bottomSheetModalRef.current?.close()
					return true // Tell React Native that the event was handled
				}
				return false
			}

			const subscription = BackHandler.addEventListener(
				'hardwareBackPress',
				onBackPress,
			)

			return () => subscription.remove()
		}, [isBottomSheetOpen]),
	)

	return (
		<View style={styles.mainView}>
			<View style={styles.listWrapper}>
				<SubjectCardList />
				<AddSubjectCard classNumber={selectedClass} />
			</View>
			<SchoolClassSelector onPress={handlePresentModalPress} />
			<BottomSheetModal
				ref={bottomSheetModalRef}
				index={1}
				snapPoints={snapPoints}
				onChange={handleSheetChanges}
				handleIndicatorStyle={{ backgroundColor: theme.colors.text1 }}
				handleStyle={{
					backgroundColor: theme.colors.bg2,
					borderTopStartRadius: 20,
					borderTopEndRadius: 20,
				}}
				backgroundStyle={{ backgroundColor: theme.colors.bg2 }}
			>
				<BottomSheetView>
					<ClassesView />
				</BottomSheetView>
			</BottomSheetModal>
		</View>
	)
}

const stylesheet = createStyleSheet(theme => ({
	mainView: {
		width: '100%',
		paddingVertical: theme.spacing['2xl'],
		flex: 1,
		flexDirection: 'column',
		backgroundColor: theme.colors.bg1,
		gap: theme.spacing['4xl'],
	},

	listWrapper: {
		flex: 1,
		gap: theme.spacing['3xl'],
		marginHorizontal: theme.spacing['3xl'],
	},
}))
