const IS_DEV = process.env.APP_VARIANT === 'development'

export default {
	name: IS_DEV ? 'NotenApp (Dev)' : 'NotenApp',
	slug: 'NotenApp',
	version: '1.0.0',
	orientation: 'portrait',
	icon: './assets/images/icon.png',
	scheme: 'myapp',
	userInterfaceStyle: 'automatic',
	splash: {
		image: './assets/images/splash.png',
		resizeMode: 'contain',
		backgroundColor: '#ffffff',
	},
	assetBundlePatterns: ['**/*'],
	ios: {
		supportsTablet: true,
		bundleIdentifier: IS_DEV ? 'de.notenapp.dev' : 'de.notenapp',
	},
	android: {
		adaptiveIcon: {
			foregroundImage: './assets/images/adaptive-icon.png',
			backgroundColor: '#ffffff',
		},
		package: IS_DEV ? 'de.notenapp.dev' : 'de.notenapp',
	},
	web: {
		bundler: 'metro',
		output: 'static',
		favicon: './assets/images/favicon.png',
	},
	plugins: ['expo-router'],
	experiments: {
		typedRoutes: true,
	},
	extra: {
		router: {
			origin: false,
		},
		eas: {
			projectId: '11f52d8d-4b14-4f7c-b875-5932c959d581',
		},
	},
}
