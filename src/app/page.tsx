'use client'

import Container from "@/components/Container";
import {Header} from "@/components/Header";
import TransactionsTable from "@/components/TransactionTable";
import React from "react";
import {ArrowDownCircleIcon, ArrowUpCircleIcon, CurrencyDollarIcon} from "@heroicons/react/24/outline";
import {ContainerModel} from "@/mocks/containerModel";
import {DashboardModel, TransactionModel} from "@/mocks/transactionModel";

export default function Home() {
    const [dashboard, setDashboard] = React.useState<DashboardModel>();
    const [transactions, setTransactions] = React.useState<TransactionModel[]>([]);

    const containersMock: ContainerModel[] = [
        {
            title: 'Entradas',
            value: dashboard?.entry ?? 0,
            icon: <ArrowUpCircleIcon className="h-8 w-8" color="green"></ArrowUpCircleIcon>,
            backgroundColor: 'bg-white',
            textColor: 'text-black'
        },
        {
            title: 'Saídas',
            value: dashboard?.outcome ?? 0,
            icon: <ArrowDownCircleIcon className="h-8 w-8" color="red"></ArrowDownCircleIcon>,
            backgroundColor: 'bg-white',
            textColor: 'text-black'
        },
        {
            title: 'Total',
            value: dashboard?.total ?? 0,
            icon: <CurrencyDollarIcon className="h-8 w-8" color="white"></CurrencyDollarIcon>,
            backgroundColor: 'bg-income-value',
            textColor: 'text-white'
        }
    ];

    return (
        <>
            <Header isUpdate={false}/>
            <div className="mx-auto max-w-[1120px] flex justify-between -mt-24 pt-6">
                {containersMock.map((container, index) => (
                    <Container key={index} container={container}></Container>
                ))}
            </div>
            <TransactionsTable transactions={transactions}/>
            <div className="mb-16"></div>
        </>
    );
}
