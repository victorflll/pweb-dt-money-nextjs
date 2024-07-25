import React from 'react';
import {CardType, TransactionModel} from "@/mocks/transactionModel";

export interface TransactionTableProps {
    transactions: TransactionModel[];
}

const TransactionsTable: React.FC<TransactionTableProps> = ({transactions}) => {
    return (
        <div className="overflow-x-auto mx-auto max-w-[1120px] pt-8">
            <table className="min-w-full">
                <thead>
                <tr>
                    <th className="w-1/2 px-8 py-4 text-left text-s leading-normal font-light text-gray-400 tracking-wider">Título</th>
                    <th className="w-1/6 px-8 py-4 text-left text-s leading-normal font-light text-gray-400 tracking-wider">Preço</th>
                    <th className="w-1/4 px-8 py-4 text-left text-s leading-normal font-light text-gray-400 tracking-wider">Categoria</th>
                    <th className="w-1/6 px-8 py-4 text-left text-s leading-normal font-light text-gray-400 tracking-wider">Data</th>
                </tr>
                </thead>
                <tbody className="bg-white divide-y-8 divide-gray-100">
                {transactions.map((transaction) => (
                    <tr key={transaction.id}>
                        <td className="px-8 py-4 whitespace-nowrap font-light">{transaction.title}</td>
                        <td className={`px-8 py-4 whitespace-nowrap font-light ${transaction.type == CardType.debit ? "text-outcome-value before:content-['-']" : 'text-income-value'}`}>
                            R$ {transaction.price.toLocaleString('pt-BR', {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2
                        })}
                        </td>
                        <td className="px-8 py-4 whitespace-nowrap text-gray-400 font-light">{transaction.category?.name}</td>
                        <td className="px-8 py-4 whitespace-nowrap text-gray-400 font-light">{transaction.date}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default TransactionsTable;