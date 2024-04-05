import { Feather, MaterialCommunityIcons } from '@expo/vector-icons'
import { Link, Tabs } from 'expo-router'
import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useStyles } from 'react-native-unistyles'

import { useClientOnlyValue } from '@/components/useClientOnlyValue'

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
	name: React.ComponentProps<typeof MaterialCommunityIcons>['name']
	color: string
}) {
	return (
		<MaterialCommunityIcons size={28} style={{ marginBottom: -3 }} {...props} />
	)
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
					title: 'Grades',
					tabBarIcon: ({ color }) => (
						<TabBarIcon name='notebook-edit' color={color} />
					),
					headerRight: () => (
						<Link href='/settings' asChild>
							<TouchableOpacity activeOpacity={0.5}>
								<Feather
									name='settings'
									size={25}
									color={theme.colors.text1}
									style={{ marginRight: theme.spacing['2xl'] }}
								/>
							</TouchableOpacity>
						</Link>
					),
				}}
			/>
			<Tabs.Screen
				name='calendar'
				options={{
					title: 'Calendar',
					tabBarIcon: ({ color }) => (
						<TabBarIcon name='calendar-month' color={color} />
					),
				}}
			/>
		</Tabs>
	)
}
