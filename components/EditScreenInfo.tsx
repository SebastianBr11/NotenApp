import React, { useCallback, useMemo, useRef } from 'react'
import { Pressable, Text, View } from 'react-native'

import { lastUsedClass, schools } from '@/storage/grades'
import { Feather } from '@expo/vector-icons'
import { BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet'
import { observer } from '@legendapp/state/react'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import Animated, {
	Extrapolation,
	FadingTransition,
	SlideInDown,
	SlideOutDown,
	interpolate,
	runOnJS,
	useSharedValue,
	withSpring,
} from 'react-native-reanimated'
import { createStyleSheet, useStyles } from 'react-native-unistyles'
import AddSubjectCard from './AddSubjectCard'
import SubjectCard from './SubjectCard'

const AnimatedPressable = Animated.createAnimatedComponent(Pressable)

export default observer(EditScreenInfo)

function EditScreenInfo() {
	const { styles, theme } = useStyles(stylesheet)

	const translateX = useSharedValue(0)

	const selectedClass = lastUsedClass.get()
	const classes = schools.classes.get()
	const { subjects: yearGrades, year, type } = classes[selectedClass]

	const setSelectedClass = (selectedClass: number) => {
		lastUsedClass.set(selectedClass)
	}

	const pan = Gesture.Pan()
		.onChange(e => {
			translateX.value = 0.5 * e.translationX
		})
		.onEnd(e => {
			if (Math.abs(e.translationX) > 75) {
				const newSelectedClass = Math.round(
					interpolate(
						translateX.value,
						[-75, 75],
						[selectedClass + 1, selectedClass - 1],
						Extrapolation.CLAMP,
					),
				)
				if (newSelectedClass >= 0 && newSelectedClass < classes.length) {
					runOnJS(setSelectedClass)(newSelectedClass)
				}
			}
			translateX.value = withSpring(0)
		})

	const bottomSheetModalRef = useRef<BottomSheetModal>(null)

	const snapPoints = useMemo(() => ['25%', '50%'], [])

	const handlePresentModalPress = useCallback(() => {
		bottomSheetModalRef.current?.present()
	}, [])
	const handleSheetChanges = useCallback((index: number) => {
		console.log('handleSheetChanges', index)
	}, [])

	return (
		<View style={styles.mainView}>
			<View style={styles.listWrapper}>
				<Animated.FlatList
					layout={FadingTransition}
					contentContainerStyle={styles.list}
					data={yearGrades}
					keyExtractor={item => item.id}
					renderItem={({ item, index }) => (
						<Animated.View
							entering={SlideInDown.springify()
								.damping(10)
								.mass(0.5)
								.stiffness(75)
								.delay((index - 1) * 100)}
							exiting={SlideOutDown}
						>
							<SubjectCard selectedClass={selectedClass} subject={item} />
						</Animated.View>
					)}
				/>
				<AddSubjectCard classNumber={selectedClass} />
			</View>
			<View style={styles.headerWrapper}>
				<GestureDetector gesture={pan}>
					<AnimatedPressable
						style={{
							transform: [{ translateX }],
						}}
						onPress={handlePresentModalPress}
					>
						<View style={styles.headerContainer}>
							<Feather
								name='chevron-left'
								size={32}
								color={theme.colors.mainText3}
								style={{ opacity: selectedClass === 0 ? 0 : 1 }}
							/>
							<View style={styles.headerTextContainer}>
								<View style={styles.headerYearContainer}>
									<Text style={styles.header}>Jahr {year}</Text>
									<Feather
										name='edit'
										size={24}
										color={theme.colors.mainText1}
									/>
								</View>
								<Text style={styles.subHeader}>{type}</Text>
							</View>
							<Feather
								name='chevron-right'
								size={32}
								color={theme.colors.mainText3}
								style={{
									opacity: selectedClass === classes.length - 1 ? 0 : 1,
								}}
							/>
						</View>
					</AnimatedPressable>
				</GestureDetector>
			</View>
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
		flexDirection: 'column',
		backgroundColor: theme.colors.bg1,
		gap: theme.spacing['4xl'],
	},
	headerWrapper: {
		backgroundColor: theme.colors.mainBg3,
	},
	headerContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: theme.spacing['2xl'],
		paddingHorizontal: theme.spacing.sm,
		paddingVertical: theme.spacing['2xl'],
	},
	headerTextContainer: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
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
		gap: theme.spacing['3xl'],
		flexGrow: 1,
	},
	listWrapper: {
		flex: 1,
		gap: theme.spacing['3xl'],
		marginHorizontal: theme.spacing['3xl'],
	},
}))
