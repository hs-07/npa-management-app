import { Modal, Box, Button } from "@mui/material";
import type { RowData } from "../utils/types";

interface CustomerModalProps {
  open: boolean;
  onClose: () => void;
  selectedRow: RowData | null;
  onEmailClick: () => void;
  onSmsClick: () => void;
  onToggleStatus: () => void;
}

const CustomerModal = ({
  open,
  onClose,
  selectedRow,
  onEmailClick,
  onSmsClick,
  onToggleStatus,
}: CustomerModalProps) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          width: 500,
          bgcolor: "white",
          boxShadow: 24,
          mx: "auto",
          my: "10vh",
          maxHeight: "80vh",
          borderRadius: 2,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Scrollable content */}
        <Box sx={{ flex: 1, overflowY: "auto", p: 4 }}>
          <h2 className="text-2xl font-bold mb-4">Customer Details</h2>

          {selectedRow && (
            <div className="space-y-2">
              {Object.entries(selectedRow).map(([key, value]) => (
                <div key={key} className="border-b pb-2">
                  <strong className="capitalize">
                    {key.replace(/([A-Z])/g, " $1")}:
                  </strong>{" "}
                  {String(value)}
                </div>
              ))}
            </div>
          )}
        </Box>

        {/* Sticky footer */}
        <Box
          sx={{
            p: 3,
            borderTop: "1px solid #ddd",
            bgcolor: "white",
            borderRadius: "0 0 8px 8px",
            display: "flex",
            justifyContent: "end",
            gap: 2,
          }}
        >
          <Button
            variant="contained"
            size="small"
            color="primary"
            onClick={onSmsClick}
          >
            SMS
          </Button>

          <Button
            variant="contained"
            size="small"
            color="success"
            onClick={onEmailClick}
          >
            Email
          </Button>

          <Button
            variant="contained"
            size="small"
            color={
              selectedRow?.accountStatus === "Active" ? "error" : "warning"
            }
            onClick={onToggleStatus}
          >
            {selectedRow?.accountStatus === "Active"
              ? "Mark Inactive"
              : "Mark Active"}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default CustomerModal;
