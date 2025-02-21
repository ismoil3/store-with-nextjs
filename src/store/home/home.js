import { api } from "@/config/config"
import axiosRequest from "@/utils/axiosRequest"
import axios from "axios"
import { create } from "zustand"
export const useHomeStore = create((set) => ({
    categories: [],
    getCategories: async () => {
        try {
            const { data } = await axios.get(`${api}/Category/get-categories`)
            set({ categories: data.data })
        } catch (error) {
            console.log(error);
        }
    },
    products: [],
    getProducts: async () => {
        try {
       const {data} = await axiosRequest.get(`${api}/Product/get-products`)
       set({ products: data.data.products })
        } catch (error) {
            console.error(error);
        }
    }
}))