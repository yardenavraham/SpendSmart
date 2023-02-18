import { Grid } from "@material-ui/core";
import { responsiveFontSizes } from "@mui/material/styles";
import { ThemeProvider } from "@mui/styles";
import React from 'react';
import BarChartCard from "../../Components/Graphs/BarChartCard";
import SelectButton from "../../Components/Graphs/SelectButton";
import PieChartCard from "../../Components/Graphs/PieChartCard";
import theme from "../../theme";
function Dashboard() {

    const data = [
        {type: "Expense", category: "Rent", amount: 4000, user: "X", date: new Date(2023, 1, 1)},
        {type: "Expense", category: "Rent", amount: 4000, user: "X", date: new Date(2022, 12, 1)},
        {type: "Expense", category: "Rent", amount: 4000, user: "X", date: new Date(2022, 11, 1)},
        {type: "Expense", category: "Food", amount: 1250, user: "X", date: new Date(2022, 12, 20)},
        {type: "Expense", category: "Food", amount: 800, user: "Y", date: new Date(2022, 12, 20)},
        {type: "Expense", category: "Food", amount: 800, user: "Y", date: new Date(2023, 2, 2)},
        {type: "Income", category: "Salary", amount: 10000, user: "Y", date: new Date(2023, 1, 9)},
        {type: "Income", category: "Salary", amount: 10000, user: "Y", date: new Date(2022, 12, 9)},
        {type: "Income", category: "Salary", amount: 10000, user: "Y", date: new Date(2022, 11, 9)},
        {type: "Expense", category: "Insurance", amount: 100, user: "Y", date: new Date(2022, 11, 30)},
        {type: "Expense", category: "Insurance", amount: 100, user: "X", date: new Date(2022, 12, 30)},
    ]

    const monthOptions = {
        PREVIOUSE: 'Previous Month',
        CURRENT: 'Current Month',
        NEXT: 'Next Month'
    }

    function numberOfExpensesByCategory() {
        const result = data
            .filter(item => item.type === "Expense")
            .map(item => item.category)
            .reduce((acc, e) => acc.set(e, (acc.get(e) || 0) + 1), new Map());
        return Array.from( result ).map(([name, value]) => ({ name, value }));
    }

    function expensesVsIncomes() {
        const result = data
            .reduce((acc, e) => acc.set(e.type, (acc.get(e.type) || 0) + e.amount), new Map());
        return Array.from( result ).map(([name, value]) => ({ name, value }));
    }

    function expensesByUser() {
        const result = data
            .filter(item => item.type === "Expense")
            .map(item => item.user)
            .reduce((acc, e) => acc.set(e, (acc.get(e) || 0) + 1), new Map());
        return Array.from( result ).map(([name, value]) => ({ name, value }));
    }

    function expensesByCategory() {
        const result = data
            .filter(item => item.type === "Expense")
            .reduce((acc, e) => acc.set(e.category, (acc.get(e.category) || 0) + e.amount), new Map());
        return Array.from( result ).map(([name, value]) => ({ name, value }));
    }

    function handleSelectedValue(value) {
        console.log(`Selected value: ${value}`);
        
        // here we will send query the db with the selected month to bring the data
        switch (value) {
            case monthOptions.CURRENT:
                return;
            case monthOptions.NEXT:
                return;
            default:
                return false;
        }
      };

    return (
        <ThemeProvider theme={responsiveFontSizes(theme)}>
            <Grid container >
                <SelectButton prev="Previous Month" curr="Current Month" next="Next Month" onSelectedValue={handleSelectedValue} />
            </Grid>
            <Grid container rowSpacing={3}>
                <Grid container spacing="3" justifyContent="center" alignItems="center">
                    <PieChartCard header="# of transactions by category" data={numberOfExpensesByCategory()}/>
                    <PieChartCard header="Expenses vs. Incomes" data={expensesVsIncomes()}/>
                    <PieChartCard header="Expenses by user" data={expensesByUser()}/>
                </Grid>
                <BarChartCard header="Expenses By Category" data={expensesByCategory()}/>
            </Grid>
        </ThemeProvider>
    );
}

export default Dashboard;
