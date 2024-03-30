import { SingleGradeType } from '@/storage/grades'
import React from 'react'
import { StyleSheet } from 'react-native'
import { Text, View } from './Themed'

type GradeViewType = {
	singleGrade: SingleGradeType
}

export default function GradeView({ singleGrade }: GradeViewType) {
	return (
		<View>
			<Text>{singleGrade.type}</Text>
			<Text>{singleGrade.points}</Text>
		</View>
	)
}

const styles = StyleSheet.create({})
