import { Feather } from '@expo/vector-icons'
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

import { GradesType } from '@/storage/grades'

const AnimatedPressable = Animated.createAnimatedComponent(Pressable)

type SchoolClassSelectorProps = {
	onPress: () => void
	selectedClass: number
	setSelectedClass: (selectedClass: number) => void
	hasNextClass: (selectedClass?: number) => boolean
	hasPreviousClass: () => boolean
	numOfClasses: number
	class: { year: number; type: GradesType['classes']['0']['type'] }
}

export default function SchoolClassSelector({
	onPress: handlePresentModalPress,
	selectedClass,
	setSelectedClass,
	hasNextClass,
	hasPreviousClass,
	numOfClasses,
	class: { year, type },
}: SchoolClassSelectorProps) {
	const { styles, theme } = useStyles(stylesheet)

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
							style={{ opacity: hasPreviousClass() ? 1 : 0 }}
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
							style={{
								opacity: hasNextClass() ? 1 : 0,
							}}
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
}))
