import { router, useLocalSearchParams } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { Controller, useForm } from 'react-hook-form'
import { Platform, View } from 'react-native'
import { createStyleSheet } from 'react-native-unistyles'

import ErrorText from '@/components/form/ErrorText'
import SubmitButton from '@/components/form/SubmitButton'
import TextInput from '@/components/form/TextInput'
import TextInputLabel from '@/components/form/TextInputLabel'
import FormScreen, {
	FormScreenForm,
	FormScreenHeader,
} from '@/components/form/screen'
import { t } from '@/i18n/util'
import { schools } from '@/storage/grades'

type FormData = {
	subjectName: string
}

export default function AddSubjectScreen() {
	const { classNumber } = useLocalSearchParams()

	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<FormData>({
		defaultValues: {
			subjectName: '',
		},
	})

	const onSubmit = (data: FormData) => {
		console.log(data)

		const newId = schools.amountOfSubjects.get() + 1

		schools.addSubject(Number(classNumber), {
			id: newId,
			name: data.subjectName,
			semesters: [{ secondaryGrades: [] }, { secondaryGrades: [] }],
		})

		router.replace(`/subjects/${newId}?selectedClass=${classNumber}`)
	}

	return (
		<FormScreen>
			<FormScreenHeader>{t('screen-new-subject:new-subject')}</FormScreenHeader>

			<FormScreenForm>
				<View>
					<TextInputLabel>
						{t('screen-new-subject:subject-name')}
					</TextInputLabel>
					<Controller
						control={control}
						rules={{ required: true }}
						name='subjectName'
						render={({ field: { onChange, onBlur, value } }) => (
							<TextInput
								placeholder={t('screen-new-subject:subject-name-placeholder')}
								onBlur={onBlur}
								onChangeText={onChange}
								value={value}
								formState={{ error: errors.subjectName }}
							/>
						)}
					/>
					{errors.subjectName && (
						<ErrorText>{t('screen-new-subject:subject-name-error')}</ErrorText>
					)}
				</View>

				<SubmitButton onPress={handleSubmit(onSubmit)}>
					{t('screen-new-subject:add-subject')}
				</SubmitButton>
			</FormScreenForm>
			{/* Use a light status bar on iOS to account for the black space above the modal */}
			<StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
		</FormScreen>
	)
}

const stylesheet = createStyleSheet(theme => ({}))
