import { IExpense } from "../@types/expenses"

import { DataGrid, GridColDef, GridRenderCellParams, GridRowsProp, GridSortModel, ptBR } from "@mui/x-data-grid"
import styled from "@emotion/styled"
import { useState } from "react"

interface IExpensesProps {
	expenses: IExpense[]
}

const StyledDataGrid = styled(DataGrid)(() => ({
	border: 0,
	"& .even": {
		backgroundColor: "#f9f9f9"
	}
}))

const Expenses = (props: IExpensesProps) => {
	const { expenses } = props
	const rows: GridRowsProp = expenses

	const columns: GridColDef[] = [
		{ field: "dia", headerName: "Dia", flex: 0.5 },
		{ field: "categoria", headerName: "Categoria", flex: 0.75 },
		{ field: "descricao", headerName: "Descrição", flex: 1 },
		{
			field: "valor",
			headerName: "Valor",
			renderCell: (params: GridRenderCellParams<number>) => {
				return params.value!.toLocaleString("pt-br", { style: "currency", currency: "BRL" })
			}
		}
	]

	const [sortModel, setSortModel] = useState<GridSortModel>([
		{
			field: "dia",
			sort: "asc"
		}
	])

	return (
		<>
			<div style={{ display: "flex", height: "100%" }}>
				<div style={{ flexGrow: 1 }}>
					<StyledDataGrid
						localeText={ptBR.components.MuiDataGrid.defaultProps.localeText}
						sortModel={sortModel}
						onSortModelChange={newSortModel => setSortModel(newSortModel)}
						pageSize={25}
						rows={rows}
						columns={columns}
						getRowClassName={params => (params.indexRelativeToCurrentPage % 2 === 0 ? "even" : "odd")}
					/>
				</div>
			</div>
		</>
	)
}

export default Expenses
