import { DataGrid, GridColDef, GridRenderCellParams, GridRowsProp, GridSortModel, ptBR } from "@mui/x-data-grid"
import styled from "@emotion/styled"
import { useContext, useState } from "react"
import { Box } from "@mui/material"
import { ExpensesContext } from "../contexts/ExpensesContext"

const StyledDataGrid = styled(DataGrid)(() => ({
	border: 0,
	"& .even": {
		backgroundColor: "#f9f9f9"
	},
	"& .MuiDataGrid-footerContainer": {
		display: "none"
	}
}))

const ExpensesSummary = () => {
	const {
		state: { categories }
	} = useContext(ExpensesContext)

	const [sortModel, setSortModel] = useState<GridSortModel>([
		{
			field: "valor",
			sort: "desc"
		}
	])
	const [pageSize, setPageSize] = useState<number>(25)

	const rows: GridRowsProp = categories

	const columns: GridColDef[] = [
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

	return (
		<>
			<Box
				sx={{
					flexGrow: 1,
					"& .super-app-theme--header": {
						backgroundColor: "#f1f1f1"
					}
				}}
			>
				<StyledDataGrid
					autoHeight
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
					getRowId={row => row.categoria}
					disableColumnMenu
				/>
			</Box>
		</>
	)
}

export default ExpensesSummary
