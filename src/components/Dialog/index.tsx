'use client'

import React, {FC, useState} from 'react'
import {Dialog, DialogBackdrop, DialogPanel, DialogTitle, Input, RadioGroup} from '@headlessui/react'
import TextField, {TextFieldModel} from "@/components/TextField";
import {TransactionModel} from "@/components/TransactionTable";
import {CheckCircleIcon, XCircleIcon} from "@heroicons/react/16/solid";

interface TransactionDialogProps {
    isOpen: boolean;
    onClose: () => void;
}

const nameField: TextFieldModel = {name: "Nome"}
const priceField: TextFieldModel = {name: "Preço"}
const categorieField: TextFieldModel = {name: "Categoria"}

const TransactionDialog: FC<TransactionDialogProps> = ({isOpen, onClose}) => {
    const [type, setType] = useState('Entrada');

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
                        <div
                            className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4 m-2 text-center sm:ml-4 sm:mt-0 sm:text-left">
                            <DialogTitle as="h3" className="text-base font-semibold leading-6 text-gray-900">
                                Cadastrar transação
                            </DialogTitle>
                            <div className="my-4">
                                <TextField props={nameField}></TextField>
                                <TextField props={priceField}></TextField>
                                <div className="flex items-center justify-between">
                                    <div
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                                        <input
                                            type="radio"
                                            id="entrada"
                                            name="transactionType"
                                            className="mr-2"
                                            checked={type === 'Entrada'}
                                            onChange={() => setType('Entrada')}
                                        />
                                        <label htmlFor="entrada" className="mr-4">
                                            Entrada
                                        </label>
                                    </div>
                                    <div
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                                        <input
                                            type="radio"
                                            id="saida"
                                            name="transactionType"
                                            className="mr-2"
                                            checked={type === 'Saída'}
                                            onChange={() => setType('Saída')}
                                        />
                                        <label htmlFor="saida">
                                            Saída
                                        </label>
                                    </div>
                                </div>
                                <TextField props={categorieField}></TextField>
                            </div>
                            <button
                                type="button"
                                data-autofocus
                                onClick={onClose}
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