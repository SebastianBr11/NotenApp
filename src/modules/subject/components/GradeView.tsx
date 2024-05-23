import React from 'react'
import { Pressable, PressableStateCallbackType, Text, View } from 'react-native'
import { createStyleSheet, useStyles } from 'react-native-unistyles'

import TextInputLabel from '@/components/form/TextInputLabel'
import { ifDarkElse } from '@/constants/themes'
import { useSetupBottomSheetModal } from '@/hooks/useSetupBottomSheetModal'
import { SingleGradeType } from '@/storage/grades'
import { Feather } from '@expo/vector-icons'
import { BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet'

type GradeViewType = {
	singleGrade: SingleGradeType
}

export default function GradeView({ singleGrade }: GradeViewType) {
	const { styles, theme } = useStyles(stylesheet)

	const { bottomSheetModalRef, handlePresentModalPress, handleSheetChanges } =
		useSetupBottomSheetModal()

	const handlePress = () => {
		handlePresentModalPress()
	}

	return (
		<>
			<Pressable onPress={handlePress} style={styles.container}>
				<View style={styles.typeWrapper}>
					<Text style={styles.gradeTypeText}>{singleGrade.type}</Text>
					<Feather
						name='edit'
						size={theme.spacing['2xl']}
						color={theme.colors.text5}
					/>
				</View>
				<Text style={styles.pointsText}>{singleGrade.points}</Text>
			</Pressable>
			<BottomSheetModal
				ref={bottomSheetModalRef}
				enableDynamicSizing
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
					<Text>hi</Text>
					<TextInputLabel>Points</TextInputLabel>
					{/* <TextInput value={singleGrade.points} /> */}
				</BottomSheetView>
			</BottomSheetModal>
		</>
	)
}

const stylesheet = createStyleSheet(theme => ({
	container: ({ pressed }: PressableStateCallbackType) => ({
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		backgroundColor: pressed ? theme.colors.bg3 : theme.colors.bg2,
		paddingVertical: theme.spacing['3xl'],
		paddingHorizontal: 2 * theme.spacing['3xl'],
		borderRadius: theme.spacing['4xl'],
		borderColor: ifDarkElse(
			theme,
			theme.colors.main[800],
			theme.colors.main[300],
		),
		borderWidth: 1,
	}),
	typeWrapper: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: theme.spacing.xl,
	},
	gradeTypeText: {
		fontSize: theme.fontSizes['xl'],
		color: theme.colors.text4,
		fontWeight: theme.fontWeights.regular,
	},
	pointsText: {
		fontSize: theme.fontSizes.lg,
		color: theme.colors.text3,
		fontWeight: theme.fontWeights.black,
	},
}))
