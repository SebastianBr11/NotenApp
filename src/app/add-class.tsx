import { router } from 'expo-router'
import React from 'react'

import AddClassForm from '@/modules/add-class/components/AddClassForm'

export default function AddClassScreen() {
	const redirectToHomeScreen = () => {
		// This shouldn't be necessary, but in case there's
		// some kind of deeplink in the future, ensure that we
		// navigate to the home screen correctly
		if (router.canGoBack()) {
			router.back()
		} else {
			router.replace('/')
		}
	}

	return <AddClassForm onAddClass={redirectToHomeScreen} />
}
