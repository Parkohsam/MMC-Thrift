import Hero1 from "../assets/Hero1.jpg";
import Hero2 from "../assets/hero2.jpg";
import { Link } from "react-router-dom";

export const Home = () => {
    return (
        <div>
            <div className="w-full flex flex-col md:flex-row">

                {/* Women */}
                <div className="group relative overflow-hidden  md:w-1/2 h-72 md:h-120">
                    <img
                        src={Hero1}
                        alt="Hero 1"
                        className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
                    />

                    {/* Dark overlay */}
                    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-all duration-700" />

                    {/* Text content */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center gap-4">
                        <h2 className="text-white text-5xl font-extrabold drop-shadow-lg">
                            Men
                        </h2>
                        <Link
                            to="/shop/women"
                            className="bg-white text-black text-sm font-bold px-6 py-2.5 rounded-sm hover:bg-blue-500 hover:text-white transition-all duration-300"
                        >
                            Shop now
                        </Link>
                    </div>
                </div>

                {/* Men */}
                <div className="group relative overflow-hidden  md:w-1/2 h-72 md:h-120">
                    <img
                        src={Hero2}
                        alt="Hero 2"
                        className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
                    />

                    {/* Dark overlay */}
                    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-all duration-700" />

                    {/* Text content */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center gap-4">
                        <h2 className="text-white text-5xl font-extrabold drop-shadow-lg">
                            Women
                        </h2>
                        <Link
                            to="/shop/men"
                            className="bg-white text-black text-sm font-bold px-6 py-2.5 rounded-sm hover:bg-blue-500 hover:text-white transition-all duration-300"
                        >
                            Shop now
                        </Link>
                    </div>
                </div>

            </div>
            <div className="text-center py-8 px-4  bg-gray-200">
                <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mt-4">Shop by Category</h2>
                <p className="text-sm md:text-4xl font-bold text-gray-900 mt-4">
                    Explore our latest thrift wears for men and women — quality pieces at unbeatable prices.
                </p>
            </div>
        </div>
    );
};