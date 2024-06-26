import { ObservablePersistMMKV } from '@legendapp/state/persist-plugins/mmkv'
import { configureObservableSync, syncObservable } from '@legendapp/state/sync'
import grades from './grades'

// Global configuration
configureObservableSync({
	// Use react-native-mmkv in React Native
	persist: {
		plugin: ObservablePersistMMKV,
	},
})

syncObservable(grades, {
	persist: {
		name: 'grades',
	},
})
