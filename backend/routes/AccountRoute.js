import express from "express";
import {getAccountByName, createAccount, signIntoAccount} from "../controllers/AccountController.js";
const router = express.Router();

router.post('/signup', createAccount);
router.post('/signin', signIntoAccount);
router.get('/account/:name', getAccountByName);
// router.get('/CashFlow/:id', getCashFlowById);
// router.patch('/CashFlow/:id', updateCashFlowItem);
// router.delete('/CashFlow/:id', deleteCashFlowItem);
 
export default router;


