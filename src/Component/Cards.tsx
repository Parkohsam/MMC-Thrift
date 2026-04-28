import { useNavigate } from "react-router-dom";
import { isSignedUp } from "../Hooks/Authen";
import {
    Heart,
    Shirt,
    BadgeDollarSign,
    Truck,
    BadgeCheck,
    MessageCircle,
} from "lucide-react";
import Baggy2 from "../assets/Baggy2.jfif";
import Bralette from "../assets/Bralette.jfif";
import Hoodie from "../assets/Hoodie.jfif";
import Jersey2 from "../assets/Jersey2.jpg";
import phoneLogo2 from "../assets/phone logo2.png";

const previewItems = [
    {
        id: "1",
        name: "Unisex Baggy Jeans",
        price: 7000,
        originalPrice: 8000,
        image: Baggy2,
        condition: "Like New",
        category: "Unisex",
    },
    {
        id: "2",
        name: "Bralette",
        price: 3000,
        originalPrice: 4000,
        image: Bralette,
        condition: "Thrift",
        category: "Women",
    },
    {
        id: "3",
        name: "Hoodie",
        price: 4000,
        image: Hoodie,
        condition: "Thrift",
        category: "Unisex",
    },
    {
        id: "4",
        name: "Jersey",
        price: 10000,
        originalPrice: 15000,
        image: Jersey2,
        condition: "New",
        category: "Unisex",
    },
];

export const Cards = () => {
    const navigate = useNavigate();

    const handleShopNow = () => {
        if (isSignedUp()) {
            navigate("/dashboard");
        } else {
            navigate("/signup");
        }
    };

    return (
        <div className="py-10 px-6 md:px-10">
            <h3 className="text-center font-bold text-lg mb-2">Our Collections</h3>
            <p className="text-center text-sm text-black mb-8">
                A glimpse of what's in store — sign up to see everything
            </p>

            {/* Grid */}
            <div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto"
                id="collections"
            >
                {previewItems.map((p) => (
                    <div
                        key={p.id}
                        className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group relative"
                    >
                        {/* Image */}
                        <div className="w-full h-56 overflow-hidden">
                            <img
                                src={p.image}
                                alt={p.name}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                        </div>

                        {/* Wishlist — decorative only on home page */}
                        <button className="absolute top-2 right-2 bg-white rounded-full p-1.5 shadow">
                            <Heart size={16} className="text-black" />
                        </button>

                        {/* Condition badge */}
                        <span className="absolute top-2 left-2 text-xs font-semibold px-2 py-0.5 bg-white/90 rounded text-black-700">
                            {p.condition}
                        </span>

                        {/* Card Body */}
                        <div className="p-4">
                            <h4 className="font-bold text-black-800 text-sm">{p.name}</h4>
                            <p className="text-xs text-black mb-2">{p.category}</p>

                            {/* Price */}
                            <div className="flex items-center gap-2 mb-3">
                                <span className="font-bold text-blue-700">
                                    ₦{p.price.toLocaleString()}
                                </span>
                                {p.originalPrice && (
                                    <span className="text-xs text-black line-through">
                                        ₦{p.originalPrice.toLocaleString()}
                                    </span>
                                )}
                            </div>

                            {/* Shop Now */}
                            <button
                                onClick={handleShopNow}
                                className="w-full py-2 rounded-xl text-sm font-semibold bg-blue-600 hover:bg-blue-700 text-white transition-colors"
                            >
                                Shop now →
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Bottom CTA */}
            <div className="text-center mt-10">
                <p className="text-sm text-black mb-3">Want to see all our products?</p>
                <button
                    onClick={handleShopNow}
                    className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold px-8 py-3 rounded-xl transition-colors"
                >
                    View All Collections →
                </button>
            </div>
            {/* About Us Section */}
            <div id="about" className="py-16 mt-5 bg-blue">
                <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12 px-6 md:px-20">
                    {/* Left — Text */}
                    <div className="flex-1">
                        <p className="text-blue-600 text-sm font-bold uppercase tracking-widest mb-3">
                            About Us
                        </p>
                        <h2 className="text-3xl md:text-4xl font-extrabold text-black-900 leading-tight mb-4">
                            The smartest way to{" "}
                            <span className="text-blue-600">dress well</span> for less.
                        </h2>
                        <p className="text-black-500 text-sm leading-relaxed mb-4">
                            MMC Thrift is your go-to destination for quality secondhand
                            fashion. We believe looking good shouldn't cost a fortune — every
                            piece in our store is carefully selected, inspected, and priced to
                            give you the best value for your money.
                        </p>
                        <p className="text-black-500 text-sm leading-relaxed mb-6">
                            From unisex streetwear to classic men's and women's pieces, we
                            bring you thrift fashion that's clean, trendy, and affordable.
                            Based in Nigeria, built for the culture.
                        </p>

                        {/* Stats */}
                        <div className="flex gap-8 mb-8">
                            <div>
                                <p className="text-2xl font-extrabold text-blue-600">500+</p>
                                <p className="text-xs text-black mt-1">Happy Customers</p>
                            </div>
                            <div>
                                <p className="text-2xl font-extrabold text-blue-600">200+</p>
                                <p className="text-xs text-black mt-1">Products Sold</p>
                            </div>
                            <div>
                                <p className="text-2xl font-extrabold text-blue-600">100%</p>
                                <p className="text-xs text-black mt-1">Quality Checked</p>
                            </div>
                        </div>

                        {/* CTA */}
                        <div className="flex items-center gap-4 flex-wrap">
                            <button
                                onClick={() => {
                                    document
                                        .getElementById("collections")
                                        ?.scrollIntoView({ behavior: "smooth" });
                                }}
                                className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold px-6 py-3 rounded-xl transition-colors"
                            >
                                Shop Now →
                            </button>

                            <a
                                href="https://chat.whatsapp.com/EclRb7OwPqzEeE3Xdg8mt2"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 text-sm font-bold text-green-600 hover:underline"
                            >
                                <MessageCircle size={18} className="text-green-600" />
                                Chat us on WhatsApp
                            </a>
                        </div>
                    </div>

                    {/* Right — Phone Logo */}
                    <div className="flex-1 flex justify-center">
                        <img
                            src={phoneLogo2}
                            alt="MMC Thrift App"
                            className="max-w-full h-auto md:w-100"
                        />
                    </div>
                </div>

                {/* Feature Cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 max-w-6xl mx-auto">
                    {[
                        {
                            icon: <Shirt size={24} className="text-blue-600" />,
                            title: "Curated Picks",
                            desc: "Every item is handpicked and quality checked before listing.",
                        },
                        {
                            icon: <BadgeDollarSign size={24} className="text-blue-600" />,
                            title: "Unbeatable Prices",
                            desc: "Get premium thrift pieces at prices that won't break the bank.",
                        },
                        {
                            icon: <Truck size={24} className="text-blue-600" />,
                            title: "Fast Delivery",
                            desc: "We deliver to your doorstep quickly and safely.",
                        },
                        {
                            icon: <BadgeCheck size={24} className="text-blue-600" />,
                            title: "Trusted Store",
                            desc: "Hundreds of happy customers and growing every day.",
                        },
                    ].map((f) => (
                        <div
                            key={f.title}
                            className="bg-gray-50 rounded-2xl p-5 hover:shadow-md transition-shadow"
                        >
                            <div className="mb-3">{f.icon}</div>
                            <p className="font-bold text-gray-800 text-sm mb-1">{f.title}</p>
                            <p className="text-xs text-gray-600 leading-relaxed">{f.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
