import React from "react";
import { Card, CardContent, Grid, Typography } from "@mui/material";
import {
  PieChart,
  Pie,
  Legend,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { ThemeProvider } from "@mui/material/styles";
import { useTheme } from "@mui/styles";
import * as d3 from "d3";

function PieChartCard(props) {
  const theme = useTheme();
  const colors = d3.schemeSet2;

  return (
    <Grid item xs={4}>
      <Card elevation="0">
        <CardContent>
          <ThemeProvider theme={props.theme}>
            <Typography variant="h6">{props.header}</Typography>
          </ThemeProvider>
          <ResponsiveContainer height={200}>
            <PieChart width={150} height={200}>
              <Pie
                data={props.data}
                dataKey="value"
                nameKey={"name"}
                cx="50%"
                cy="50%"
                outerRadius="100%"
                fill={theme.palette.primary.main}
                legendType="circle"
                height={36}
              >
                {props.data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={colors[index % colors.length]}
                  />
                ))}
              </Pie>
              <Legend />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </Grid>
  );
}

export default PieChartCard;
