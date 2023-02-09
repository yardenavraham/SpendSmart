import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import IncomeRoute from "./routes/IncomeRoute.js";
 
const app = express();
mongoose.set("strictQuery", false);

mongoose.connect('mongodb+srv://adi5765:baot@spendsmartdb.olhtfco.mongodb.net/?retryWrites=true&w=majority',{
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const db = mongoose.connection;
db.on('error', (error) => console.log(error));
db.once('open', () => console.log('Database Connected...'));
 
app.use(cors());
app.use(express.json());
app.use(IncomeRoute);
 
app.listen(4000, ()=> console.log('Server up and running...'));
