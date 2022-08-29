import { GridRenderCellParams } from "@mui/x-data-grid"
import { useContext } from "react"
import { IExpense } from "../@types/expenses"
import { ExpensesContext } from "../contexts/ExpensesContext"
import useDataGrid from "../hooks/useDataGrid"

const ExpensesDetails = () => {
	const {
		state: { expenses }
	} = useContext(ExpensesContext)

	const expensesTable = useDataGrid({
		data: expenses,
		rowId: "id",
		sort: [
			{
				field: "dia",
				sort: "asc"
			}
		],
		columns: [
			{ field: "dia", headerName: "Dia", headerClassName: "super-app-theme--header" },
			{ field: "categoria", headerName: "Categoria", headerClassName: "super-app-theme--header", flex: 0.8 },
			{ field: "descricao", headerName: "Descrição", headerClassName: "super-app-theme--header", flex: 1 },
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

	return <>{expensesTable}</>
}

export default ExpensesDetails
