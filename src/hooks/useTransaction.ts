import {useMutation, useQuery, useQueryClient} from "react-query";
import {ApiTransaction} from "@/services/transaction";
import {TransactionDTO} from "@/models/transactionModel";

const QUERY_DEFAULT_KEY = 'qkTransaction'
const QUERY_DASHBOARD_KEY = 'qkDashboard'

const api = new ApiTransaction();

export interface UpdateTransactionParams {
    id: string;
    transaction: TransactionDTO;
}

const Get = () => {
    return useQuery([QUERY_DEFAULT_KEY], () => api.get())
}

const GetById = (id: string) => {
    return useQuery([QUERY_DEFAULT_KEY, id], () => api.getById(id));
}

const Create = () => {
    const queryClient = useQueryClient()

    return useMutation((transaction: TransactionDTO) => api.create(transaction), {
        onSuccess: async () => {
            try {
                await queryClient.invalidateQueries(QUERY_DEFAULT_KEY);
                await queryClient.invalidateQueries(QUERY_DASHBOARD_KEY);
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
                    await queryClient.invalidateQueries(QUERY_DEFAULT_KEY);
                    await queryClient.invalidateQueries(QUERY_DASHBOARD_KEY);
                    console.log('Queries invalidated successfully');
                } catch (error) {
                    console.error('Error invalidating queries:', error);
                }
            }
        }
    );
}

const Delete = () => {
    const queryClient = useQueryClient();

    return useMutation(
        (id: string) => api.delete(id),
        {
            onSuccess: () => {
                queryClient.invalidateQueries(QUERY_DEFAULT_KEY);
                queryClient.invalidateQueries(QUERY_DASHBOARD_KEY);
            }
        }
    );
};

const GetDashboard = () => {
    return useQuery([QUERY_DASHBOARD_KEY], () => api.getDashboard())
}

export const useTransaction = {
    Get,
    GetById,
    Create,
    Update,
    Delete,
    GetDashboard,
}