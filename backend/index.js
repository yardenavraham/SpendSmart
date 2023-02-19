import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import IncomeRoute from "./routes/IncomeRoute.js";
import AccountRoute from "./routes/AccountRoute.js";

const app = express();
mongoose.set("strictQuery", false);

//mongoose.connect('mongodb+srv://adi5765:baot@spendsmartdb.olhtfco.mongodb.net/?retryWrites=true&w=majority',{
//mongoose.connect('mongodb://localhost:27017/?readPreference=primary&directConnection=true&ssl=false',{
// mongoose.connect('mongodb://localhost:27017/SpendSmart',{
mongoose.connect('mongodb+srv://adi5765:baot@spendsmartdb.olhtfco.mongodb.net/SpendSmart', {

    useNewUrlParser: true,
    useUnifiedTopology: true
});
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Database Connected...'));

app.use(cors());
app.use(express.json());
app.use(IncomeRoute);
app.use(AccountRoute);

app.listen(27017, () => console.log('Server up and running...'));
