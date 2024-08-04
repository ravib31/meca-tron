/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addCart, clearCart, delCart } from "@/redux/cart/cart-action";
import Link from "next/link";
import Button from "@/components/Button";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { Product } from "@/utils/interface";
import toast from "react-hot-toast";
import Loader from "@/components/Loader";
import { initDetails } from "@/utils/utils";

const Cart = () => {
  const { cart } = useSelector((store: { cart: Product[] }) => store);
  const dispatch = useDispatch();

  const [userDetails, setUserDetails] = useState(initDetails);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setLoading(true);

    const response = await fetch("/api/send-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userDetails, cart }),
    });

    if (response.ok) {
      setLoading(false);
      toast.success("Order placed successfully");
      setUserDetails(initDetails);
      dispatch(clearCart());
    } else {
      toast.error("Failed to place order. Please try again");
    }
  };

  if (loading) {
    return <Loader />;
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center">
        <h1 className="text-2xl mb-4">Your cart is empty</h1>
        <Link href="/" className="animate-bounce">
          <Button>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg>
            Browse products
          </Button>
        </Link>
      </div>
    );
  }

  const total = cart
    ?.map((ele) => (ele?.qty || 1) * ele?.price)
    .reduce((acc, i) => acc + i, 0);

  return (
    <section className="relative z-10 after:contents-[''] after:absolute after:z-0 after:h-full xl:after:w-1/3 after:top-0 after:right-0 after:bg-gray-50">
      <div className="w-full max-w-7xl px-4 md:px-5 lg-6 mx-auto relative z-10">
        <div className="grid grid-cols-12">
          <div className="col-span-12 xl:col-span-8 lg:pr-8 pt-14 pb-8 lg:py-12 w-full max-xl:max-w-3xl max-xl:mx-auto">
            <div className="flex items-center justify-between pb-8 border-b border-gray-300">
              <h2 className="font-manrope font-bold text-3xl leading-10 text-black">
                Shopping Cart
              </h2>
              <h2 className="font-manrope font-bold text-xl leading-8 text-gray-600">
                {cart?.length} Items
              </h2>
            </div>
            <div className="grid grid-cols-12 mt-8 max-md:hidden pb-3 border-b border-gray-200">
              <div className="col-span-12 md:col-span-7">
                <p className="font-normal text-lg leading-8 text-gray-400">
                  Product Details
                </p>
              </div>
              <div className="col-span-12 md:col-span-5">
                <div className="grid grid-cols-5">
                  <div className="col-span-3">
                    <p className="font-normal text-lg leading-8 text-gray-400 text-center">
                      Quantity
                    </p>
                  </div>
                  <div className="col-span-2">
                    <p className="font-normal text-lg leading-8 text-gray-400 text-center">
                      Total
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {cart?.map((item) => (
              <div
                key={item._id}
                className="flex flex-col min-[500px] lg:flex-row min-[500px] items-center gap-5 py-6 border-b border-gray-200 group"
              >
                <div className="w-2/3 h md:max-w-[126px] rounded">
                  <img
                    src={item.image?.url}
                    alt="product-image"
                    className="mx-auto rounded"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-4 w-full">
                  <div className="md:col-span-2">
                    <div className="flex flex-col max-[500px] items-center gap-3">
                      <TextGenerateEffect
                        words={item?.name}
                        className="font-semibold text-2xl leading-7 text-black"
                      />
                      {/* <h6 className="font-normal text-base leading-7 text-gray-500">
                        Perfumes
                      </h6> */}
                      <h6 className="font-medium text-base leading-7 text-gray-600 transition-all duration-300 group-hover:text-red-600">
                        Rs {item.price}
                      </h6>
                    </div>
                  </div>
                  <div className="flex items-center max-[500px] justify-center h-full max-md:mt-3">
                    <div className="flex items-center h-full">
                      <button
                        onClick={() => dispatch(delCart(item))}
                        className="group rounded-l-xl px-5 py-[18px] border border-gray-200 flex items-center justify-center shadow-sm shadow-transparent transition-all duration-500 hover:bg-gray-50 hover:border-gray-300 hover:shadow-gray-300 focus-within:outline-gray-300"
                      >
                        <svg
                          className="stroke-gray-900 transition-all duration-500 group-hover:stroke-black"
                          xmlns="http://www.w3.org/2000/svg"
                          width="22"
                          height="22"
                          viewBox="0 0 22 22"
                          fill="none"
                        >
                          <path
                            d="M16.5 11H5.5"
                            stroke=""
                            strokeWidth="1.6"
                            strokeLinecap="round"
                          />
                          <path
                            d="M16.5 11H5.5"
                            stroke=""
                            strokeOpacity="0.2"
                            strokeWidth="1.6"
                            strokeLinecap="round"
                          />
                          <path
                            d="M16.5 11H5.5"
                            stroke=""
                            strokeOpacity="0.2"
                            strokeWidth="1.6"
                            strokeLinecap="round"
                          />
                        </svg>
                      </button>
                      <input
                        type="text"
                        className="border-y border-gray-200 outline-none text-gray-900 font-semibold text-lg w-full max-w-[73px] min-w-[60px] placeholder:text-gray-900 py-[15px] text-center bg-transparent"
                        value={item?.qty}
                        disabled
                      />
                      <button
                        onClick={() => dispatch(addCart(item))}
                        className="group rounded-r-xl px-5 py-[18px] border border-gray-200 flex items-center justify-center shadow-sm shadow-transparent transition-all duration-500 hover:bg-gray-50 hover:border-gray-300 hover:shadow-gray-300 focus-within:outline-gray-300"
                      >
                        <svg
                          className="stroke-gray-900 transition-all duration-500 group-hover:stroke-black"
                          xmlns="http://www.w3.org/2000/svg"
                          width="22"
                          height="22"
                          viewBox="0 0 22 22"
                          fill="none"
                        >
                          <path
                            d="M11 5.5V16.5M16.5 11H5.5"
                            stroke=""
                            strokeWidth="1.6"
                            strokeLinecap="round"
                          />
                          <path
                            d="M11 5.5V16.5M16.5 11H5.5"
                            stroke=""
                            strokeOpacity="0.2"
                            strokeWidth="1.6"
                            strokeLinecap="round"
                          />
                          <path
                            d="M11 5.5V16.5M16.5 11H5.5"
                            stroke=""
                            strokeOpacity="0.2"
                            strokeWidth="1.6"
                            strokeLinecap="round"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center max-[500px] justify-center md:justify-end max-md:mt-3 h-full">
                    <p className="font-bold text-lg leading-8 text-gray-600 text-center transition-all duration-300 group-hover:text-red-600">
                      ₹ {(item?.qty || 1) * Math.ceil(item?.price)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="col-span-12 xl:col-span-4 bg-gray-50 w-full max-xl:px-6 max-w-3xl xl:max-w-lg mx-auto lg:pl-8 py-12">
            <h2 className="font-manrope font-bold text-3xl leading-10 text-black pb-8 border-b border-gray-300">
              Order Summary
            </h2>
            <div className="mt-4">
              <div className="flex items-center justify-between pb-3">
                <p className="font-normal text-lg leading-8 text-black">
                  {cart?.length} Items
                </p>
                <p className="font-medium text-lg leading-8 text-black">
                  Total ₹ {Math.ceil(total)}
                </p>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="flex flex-col pb-3">
                  <label className="flex  items-center mb-1.5 text-gray-600 text-sm font-medium mt-1.5">
                    Name
                  </label>
                  <div className="relative w-full">
                    <input
                      type="text"
                      className="block w-full min-[500px] p-2.5 text-base font-normal shadow-xs text-gray-900 bg-white border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-gray-400"
                      required
                      placeholder="Enter your name"
                      value={userDetails.name}
                      onChange={(e) =>
                        setUserDetails({ ...userDetails, name: e.target.value })
                      }
                    />
                  </div>
                  <label className="flex  items-center mb-1.5 text-gray-600 text-sm font-medium mt-1.5">
                    Phone
                  </label>
                  <div className="relative w-full">
                    <input
                      type="tel"
                      className="block w-full min-[500px] p-2.5 text-base font-normal shadow-xs text-gray-900 bg-white border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-gray-400"
                      required
                      placeholder="Enter your phone number"
                      value={userDetails.phone}
                      onChange={(e) =>
                        setUserDetails({
                          ...userDetails,
                          phone: e.target.value,
                        })
                      }
                      maxLength={10}
                    />
                  </div>
                  <label className="flex  items-center mb-1.5 text-gray-600 text-sm font-medium mt-1.5">
                    Email
                  </label>
                  <div className="relative w-full">
                    <input
                      type="email"
                      className="block w-full min-[500px] p-2.5 text-base font-normal shadow-xs text-gray-900 bg-white border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-gray-400"
                      required
                      placeholder="Enter your email"
                      value={userDetails.email}
                      onChange={(e) =>
                        setUserDetails({
                          ...userDetails,
                          email: e.target.value,
                        })
                      }
                    />
                  </div>
                  <label className="flex  items-center mb-1.5 text-gray-600 text-sm font-medium mt-1.5">
                    Enter full address
                  </label>
                  <div className="relative w-full">
                    <textarea
                      className="block w-full min-[500px] p-2.5 text-base font-normal shadow-xs text-gray-900 bg-white border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-gray-400"
                      required
                      rows={6}
                      placeholder="Enter your address"
                      value={userDetails.address}
                      onChange={(e) =>
                        setUserDetails({
                          ...userDetails,
                          address: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full text-center bg-red-500 rounded-xl py-3 px-6 font-semibold text-lg text-white transition-all duration-500 hover:bg-red-700"
                >
                  Confirm order
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cart;
