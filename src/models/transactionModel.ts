export interface TransactionModel {
    id: string,
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
    category: number,
}

export interface DashboardModel {
    entry: number,
    outcome: number,
    total: number,
}