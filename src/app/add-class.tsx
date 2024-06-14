import { zodResolver } from '@hookform/resolvers/zod'
import { router } from 'expo-router'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { View } from 'react-native'
import { createStyleSheet, useStyles } from 'react-native-unistyles'
import { z } from 'zod'

import ErrorText from '@/components/form/ErrorText'
import SubmitButton from '@/components/form/SubmitButton'
import TextInput from '@/components/form/TextInput'
import TextInputLabel from '@/components/form/TextInputLabel'
import FormScreen, {
	FormScreenForm,
	FormScreenHeader,
} from '@/components/form/screen'
import { t } from '@/i18n/util'
import ClassTypeSelector from '@/modules/add-class/components/ClassTypeSelector'
import grades from '@/storage/grades'
import { observer } from '@legendapp/state/react'

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
		grades.addClass({
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
		<FormScreen>
			<FormScreenHeader>{t('screen-new-class:new-class')}</FormScreenHeader>

			<FormScreenForm>
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
			</FormScreenForm>
		</FormScreen>
	)
}

const stylesheet = createStyleSheet(theme => ({}))
