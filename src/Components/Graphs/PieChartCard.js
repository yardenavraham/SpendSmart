import React from 'react';
import {Card, CardContent, Grid, Paper, Typography} from "@mui/material";
import {PieChart, Pie, Tooltip} from "recharts"
import {createTheme, responsiveFontSizes, ThemeProvider} from '@mui/material/styles';

let theme = createTheme();
theme = responsiveFontSizes(theme);

function PieChartCard(props) {
    return (
        <Grid item xs={4}>
        <Card>
            <CardContent>
                <ThemeProvider theme={theme}>
                    <Typography variant="h5">{props.header}</Typography>
                </ThemeProvider>
                <Paper elevation="0">
                    <PieChart width={450} height={300}>
                        <Pie
                            data={props.data}
                            dataKey="value"
                            nameKey={"name"}
                            cx="50%"
                            cy="50%"
                            outerRadius={150}
                            fill="#8884d8"
                            legendType="diamond"
                        />
                        <Tooltip/>
                    </PieChart>
                </Paper>
            </CardContent>
        </Card>
        </Grid>
    );
}

export default PieChartCard;
