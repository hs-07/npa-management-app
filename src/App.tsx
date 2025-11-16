import { useEffect, useState } from "react";
import { Snackbar, Alert } from "@mui/material";

import { DataTable, CustomerModal } from "./components";
import { dummyRows } from "./utils/constants";
import { columns } from "./utils/columns";
import {
  saveRowsToLocalStorage,
  loadRowsFromLocalStorage,
} from "./utils/storage";
import type { RowData } from "./utils/types";
import { sendEmail } from "./utils/sendEmail";

const App = () => {
  const [rows, setRows] = useState<RowData[]>(() => {
    const saved = loadRowsFromLocalStorage();
    return saved || dummyRows;
  });

  const [selectedRow, setSelectedRow] = useState<RowData | null>(null);
  const [open, setOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  useEffect(() => {
    saveRowsToLocalStorage(rows);
  }, [rows]);

  const handleOpenModal = (row: RowData) => {
    setSelectedRow(row);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const handleEmail = () => {
    if (!selectedRow) return;

    const payload = {
      name: selectedRow.customerName,
      email: "vishal.csu@gmail.com",
      accountNumber: selectedRow.accountNumber,
      branch: selectedRow.branchName,
      loanAmount: String(selectedRow.loanAmount),
      npaDate: selectedRow.npaDate,
    };

    sendEmail(payload)
      .then(() => {
        setSnackbarOpen(true);
        setOpen(false);
      })
      .catch(() => {
        setSnackbarOpen(true);
      });
  };

  const handleSMS = () => {
    console.log("SMS clicked", selectedRow);
  };

  const handleToggleStatus = () => {
    if (!selectedRow) return;

    const updatedStatus =
      selectedRow.accountStatus === "Active" ? "Inactive" : "Active";

    // Update rows list
    setRows((prev) =>
      prev.map((row) =>
        row.customerUid === selectedRow.customerUid
          ? { ...row, accountStatus: updatedStatus }
          : row
      )
    );

    // Update modal selected row
    setSelectedRow((prev) =>
      prev ? { ...prev, accountStatus: updatedStatus } : prev
    );
  };

  return (
    <>
      <div className="">
        <div className="flex items-center md:flex-row flex-col py-6 md:py-10 gap-4 justify-center w-full bg-gradient-to-b from-[#d3ffa1] to-transparent">
          <img
            src="./logo.png"
            alt="logo"
            className="w-24 h-24 rounded-full border border-gray-300 object-cover"
          />
          <h1 className="text-3xl font-semibold text-green-900 uppercase">
            Evercrest Bank
          </h1>
        </div>

        <div className="px-4 md:px-10">
          <DataTable
            rows={rows}
            columns={columns(handleOpenModal)}
            pageSize={5}
          />
        </div>
      </div>

      <CustomerModal
        open={open}
        onClose={handleClose}
        selectedRow={selectedRow}
        onEmailClick={handleEmail}
        onSmsClick={handleSMS}
        onToggleStatus={handleToggleStatus}
      />

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          Email sent successfully!
        </Alert>
      </Snackbar>
    </>
  );
};

export default App;
