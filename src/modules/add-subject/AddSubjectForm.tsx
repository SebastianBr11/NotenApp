import ErrorText from '@/components/form/ErrorText'
import FormScreen, {
	FormScreenForm,
	FormScreenHeader,
} from '@/components/form/screen'
import SubmitButton from '@/components/form/SubmitButton'
import TextInput from '@/components/form/TextInput'
import TextInputLabel from '@/components/form/TextInputLabel'
import { t } from '@/i18n/util'
import grades$ from '@/storage/grades'
import { Controller, useForm } from 'react-hook-form'
import { View } from 'react-native'

type SubjectFormData = {
	subjectName: string
}

type AddSubjectFormProps = {
	classId: string
	onAddSubject: (newId: string) => void
}

export default function AddSubjectForm({
	classId,
	onAddSubject,
}: AddSubjectFormProps) {
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<SubjectFormData>({
		defaultValues: {
			subjectName: '',
		},
	})

	const addSubject = (data: SubjectFormData) => {
		const newId = grades$.addSubject(classId, {
			name: data.subjectName,
			semesters: [{ secondaryGrades: [] }, { secondaryGrades: [] }],
		})

		onAddSubject(newId)
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

				<SubmitButton onPress={handleSubmit(addSubject)}>
					{t('screen-new-subject:add-subject')}
				</SubmitButton>
			</FormScreenForm>
		</FormScreen>
	)
}
