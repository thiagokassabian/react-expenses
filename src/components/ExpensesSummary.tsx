import { GridRenderCellParams } from "@mui/x-data-grid"
import { useContext } from "react"
import { ExpensesContext } from "../contexts/ExpensesContext"
import useDataGrid from "../hooks/useDataGrid"

const ExpensesSummary = () => {
	const {
		state: { categories }
	} = useContext(ExpensesContext)

	const summaryTable = useDataGrid({
		data: categories,
		rowId: "categoria",
		sort: [
			{
				field: "valor",
				sort: "desc"
			}
		],
		columns: [
			{ field: "categoria", headerName: "Categoria", headerClassName: "super-app-theme--header", flex: 0.5 },
			{
				field: "valor",
				headerName: "Valor",
				headerClassName: "super-app-theme--header",
				renderCell: (params: GridRenderCellParams<number>) => {
					return params.value!.toLocaleString("pt-br", { style: "currency", currency: "BRL" })
				}
			}
		]
	})

	return <>{summaryTable}</>
}

export default ExpensesSummary
