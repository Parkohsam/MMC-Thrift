import baggy3 from "../assets/baggy3.jfif";
import Basic from "../assets/Basic-top.jpeg"
import turtleNeck from "../assets/Turtle-neck.jpeg"
import Jersey from "../assets/Jersey.jpeg"


export type Product = {
    id: string;
    name: string;
    price: number;
    originalPrice?: number;
    image: string;
    condition: "New" | "Good" | "Fair" | "Thrift";
    sizes: string[];
    category: "Men" | "Women" | "Unisex";
    badge?: "New" | "Sale" | null;
    stock: number;
};

export const products: Product[] = [
    {
        id: "1",
        name: "Unisex Baggy Jeans",
        price: 5500,
        originalPrice: 8000,
        image: baggy3,
        condition: "Thrift",
        sizes: ["S", "M", "L", "XL"],
        category: "Unisex",
        badge: "Sale",
        stock: 2,
    },
    {
        id: "2",
        name: "Basic top",
        price: 3500,
        originalPrice: 8000,
        image: Basic,
        condition: "Thrift",
        sizes: ["S", "M", "L", "XL"],
        category: "Women",
        badge: "Sale",
        stock: 2,
    },
    {
        id: "3",
        name: "Turtle Neck",
        price: 3000,
        originalPrice: 4000,
        image: turtleNeck,
        condition: "Thrift",
        sizes: ["S", "M", "L", "XL"],
        category: "Women",
        badge: "Sale",
        stock: 2,
    },
    {
        id: "3",
        name: "Jersey",
        price: 10000,
        originalPrice: 15000,
        image: Jersey,
        condition: "New",
        sizes: ["S", "M", "L", "XL"],
        category: "Unisex",
        badge: "Sale",
        stock: 2,
    },
    // ✅ just keep adding products here as your stock grows
];