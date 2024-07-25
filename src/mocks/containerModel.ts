import {ReactNode} from "react";

export interface ContainerModel {
    id: number,
    icon: ReactNode,
    title: string,
    value: number,
    backgroundColor: string,
    textColor: string
}