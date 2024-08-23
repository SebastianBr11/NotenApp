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
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import { View } from 'react-native'
import { z } from 'zod'
import ClassTypeSelector from './ClassTypeSelector'

const formSchema = z.object({
	year: z.string().regex(/^\d+$/),
	type: z.literal('FOS'),
})

type ClassFormData = {
	year: string
	type: 'FOS'
}

type AddClassFormProps = {
	onAddClass: (classId: string) => void
}

export default function AddClassForm({ onAddClass }: AddClassFormProps) {
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<ClassFormData>({
		resolver: zodResolver(formSchema),
		defaultValues: { type: 'FOS' },
	})

	const addClass = (data: ClassFormData) => {
		const classId = grades$.addClass({
			year: data.year,
			type: data.type,
			subjects: [],
		})

		onAddClass(classId)
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
				<SubmitButton onPress={handleSubmit(addClass)}>
					{t('screen-new-subject:add-class')}
				</SubmitButton>
			</FormScreenForm>
		</FormScreen>
	)
}
