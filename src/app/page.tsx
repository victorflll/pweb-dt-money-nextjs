'use client'

import Container from "@/components/Container";
import {Header} from "@/components/Header";
import TransactionsTable from "@/components/TransactionTable";
import React from "react";
import {ArrowDownCircleIcon, ArrowUpCircleIcon, CurrencyDollarIcon} from "@heroicons/react/24/outline";
import {categories} from "@/mocks/categoryModel";
import {CardType, TransactionModel, transactionsMock} from "@/mocks/transactionModel";
import {ContainerModel} from "@/mocks/containerModel";

export default function Home() {
    const [transactions, setTransactions] = React.useState<TransactionModel[]>(transactionsMock);

    const containersMock: ContainerModel[] = [
        {
            id: 1,
            title: 'Entradas',
            value: transactions.reduce((group, item) => {
                if (item.type === CardType.credit) {
                    group += item.price
                }
                return group;
            }, 0),
            icon: <ArrowUpCircleIcon className="h-8 w-8" color="green"></ArrowUpCircleIcon>,
            backgroundColor: 'bg-white',
            textColor: 'text-black'
        },
        {
            id: 2,
            title: 'Saídas',
            value: transactions.reduce((group, item) => {
                if (item.type === CardType.debit) {
                    group += item.price
                }
                return group;
            }, 0),
            icon: <ArrowDownCircleIcon className="h-8 w-8" color="red"></ArrowDownCircleIcon>,
            backgroundColor: 'bg-white',
            textColor: 'text-black'
        },
        {
            id: 3,
            title: 'Total',
            value: transactions.reduce((group, item) => {
                group += item.price
                return group;
            }, 0),
            icon: <CurrencyDollarIcon className="h-8 w-8" color="white"></CurrencyDollarIcon>,
            backgroundColor: 'bg-income-value',
            textColor: 'text-white'
        }
    ];
    
    const handleSubmit = (entry: TransactionModel) => {
        setTransactions((prev) => [...prev, entry]);
    }

    return (
        <>
            <Header categories={categories} handleSubmit={handleSubmit}/>
            <div className="mx-auto max-w-[1120px] flex justify-between -mt-24 pt-6">
                {containersMock.map((container) => (
                    <Container key={container.id} container={container}></Container>
                ))}
            </div>
            <TransactionsTable transactions={transactions}/>
            <div className="mb-16"></div>
        </>
    );
}
