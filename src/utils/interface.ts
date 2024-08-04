import { StaticImageData } from "next/image";

export interface Product {
  _id: number;
  name: string;
  category: string;
  price: number;
  image: {
    url: string;
    public_id: string;
  };
  qty?: number;
}
