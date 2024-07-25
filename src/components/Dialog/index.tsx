﻿'use client'

import React, {FC, useState} from 'react'
import {Dialog, DialogBackdrop, DialogPanel, DialogTitle} from '@headlessui/react'
import TextField, {TextFieldModel} from "@/components/TextField";
import {CloseIcon} from "next/dist/client/components/react-dev-overlay/internal/icons/CloseIcon";
import {ArrowDownCircleIcon, ArrowUpCircleIcon} from "@heroicons/react/24/outline";
import {CategoryModel} from "@/mocks/categoryModel";
import {CardType, TransactionModel} from "@/mocks/transactionModel";

interface TransactionDialogProps {
    isOpen: boolean;
    onClose: () => void;
    categories: CategoryModel[];
    handleSubmit: (transaction: TransactionModel) => void;
}

const nameField: TextFieldModel = {name: "Nome"}
const priceField: TextFieldModel = {name: "Preço"}

const TransactionDialog: FC<TransactionDialogProps> = ({isOpen, onClose, categories, handleSubmit}) => {
    const [title, setTitle] = useState<string | "">("");
    const [price, setPrice] = useState<string | "">("");
    const [type, setType] = useState(CardType.credit);
    const [categoryId, setCategoryId] = useState<number | 0>(0);

    const handleForm = () => {
        if (categoryId == 0) {
            return;
        }

        let transaction: TransactionModel = {
            id: 5,
            title: title,
            price: Number(price),
            type: type,
            category: {
                id: categoryId,
                name: categories.reduce((group, item) => {
                    if (categoryId === item.id) {
                        return item.name
                    }
                    return group;
                }, "")
            },
            date: new Date().toLocaleString('pt-BR').split(',')[0],
        }

        console.log(transaction);
        handleSubmit(transaction);
        clear();
        onClose();
    };

    const clear = () => {
        setTitle("");
        setPrice("");
        setCategoryId(0);
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
                            <button className="absolute right-4 top-4" onClick={onClose}><CloseIcon></CloseIcon>
                            </button>
                            <DialogTitle as="h1" className="text-xl font-semibold leading-6 text-gray-900">
                                Cadastrar transação
                            </DialogTitle>
                            <div className="my-4 flex flex-col gap-1.5">
                                <TextField props={nameField}
                                           type={"text"}
                                           value={title}
                                           onChange={(event) => setTitle(event.target.value)}></TextField>
                                <TextField props={priceField}
                                           type={"text"}
                                           value={price}
                                           onChange={(event) => setPrice(event.target.value)}></TextField>
                                <div className="flex items-center justify-between gap-1.5">
                                    <div
                                        className={`bg-gray-200/40 py-4 mt-1 flex justify-center items-center w-full border border-gray-200 rounded-md shadow-sm px-4 ${type === CardType.credit ? "bg-income-value" : 'bg-gray-200/40'}`}>
                                        <input
                                            type="radio"
                                            id="entrada"
                                            name="transactionType"
                                            className="mr-2"
                                            hidden
                                            checked={type === CardType.credit}
                                            onChange={() => setType(CardType.credit)}
                                        />
                                        <div className="flex items-center justify-between gap-1.5">
                                            <ArrowUpCircleIcon className="h-6 w-6"
                                                               color={`${type === CardType.credit ? "white" : 'green'}`}></ArrowUpCircleIcon>
                                            <label htmlFor="entrada"
                                                   className={`mr-4 ${type === CardType.credit ? "text-white" : 'text-green'}`}>
                                                Entrada
                                            </label>
                                        </div>
                                    </div>
                                    <div
                                        className={`bg-gray-200/40 py-4 mt-1 flex justify-center items-center w-full border border-gray-200 rounded-md shadow-sm px-4 ${type === CardType.debit ? "bg-outcome-value" : 'bg-gray-200/40'}`}>
                                        <input
                                            type="radio"
                                            id="saida"
                                            name="transactionType"
                                            className="mr-2"
                                            hidden
                                            checked={type === CardType.debit}
                                            onChange={() => setType(CardType.debit)}
                                        />
                                        <div className="flex items-center justify-between gap-1.5">
                                            <ArrowDownCircleIcon className="h-6 w-6"
                                                                 color={`${type === CardType.debit ? "white" : 'red'}`}></ArrowDownCircleIcon>
                                            <label htmlFor="saida"
                                                   className={`mr-4 ${type === CardType.debit ? "text-white" : 'text-red'}`}>
                                                Saída
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <select
                                    onChange={(event) => setCategoryId(Number(event.target.value))}
                                    className="bg-gray-200/40 py-4 appearance-none mt-1 block w-full border border-gray-200 rounded-md shadow-sm px-4 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                                    <option disabled selected>Categorias</option>
                                    {categories.map(value => (
                                        <option key={value.id} value={value.id}>{value.name}</option>
                                    ))}
                                </select>
                            </div>
                            <button
                                type="button"
                                data-autofocus=""
                                onClick={handleForm}
                                className="w-full rounded-md bg-income-value text-white px-3 py-2 text-sm font-medium shadow-sm hover:bg-gray-500">
                                Cadastrar
                            </button>
                        </div>
                    </DialogPanel>
                </div>
            </div>
        </Dialog>
    )
}

export default TransactionDialog