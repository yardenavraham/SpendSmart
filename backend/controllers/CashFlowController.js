import CashFlow from "../models/CashFlowModel.js";
 
export const getCashFlow = async (req, res) => { //getIncomes
    try {
        console.log('getCashFlow');
        console.log('req.params  ' + JSON.stringify(req.params ));
        const cashFlowData = await CashFlow.find({ account: req.params.account });
        res.json(cashFlowData);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}
 
export const getCashFlowById = async (req, res) => { //getIncomeById
    try {
        const item = await CashFlow.findById(req.params.id);
        res.json(item);
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}

const addMonths = (date, months) => {
    date.setMonth(date.getMonth() + months);
    return date;
  }
 
export const saveCashFlowItem = async (req, res) => { //saveIncome
    console.log('saveCashFlowItem');
    console.log('req.body', JSON.stringify(req.body));

    try {
        const cashFlowItem = req.body;
        cashFlowItem.account = req.params.account;
        console.log('cashFlowItem', JSON.stringify(cashFlowItem));   
        const transactions = [];
        const frequency = cashFlowItem.frequency;

        for (let i = 0; i < frequency; i++) {
            transactions[i] = {...cashFlowItem};        
            transactions[i].date = addMonths(new Date(cashFlowItem.date), i);
            console.log("transactions[i] " + JSON.stringify(transactions[i]));
        }

        console.log('transactions', transactions);
        const insertedArr = await CashFlow.insertMany(transactions).catch(err => console.log(JSON.stringify(err)));
        res.status(201).json(insertedArr);
    } catch (error) {
        console.log('error ' + error);
        res.status(400).json({ message: error.message });
    }
}
 
export const updateCashFlowItem = async (req, res) => { //updateIncome
    try {
        console.log('here update income ' + JSON.stringify(req.body));

        const updatedItem = await CashFlow.updateOne({_id:req.params.id}, {$set: req.body});
        res.status(200).json(updatedItem);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}
 
export const deleteCashFlowItem = async (req, res) => { //deleteIncome
    try {
        console.log('here delete income');
        const deletedItem = await CashFlow.deleteOne({_id:req.params.id});
        res.status(200).json(deletedItem);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}