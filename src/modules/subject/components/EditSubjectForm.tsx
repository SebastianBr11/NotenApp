import ErrorText from '@/components/form/ErrorText'
import FormScreenContainer from '@/components/form/screen/FormScreenContainer'
import FormScreenForm from '@/components/form/screen/FormScreenForm'
import FormScreenHeader from '@/components/form/screen/FormScreenHeader'
import SubmitButton from '@/components/form/SubmitButton'
import TextInput from '@/components/form/TextInput'
import TextInputLabel from '@/components/form/TextInputLabel'
import { t } from '@/i18n/util'
import grades$ from '@/storage/grades'
import { Controller, useForm } from 'react-hook-form'
import { View } from 'react-native'

type EditSubjectFormData = {
	subjectName: string
}

type EditSubjectFormProps = {
	subjectId: string
	onEditSubject: () => void
}

export default function EditSubjectForm({
	subjectId,
	onEditSubject,
}: EditSubjectFormProps) {
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<EditSubjectFormData>({})

	const changeSubjectName = (data: EditSubjectFormData) => {
		grades$.updateSubject(subjectId, { name: data.subjectName })

		onEditSubject()
	}

	return (
		<FormScreenContainer>
			<FormScreenHeader>
				{t('screen-edit-subject:edit-subject')}
			</FormScreenHeader>

			<FormScreenForm>
				<View>
					<TextInputLabel>
						{t('screen-edit-subject:subject-name')}
					</TextInputLabel>
					<Controller
						control={control}
						rules={{ required: true }}
						name='subjectName'
						render={({ field: { onChange, value } }) => (
							<TextInput
								value={value}
								onChangeText={onChange}
								formState={{ error: errors.subjectName }}
							/>
						)}
					/>
					{errors.subjectName && (
						<ErrorText>{t('screen-edit-subject:name-error')}</ErrorText>
					)}
				</View>
				<SubmitButton onPress={handleSubmit(changeSubjectName)}>
					{t('screen-edit-subject:change-subject-name')}
				</SubmitButton>
			</FormScreenForm>
		</FormScreenContainer>
	)
}
