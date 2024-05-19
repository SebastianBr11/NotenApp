module.exports = {
	root: true,
	extends: 'expo',
	rules: {
		// Ensures props and state inside functions are always up-to-date
		'react-hooks/exhaustive-deps': 'warn',
	},
	overrides: [
		{
			files: ['*.ts', '*.tsx', '*.d.ts'],
			parserOptions: {
				project: './tsconfig.json',
			},
		},
	],
}
