'use client'

import Image from "next/image";
import TransactionDialog from "@/components/Dialog";
import {FC, useState} from "react";
import {TransactionDTO} from "@/models/transactionModel";

interface HeaderProps {
    isUpdate: boolean;
}

export const Header: FC<HeaderProps> = ({isUpdate = false}) => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    return (
        <header className="bg-header w-full h-[212px]">
            <div className="mx-auto max-w-[1120px] flex justify-between pt-8">
                <Image className="max-h-10" src="/images/logo.png" alt="Logo" width={172} height={40}/>
                <button
                    className="bg-button text-white size-4 w-[197px] px-5 py-6 rounded-md text-center flex items-center justify-center hover:opacity-80"
                    onClick={() => setIsDialogOpen(true)}>Nova Transação
                </button>
                <TransactionDialog isOpen={isDialogOpen} onClose={() => setIsDialogOpen(false)}
                                   transactionId={null}/>
            </div>
        </header>)
}

