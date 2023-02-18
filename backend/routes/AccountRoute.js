import express from "express";
import {getAccountByName, saveAccount} from "../controllers/AccountController.js";
const router = express.Router();

router.post('/account', saveAccount);
router.get('/account/:name', getAccountByName);
// router.get('/CashFlow/:id', getCashFlowById);
// router.patch('/CashFlow/:id', updateCashFlowItem);
// router.delete('/CashFlow/:id', deleteCashFlowItem);
 
export default router;


