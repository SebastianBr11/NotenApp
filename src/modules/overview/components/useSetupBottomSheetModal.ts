import { BottomSheetModal, BottomSheetModalProps } from '@gorhom/bottom-sheet'
import { useFocusEffect } from 'expo-router'
import { useCallback, useRef, useState } from 'react'
import { BackHandler } from 'react-native'

type UseSetupBottomSheetModalProps = {
	snapPoints?: BottomSheetModalProps['snapPoints']
}

export const useSetupBottomSheetModal = (
	{ snapPoints }: UseSetupBottomSheetModalProps = {
		snapPoints: ['35%', '45%'],
	},
) => {
	const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false)

	const bottomSheetModalRef = useRef<BottomSheetModal>(null)

	const handlePresentModalPress = useCallback(() => {
		bottomSheetModalRef.current?.present()
	}, [])
	const handleSheetChanges = useCallback((index: number) => {
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

	return {
		bottomSheetModalRef,
		handlePresentModalPress,
		handleSheetChanges,
		snapPoints,
	}
}
