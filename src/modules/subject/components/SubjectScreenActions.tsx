import { Feather } from '@expo/vector-icons'
import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import { createStyleSheet, useStyles } from 'react-native-unistyles'

type SubjectScreenActionsProps = {
	onEdit: () => void
	onDelete: () => void
}

export default function SubjectScreenActions({
	onEdit,
	onDelete,
}: SubjectScreenActionsProps) {
	const { styles, theme } = useStyles(stylesheet)

	return (
		<View style={styles.container}>
			<TouchableOpacity onPress={onDelete} activeOpacity={0.5}>
				<Feather
					name='trash-2'
					size={25}
					color='red'
					style={{ marginRight: theme.spacing['2xl'] }}
				/>
			</TouchableOpacity>
			<TouchableOpacity onPress={onEdit} activeOpacity={0.5}>
				<Feather
					name='edit-3'
					size={25}
					color={theme.colors.text1}
					style={{ marginRight: theme.spacing['2xl'] }}
				/>
			</TouchableOpacity>
		</View>
	)
}

const stylesheet = createStyleSheet(theme => ({
	container: {
		flexDirection: 'row',
		gap: theme.spacing.md,
	},
}))
