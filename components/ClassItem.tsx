import { MaterialIcons } from '@expo/vector-icons'
import { useBottomSheetModal } from '@gorhom/bottom-sheet'
import React from 'react'
import { Text } from 'react-native'
import { OpacityDecorator } from 'react-native-draggable-flatlist'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { createStyleSheet, useStyles } from 'react-native-unistyles'

import { GradesType, lastUsedClass } from '@/storage/grades'

type ClassItemProps = {
	item: GradesType['classes'][0]
	drag: () => void
	isActive: boolean
	getIndex: () => number | undefined
}

export default function ClassItem({
	item,
	drag,
	isActive,
	getIndex,
}: ClassItemProps) {
	const { styles, theme } = useStyles(stylesheet)

	const { dismissAll } = useBottomSheetModal()

	const onPress = () => {
		dismissAll()
		lastUsedClass.set(getIndex())
	}

	return (
		<OpacityDecorator>
			<TouchableOpacity
				delayLongPress={200}
				onLongPress={drag}
				style={styles.container}
				activeOpacity={0.7}
				onPress={onPress}
			>
				<MaterialIcons
					name='drag-indicator'
					color={theme.colors.text6}
					size={24}
					style={styles.icon}
				/>
				<Text style={styles.text}>Jahr {item.year}</Text>
			</TouchableOpacity>
		</OpacityDecorator>
	)
}

const stylesheet = createStyleSheet(theme => ({
	container: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		padding: theme.spacing['3xl'],
		backgroundColor: theme.colors.bg3,
		borderRadius: theme.spacing.lg,
		position: 'relative',
	},
	icon: {
		position: 'absolute',
		left: theme.spacing['3xl'],
	},
	text: {
		color: theme.colors.text2,
		fontSize: theme.fontSizes.xl,
	},
}))
