import {Payment} from "../src/types/database";
import {merge} from "lodash";

export const submitPayment = (params?: Partial<Payment>): Payment => merge({}, {
    amount: 4,
    bankInfo: {
        accountName: "Demo Account",
        accountNumber: "98765432"
    },
    beneficiary: {
        name: "Dataline Demo Account",
        email: "michael.jones@paytron.com.au"
    },
    reference: "Expenses November 21",
    currency: "AUD",
}, params);
