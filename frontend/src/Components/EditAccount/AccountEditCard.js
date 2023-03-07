import React from "react";
import { Card, CardContent, Grid, Typography } from "@mui/material";

function AccountEditCard(props) {
  return (
    <>
      <Grid item xs={6}>
        <Card elevation={5}>
          <CardContent>
            <Typography>{props.header}</Typography>
            {props.element}
          </CardContent>
        </Card>
      </Grid>
    </>
  );
}

export default AccountEditCard;
