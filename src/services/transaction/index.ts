import {DefaultApi} from "@/services/default";
import {api} from "@/services/api";
import {DashboardModel, TransactionDTO, TransactionModel} from "@/models/transactionModel";

const endpoint = '/api/transaction'

export class ApiTransaction {
    private readonly endpoint: string = endpoint;

    get = async (): Promise<TransactionModel[]> => {
        const {data} = await api.get<TransactionModel[]>(`${this.endpoint}/`)
        return data
    }

    getDashboard = async (): Promise<DashboardModel> => {
        const {data} = await api.get<DashboardModel>(`${this.endpoint}/dashboard/`)
        return data
    }

    create = async (formData: TransactionDTO): Promise<TransactionModel> => {
        const {data} = await api.post<TransactionModel>(`${this.endpoint}`, formData)
        return data
    }

    getById = async (id: string): Promise<TransactionModel | null> => {
        if (id === '') {
            return null;
        }
        const {data} = await api.get<TransactionModel>(`${this.endpoint}/${id}`)
        return data
    }

    update = async (id: string, formData: TransactionDTO): Promise<TransactionModel> => {
        const {data} = await api.put<TransactionModel>(`${this.endpoint}/${id}`, formData)
        return data
    }

    delete = async (id: string) => {
        const {data} = await api.delete<TransactionModel>(`${this.endpoint}/${id}`)
        return data
    }
}