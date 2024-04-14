import { observer } from '@legendapp/state/react'
import React from 'react'
import Animated, {
	FadingTransition,
	SlideInDown,
	SlideOutDown,
} from 'react-native-reanimated'
import { createStyleSheet, useStyles } from 'react-native-unistyles'

import AddSubjectPrompt from './AddSubjectPrompt'
import SubjectCard from './SubjectCard'

import { lastUsedClass, schools } from '@/storage/grades'

export default observer(SubjectCardView)

function SubjectCardView() {
	const { styles } = useStyles(stylesheet)

	const classes = schools.classes.get()

	if (classes.length === 0) {
		return <AddSubjectPrompt />
	}

	const selectedClass = lastUsedClass.get()
	const { subjects: yearGrades } = classes[selectedClass]

	return (
		<Animated.FlatList
			layout={FadingTransition}
			contentContainerStyle={styles.list}
			data={yearGrades}
			keyExtractor={item => item.id}
			renderItem={({ item, index }) => (
				<Animated.View
					entering={SlideInDown.springify()
						.damping(10)
						.mass(0.5)
						.stiffness(75)
						.delay((index - 1) * 100)}
					exiting={SlideOutDown}
				>
					<SubjectCard selectedClass={selectedClass} subject={item} />
				</Animated.View>
			)}
		/>
	)
}

const stylesheet = createStyleSheet(theme => ({
	list: {
		gap: theme.spacing['3xl'],
		flexGrow: 1,
	},
}))
