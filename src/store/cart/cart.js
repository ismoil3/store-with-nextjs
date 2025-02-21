import { api } from "@/config/config";
import axiosRequest from "@/utils/axiosRequest";
import { create } from "zustand";

export const useCartStore = create((set, get) => ({
    addProductToCart: async (id) => {
        try {
            await axiosRequest.post(`${api}/Cart/add-product-to-cart?id=${id}`)
        } catch (error) {
            console.log(error);

        }
    },
    productsFromCart: [],
    getProductsFromCart: async () => {
        try {
            const { data } = await axiosRequest.get(`${api}/Cart/get-products-from-cart`)
            console.log(data.data[0].productsInCart);

            set({ productsFromCart: data.data[0].productsInCart })

        } catch (error) {

        }
    }
}))