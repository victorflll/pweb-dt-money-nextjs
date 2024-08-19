import React, {useState} from 'react';
import {TransactionDTO, TransactionModel} from "@/models/transactionModel";
import {TransactionType} from "@/models/transactionEnums";
import {ArrowUpCircleIcon, PencilSquareIcon, TrashIcon} from "@heroicons/react/24/outline";
import TransactionDialog from "@/components/Dialog";
import {useTransaction} from "@/hooks/useTransaction";
import TransactionDeleteDialog from "@/components/Dialog/DeleteDialog";

export interface TransactionTableProps {
    transactions: TransactionModel[];
}

const TransactionsTable: React.FC<TransactionTableProps> = ({transactions}) => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [transactionId, setTransactionId] = useState<string>("");
    const deleteTransaction = useTransaction.Delete();

    const handleUpdate = (id: string) => {
        setTransactionId(id);
        setIsDialogOpen(true);
    }

    const handleDelete = (id: string) => {
        setTransactionId(id);
        setIsDeleteDialogOpen(true);
    };

    return (
        <div className="overflow-x-auto mx-auto max-w-[1120px] pt-8">
            <table className="min-w-full">
                <thead>
                <tr>
                    <th className="w-1/2 px-8 py-4 text-left text-s leading-normal font-light text-gray-400 tracking-wider">Título</th>
                    <th className="w-1/6 px-8 py-4 text-left text-s leading-normal font-light text-gray-400 tracking-wider">Preço</th>
                    <th className="w-1/4 px-8 py-4 text-left text-s leading-normal font-light text-gray-400 tracking-wider">Categoria</th>
                    <th className="w-1/6 px-8 py-4 text-left text-s leading-normal font-light text-gray-400 tracking-wider">Data</th>
                    <th className="w-1/4 px-8 py-4 text-left text-s leading-normal font-light text-gray-400 tracking-wider">Ações</th>
                </tr>
                </thead>
                <tbody className="bg-white divide-y-8 divide-gray-100">
                {transactions.map((transaction) => (
                    <tr key={transaction.id}>
                        <td className="px-8 py-4 whitespace-nowrap font-light">{transaction.title}</td>
                        <td className={`px-8 py-4 whitespace-nowrap font-light ${transaction.type == TransactionType.OUTCOME ? "text-outcome-value" : 'text-income-value'}`}>
                            R$ {transaction.price.toLocaleString('pt-BR', {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2
                        })}
                        </td>
                        <td className="px-8 py-4 whitespace-nowrap text-gray-400 font-light">{transaction.category}</td>
                        <td className="px-8 py-4 whitespace-nowrap text-gray-400 font-light">{new Date(transaction.date).toLocaleString('pt-BR')}</td>
                        <td className="px-8 py-4 items-center justify-center">
                            <button onClick={() => handleUpdate(transaction.id)}>
                                <PencilSquareIcon className="h-6 w-6" color="grey"></PencilSquareIcon>
                            </button>
                        </td>
                        <td className="px-8 py-4 items-center justify-center">
                            <button onClick={() => handleDelete(transaction.id)}>
                                <TrashIcon className="h-6 w-6" color="grey"></TrashIcon>
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <TransactionDialog isOpen={isDialogOpen} onClose={() => setIsDialogOpen(false)} transactionId={transactionId}/>
            <TransactionDeleteDialog isOpen={isDeleteDialogOpen} onClose={() => setIsDeleteDialogOpen(false)} transactionId={transactionId}/>
        </div>
    );
};

export default TransactionsTable;