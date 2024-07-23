import Container, {ContainerModel} from "@/components/Container";
import {Header} from "@/components/Header";
import TransactionsTable, {TransactionModel} from "@/components/TransactionTable";
import React from "react";

const transactions: TransactionModel[] = [
    {id: 1, title: 'Desenvolvimento de site', price: 12000, categorie: 'Trabalho', date: '13/04/2021'},
    {id: 2, title: 'Hamburguer', price: -59, categorie: 'Alimentação', date: '10/04/2021'},
    {id: 3, title: 'Aluguel do apartamento', price: -1200, categorie: 'Casa', date: '27/03/2021'},
    {id: 4, title: 'Computador', price: 5400, categorie: 'Venda', date: '15/03/2021'},
];

const containers: ContainerModel[] = [
    {
        id: 1,
        title: 'Entradas',
        value: 17400,
        icon: '/images/input-logo.png',
        backgroundColor: 'bg-white',
        textColor: 'text-black'
    },
    {
        id: 2,
        title: 'Saídas',
        value: 1259,
        icon: '/images/output-logo.png',
        backgroundColor: 'bg-white',
        textColor: 'text-black'
    },
    {
        id: 3,
        title: 'Total',
        value: 16141,
        icon: '/images/total-logo.png',
        backgroundColor: 'bg-income-value',
        textColor: 'text-white'
    }
];

export default function Home() {
    return (
        <>
            <Header/>
            <div className="mx-auto max-w-[1120px] flex justify-between -mt-24 pt-8">
                {containers.map((container) => (
                    <Container key={container.id} container={container}></Container>
                ))}
            </div>
            <TransactionsTable transactions={transactions}/>
            <div className="mb-16"></div>
        </>
    );
}
