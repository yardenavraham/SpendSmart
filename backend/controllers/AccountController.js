import CashFlow from "../models/CashFlowModel.js";
import Account, {encryptPassword} from "../models/AccountModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
// import multer from 'multer';
// const DIR = '../../backend/uploads/';

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, DIR);
//     },
//     filename: (req, file, cb) => {
//         const fileName = file.originalname.toLowerCase().split(' ').join('-');
//         cb(null, uuidv4() + '-' + fileName)
//     }
// });

// const upload = multer({
//     storage: storage,
//     fileFilter: (req, file, cb) => {
//         if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
//             cb(null, true);
//             console.log('storage ' + JSON.stringify(storage));
//         } else {
//             cb(null, false);
//             console.log('storage else ' + JSON.stringify(storage));

//             return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
//         }
//     }
// });

export const createAccount = async (req, res) => {
    // console.log('Saving account ' + JSON.stringify(req.body));
    
    try {
        const account = {name: req.body.name, password: req.body.password, partners: req.body.partners};
        const { name } = account;
        const { firstName, lastName, email, image } = account.partners[0];
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
            id: account._id,
            password: account.password,
            accountName: account.name,
            // firstName: account.partners[0].firstName,
            // lastName: account.partners[0].lastName,
            // email: account.partners[0].email,
            users: account.partners.map(item => item.firstName)
        };
        return jwt.sign(fieldsForToken, TOKEN_KEY, {expiresIn: "7d"});
    } catch (err) {
        console.error(err)
        throw new Error('Failed to create user token');
    }
}

export const getAccountById = async (req, res) => {
    console.log(req)
    try {
        const item = await Account.findOne({id: req.id});
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
            res.status(400).json({message: `Account ${name} does not exist`})
            return;
        }
    
        try {
            const isMatch = await item.comparePassword(password);
            console.log("password match = " + isMatch)
            if (!isMatch) {
                res.status(401).json({message: "Password does not match"});
                return;
            }
        } catch (err) {
            res.status(501).json({message: err});
            return;
        }
        
        const token = generateToken(item);
        return res.status(200).json({token: token});
        
    } catch (error) {
        console.error(error)
        res.status(404).json({message: error.message});
    }
}

export const updateAccount = async (req, res) => {
    try{
        const updatedFields = req.body;
        // console.log('req.body ' + JSON.stringify(updatedFields));
        
        if (updatedFields.password != null) {
            if (updatedFields.oldPassword == null) {
                res.status(400).json({message: "Old password was not provided"});
                return;
            }
            
            const account = await Account.findOne({_id:req.params.id});
            // console.log("found " + JSON.stringify(account))
            const isMatch = await account.comparePassword(updatedFields.oldPassword);
            // console.log("password match = " + isMatch)
            if (!isMatch) {
                res.status(400).json({message: "Old password does not match"});
                return;
            }
            
            try {
                updatedFields.password = await encryptPassword(updatedFields.password);
                console.log("Encrypted password " + updatedFields.password)
            } catch (error) {
                console.error(error)
                res.status(501).json({message: error.message});
                return
            }
        }
        
        const updatedItem = await Account.findOneAndUpdate({_id:req.params.id}, {$set: updatedFields}, {new: true});
        console.log('here after update ' + JSON.stringify(updatedItem));
        res.status(200).json(updatedItem);
        
        
    } catch (error) {
        console.error('error ' + JSON.stringify(error));
        res.status(400).json({message: error.message});
    }
    
}

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
