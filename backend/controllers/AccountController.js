import CashFlow from "../models/CashFlowModel.js";
import Account from "../models/AccountModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const createAccount = async (req, res) => {
    // console.log('Saving account ' + JSON.stringify(req.body));
    
    try {
        const account = {name: req.body.name, password: req.body.password, partners: req.body.partners};
        const { name } = account;
        const { firstName, lastName, email } = account.partners[0];
        console.log('Saving account ' + name);
        
        if (await Account.exists({name: name})) {
            const message = `An account with the name ${name} already exists`
            console.error(message)
            res.status(409).json({message: message})
            return
        }
        const createdAccount = await new Account(account).save();
        const token = generateToken(createdAccount);
        console.log("token is " + token)
        return res.status(201).json({token: token});
        //console.log('ret ' + JSON.stringify(ret));
    } catch (error) {
        console.log('error ' + JSON.stringify(error));
        res.status(500).json({message: error.message});
    }
}

const TOKEN_KEY = "hcikPpwC3re0D3Q"
export const generateToken = (account) => {
    console.log("Generating token for " + account)
    try {
        const fieldsForToken = {
            accountName: account.name,
            firstName: account.partners[0].firstName,
            lastName: account.partners[0].lastName,
            email: account.partners[0].email,
            partners: account.partners
        };
        return jwt.sign(fieldsForToken, TOKEN_KEY, {expiresIn: "7d"});
    } catch (err) {
        console.error(err)
        throw new Error('Failed to create user token');
    }
}


export const getAccountByName = async (req, res) => {
    console.log(req)
    try {
        const item = await Account.findOne({name: req.name});
        res.status(200).json(item);
    } catch (error) {
        console.error(error)
        res.status(404).json({message: error.message});
    }
}


export const signIntoAccount = async (req, res) => {
    // console.log('Signing into account ' + JSON.stringify(req.body));
    
    try {
        const {name, email, password} = req.body;
        
        const item = await Account.findOne({name: name})
        console.log("item=" + item)
        
        if (!item) {
            res.status(400).json({message: "No account exists"})
            return;
        }
    
        item.comparePassword(password, function (err, isMatch) {
            if (err) {
                console.error(err);
                res.status(500).json({message: err});
                return;
            }
            console.log('Password for account ' + item.name + ' match=' + isMatch);
        
            if (!isMatch) {
                res.status(401).json({message: "Wrong password"});
                return;
            }
            const token = generateToken(item);
            res.status(200).json({token: token});
        });
        
    } catch (error) {
        console.error(error)
        res.status(404).json({message: error.message});
    }
}

//TODO: update password?

export const saveUser = async (req, res) => {

}

export const updateUser = async (req, res) => {

}

export const deleteUser = async (req, res) => {

}

export const getUser = async (req, res) => {

}

export const getCashFlow = async (req, res) => { //getIncomes
    try {
        const cashFlowData = await CashFlow.find();
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
 
export const saveCashFlowItem = async (req, res) => { //saveIncome
    console.log('here save income');
    const cashFlowItem = new CashFlow(req.body);
    console.log('income ' + cashFlowItem);

    try {
        const insertedItem = await cashFlowItem.save();
        res.status(201).json(insertedItem);
    } catch (error) {
        console.log('error ' + JSON.stringify(error));
        res.status(400).json({message: error.message});
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
