import ErrorText from '@/components/form/ErrorText'
import SubmitButton from '@/components/form/SubmitButton'
import TextInput from '@/components/form/TextInput'
import TextInputLabel from '@/components/form/TextInputLabel'
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
		getValues,
	} = useForm<FormData>({
		resolver: zodResolver(formSchema),
		defaultValues: { type: 'Schulaufgabe', semester: 1 },
	})

	console.log(getValues())

	return (
		<View style={styles.container}>
			<Text style={styles.header}>Add Grade</Text>

			<View>
				<TextInputLabel>Type</TextInputLabel>
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
				<TextInputLabel>Points</TextInputLabel>
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
							placeholder='z. B. 15'
							inputMode='numeric'
						/>
					)}
				/>
				{errors.points && (
					<ErrorText>Points must be a number between 0 and 15</ErrorText>
				)}
			</View>

			<View>
				<TextInputLabel>Semester</TextInputLabel>
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

			<SubmitButton onPress={handleSubmit(onSubmit)}>Add Grade</SubmitButton>
		</View>
	)
}

const stylesheet = createStyleSheet(theme => ({
	container: {
		flex: 1,
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
