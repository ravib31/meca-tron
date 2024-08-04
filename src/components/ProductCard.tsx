/* eslint-disable @next/next/no-img-element */
import { truncateText } from "@/utils/utils";
import React from "react";
import Button from "./Button";
import { Product } from "@/utils/interface";
import { useDispatch, useSelector } from "react-redux";
import { addCart } from "@/redux/cart/cart-action";
import toast from "react-hot-toast";

const ProductCard = ({ item }: { item: Product }) => {
  const cart = useSelector((state: any) => state.cart);

  const dispatch = useDispatch();

  const handleCart = (data: Product) => {
    toast.success(`"${data?.name}" added to cart`);
    dispatch(addCart(data));
  };
  return (
    <div className="flex flex-col rounded-lg shadow-lg bg-gray-200">
      <img
        className="h-80 w-full object-cover"
        src={item.image.url}
        alt="product-image"
      />
      <div className="p-5 flex flex-col items-center flex-grow">
        <p className="text-lg font-bold mb-2">{truncateText(item.name, 25)}</p>
        <p className="text-gray-700 mb-2">Rs {item.price}</p>
        <Button onClick={() => handleCart(item)}>Add to Cart</Button>
      </div>
    </div>
  );
};

export default ProductCard;
