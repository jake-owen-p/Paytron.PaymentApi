import express from "express";
import {getPayment, getPayments, submitPayment, updatePayment} from "./api/controllers/paymentApi";
import {errorHandler} from "./api/middleware/errorHandler";
import {getBalance} from "./api/controllers/balanceApi";

const app = express();
const port = 8080;

app.use(express.json());

submitPayment(app);
getPayments(app);
getPayment(app);
updatePayment(app);
getBalance(app);

app.use(errorHandler);

app.listen( port, () => {
    console.log( `server started at http://localhost:${ port }` );
} );
