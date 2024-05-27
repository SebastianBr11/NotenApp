import '@/constants/unistyles'
import { t } from '@/i18n/util'
import '@/storage/state'
import Feather from '@expo/vector-icons/Feather'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import * as Font from 'expo-font'
import { Stack } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import { useCallback, useEffect, useState } from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { useStyles } from 'react-native-unistyles'

export {
	// Catch any errors thrown by the Layout component.
	ErrorBoundary,
} from 'expo-router'

export const unstable_settings = {
	// Ensure that reloading on `/modal` keeps a back button present.
	initialRouteName: '(tabs)',
}

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
	const [appIsReady, setAppIsReady] = useState(false)

	useEffect(() => {
		async function prepare() {
			try {
				// Pre-load fonts, make any API calls you need to do here
				await Font.loadAsync(Feather.font)
				await Font.loadAsync(MaterialCommunityIcons.font)

				// Setup state persistence
				// TODO: Switch to MMKV since it doesn't have an
				// asynchronous API and this Promise never gets resolved:
				// await when(status$.isPersistLoaded)
			} catch (e) {
				console.warn(e)
			} finally {
				// Tell the application to render
				setAppIsReady(true)
			}
		}

		prepare()
	}, [])

	const onLayoutRootView = useCallback(async () => {
		if (appIsReady) {
			// This tells the splash screen to hide immediately! If we call this after
			// `setAppIsReady`, then we may see a blank screen while the app is
			// loading its initial state and rendering its first pixels. So instead,
			// we hide the splash screen once we know the root view has already
			// performed layout.
			await SplashScreen.hideAsync()
		}
	}, [appIsReady])

	if (!appIsReady) {
		return null
	}

	return <RootLayoutNav onLayout={onLayoutRootView} />
}

function RootLayoutNav({ onLayout }: { onLayout: () => void }) {
	const { theme } = useStyles()

	return (
		<GestureHandlerRootView onLayout={onLayout} style={{ flex: 1 }}>
			<BottomSheetModalProvider>
				<Stack
					screenOptions={{
						headerStyle: {
							backgroundColor: theme.colors.bg1,
						},
						headerTintColor: theme.colors.text1,
						animation: 'ios',
						headerShadowVisible: false,
					}}
				>
					<Stack.Screen
						name='(tabs)'
						options={{
							headerShown: false,
						}}
					/>
					<Stack.Screen
						name='settings'
						options={{
							headerTitle: t('screen-settings'),
							presentation: 'modal',
						}}
					/>
					<Stack.Screen
						name='add-subject/[classNumber]'
						options={{
							headerTitle: t('screen-new-subject'),
							presentation: 'modal',
						}}
					/>
					<Stack.Screen
						name='add-class'
						options={{
							headerTitle: t('screen-new-class'),
						}}
					/>
				</Stack>
			</BottomSheetModalProvider>
		</GestureHandlerRootView>
	)
}
