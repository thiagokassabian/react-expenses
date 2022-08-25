import { Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

interface IHeaderProps {
	sum: number
	date: string
}

const MONTHS = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"]

const Header = (props: IHeaderProps) => {
	const { sum, date } = props

	const navigate = useNavigate()

	const [year, setYear] = useState<string>()
	const [month, setMonth] = useState<string>()

	useEffect(() => {
		setYear(date.split("-")[0])
		setMonth(date.split("-")[1])
	}, [])

	const handleChangeYear = (event: SelectChangeEvent) => {
		const year = event.target.value
		setYear(year)
		navigate(`/despesas/${year}-${month}`)
	}
	const handleChangeMonth = (event: SelectChangeEvent) => {
		const month = event.target.value
		setMonth(month.toString().padStart(2, "0"))
		navigate(`/despesas/${year}-${month}`)
	}

	return (
		<>
			{year && month && (
				<Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
					<FormControl>
						<InputLabel id="select-year">Ano</InputLabel>
						<Select variant="standard" labelId="select-year" value={year} label="Ano" onChange={event => handleChangeYear(event)}>
							<MenuItem value="2020">2020</MenuItem>
							<MenuItem value="2021">2021</MenuItem>
							<MenuItem value="2022">2022</MenuItem>
							<MenuItem value="2022">2023</MenuItem>
						</Select>
					</FormControl>
					<FormControl sx={{ minWidth: 150 }}>
						<InputLabel id="select-month">Mês</InputLabel>
						<Select variant="standard" labelId="select-month" value={month} label="Ano" onChange={handleChangeMonth}>
							{MONTHS.map((month, i) => (
								<MenuItem key={i} value={(i + 1).toString().padStart(2, "0")}>
									{month}
								</MenuItem>
							))}
						</Select>
					</FormControl>
					{!!sum && (
						<Typography
							variant="h6"
							sx={{ marginLeft: "auto", textAlign: "right", display: "flex", flexDirection: "column", lineHeight: 1.25 }}
						>
							<Box component="span" sx={{ fontSize: ".9rem", fontWeight: 100 }}>
								Despesa total
							</Box>
							<Box component="span">{sum.toLocaleString("pt-br", { style: "currency", currency: "BRL" })}</Box>
						</Typography>
					)}
				</Box>
			)}
		</>
	)
}

export default Header
