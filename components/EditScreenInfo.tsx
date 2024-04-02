import React, { useCallback, useMemo, useRef } from 'react'
import { FlatList, Pressable, Text, View } from 'react-native'

import { grades } from '@/storage/grades'
import { Feather } from '@expo/vector-icons'
import { BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet'
import { createStyleSheet, useStyles } from 'react-native-unistyles'
import SubjectCard from './SubjectCard'

export default function EditScreenInfo() {
	const { styles, theme } = useStyles(stylesheet)

	const bottomSheetModalRef = useRef<BottomSheetModal>(null)

	const snapPoints = useMemo(() => ['25%', '50%'], [])

	const handlePresentModalPress = useCallback(() => {
		bottomSheetModalRef.current?.present()
	}, [])
	const handleSheetChanges = useCallback((index: number) => {
		console.log('handleSheetChanges', index)
	}, [])

	const { subjects: yearGrades, year, type } = grades.school.get()
	return (
		<View style={styles.mainView}>
			<FlatList
				contentContainerStyle={styles.list}
				data={yearGrades}
				keyExtractor={item => item.name}
				renderItem={({ item }) => <SubjectCard subject={item} />}
			/>
			<Pressable onPress={handlePresentModalPress}>
				<View style={styles.headerContainer}>
					<Feather
						name='chevron-left'
						size={32}
						color={theme.colors.mainText3}
					/>
					<View style={styles.headerTextContainer}>
						<View style={styles.headerYearContainer}>
							<Text style={styles.header}>Jahr {year}</Text>
							<Feather name='edit' size={24} color={theme.colors.mainText1} />
						</View>
						<Text style={styles.subHeader}>{type}</Text>
					</View>
					<Feather
						name='chevron-right'
						size={32}
						color={theme.colors.mainText3}
					/>
				</View>
			</Pressable>
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
					<Text>Hi</Text>
				</BottomSheetView>
			</BottomSheetModal>
		</View>
	)
}

const stylesheet = createStyleSheet(theme => ({
	mainView: {
		width: '100%',
		paddingVertical: theme.spacing['5xl'],
		flex: 1,
		backgroundColor: theme.colors.bg1,
		gap: theme.spacing['4xl'],
	},
	headerContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingHorizontal: theme.spacing.sm,
		paddingVertical: theme.spacing['2xl'],
		backgroundColor: theme.colors.mainBg3,
	},
	headerTextContainer: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-around',
	},
	headerYearContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: theme.spacing.xl,
	},
	header: {
		fontSize: theme.fontSizes['4xl'],
		fontWeight: '900',
		letterSpacing: -1.2,
		color: theme.colors.text2,
	},
	subHeader: {
		fontSize: theme.fontSizes['2xl'],
		letterSpacing: -1.2,
		color: theme.colors.mainText3,
		fontWeight: '600',
	},
	list: {
		// borderColor: 'red',
		// borderWidth: 5,
		gap: theme.spacing['3xl'],
		flexDirection: 'column',
		marginHorizontal: theme.spacing['3xl'],
	},
}))
