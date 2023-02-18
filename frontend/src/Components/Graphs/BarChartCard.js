import React from "react";
import { Typography, Grid, Card, CardContent } from "@mui/material";
import {
  BarChart,
  CartesianGrid,
  YAxis,
  XAxis,
  Tooltip,
  Legend,
  Bar,
  Cell,
  ResponsiveContainer,
} from "recharts";
import { ThemeProvider } from "@mui/material/styles";
import { useTheme } from "@mui/styles";
import * as d3 from 'd3';

function BarChartCard(props) {
  const theme = useTheme();
  const colors = d3.schemeCategory10;

  return (
    <Grid item xs={12}>
      <Card elevation="0">
        <CardContent>
          <ThemeProvider theme={theme}>
            <Typography variant="h3">{props.header}</Typography>
          </ThemeProvider>
          <ResponsiveContainer height={400}>
            <BarChart width={500} height={400} data={props.data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis dataKey="value" />
              <Tooltip />
              {/*<Legend />*/}
              <Bar dataKey="value" fill={theme.palette.primary.main}>
                {props.data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={colors[index % colors.length]}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </Grid>
  );
}

export default BarChartCard;
