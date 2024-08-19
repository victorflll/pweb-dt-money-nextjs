'use client'

import React, {FC, useEffect, useState} from 'react'
import {Dialog, DialogBackdrop, DialogPanel, DialogTitle} from '@headlessui/react'
import TextField, {TextFieldModel} from "@/components/TextField";
import {CloseIcon} from "next/dist/client/components/react-dev-overlay/internal/icons/CloseIcon";
import {ArrowDownCircleIcon, ArrowUpCircleIcon} from "@heroicons/react/24/outline";
import {TransactionCategory, TransactionType} from "@/models/transactionEnums";
import {TransactionDTO} from "@/models/transactionModel";
import {UpdateTransactionParams, useTransaction} from "@/hooks/useTransaction";

interface TransactionDialogProps {
    isOpen: boolean;
    onClose: () => void;
    transactionId: string | null;
}

const nameField: TextFieldModel = {name: "Nome"}
const priceField: TextFieldModel = {name: "Preço"}

const TransactionDialog: FC<TransactionDialogProps> = ({isOpen, onClose, transactionId = null}) => {
    const categories = Object.entries(TransactionCategory).map(([key, value]) => ({
        label: value as string,
        value: key,
    }));

    const [title, setTitle] = useState<string | "">("");
    const [price, setPrice] = useState<string | "">("");
    const [type, setType] = useState(TransactionType.ENTRY);
    const [categoryId, setCategoryId] = useState<number | null>(null);

    const isUpdate = transactionId !== null;

    const createTransaction = useTransaction.Create();
    const updateTransaction = useTransaction.Update();

    const transactionToUpdate = isUpdate ? useTransaction.GetById(transactionId).data : null;

    useEffect(() => {
        if (isUpdate) {
            if (transactionToUpdate != null) {
                setTitle(transactionToUpdate.title || "");
                setPrice(transactionToUpdate.price < 0 ? (transactionToUpdate.price * -1).toString() : transactionToUpdate.price.toString() || "");
                setCategoryId(categories.findIndex((item) => item.label === transactionToUpdate.category) || null);
                setType(transactionToUpdate.price >= 0 ? TransactionType.ENTRY : TransactionType.OUTCOME);
            }
        }
    }, [transactionId, isUpdate, transactionToUpdate]);

    const handleForm = () => {
        if (categoryId == null) {
            return;
        }

        let transaction: TransactionDTO = {
            title: title,
            price: type === TransactionType.ENTRY ? Number(price) : Number(price) * -1,
            category: categoryId,
        }

        if (isUpdate) {
            const pamars: UpdateTransactionParams = {
                id: transactionId!,
                transaction: transaction,
            }
            updateTransaction.mutate(pamars);
        } else {
            createTransaction.mutate(transaction);
        }

        clear();
        onClose();
    };

    const clear = () => {
        setTitle("");
        setPrice("");
        setCategoryId(null);
    }

    const dispose = () => {
        if (!isUpdate) clear();
        onClose();
    }

    return (
        <Dialog open={isOpen} onClose={onClose} className="relative z-10">
            <DialogBackdrop
                transition
                className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
            />

            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <DialogPanel
                        transition
                        className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95">
                        <div className="bg-white px-8 pb-8 pt-16 sm:text-left relative">
                            <button className="absolute right-4 top-4" onClick={dispose}><CloseIcon/></button>
                            <DialogTitle as="h1" className="text-xl font-semibold leading-6 text-gray-900">
                                {isUpdate ? 'Editar transação' : 'Cadastrar transação'}
                            </DialogTitle>
                            <div className="my-4 flex flex-col gap-1.5">
                                <TextField props={nameField}
                                           type={"text"}
                                           value={title}
                                           onChange={(event) => setTitle(event.target.value)}/>
                                <TextField props={priceField}
                                           type={"text"}
                                           value={price}
                                           onChange={(event) => setPrice(event.target.value)}/>
                                <div className="flex items-center justify-between gap-1.5">
                                    <div
                                        className={`bg-gray-200/40 py-4 mt-1 flex justify-center items-center w-full border border-gray-200 rounded-md shadow-sm px-4 ${type === TransactionType.ENTRY ? "bg-income-value" : 'bg-gray-200/40'}`}>
                                        <input
                                            type="radio"
                                            id="entrada"
                                            name="transactionType"
                                            className="mr-2"
                                            hidden
                                            checked={type === TransactionType.ENTRY}
                                            onChange={() => setType(TransactionType.ENTRY)}
                                        />
                                        <div className="flex items-center justify-between gap-1.5">
                                            <ArrowUpCircleIcon className="h-6 w-6"
                                                               color={`${type === TransactionType.ENTRY ? "white" : 'green'}`}/>
                                            <label htmlFor="entrada"
                                                   className={`mr-4 ${type === TransactionType.ENTRY ? "text-white" : 'text-green'}`}>
                                                Entrada
                                            </label>
                                        </div>
                                    </div>
                                    <div
                                        className={`bg-gray-200/40 py-4 mt-1 flex justify-center items-center w-full border border-gray-200 rounded-md shadow-sm px-4 ${type === TransactionType.OUTCOME ? "bg-outcome-value" : 'bg-gray-200/40'}`}>
                                        <input
                                            type="radio"
                                            id="saida"
                                            name="transactionType"
                                            className="mr-2"
                                            hidden
                                            checked={type === TransactionType.OUTCOME}
                                            onChange={() => setType(TransactionType.OUTCOME)}
                                        />
                                        <div className="flex items-center justify-between gap-1.5">
                                            <ArrowDownCircleIcon className="h-6 w-6"
                                                                 color={`${type === TransactionType.OUTCOME ? "white" : 'red'}`}/>
                                            <label htmlFor="saida"
                                                   className={`mr-4 ${type === TransactionType.OUTCOME ? "text-white" : 'text-red'}`}>
                                                Saída
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <select
                                    onChange={(event) => setCategoryId(Number(event.target.value))}
                                    value={categoryId}
                                    className="bg-gray-200/40 py-4 appearance-none mt-1 block w-full border border-gray-200 rounded-md shadow-sm px-4 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                                    <option value="" disabled>Categorias</option>
                                    {categories.map((value, index) => (
                                        <option key={value.value} value={index}>{value.label}</option>
                                    ))}
                                </select>
                            </div>
                            <button
                                type="button"
                                data-autofocus=""
                                onClick={handleForm}
                                className="w-full rounded-md bg-income-value text-white px-3 py-2 text-sm font-medium shadow-sm hover:bg-gray-500">
                                {isUpdate ? 'Editar' : 'Cadastrar'}
                            </button>
                        </div>
                    </DialogPanel>
                </div>
            </div>
        </Dialog>
    )
}

export default TransactionDialog