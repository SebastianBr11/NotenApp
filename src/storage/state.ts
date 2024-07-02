import { IS_DEV } from '@/constants/isDev'
import { ObservablePersistMMKV } from '@legendapp/state/persist-plugins/mmkv'
import { configureObservableSync, syncObservable } from '@legendapp/state/sync'
import grades$ from './grades'

// Only enable state persistence in development
if (!IS_DEV) {
	// Global configuration
	configureObservableSync({
		// Use react-native-mmkv in React Native
		persist: {
			plugin: ObservablePersistMMKV,
		},
	})

	syncObservable(grades$, {
		persist: {
			name: 'grades',
		},
	})
}
