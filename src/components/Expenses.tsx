import { SyntheticEvent, useState } from "react"
import { Box, styled, Typography } from "@mui/material"
import Tabs from "@mui/material/Tabs"
import Tab from "@mui/material/Tab"
import ExpensesDetails from "./ExpensesDetails"
import ExpensesSummary from "./ExpensesSummary"

interface TabPanelProps {
	children?: React.ReactNode
	index: number
	value: number
}

function TabPanel(props: TabPanelProps) {
	const { children, value, index, ...other } = props

	return (
		<div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
			{value === index && (
				<Box sx={{ p: 3 }}>
					<Typography component="div">{children}</Typography>
				</Box>
			)}
		</div>
	)
}

function a11yProps(index: number) {
	return {
		id: `simple-tab-${index}`,
		"aria-controls": `simple-tabpanel-${index}`
	}
}

const StyledTabPanel = styled(TabPanel)({
	"& .MuiBox-root": {
		paddingLeft: 0,
		paddingRight: 0
	}
})

const Expenses = () => {
	const [valueTabs, setValueTabs] = useState(0)

	const handleChange = (event: SyntheticEvent, newValue: number) => {
		setValueTabs(newValue)
	}

	return (
		<>
			<Tabs value={valueTabs} onChange={handleChange} centered>
				<Tab label="Resumo" {...a11yProps(0)} />
				<Tab label="Detalhes" {...a11yProps(0)} />
			</Tabs>
			<StyledTabPanel value={valueTabs} index={0}>
				<ExpensesSummary />
			</StyledTabPanel>
			<StyledTabPanel value={valueTabs} index={1}>
				<ExpensesDetails />
			</StyledTabPanel>
		</>
	)
}

export default Expenses
