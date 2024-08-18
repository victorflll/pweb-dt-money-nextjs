import {useMutation, useQuery, useQueryClient} from "react-query";
import {ApiTransaction} from "@/services/transaction";
import {TransactionDTO} from "@/models/transactionModel";

const QUERY_KEY = 'qkTransaction'

const api = new ApiTransaction();

interface UpdateTransactionParams {
    id: string;
    transaction: TransactionDTO;
}

const Get = () => {
    return useQuery([QUERY_KEY], () => api.get())
}

const GetById = (id: string) => {
    return useQuery([QUERY_KEY], () => api.getById(id))
}

const Create = () => {
    const queryClient = useQueryClient()

    return useMutation((transaction: TransactionDTO) => api.create(transaction), {
        onSuccess: async () => {
            try {
                await queryClient.invalidateQueries(QUERY_KEY);
                console.log('Queries invalidated successfully');
            } catch (error) {
                console.error('Error invalidating queries:', error);
            }
        }
    });
}

const Update = () => {
    const queryClient = useQueryClient()

    return useMutation(
        ({id, transaction}: UpdateTransactionParams) => api.update(id, transaction), {
            onSuccess: async () => {
                try {
                    await queryClient.invalidateQueries(QUERY_KEY);
                    console.log('Queries invalidated successfully');
                } catch (error) {
                    console.error('Error invalidating queries:', error);
                }
            }
        }
    );
}

const Delete = (id: string) => {
    return useQuery([QUERY_KEY], () => api.delete(id))
}

const GetDashboard = () => {
    return useQuery(['qkDashboard'], () => api.getDashboard())
}

export const useTransaction = {
    Get,
    GetById,
    Create,
    Update,
    Delete,
    GetDashboard,
}