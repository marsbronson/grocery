import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";

const baseUrl = "http://localhost:3001/grocery";

export const useGroceryApi = () => {
    const getGroceryList = useQuery({
        queryKey: ["grocery"],
        queryFn: () => {
        return axios(baseUrl);
        },
    });

    const addGrocery = useMutation((grocery: GroceryItem) => {
        return axios.post(baseUrl, grocery);
    },
    {
        onSuccess: () => {
            getGroceryList.refetch();
        },
    });
    const updateGrocery = useMutation((grocery: GroceryItem) => {
        return axios.put(`${baseUrl}/${grocery.id}`, grocery);
    }
    ,
    {
        onSuccess: () => {
            getGroceryList.refetch();
        },
    });
    const deleteGrocery = useMutation((grocery: GroceryItem) => {
        return axios.delete(`${baseUrl}/${grocery.id}`);
    }
    ,
    {
        onSuccess: () => {
            getGroceryList.refetch();
        },
    });
    return { getGroceryList, addGrocery, updateGrocery, deleteGrocery };
    }