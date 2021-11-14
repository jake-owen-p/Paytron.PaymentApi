import {DatabaseSchema, Payment} from "../types/database";
import objectPath from 'object-path';
import {v4 as uuid} from 'uuid';
import dayjs from "dayjs";

const Database: DatabaseSchema = {
    balance: 1000,
    payments: {}
};

export const DB = {
    insert: (payment: Payment, balance?: number) => {
        const paymentId = uuid();
        if (balance) {
            Database.balance = balance;
        }
        Database.payments[paymentId] = {
            ...payment,
            createdAt: dayjs().toISOString()
        };
        return paymentId;
    },
    update: (path: string, update: string | object) => {
        objectPath.set(Database, path, update);
    },
    get: (path: string) => {
        return objectPath.get(Database, path);
    },
    bootstrap: (db: Partial<DatabaseSchema>) => {
        if (db.balance) {
            Database.balance = db.balance;
        }
        if (db.payments) {
            Database.payments = db.payments;
        }
    }
}
