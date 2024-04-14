import { router, useLocalSearchParams } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { Controller, useForm } from 'react-hook-form'
import { Platform, Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { createStyleSheet, useStyles } from 'react-native-unistyles'

import TextInput from '@/components/form/TextInput'
import TextInputLabel from '@/components/form/TextInputLabel'
import { schools } from '@/storage/grades'

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
				<Text style={styles.headerTitle}>New Subject</Text>
			</View>
			<View style={styles.formWrapper}>
				<View>
					<TextInputLabel>Subject Name</TextInputLabel>
					<Controller
						control={control}
						rules={{ required: true }}
						name='subjectName'
						render={({ field: { onChange, onBlur, value } }) => (
							<TextInput
								placeholder='e.g. German'
								onBlur={onBlur}
								onChangeText={onChange}
								value={value}
								formState={{ error: errors.subjectName }}
							/>
						)}
					/>
					{errors.subjectName && (
						<Text style={styles.errorMessage}>
							The subject name is required.
						</Text>
					)}
				</View>

				<TouchableOpacity
					style={styles.submitButton}
					onPress={handleSubmit(onSubmit)}
					activeOpacity={0.5}
				>
					<Text style={styles.submitText}>Add subject</Text>
				</TouchableOpacity>
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
	errorMessage: {
		color: 'red',
		marginLeft: theme.spacing.md,
		marginTop: theme.spacing.md,
	},
	submitButton: {
		backgroundColor: theme.colors.mainBg3,
		paddingVertical: theme.spacing.xl,
		paddingHorizontal: theme.spacing['4xl'],
		marginTop: theme.spacing['2xl'],
		borderRadius: theme.spacing['2xl'],
		alignSelf: 'flex-start',
	},
	submitText: {
		fontWeight: theme.fontWeights.regular,
		fontSize: theme.fontSizes.xl,
		color: theme.colors.mainText2,
	},
}))
