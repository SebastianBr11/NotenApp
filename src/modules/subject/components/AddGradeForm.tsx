import ErrorText from '@/components/form/ErrorText'
import SubmitButton from '@/components/form/SubmitButton'
import TextInput from '@/components/form/TextInput'
import TextInputLabel from '@/components/form/TextInputLabel'
import { t } from '@/i18n/util'
import { SingleGradeType } from '@/storage/grades'
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Text, View } from 'react-native'
import { createStyleSheet, useStyles } from 'react-native-unistyles'
import { z } from 'zod'
import GradeTypeSelector from './GradeTypeSelector'
import SemesterSelector from './SemesterSelector'

const formSchema = z.object({
	points: z.string().regex(/^([0-9]|1[0-5])$/),
	type: z
		.literal('Schulaufgabe')
		.or(z.literal('Mündlich'))
		.or(z.literal('Kurzarbeit')),
	semester: z.literal(1).or(z.literal(2)),
})

export type FormData = {
	points: string
	type: SingleGradeType['type']
	semester: 1 | 2
}

type AddGradeFormProps = {
	onSubmit: (data: FormData) => void
}

export default function AddGradeForm({ onSubmit }: AddGradeFormProps) {
	const { styles } = useStyles(stylesheet)

	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<FormData>({
		resolver: zodResolver(formSchema),
		defaultValues: { type: 'Schulaufgabe', semester: 1 },
	})

	return (
		<View style={styles.container}>
			<Text style={styles.header}>{t('screen-subject:add-grade')}</Text>

			<View>
				<TextInputLabel>{t('screen-subject:form-grade-type')}</TextInputLabel>
				<Controller
					control={control}
					rules={{
						required: true,
					}}
					name='type'
					render={({ field: { onChange, value } }) => (
						<GradeTypeSelector onChange={onChange} value={value} />
					)}
				/>
			</View>
			<View>
				<TextInputLabel>{t('screen-subject:form-points')}</TextInputLabel>
				<Controller
					control={control}
					rules={{
						required: true,
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

			<View>
				<TextInputLabel>{t('screen-subject:form-semester')}</TextInputLabel>
				<Controller
					control={control}
					rules={{
						required: true,
					}}
					name='semester'
					render={({ field: { onChange, value } }) => (
						<SemesterSelector onChange={onChange} value={value} />
					)}
				/>
			</View>

			<SubmitButton onPress={handleSubmit(onSubmit)}>
				{t('screen-subject:add-grade')}
			</SubmitButton>
		</View>
	)
}

const stylesheet = createStyleSheet(theme => ({
	container: {
		paddingVertical: theme.spacing['4xl'],
		paddingHorizontal: theme.spacing['5xl'],
		gap: theme.spacing['3xl'],
	},
	header: {
		color: theme.colors.text2,
		fontSize: theme.fontSizes.xl,
		fontWeight: '700',
	},
}))
