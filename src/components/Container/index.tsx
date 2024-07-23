import React from 'react';
import Image from "next/image";

export interface ContainerModel {
    id: number,
    icon: string,
    title: string,
    value: number,
    backgroundColor: string,
    textColor: string
}

export interface ContainerProps {
    container: ContainerModel
}

const Container: React.FC<ContainerProps> = ({container}) => {
    return (
        <div className={`w-[352px] h-[136px] rounded-md ${container.backgroundColor} px-8 pt-6`}>
            <div className='flex justify-between'>
                <div className={`${container.textColor}`}>{container.title}</div>
                <Image src={container.icon} alt="Logo" width={32} height={32}/>
            </div>
            <div className={`${container.textColor} font-medium pt-4 text-3xl`}>R$ {container.value.toLocaleString('pt-BR', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            })}</div>
        </div>
    );
};

export default Container;