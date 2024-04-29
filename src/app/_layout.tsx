import '@/constants/unistyles'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import { useFonts } from 'expo-font'
import { Stack } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import { useEffect } from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { useStyles } from 'react-native-unistyles'

import { t } from '@/util/localization'

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
	const [loaded, error] = useFonts({
		SpaceMono: require('../../assets/fonts/SpaceMono-Regular.ttf'),
		...FontAwesome.font,
	})

	// Expo Router uses Error Boundaries to catch errors in the navigation tree.
	useEffect(() => {
		if (error) throw error
	}, [error])

	useEffect(() => {
		if (loaded) {
			SplashScreen.hideAsync()
		}
	}, [loaded])

	if (!loaded) {
		return null
	}

	return <RootLayoutNav />
}

function RootLayoutNav() {
	const { theme } = useStyles()

	return (
		<GestureHandlerRootView style={{ flex: 1 }}>
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
