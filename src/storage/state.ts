import {
	configureObservablePersistence,
	persistObservable,
} from '@legendapp/state/persist'
import { ObservablePersistAsyncStorage } from '@legendapp/state/persist-plugins/async-storage'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { schools } from './grades'

// TODO: Adjust imports for persisting states
// This may have been renamed to sync for some reason
// at least in the current non-release version

// Global configuration
configureObservablePersistence({
	// Use AsyncStorage in React Native
	pluginLocal: ObservablePersistAsyncStorage,
	localOptions: {
		asyncStorage: {
			// The AsyncStorage plugin needs to be given the implementation of AsyncStorage
			AsyncStorage,
		},
	},
})

persistObservable(schools, { local: 'schools' })
