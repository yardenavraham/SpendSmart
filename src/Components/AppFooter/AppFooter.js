import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

export default function AppFooter() {
  return (
    <Box sx={{ backgroundColor: 'secondary.main'}} >
      <Container maxWidth="xl" sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Typography
          level="body2"
          startDecorator={<Typography textColor="text.tertiary">by</Typography>}
        >
          SpendSmart
        </Typography>

        <Typography level="body3" sx={{ ml: "auto" }}>
          Copyright 2023 !!!!
        </Typography>
      </Container>
    </Box>
  );
}
