import { UnistylesTheme } from 'react-native-unistyles/lib/typescript/src/types'

const spacing = {
	xs: 2,
	sm: 4,
	md: 6,
	lg: 8,
	xl: 12,
	'2xl': 16,
	'3xl': 20,
	'4xl': 28,
	'5xl': 36,
	'6xl': 48,
} as const

// Tailwind colors from https://www.colorsandfonts.com/tailwind-color-system/
const colors = {
	white: '#ffffff',
	black: '#000000',
	gray: {
		'50': '#f9fafb',
		'100': '#f3f4f6',
		'200': '#e5e7eb',
		'300': '#d1d5db',
		'400': '#9ca3af',
		'500': '#6b7280',
		'600': '#4b5563',
		'700': '#374151',
		'800': '#1f2937',
		'900': '#111827',
		'950': '#030712',
	},
	main: {
		'50': '#eef2ff',
		'100': '#e0e7ff',
		'200': '#c7d2fe',
		'300': '#a5b4fc',
		'400': '#818cf8',
		'500': '#6366f1',
		'600': '#4f46e5',
		'700': '#4338ca',
		'800': '#3730a3',
		'900': '#312e81',
		'950': '#1e1b4b',
	},
	secondary: {
		'50': '#fffbeb',
		'100': '#fef3c7',
		'200': '#fde68a',
		'300': '#fcd34d',
		'400': '#fbbf24',
		'500': '#f59e0b',
		'600': '#d97706',
		'700': '#b45309',
		'800': '#92400e',
		'900': '#78350f',
		'950': '#451a03',
	},
} as const

// Tailwind font sizes from https://tailwindcss.com/docs/font-size
const fontSizes = {
	xs: 12,
	sm: 14,
	base: 16,
	lg: 18,
	xl: 20,
	'2xl': 24,
	'3xl': 30,
	'4xl': 36,
	'5xl': 48,
	'6xl': 60,
} as const

const fontWeights = {
	thin: '300',
	regular: '500',
	bold: '700',
	black: '900',
} as const

export const lightTheme = {
	isDark: false,
	colors: {
		text1: colors.gray[950],
		text2: colors.gray[900],
		text3: colors.gray[800],
		text4: colors.gray[700],
		text5: colors.gray[600],
		text6: colors.gray[500],
		text7: colors.gray[400],
		text8: colors.gray[300],
		text9: colors.gray[200],
		text10: colors.gray[100],
		text11: colors.gray[50],
		text12: colors.white,
		bg1: colors.gray[200],
		bg2: colors.gray[50],
		bg3: colors.white,
		mainBg1: colors.main[400],
		mainBg2: colors.main[300],
		mainBg3: colors.main[200],
		mainBg4: colors.main[100],
		highlight: colors.main[600],
		mainText1: colors.main[950],
		mainText2: colors.main[900],
		mainText3: colors.main[800],
		mainText4: colors.main[700],
		mainText5: colors.main[600],
		mainText6: colors.main[500],
		mainText7: colors.main[400],
		mainText8: colors.main[300],
		mainText9: colors.main[200],
		mainText10: colors.main[100],
		mainText11: colors.main[50],
		...colors,
	},
	spacing,
	fontSizes,
	fontWeights,
} as const

export const darkTheme = {
	isDark: true,
	colors: {
		text1: colors.white,
		text2: colors.gray[50],
		text3: colors.gray[100],
		text4: colors.gray[200],
		text5: colors.gray[300],
		text6: colors.gray[400],
		text7: colors.gray[500],
		text8: colors.gray[600],
		text9: colors.gray[700],
		text10: colors.gray[800],
		text11: colors.gray[900],
		text12: colors.gray[950],
		bg1: colors.gray[950],
		bg2: colors.gray[800],
		bg3: colors.gray[700],
		mainText1: colors.main[50],
		mainText2: colors.main[100],
		mainText3: colors.main[200],
		mainText4: colors.main[300],
		mainText5: colors.main[400],
		mainText6: colors.main[500],
		mainText7: colors.main[600],
		mainText8: colors.main[700],
		mainText9: colors.main[800],
		mainText10: colors.main[900],
		mainText11: colors.main[950],
		mainBg1: colors.main[900],
		mainBg2: colors.main[800],
		mainBg3: colors.main[700],
		mainBg4: colors.main[600],
		...colors,
	},
	spacing,
	fontSizes,
	fontWeights,
} as const

export const ifDarkElse = (
	theme: UnistylesTheme,
	ifDark: any,
	ifNotDark: any,
) => {
	if (theme.isDark) {
		return ifDark
	} else {
		return ifNotDark
	}
}
