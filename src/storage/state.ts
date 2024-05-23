import { ObservablePersistAsyncStorage } from '@legendapp/state/persist-plugins/async-storage'
import { configureObservableSync, syncObservable } from '@legendapp/state/sync'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { schools } from './grades'

// TODO: Adjust imports for persisting states
// This may have been renamed to sync for some reason
// at least in the current non-release version

// Global configuration
configureObservableSync({
	// Use AsyncStorage in React Native
	persist: {
		plugin: ObservablePersistAsyncStorage,
		asyncStorage: { AsyncStorage },
	},
})

const status$ = syncObservable(schools, {
	persist: {
		name: 'schools',
	},
})

// await when(status$.isPersistLoaded)
