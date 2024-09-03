import ErrorText from '@/components/form/ErrorText'
import FormScreenContainer from '@/components/form/screen/FormScreenContainer'
import FormScreenForm from '@/components/form/screen/FormScreenForm'
import FormScreenHeader from '@/components/form/screen/FormScreenHeader'
import TextInput from '@/components/form/TextInput'
import TextInputLabel from '@/components/form/TextInputLabel'
import { t } from '@/i18n/util'
import { zodPointsSchema } from '@/modules/subject/components/AddGradeForm'
import { ScientificPaperType } from '@/storage/grades'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import { View } from 'react-native'
import { z } from 'zod'

const formSchema = z.object({
	title: z.string().min(1),
	points: zodPointsSchema,
})

type EditScientificPaperFormData = z.infer<typeof formSchema>

type EditScientificPaperFormProps = {
	onChangeTitle: (newTitle: string) => void
	onChangePoints: (newPoints: number) => void
	scientificPaper: ScientificPaperType
}

export default function EditScientificPaperForm({
	onChangeTitle,
	onChangePoints,
	scientificPaper,
}: EditScientificPaperFormProps) {
	const {
		control,
		formState: { errors },
	} = useForm<EditScientificPaperFormData>({
		mode: 'onChange',
		resolver: zodResolver(formSchema),
		defaultValues: {
			title: scientificPaper.title,
			points: scientificPaper.points.toString(),
		},
	})

	const handleChangePoints = (newPoints: string) => {
		onChangePoints(parseInt(newPoints))
	}

	const handleChangeTitle = (newTitle: string) => {
		onChangeTitle(newTitle)
	}

	return (
		<FormScreenContainer>
			<FormScreenHeader size='sm'>{scientificPaper.title}</FormScreenHeader>

			<FormScreenForm>
				<View>
					<TextInputLabel>{t('screen-scientific-paper:title')}</TextInputLabel>
					<Controller
						control={control}
						rules={{
							required: true,
							onChange: (event: any) =>
								event.target.value !== '' &&
								handleChangeTitle(event.target.value),
						}}
						name='title'
						render={({ field: { onChange, value } }) => (
							<TextInput
								formState={{ error: errors.title }}
								onChangeText={onChange}
								value={value}
								placeholder={t(
									'screen-scientific-paper:form-title-placeholder',
								)}
								inputMode='text'
								multiline
							/>
						)}
					/>
					{errors.title && (
						<ErrorText>
							{t('screen-scientific-paper:form-title-error-message')}
						</ErrorText>
					)}
				</View>
				<View>
					<TextInputLabel>{t('screen-scientific-paper:points')}</TextInputLabel>
					<Controller
						control={control}
						rules={{
							required: true,
							onChange: (event: any) =>
								event.target.value !== '' &&
								handleChangePoints(event.target.value),
						}}
						name='points'
						render={({ field: { onChange, value } }) => (
							<TextInput
								formState={{ error: errors.points }}
								onChangeText={onChange}
								value={value}
								placeholder={t(
									'screen-scientific-paper:form-points-placeholder',
								)}
								inputMode='numeric'
							/>
						)}
					/>
					{errors.points && (
						<ErrorText>
							{t('screen-scientific-paper:form-points-error-message')}
						</ErrorText>
					)}
				</View>
			</FormScreenForm>
		</FormScreenContainer>
	)
}
