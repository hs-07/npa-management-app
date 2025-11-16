import { DataGrid } from "@mui/x-data-grid";
import type { GridColDef } from "@mui/x-data-grid";
import type { RowData } from "../utils/types";

interface DataTableProps<T> {
  rows: RowData[];
  columns: GridColDef[];
  pageSize?: number;
  checkboxSelection?: boolean;
  onRowClick?: (row: T) => void;
  onActionClick?: (row: T) => void; // NEW
}

export default function DataTable<T extends { id: string | number }>({
  rows,
  columns,
  pageSize = 10,
  checkboxSelection = false,
}: // onActionClick,
DataTableProps<T>) {
  // Inject action callback to renderCell if required
  const finalColumns = columns.map((col) => {
    return col;
  });

  return (
    <div className="w-full">
      <DataGrid
        rows={rows}
        columns={finalColumns}
        pageSizeOptions={[pageSize]}
        checkboxSelection={checkboxSelection}
        disableRowSelectionOnClick
      />
    </div>
  );
}
