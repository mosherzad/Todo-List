import * as React from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

export default function MySnackbar({ open, message }) {
  return (
    <div style={{ backgroundColor: "primary" }}>
      <Snackbar open={open} autoHideDuration={6000}>
        <Alert
          variant="filled"
          severity="success"
          sx={{
            backgroundColor: "primary.main",
            color: "white",
          }}
        >
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
}
