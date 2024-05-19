import { Feather } from '@expo/vector-icons'
import { observer } from '@legendapp/state/react'
import React from 'react'
import { Pressable, Text, View } from 'react-native'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import Animated, {
	Extrapolation,
	interpolate,
	runOnJS,
	useSharedValue,
	withSpring,
} from 'react-native-reanimated'
import { createStyleSheet, useStyles } from 'react-native-unistyles'

import { lastUsedClass, schools } from '@/storage/grades'

const AnimatedPressable = Animated.createAnimatedComponent(Pressable)

type SchoolClassSelectorProps = {
	onPress: () => void
}

export default observer(SchoolClassSelector)

function SchoolClassSelector({
	onPress: handlePresentModalPress,
}: SchoolClassSelectorProps) {
	const { styles, theme } = useStyles(stylesheet)

	const classes = schools.classes.get()
	const numOfClasses = classes.length
	const selectedClass = lastUsedClass.get()
	const { year, type } = classes[selectedClass] ?? { year: 0, type: 'FOS' } // Necessary as a fallback for some reason

	const setSelectedClass = (value: number) => lastUsedClass.set(value)

	const hasNextClass = () => selectedClass < numOfClasses - 1
	const hasPreviousClass = () => selectedClass > 0

	const translateX = useSharedValue(0)

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
				if (newSelectedClass >= 0 && newSelectedClass < numOfClasses) {
					runOnJS(setSelectedClass)(newSelectedClass)
				}
			}
			translateX.value = withSpring(0)
		})

	return (
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
							disabled={!hasPreviousClass()}
							style={{ opacity: hasPreviousClass() ? 1 : 0 }}
							onPress={() => setSelectedClass(selectedClass - 1)}
						/>
						<View style={styles.headerTextContainer}>
							<View style={styles.headerYearContainer}>
								<Text style={styles.header}>Jahr {year}</Text>
								<Feather
									name='compass'
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
							disabled={!hasNextClass()}
							style={{
								opacity: hasNextClass() ? 1 : 0,
							}}
							onPress={() => setSelectedClass(selectedClass + 1)}
						/>
					</View>
				</AnimatedPressable>
			</GestureDetector>
		</View>
	)
}

const stylesheet = createStyleSheet(theme => ({
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
		fontWeight: theme.fontWeights.thin,
		letterSpacing: -1.2,
		color: theme.colors.text2,
	},
	subHeader: {
		fontSize: theme.fontSizes['2xl'],
		letterSpacing: -1.2,
		color: theme.colors.mainText3,
		fontWeight: theme.fontWeights.bold,
	},
}))
