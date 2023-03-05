import CashFlow from "../models/CashFlowModel.js";
import Account, {encryptPassword} from "../models/AccountModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import multer from 'multer';

const DIR = './uploads';//'../uploads/';//'/Users/adi.mansbach/Documents/SpendSmartNew/SpendSmart/backend/uploads';
let image1;

const storage = 
console.log('in multer');    
multer.diskStorage({
    destination: (req, file, cb) => {
        console.log('destination');
        if (!fs.existsSync(DIR)) {
            console.log('nottt');
            fs.mkdirSync(DIR);
        }
        console.log('storage');
        cb(null, DIR);
    },
    filename: (req, file, cb) => {
        console.log('file.originalname', file.originalname);
        // const fileName = file.originalname.toLowerCase().split(' ').join('-');
        // cb(null, uuidv4() + '-' + fileName)
        cb(null, file.originalname + '-' + Date.now())

    }
});

// Multer Filter
// const multerFilter = (req, file, cb) => {
//     console.log('file.mimetype ', file.mimetype);
//     if (file.mimetype.split("/")[1] === "pdf") {
//       cb(null, true);
//     } else {
//       cb(new Error("Not a PDF File!!"), false);
//     }
//   };

const upload = multer({
    storage
    // limits: { fileSize: 1000000 * 5 },
    // fileFilter: multerFilter
  });//.single(image1);

export const uploadImage = async (req, res) => {
    upload.single('file')(req, res, (err) => {
        if(err) {
            res.status(400).send("Something went wrong!");
        }
        res.send(req.file);
        console.log('req.file', req.file);

        // console.log(req.file.mimetype);
        // console.log(req.file.path);
        console.log('req.body', req.body);

                   

        // console.log('res', res);
    })
    
}


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

const uu = async(image) => {
    console.log('uu');
    return image.name;
}




export const updateAccount = async (req, res) => {
    console.log('before');
    console.log('res.data ', res.data);
    //const {image} = req.body;

    image1 = req.image;
    console.log('image1', image1);
//     handleMultipartData(req, res, (err) => {
//         console.log('after');
//         if(err) {
//        res.status(400).send("Something went wrong!");
//      }
//     //  console.log('res', res);
//      res.send(req.file);
//    });

    upload.single(req.image)(req, res, function (err) {
        console.log('after');
        if (err instanceof multer.MulterError) {
            console.log('err1', err);
            // A Multer error occurred when uploading.
        } else if (err) {
            console.log('err2');

            res.send(err)

            // An unknown error occurred when uploading.
        }
        else{
            //res.send("Success, Image uploaded!")

            console.log('req', req.body);

            // const imagePath = '/uploads/' + req.file.filename;

            // console.log('imagePath ', imagePath);
        }
        // Everything went fine. 
        // next()
    })

 };

// export const updateAccount = async (req, res) => {
    // try{
    //     console.log('req.body ' + JSON.stringify(req.body));


    //     const updatedFields = req.body;
                
        // if (updatedFields.password != null) {
        //     if (updatedFields.oldPassword == null) {
        //         res.status(400).json({message: "Old password was not provided"});
        //         return;
        //     }
            
        //     const account = await Account.findOne({_id:req.params.id});
        //     // console.log("found " + JSON.stringify(account))
        //     const isMatch = await account.comparePassword(updatedFields.oldPassword);
        //     // console.log("password match = " + isMatch)
        //     if (!isMatch) {
        //         res.status(400).json({message: "Old password does not match"});
        //         return;
        //     }
            
        //     try {
        //         updatedFields.password = await encryptPassword(updatedFields.password);
        //         console.log("Encrypted password " + updatedFields.password)
        //     } catch (error) {
        //         console.error(error)
        //         res.status(501).json({message: error.message});
        //         return
        //     }
        // }

        // console.log('before');
        // const res = await upload.single(req.body.image);
        // console.log('req.file', JSON.stringify(req.file));
        //upload.single(req.body.image), function (req, res, error){//(req, res, async (error) => {
    //         uu (req, res, async (error) => {//(req, res, async (error) => {
    //         console.log('after');
    //     //handleMultipartData(req, res, async (err) => {
    //         if (error) {
    //           res.json({ msgs: error.message });
    //         }
        
    //         res.json({
    //           body: req.body,
    //           file: req.file,
    //         });
    //         console.log('res ' + res.file);


    //         updatedFields.image = res.file;
    //         console.log('updatedFields1 ' + JSON.stringify(updatedFields));



    //         //const updatedItem = await Account.findOneAndUpdate({_id:req.params.id}, {$set: updatedFields}, {new: true});
    //         // console.log('here after update ' + JSON.stringify(updatedItem));
    //         // res.status(200).json(updatedItem);


    //    });
    
        
        
//     } catch (error) {
//         console.error('error ' + JSON.stringify(error));
//         res.status(400).json({message: error.message});
//     }
    
// }


// export const updateAccount = async (req, res) => {
//     try{
//         const updatedFields = req.body;
//         // console.log('req.body ' + JSON.stringify(updatedFields));
        
//         if (updatedFields.password != null) {
//             if (updatedFields.oldPassword == null) {
//                 res.status(400).json({message: "Old password was not provided"});
//                 return;
//             }
            
//             const account = await Account.findOne({_id:req.params.id});
//             // console.log("found " + JSON.stringify(account))
//             const isMatch = await account.comparePassword(updatedFields.oldPassword);
//             // console.log("password match = " + isMatch)
//             if (!isMatch) {
//                 res.status(400).json({message: "Old password does not match"});
//                 return;
//             }
            
//             try {
//                 updatedFields.password = await encryptPassword(updatedFields.password);
//                 console.log("Encrypted password " + updatedFields.password)
//             } catch (error) {
//                 console.error(error)
//                 res.status(501).json({message: error.message});
//                 return
//             }
//         }
        
//         const updatedItem = await Account.findOneAndUpdate({_id:req.params.id}, {$set: updatedFields}, {new: true});
//         console.log('here after update ' + JSON.stringify(updatedItem));
//         res.status(200).json(updatedItem);
        
        
//     } catch (error) {
//         console.error('error ' + JSON.stringify(error));
//         res.status(400).json({message: error.message});
//     }
    
// }

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
