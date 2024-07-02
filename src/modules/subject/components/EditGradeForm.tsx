import DeleteButton from '@/components/form/DeleteButton'
import ErrorText from '@/components/form/ErrorText'
import TextInput from '@/components/form/TextInput'
import TextInputLabel from '@/components/form/TextInputLabel'
import { t } from '@/i18n/util'
import { SingleGradeType } from '@/storage/grades'
import { zodResolver } from '@hookform/resolvers/zod'
import { observer } from '@legendapp/state/react'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Text, View } from 'react-native'
import { createStyleSheet, useStyles } from 'react-native-unistyles'
import { z } from 'zod'
import { zodPointsSchema } from './AddGradeForm'

const formSchema = z.object({
	points: zodPointsSchema,
})

type FormData = z.infer<typeof formSchema>

type EditGradeFormProps = {
	currentGrade: SingleGradeType
	onChangePoints: (newPoints: number) => void
	onDelete: () => void
}

export default observer(EditGradeForm)

function EditGradeForm({
	currentGrade,
	onChangePoints,
	onDelete,
}: EditGradeFormProps) {
	const { styles } = useStyles(stylesheet)

	const {
		control,
		formState: { errors },
	} = useForm<FormData>({
		mode: 'onChange',
		resolver: zodResolver(formSchema),
		defaultValues: { points: currentGrade.points.toString() },
	})

	const handleChange = (newPoints: string) => {
		onChangePoints(parseInt(newPoints))
	}

	const handleDelete = () => {
		onDelete()
	}

	return (
		<View style={styles.container}>
			<Text style={styles.header}>Edit Grade</Text>
			<View>
				<TextInputLabel>Points</TextInputLabel>
				<Controller
					control={control}
					rules={{
						required: true,
						onChange: (event: any) => handleChange(event.target.value),
					}}
					name='points'
					render={({ field: { onChange, value } }) => (
						<TextInput
							formState={{ error: errors.points }}
							onChangeText={onChange}
							value={value}
							placeholder={t('screen-subject:form-points-placeholder')}
							inputMode='numeric'
						/>
					)}
				/>
				{errors.points && (
					<ErrorText>{t('screen-subject:form-points-error-message')}</ErrorText>
				)}
			</View>

			<DeleteButton onPress={handleDelete}>Delete Grade</DeleteButton>
		</View>
	)
}

const stylesheet = createStyleSheet(theme => ({
	container: {
		paddingTop: theme.spacing['3xl'],
		paddingBottom: theme.spacing['6xl'],
		paddingHorizontal: theme.spacing['5xl'],
		gap: theme.spacing['3xl'],
	},
	header: {
		color: theme.colors.text2,
		fontSize: theme.fontSizes.xl,
		fontWeight: '700',
	},
}))
