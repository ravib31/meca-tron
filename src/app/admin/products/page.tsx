/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-unescaped-entities */
"use client";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { AgGridReact } from "ag-grid-react";
import Button from "@/components/Button";
import React, { useEffect, useState } from "react";
import axios from "axios";
import AddProduct from "@/components/product/AddUpdateProduct";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/redux/auth/auth-actions";

const Products = () => {
  const { push } = useRouter();
  const dispatch = useDispatch();

  const userId = useSelector((state: any) => state.auth.userId);
  const router = useRouter();

  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState([]);

  const getProducts = async () => {
    try {
      const response = await axios.get("/api/product/get");
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  const colDefs: any = [
    {
      field: "id",
      headerName: "Actions",
      cellRenderer: (params: any) => (
        <div className="flex gap-2 items-center justify-start h-full cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
            xlinkTitle="Edit"
            onClick={() => {
              // console.log("Edit", params.data)
              setSelectedProduct(params.data);
              toggleSidebar();
            }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
            />
          </svg>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
            xlinkTitle="Delete"
            onClick={async () => {
              try {
                let res = await axios.delete(
                  `/api/product/delete?id=${params?.data?._id}`
                );
                if (res.data) {
                  getProducts();
                  toast.success("Product Deleted");
                }
              } catch (error: any) {
                toast.error(error?.errorMsg);
              }
            }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
            />
          </svg>
        </div>
      ),
    },
    {
      field: "image",
      headerName: "Image",
      cellRenderer: (params: any) => (
        <img
          src={params.value.url}
          alt="Product"
          className="size-10 object-cover"
        />
      ),
      autoHeight: true,
    },
    { field: "name", headerName: "Name", flex: 1, filter: true },
    { field: "price", headerName: "Price", filter: true },
    { field: "category", headerName: "Category", filter: true },
  ];

  const [showSidebar, setShowSidebar] = useState(false);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  if (!userId) {
    if (!userId) {
      return (
        <div className="h-screen animate-jump-in flex flex-col items-center justify-center bg-gray-100 p-6">
          <div className="bg-white text-center shadow-md rounded-lg p-8 w-full max-w-sm">
            <h1 className="text-2xl font-semibold text-red-600 mb-4">
              Access Denied
            </h1>
            <p className="text-gray-600 mb-6">
              You need admin permissions to access this page. Please contact
              admin.
            </p>
            <button
              onClick={() => router.push("/")}
              className="bg-red-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-red-700 transition duration-300"
            >
              Go to Homepage
            </button>
          </div>
        </div>
      );
    }
  }

  return (
    <>
      {showSidebar && (
        <AddProduct
          getProducts={getProducts}
          selectedProduct={selectedProduct}
          onAddProduct={toggleSidebar}
        />
      )}
      <div className="flex w-full font-semibold items-center justify-between p-2 border-b-2">
        <div className="text-xl">All Products</div>
        <Button onClick={() => push("/")}>Go to Homepage</Button>
        <Button onClick={toggleSidebar}>Add Product</Button>
      </div>
      <div className="ag-theme-quartz">
        <AgGridReact
          rowData={products}
          columnDefs={colDefs}
          domLayout="autoHeight"
          pagination={products?.length > 20}
          paginationPageSize={20}
        />
      </div>
      <button
        type="submit"
        onClick={() => {
          dispatch(logout());
          router.push("/");
        }}
        className="bg-red-600 text-white p-3 rounded-lg fixed bottom-3 right-3 shadow hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
      >
        Logout
      </button>
    </>
  );
};

export default Products;
