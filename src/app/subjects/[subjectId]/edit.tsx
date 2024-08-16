import EditSubjectForm from '@/modules/subject/components/EditSubjectForm'
import grades$ from '@/storage/grades'
import { router, Stack, useLocalSearchParams } from 'expo-router'
export default function EditSubjectScreen() {
	const { subjectId } = useLocalSearchParams()

	const subjectName = grades$.findSubject(subjectId + '')?.name

	const redirectToSubjectScreen = () => {
		router.replace(`/subjects/${subjectId}`)
	}

	return (
		<>
			<Stack.Screen
				options={{
					headerTitle: subjectName?.get(),
				}}
			/>
			<EditSubjectForm
				subjectId={subjectId + ''}
				onEditSubject={redirectToSubjectScreen}
			/>
		</>
	)
}
