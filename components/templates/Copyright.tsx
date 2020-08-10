import React from "react";
import Typography from "@material-ui/core/Typography";
import Link from "./Link";

export default function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="/">
        next-chat-app
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
