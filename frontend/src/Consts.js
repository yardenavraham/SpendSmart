import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';

export const incomeCategory = [
    'Salary',
    'Allowance',
    'Asset',
    'Gift',
    'Alimony',
    'Other'
];

export const expenseCategory = [
    'Food',
    'Clothes',
    'Other'
];

export const myTableType = {
    Incomes: "Incomes",
    Expenses: "Expenses"
};


export const ModolLabelsIncomeAdd = {
    action: "Add Income",
    alertMessage: "Income has been added successfully",
    addOrEditIcon: <AddIcon />
}

export const ModolLabelsIncomeEdit = {
    action: "Edit Income",
    alertMessage: "Income has been updated successfully",
    addOrEditIcon: <EditIcon />
}

export const ModolLabelsExpenseAdd = {
    action: "Add Expense",
    alertMessage: "Expense has been added successfully",
    addOrEditIcon: <AddIcon />
}

export const ModolLabelsExpenseEdit = {
    action: "Edit Expense",
    alertMessage: "Expense has been updated successfully",
    addOrEditIcon: <EditIcon />
}

export const expense = {
    category: expenseCategory,
    modolLabelsAdd: ModolLabelsExpenseAdd,
    modolLabelsEdit: ModolLabelsExpenseEdit
}

export const income = {
    category: incomeCategory,
    modolLabelsAdd: ModolLabelsIncomeAdd,
    modolLabelsEdit: ModolLabelsIncomeEdit
}





