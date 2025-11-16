import type { GridColDef } from "@mui/x-data-grid";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import type { RowData } from "../utils/types";

export const columns = (
  onActionClick: (row: RowData) => void
): GridColDef<RowData>[] => {
  return [
    { field: "branchId", headerName: "Branch ID", width: 130 },
    { field: "branchCode", headerName: "Branch Code", width: 130 },
    { field: "branchName", headerName: "Branch Name", width: 180 },

    { field: "customerUid", headerName: "Customer UID", width: 150 },
    { field: "customerName", headerName: "Customer Name", width: 180 },

    { field: "accountNumber", headerName: "Account Number", width: 170 },

    { field: "creditCode", headerName: "Credit Code", width: 130 },
    { field: "creditSegment", headerName: "Credit Segment", width: 150 },

    // Asset Classification
    {
      field: "assetClassification",
      headerName: "Asset Classification",
      width: 180,
      renderCell: (params) => {
        const value = params.value as string;

        const colors: Record<string, string> = {
          Standard: "#4CAF50",
          "Sub-Standard": "#FF9800",
          Doubtful: "#F44336",
          Loss: "#9C27B0",
        };

        return (
          <span
            style={{
              color: "white",
              padding: "4px 8px",
              borderRadius: "6px",
              background: colors[value] ?? "#90A4AE",
              fontWeight: 600,
            }}
          >
            {value}
          </span>
        );
      },
    },

    // TWO Flag
    {
      field: "twoFlag",
      headerName: "TWO Flag",
      width: 110,
      renderCell: (params) => {
        const value = params.value as string;
        return (
          <span
            style={{
              padding: "2px 6px",
              background: value === "Yes" ? "#d32f2f" : "#2e7d32",
              color: "white",
              borderRadius: "4px",
            }}
          >
            {value}
          </span>
        );
      },
    },

    // Fraud Mark
    {
      field: "fraudMark",
      headerName: "Fraud Mark",
      width: 120,
      renderCell: (params) => {
        const value = params.value as string;
        return (
          <span
            style={{
              padding: "2px 6px",
              background: value === "Yes" ? "#ed6c02" : "#0288d1",
              color: "white",
              borderRadius: "4px",
            }}
          >
            {value}
          </span>
        );
      },
    },

    // Willful Defaulter
    {
      field: "willfulDefaulter",
      headerName: "Willful Defaulter",
      width: 160,
      renderCell: (params) => {
        const value = params.value as string;
        return (
          <span
            style={{
              padding: "2px 6px",
              background: value === "Yes" ? "#b71c1c" : "#00796b",
              color: "white",
              borderRadius: "4px",
            }}
          >
            {value}
          </span>
        );
      },
    },

    { field: "dateSarfaesai13_2", headerName: "13(2) Notice Date", width: 160 },
    { field: "dateSarfaesai13_4", headerName: "13(4) Notice Date", width: 160 },
    { field: "npaDate", headerName: "NPA Date", width: 140 },

    // Currency fields
    ...[
      "sanctionLimit",
      "openingBalance2025",
      "increaseOpBalance",
      "interestCumulative",
      "recoveryCumulative",
      "recoveryCurrentDate",
      "upgradationTotal",
      "writeOffTotal",
      "closingBalance",
    ].map((field) => ({
      field,
      headerName: field
        .replace(/([A-Z])/g, " $1") // Insert spaces before capitals
        .replace(/^./, (c) => c.toUpperCase()), // Capitalize first letter
      width: 180,
      renderCell: (params: any) => `₹ ${Number(params.value).toLocaleString()}`,
    })),
    {
      field: "accountStatus",
      headerName: "Account Status",
      width: 150,
      renderCell: (params) => {
        const value = params.value as string;
        const isActive = value === "Active";

        return (
          <span
            style={{
              padding: "4px 10px",
              borderRadius: "6px",
              color: "white",
              fontWeight: 600,
              background: isActive ? "#2e7d32" : "#d32f2f",
            }}
          >
            {value}
          </span>
        );
      },
    },

    {
      field: "actions",
      headerName: "Action",
      width: 100,
      sortable: false,
      renderCell: (params) => (
        <div className="flex items-center justify-start w-full h-full">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onActionClick(params.row);
            }}
            className="cursor-pointer w-8 h-8 border border-gray-400 rounded-lg flex items-center justify-center hover:bg-gray-100 transition"
          >
            <RemoveRedEyeIcon fontSize="small" />
          </button>
        </div>
      ),
    },
  ];
};
