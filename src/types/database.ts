export type DatabaseSchema = {
    balance: number,
    payments: Record<string, PaymentDb>
};

export interface Payment {
    amount: number;
    bankInfo: {
        accountName: string;
        accountNumber: string;
    },
    beneficiary: {
        name: string;
        email: string;
    },
    payDate?: string;
    reference: string;
    currency: string;
    createdAt?: string;
}

export type PaymentDb = {
    updatedAt?: string
} & Payment;
