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

export const outcomeCategory = [
    'Food',
    'Clothes',
    'Other'
];

export const myTableType = {
    Incomes: 'Incomes',
    Outcomes: 'Outcomes'
};


export const ModolLabelsIncomeAdd = {
    action: "Add Income",
    alertMessage: "The income has been added successfully",
    addOrEditIcon: <AddIcon />
}

export const ModolLabelsIncomeEdit = {
    action: "Edit Income",
    alertMessage: "The income has been updated successfully",
    addOrEditIcon: <EditIcon />
}

export const ModolLabelsOutcomeAdd = {
    action: "Add Outcome",
    alertMessage: "The outcome has been added successfully",
    addOrEditIcon: <AddIcon />
}

export const ModolLabelsOutcomeEdit = {
    action: "Edit Outcome",
    alertMessage: "The outcome has been updated successfully",
    addOrEditIcon: <EditIcon />
}

export const outcome = {
    category: outcomeCategory,
    modolLabelsAdd: ModolLabelsOutcomeAdd,
    modolLabelsEdit: ModolLabelsOutcomeEdit
}

export const income = {
    category: incomeCategory,
    modolLabelsAdd: ModolLabelsIncomeAdd,
    modolLabelsEdit: ModolLabelsIncomeEdit
}





