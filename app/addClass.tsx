import { zodResolver } from '@hookform/resolvers/zod'
import { observer } from '@legendapp/state/react'
import { router } from 'expo-router'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Text, View } from 'react-native'
import { createStyleSheet, useStyles } from 'react-native-unistyles'
import { z } from 'zod'

import ClassTypeSelector from '@/components/ClassTypeSelector'
import ErrorText from '@/components/form/ErrorText'
import SubmitButton from '@/components/form/SubmitButton'
import TextInput from '@/components/form/TextInput'
import TextInputLabel from '@/components/form/TextInputLabel'
import { schools } from '@/storage/grades'
import { t } from '@/util/localization'

const formSchema = z.object({
	year: z.string().regex(/^\d+$/),
	type: z.literal('FOS'),
})

type FormData = {
	year: string
	type: 'FOS'
}

export default observer(AddClassScreen)

function AddClassScreen() {
	const { styles } = useStyles(stylesheet)

	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<FormData>({
		resolver: zodResolver(formSchema),
		defaultValues: { type: 'FOS' },
	})

	const onSubmit = (data: FormData) => {
		console.log(data)

		const newId = schools.amountOfClasses.get() + 1

		schools.addClass({
			id: newId,
			year: data.year,
			type: data.type,
			subjects: [],
		})

		// This shouldn't be necessary, but in case there's
		// some kind of deeplink in the future, ensure that we
		// navigate to the home screen correctly
		if (router.canGoBack()) {
			router.back()
		} else {
			router.replace('/(tabs)/')
		}
	}

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<Text style={styles.headerText}>{t('screen-new-class:new-class')}</Text>
			</View>
			<View style={styles.formWrapper}>
				<View>
					<TextInputLabel>{t('screen-new-class:year')}</TextInputLabel>
					<Controller
						control={control}
						rules={{
							required: true,
						}}
						name='year'
						render={({ field: { onChange, value } }) => (
							<TextInput
								placeholder={t('screen-new-class:year-placeholder')}
								onChangeText={onChange}
								value={value}
								inputMode='numeric'
								formState={{ error: errors.year }}
							/>
						)}
					/>
					{errors.year && (
						<ErrorText>{t('screen-new-class:year-error')}</ErrorText>
					)}
				</View>
				<View>
					<TextInputLabel>{t('screen-new-class:class-type')}</TextInputLabel>
					<Controller
						control={control}
						rules={{
							required: true,
						}}
						name='type'
						render={({ field: { onChange, value } }) => (
							<ClassTypeSelector onChange={onChange} value={value} />
						)}
					/>
				</View>
				<SubmitButton onPress={handleSubmit(onSubmit)}>
					{t('screen-new-subject:add-class')}
				</SubmitButton>
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
		backgroundColor: theme.colors.bg1,
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
