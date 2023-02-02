import React from 'react';
import {Paper, Typography, Grid, Card, CardContent} from "@mui/material";
import {BarChart, CartesianGrid, YAxis, XAxis, Tooltip, Legend, Bar} from "recharts";
import {createTheme, responsiveFontSizes, ThemeProvider} from '@mui/material/styles';

let theme = createTheme();
theme = responsiveFontSizes(theme);

function BarChartCard(props) {
    return (
        <Grid item xs={12}>
            <Card>
                <CardContent>
                    <ThemeProvider theme={theme}>
                        <Typography variant="h3">{props.header}</Typography>
                    </ThemeProvider>
                    <Paper>
                        <BarChart width={1700} height={600} data={props.data}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis dataKey="value"/>
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="value" fill="#8884d8" />
                            {/*<Bar dataKey="uv" fill="#82ca9d" />*/}
                        </BarChart>

                    </Paper>

                </CardContent>
            </Card>
        </Grid>

    );
}

export default BarChartCard;
