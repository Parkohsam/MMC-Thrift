import { useNavigate } from "react-router-dom";
import { isSignedUp } from "../Hooks/Authen";
import { Heart } from "lucide-react";
import { products } from "../Data/Product";

// 👇 only show first 4 as a preview on home page
const preview = products.slice(0, 4);

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
            <p className="text-center text-sm text-gray-400 mb-8">
                A glimpse of what's in store — sign up to see everything
            </p>

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
                {preview.map((p) => (
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

                        {/* Wishlist icon — decorative on home page */}
                        <button className="absolute top-2 right-2 bg-white rounded-full p-1.5 shadow">
                            <Heart size={16} className="text-gray-400" />
                        </button>

                        {/* Condition badge */}
                        <span className="absolute top-2 left-2 text-xs font-semibold px-2 py-0.5 bg-white/90 rounded text-gray-700">
                            {p.condition}
                        </span>

                        {/* Card Body */}
                        <div className="p-4">
                            <h4 className="font-bold text-gray-800 text-sm">{p.name}</h4>
                            <p className="text-xs text-gray-400 mb-2">{p.category}</p>

                            {/* Price */}
                            <div className="flex items-center gap-2 mb-3">
                                <span className="font-bold text-blue-700">
                                    ₦{p.price.toLocaleString()}
                                </span>
                                {p.originalPrice && (
                                    <span className="text-xs text-gray-400 line-through">
                                        ₦{p.originalPrice.toLocaleString()}
                                    </span>
                                )}
                            </div>

                            {/* Shop Now — triggers auth check */}
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
                <p className="text-sm text-gray-400 mb-3">
                    Want to see all {products.length} products?
                </p>
                <button
                    onClick={handleShopNow}
                    className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold px-8 py-3 rounded-xl transition-colors"
                >
                    View All Collections →
                </button>
            </div>
        </div>
    );
};