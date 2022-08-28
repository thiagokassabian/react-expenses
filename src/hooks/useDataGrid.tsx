import { DataGrid, GridColDef, GridRowsProp, GridSortItem, GridSortModel, ptBR } from "@mui/x-data-grid"
import styled from "@emotion/styled"
import { useState } from "react"
import { Box } from "@mui/material"

interface IUseDataGridProps {
	data: any[]
	columns: GridColDef[]
	rowId: string | number
	sort: GridSortItem[]
}

const StyledDataGrid = styled(DataGrid)(() => ({
	border: 0,
	"& .even": {
		backgroundColor: "#f9f9f9"
	}
}))

const useDataGrid = (props: IUseDataGridProps) => {
	const [sortModel, setSortModel] = useState<GridSortModel>(props.sort)
	const [pageSize, setPageSize] = useState<number>(25)

	const rows: GridRowsProp = props.data

	const columns: GridColDef[] = props.columns

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
					getRowId={row => row[props.rowId]}
					columns={columns}
					getRowClassName={params => (params.indexRelativeToCurrentPage % 2 === 0 ? "even" : "odd")}
					disableColumnMenu
				/>
			</Box>
		</>
	)
}

export default useDataGrid
