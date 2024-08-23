import { router } from 'expo-router'
import React from 'react'

import AddClassForm from '@/modules/add-class/components/AddClassForm'
import grades$ from '@/storage/grades'

export default function AddClassScreen() {
	const redirectToHomeScreen = (classId: string) => {
		// This shouldn't be necessary, but in case there's
		// some kind of deeplink in the future, ensure that we
		// navigate to the home screen correctly
		grades$.lastUsedClass$.setFromId(classId)
		if (router.canGoBack()) {
			router.back()
		} else {
			router.replace('/')
		}
	}

	return <AddClassForm onAddClass={redirectToHomeScreen} />
}
