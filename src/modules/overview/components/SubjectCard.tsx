import { useBottomSheetModal } from '@gorhom/bottom-sheet'
import { router } from 'expo-router'

import CardBadge from '@/components/card/CardBadge'
import CardContainer from '@/components/card/CardContainer'
import CardText from '@/components/card/CardText'
import { ClassType } from '@/storage/grades'
import { calculateAverageOfSemesters } from '@/util/gradeCalcFos'

type SubjectCardProps = {
	subject: ClassType['subjects'][0]
}

export default function SubjectCard({
	subject: { name, id, semesters },
}: SubjectCardProps) {
	const { dismissAll } = useBottomSheetModal()

	const avg = calculateAverageOfSemesters(semesters)

	const handlePress = () => {
		dismissAll()
		router.push(`/subjects/${id}`)
	}

	return (
		<CardContainer onPress={handlePress}>
			<CardText>{name}</CardText>
			<CardBadge>{avg}</CardBadge>
		</CardContainer>
	)
}
