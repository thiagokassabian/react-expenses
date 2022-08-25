export const getToday = (): string => {
	const [isoDate] = new Date().toISOString().split("T")
	return isoDate
}

export const actualYearMonth = (): string => getToday().substring(0, 7)
