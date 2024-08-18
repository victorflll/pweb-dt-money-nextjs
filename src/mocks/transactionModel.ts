import {TransactionCategory, TransactionType} from "@/mocks/transactionEnums";


export interface TransactionModel {
    id: number,
    title: string,
    price: number,
    category: string,
    type: string,
    date: string,
    createdAt: string,
    updatedAt: string,
}

export interface TransactionDTO {
    title: string,
    price: number,
    category: TransactionCategory,
}

export interface DashboardModel {
    entry: number,
    outcome: number,
    total: number,
}