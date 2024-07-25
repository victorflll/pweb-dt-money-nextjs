import {categories, CategoryModel} from "@/mocks/categoryModel";

export enum CardType {
    credit,
    debit
}
export interface TransactionModel {
    id: number,
    title: string,
    price: number,
    category: CategoryModel | null,
    type: CardType,
    date: string,
}

export const transactionsMock: TransactionModel[] = [
    {
        id: 1,
        title: 'Desenvolvimento de site',
        price: 12000,
        category: categories[0],
        date: '13/04/2021',
        type: CardType.credit
    },
    {id: 2, title: 'Hamburguer', price: 59, category: categories[1], date: '10/04/2021', type: CardType.debit},
    {
        id: 3,
        title: 'Aluguel do apartamento',
        price: 1200,
        category: categories[2],
        date: '27/03/2021',
        type: CardType.debit
    },
    {id: 4, title: 'Computador', price: 5400, category: categories[3], date: '15/03/2021', type: CardType.credit},
];