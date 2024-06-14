export type Grade = { id: string } & (
	| {
			grade: 1
			points: 15 | 14 | 13
	  }
	| {
			grade: 2
			points: 12 | 11 | 10
	  }
	| {
			grade: 3
			points: 9 | 8 | 7
	  }
	| {
			grade: 4
			points: 6 | 5 | 4
	  }
	| {
			grade: 5
			points: 3 | 2 | 1
	  }
	| {
			grade: 6
			points: 0
	  }
)
