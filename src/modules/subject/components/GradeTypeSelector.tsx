import React from 'react'
import { createStyleSheet, useStyles } from 'react-native-unistyles'

import RadioButton from '@/components/form/RadioButton'
import RadioButtonGroup from '@/components/form/RadioButtonGroup'
import { SingleGradeType } from '@/storage/grades'

type GradeTypeSelectorProps = {
	onChange: (...event: any[]) => void
	value: SingleGradeType['type']
}

export default function GradeTypeSelector({
	onChange,
	value: selectedType,
}: GradeTypeSelectorProps) {
	const { styles } = useStyles(stylesheet)

	return (
		<RadioButtonGroup>
			<RadioButton
				onSelect={onChange}
				value='Schulaufgabe'
				selected={selectedType === 'Schulaufgabe'}
			/>
			<RadioButton
				onSelect={onChange}
				value='Kurzarbeit'
				selected={selectedType === 'Kurzarbeit'}
			/>
			<RadioButton
				onSelect={onChange}
				value='Mündlich'
				selected={selectedType === 'Mündlich'}
			/>
		</RadioButtonGroup>
	)
}

const stylesheet = createStyleSheet(theme => ({}))
