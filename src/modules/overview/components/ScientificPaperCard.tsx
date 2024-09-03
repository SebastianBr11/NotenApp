import CardContainer from '@/components/card/CardContainer'
import CardText from '@/components/card/CardText'
import { ScientificPaperType } from '@/storage/grades'

type ScientificPaperCardProps = {
	scientificPaper: ScientificPaperType
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
