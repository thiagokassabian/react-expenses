import { IExpense } from "../@types/expenses"
import { DataGrid, GridColDef, GridRenderCellParams, GridRowsProp, GridSortModel, ptBR } from "@mui/x-data-grid"
import styled from "@emotion/styled"
import { useState } from "react"
import { Box } from "@mui/material"

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

	const [sortModel, setSortModel] = useState<GridSortModel>([
		{
			field: "dia",
			sort: "asc"
		}
	])
	const [pageSize, setPageSize] = useState<number>(25)

	const rows: GridRowsProp = expenses

	const columns: GridColDef[] = [
		{ field: "dia", headerName: "Dia", headerClassName: "super-app-theme--header", flex: 0.5 },
		{ field: "categoria", headerName: "Categoria", headerClassName: "super-app-theme--header", flex: 0.75 },
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

	return (
		<>
			<Box sx={{ display: "flex", height: "100%" }}>
				<Box
					sx={{
						flexGrow: 1,
						"& .super-app-theme--header": {
							backgroundColor: "#f1f1f1"
						}
					}}
				>
					<StyledDataGrid
						localeText={ptBR.components.MuiDataGrid.defaultProps.localeText}
						sortModel={sortModel}
						onSortModelChange={newSortModel => setSortModel(newSortModel)}
						pageSize={pageSize}
						onPageSizeChange={newPageSize => setPageSize(newPageSize)}
						rowsPerPageOptions={[10, 25, 50]}
						pagination
						rows={rows}
						columns={columns}
						getRowClassName={params => (params.indexRelativeToCurrentPage % 2 === 0 ? "even" : "odd")}
						disableColumnMenu
					/>
				</Box>
			</Box>
		</>
	)
}

export default Expenses
