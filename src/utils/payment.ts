import {DB} from "../database";
import {NEGATIVE_BALANCE} from "../constants/dates";

export const getNewBalance = (amount: number) => {
    const balance = DB.get('balance');
    const newBalance = balance - amount;
    if (newBalance < 0) {
        throw new Error(NEGATIVE_BALANCE);
    }
    return newBalance;
}
