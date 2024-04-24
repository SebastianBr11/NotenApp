import { router, useLocalSearchParams } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { Controller, useForm } from 'react-hook-form'
import { Platform, Text, View } from 'react-native'
import { createStyleSheet, useStyles } from 'react-native-unistyles'

import ErrorText from '@/components/form/ErrorText'
import SubmitButton from '@/components/form/SubmitButton'
import TextInput from '@/components/form/TextInput'
import TextInputLabel from '@/components/form/TextInputLabel'
import { schools } from '@/storage/grades'
import { t } from '@/util/localization'

type FormData = {
	subjectName: string
}

export default function AddSubjectScreen() {
	const { styles, theme } = useStyles(stylesheet)
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

		schools.classes[Number(classNumber)].subjects.push({
			id: newId,
			name: data.subjectName,
			semesters: [{ singleGrades: [] }, { singleGrades: [] }],
		})

		router.replace(`/subjects/${newId}?selectedClass=${classNumber}`)
	}

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<Text style={styles.headerTitle}>
					{t('screen-new-subject:new-subject')}
				</Text>
			</View>
			<View style={styles.formWrapper}>
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
			</View>
			{/* Use a light status bar on iOS to account for the black space above the modal */}
			<StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
		</View>
	)
}

const stylesheet = createStyleSheet(theme => ({
	container: {
		flex: 1,
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
	headerTitle: {
		fontSize: theme.fontSizes['5xl'],
		fontWeight: theme.fontWeights.bold,
		color: theme.colors.text4,
		letterSpacing: -1,
	},

	formWrapper: {
		gap: theme.spacing['2xl'],
		flex: 2,
	},
}))
