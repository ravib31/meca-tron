import { Product } from "@/utils/interface";
import { ADD_ITEM, DEL_ITEM, CLEAR_CART } from "./cart-action-types";

export const addCart = (product: Product) => ({
  type: ADD_ITEM,
  payload: product,
});

export const delCart = (product: Product) => ({
  type: DEL_ITEM,
  payload: product,
});

export const clearCart = () => ({ type: CLEAR_CART });

// export const remCart=(product: Product)=>({type:REM_ITEM,payload:product})
