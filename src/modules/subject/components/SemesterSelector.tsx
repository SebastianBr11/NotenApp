import RadioButton from '@/components/form/RadioButton'
import RadioButtonGroup from '@/components/form/RadioButtonGroup'
import React from 'react'
import { createStyleSheet, useStyles } from 'react-native-unistyles'

type SemesterSelectorProps = {
	onChange: (...event: any[]) => void
	value: 1 | 2
}

export default function SemesterSelector({
	onChange,
	value: selectedType,
}: SemesterSelectorProps) {
	const { styles } = useStyles(stylesheet)

	return (
		<RadioButtonGroup>
			<RadioButton
				onSelect={onChange}
				value={1}
				selected={selectedType === 1}
			/>
			<RadioButton
				onSelect={onChange}
				value={2}
				selected={selectedType === 2}
			/>
		</RadioButtonGroup>
	)
}

const stylesheet = createStyleSheet(theme => ({}))
