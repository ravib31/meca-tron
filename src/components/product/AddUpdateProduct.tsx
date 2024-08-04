import React, { useEffect, useState } from "react";
import axios from "axios";
import Button from "../Button";
import InputField from "../InputField";
import FileBase64 from "react-file-base64";
import toast from "react-hot-toast";
import Loader from "../Loader";

interface ProductFormData {
  name: string;
  price: string;
  category: string;
  image: string;
  [key: string]: string;
}

const inputFields = [
  { id: "name", label: "Name", type: "text" },
  { id: "price", label: "Price", type: "number" },
  { id: "category", label: "Category", type: "text" },
];

const initProduct = {
  name: "",
  price: "",
  category: "",
  image: "",
};

interface AddProductProps {
  onAddProduct: () => void;
  selectedProduct?: any;
  getProducts: any;
}

const AddProduct: React.FC<AddProductProps> = ({
  onAddProduct,
  selectedProduct,
  getProducts,
}) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<ProductFormData>(initProduct);
  useEffect(() => {
    if (selectedProduct?._id) {
      setFormData(selectedProduct);
    }
  }, [selectedProduct]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    try {
      let res;
      if (selectedProduct?._id) {
        res = await axios.patch("/api/product/update", formData);
      } else {
        res = await axios.post("/api/product/create", formData);
      }
      if (res.data) {
        setLoading(false);
        getProducts();
        onAddProduct();
        setFormData(initProduct);
      }
    } catch (error: any) {
      setLoading(false);
      toast.error(error?.errorMsg);
      console.error("Error adding product:", error);
    }
  };

  return (
    <div className="fixed z-50 top-0 right-0 h-full w-96 bg-white shadow-lg">
      <h2 className="text-xl font-semibold mb-2 border-b-2 p-3">Add Product</h2>
      {loading ? (
        <Loader />
      ) : (
        <div className="p-3 border-b border-gray-200">
          <form className="h-full" onSubmit={handleSubmit}>
            {inputFields.map((field) => (
              <InputField
                key={field.id}
                id={field.id}
                label={field.label}
                type={field.type}
                value={formData[field.id]}
                onChange={handleChange}
                required
              />
            ))}
            <div className="mb-4">
              <label
                htmlFor="image"
                className="block text-sm font-medium text-gray-700"
              >
                Product Image (File size: less than 1MB)
              </label>
              <span className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                <FileBase64
                  onDone={({ base64 }: any) =>
                    setFormData({ ...formData, image: base64 })
                  }
                  type="image/*"
                  id="image"
                  required
                  placeholder="File size should be less than 1 MB"
                />
              </span>
            </div>
            <div className="fixed bottom-2.5 right-1 flex gap-3">
              <button
                onClick={onAddProduct}
                className="px-4 py-2 bg-gray-300 hover:bg-gray-400 border-0 rounded-full text-white"
              >
                Cancel
              </button>
              <Button type="submit">Save</Button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default AddProduct;
