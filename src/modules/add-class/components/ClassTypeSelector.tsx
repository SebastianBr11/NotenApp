import React from 'react'

import RadioButton from '@/components/form/RadioButton'
import RadioButtonGroup from '@/components/form/RadioButtonGroup'
import { ClassType } from '@/storage/grades'

type ClassTypeSelectorProps = {
	onChange: (...event: any[]) => void
	value: ClassType['type']
}

export default function ClassTypeSelector({
	onChange,
	value: selectedType,
}: ClassTypeSelectorProps) {
	return (
		<RadioButtonGroup>
			<RadioButton
				onSelect={onChange}
				value='FOS'
				selected={selectedType === 'FOS'}
			/>
			<RadioButton
				onSelect={onChange}
				value='Gymnasium'
				selected={selectedType === 'Gymnasium'}
				disabled
			/>
		</RadioButtonGroup>
	)
}
