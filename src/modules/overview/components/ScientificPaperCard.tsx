import CardContainer from '@/components/card/CardContainer'
import CardText from '@/components/card/CardText'
import { ClassType } from '@/storage/grades'

type ScientificPaperCardProps = {
	scientificPaper: Required<ClassType>['scientificPaper']
	onPress: () => void
}

export default function ScientificPaperCard({
	scientificPaper,
	onPress,
}: ScientificPaperCardProps) {
	return (
		<CardContainer onPress={onPress}>
			<CardText>{scientificPaper.title}</CardText>
		</CardContainer>
	)
}
