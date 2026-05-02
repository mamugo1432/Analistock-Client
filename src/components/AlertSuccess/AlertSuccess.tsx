import { Alert } from "@mui/material";

export default function AlertSuccess({ message }: { message: string }) {
  return (
    <div className="d-flex justify-content-between align-items-start my-4">
      <Alert sx={{ px: 14, width: "100%" }} variant="filled" severity="success">
        {message}
      </Alert>
    </div>
  );
}
