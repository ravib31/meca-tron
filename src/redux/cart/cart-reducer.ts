import { Product } from "@/utils/interface";
import { ADD_ITEM, CLEAR_CART, DEL_ITEM } from "./cart-action-types";

const cart: Product[] = [];

const CartReducer = (
  state = cart,
  { type, payload }: { type: string; payload: Product }
) => {
  const product = payload;
  switch (type) {
    case CLEAR_CART: {
      return [];
    }
    case ADD_ITEM: {
      const exist = state.find((ele) => ele._id === product?._id);
      if (exist) {
        return state.map((ele) =>
          ele._id === product._id ? { ...ele, qty: (ele.qty || 0) + 1 } : ele
        );
      } else {
        return [...state, { ...product, qty: 1 }];
      }
    }
    case DEL_ITEM: {
      const exist = state.find((ele) => ele._id === product?._id);
      if (exist) {
        if (exist.qty === 1) {
          return state.filter((ele) => ele._id !== product._id);
        } else {
          return state.map((ele) =>
            ele._id === product._id ? { ...ele, qty: (ele.qty || 0) - 1 } : ele
          );
        }
      }
      return state;
    }

    // case REM_ITEM:{
    //     if(exist){
    //         return state.filter((ele)=>ele._id!==product._id)
    //     }
    // }
    default:
      return state;
  }
};

export default CartReducer;
