import FontAwesome from '@expo/vector-icons/FontAwesome'
import { Link, Tabs } from 'expo-router'
import React from 'react'
import { Pressable } from 'react-native'

import { useClientOnlyValue } from '@/components/useClientOnlyValue'
import { useStyles } from 'react-native-unistyles'

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
	name: React.ComponentProps<typeof FontAwesome>['name']
	color: string
}) {
	return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />
}

export default function TabLayout() {
	const { theme } = useStyles()

	return (
		<Tabs
			screenOptions={{
				tabBarActiveTintColor: theme.colors.mainText4,
				// Disable the static render of the header on web
				// to prevent a hydration error in React Navigation v6.
				headerShown: useClientOnlyValue(false, true),
				headerStyle: {
					backgroundColor: theme.colors.bg1,
					elevation: 0,
				},
				headerTintColor: theme.colors.text1,
				tabBarStyle: {
					backgroundColor: theme.colors.bg1,
					borderTopWidth: 0,
					elevation: 0,
				},
			}}
		>
			<Tabs.Screen
				name='index'
				options={{
					title: 'Tab One',
					tabBarIcon: ({ color }) => <TabBarIcon name='code' color={color} />,
					headerRight: () => (
						<Link href='/modal' asChild>
							<Pressable>
								{({ pressed }) => (
									<FontAwesome
										name='info-circle'
										size={25}
										color={theme.colors.text1}
										style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
									/>
								)}
							</Pressable>
						</Link>
					),
				}}
			/>
			<Tabs.Screen
				name='two'
				options={{
					title: 'Tab Two',
					tabBarIcon: ({ color }) => <TabBarIcon name='code' color={color} />,
				}}
			/>
		</Tabs>
	)
}
