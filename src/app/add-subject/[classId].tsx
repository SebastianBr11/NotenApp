import { router, useLocalSearchParams } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { Platform } from 'react-native'

import AddSubjectForm from '@/modules/add-subject/AddSubjectForm'

export default function AddSubjectScreen() {
	const { classId } = useLocalSearchParams()

	const redirectToSubjectScreen = (newId: string) => {
		router.replace(`/subjects/${newId}`)
	}

	return (
		<>
			<AddSubjectForm
				classId={classId + ''}
				onAddSubject={redirectToSubjectScreen}
			/>

			{/* Use a light status bar on iOS to account for the black space above the modal */}
			<StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
		</>
	)
}
