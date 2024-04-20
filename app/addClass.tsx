import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Text, View } from 'react-native'
import { createStyleSheet, useStyles } from 'react-native-unistyles'
import { z } from 'zod'

import ErrorText from '@/components/form/ErrorText'
import SubmitButton from '@/components/form/SubmitButton'
import TextInput from '@/components/form/TextInput'
import TextInputLabel from '@/components/form/TextInputLabel'

const formSchema = z.object({
	year: z.string().regex(/^\d+$/),
	type: z.literal('FOS'),
})

type FormData = {
	year: string
	type: 'FOS'
}

export default function AddClassScreen() {
	const { styles } = useStyles(stylesheet)

	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<FormData>({ resolver: zodResolver(formSchema) })

	const onSubmit = (data: FormData) => {
		console.log(data)
	}

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<Text style={styles.headerText}>New class</Text>
			</View>
			<View style={styles.formWrapper}>
				<View>
					<TextInputLabel>Year</TextInputLabel>
					<Controller
						control={control}
						rules={{
							required: true,
						}}
						name='year'
						render={({ field: { onChange, value } }) => (
							<TextInput
								placeholder='e.g. 10'
								onChangeText={onChange}
								value={value}
								inputMode='numeric'
								formState={{ error: errors.year }}
							/>
						)}
					/>
					{errors.year && (
						<ErrorText>The year is required and has to be a number.</ErrorText>
					)}
				</View>
				<SubmitButton onPress={handleSubmit(onSubmit)}>Add class</SubmitButton>
			</View>
		</View>
	)
}

const stylesheet = createStyleSheet(theme => ({
	container: {
		flex: 1,
		// alignItems: 'center',
		paddingHorizontal: theme.spacing['4xl'],
		paddingVertical: theme.spacing['4xl'],
		gap: theme.spacing['5xl'],
		backgroundColor: theme.colors.bg2,
	},
	header: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	headerText: {
		fontSize: theme.fontSizes['6xl'],
		lineHeight: theme.fontSizes['6xl'],
		fontWeight: theme.fontWeights.black,
		letterSpacing: -1.2,
		color: theme.colors.text4,
		textAlign: 'center',
	},
	formWrapper: {
		gap: theme.spacing['2xl'],
		flex: 2,
	},
	submitButton: {
		backgroundColor: theme.colors.mainBg3,
		paddingVertical: theme.spacing.xl,
		paddingHorizontal: theme.spacing['4xl'],
		marginTop: theme.spacing['2xl'],
		borderRadius: theme.spacing.sm,
		alignSelf: 'flex-start',
	},
	submitText: {
		fontWeight: theme.fontWeights.regular,
		fontSize: theme.fontSizes.xl,
		color: theme.colors.mainText2,
	},
}))
