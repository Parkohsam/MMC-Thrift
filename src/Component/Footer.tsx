import { MessageCircle } from "lucide-react";
import { FaInstagram, FaFacebook, FaTiktok } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";

const Footer = () => {
    const currentYear = new Date().getFullYear();
    const navigate = useNavigate();
    const location = useLocation();

    const handleAboutClick = () => {
        if (location.pathname !== "/") {
            navigate("/");
            setTimeout(() => {
                document
                    .getElementById("about")
                    ?.scrollIntoView({ behavior: "smooth" });
            }, 300);
        } else {
            document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
        }
    };

    const handleShopClick = () => {
        if (location.pathname !== "/") {
            navigate("/");
            setTimeout(() => {
                document
                    .getElementById("collections")
                    ?.scrollIntoView({ behavior: "smooth" });
            }, 300);
        } else {
            document
                .getElementById("collections")
                ?.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <footer id="contact" className="bg-gray-900 text-gray-400">
            <div className="max-w-6xl mx-auto px-6 py-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
                    {/* Brand */}
                    <div>
                        <h2 className="text-white font-extrabold text-xl mb-3">
                            MMC Store
                        </h2>
                        <p className="text-sm leading-relaxed mb-5">
                            Quality thrift fashion for men and women. Looking good shouldn't
                            cost a fortune.
                        </p>
                        <a
                            href="https://chat.whatsapp.com/EclRb7OwPqzEeE3Xdg8mt2"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-green-400 hover:text-green-300 transition-colors text-sm font-semibold"
                        >
                            <MessageCircle size={16} />
                            Join our WhatsApp Community
                        </a>
                        <a
                            href="https://chat.whatsapp.com/EclRb7OwPqzEeE3Xdg8mt2"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-green-400 hover:text-green-300 transition-colors text-sm font-semibold"
                        >
                            <MessageCircle size={16} />
                            Contact Us Via WhatsApp
                        </a>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-white font-bold text-sm uppercase tracking-widest mb-5">
                            Quick Links
                        </h3>
                        <ul className="space-y-3">
                            <li>
                                <button
                                    onClick={() => navigate("/")}
                                    className="text-sm hover:text-white transition-colors"
                                >
                                    Home
                                </button>
                            </li>
                            <li>
                                <button
                                    onClick={handleShopClick}
                                    className="text-sm hover:text-white transition-colors"
                                >
                                    Shop
                                </button>
                            </li>
                            <li>
                                <button
                                    onClick={handleAboutClick}
                                    className="text-sm hover:text-white transition-colors"
                                >
                                    About Us
                                </button>
                            </li>
                            <li>
                                <button
                                    onClick={() => navigate("/contact")}
                                    className="text-sm hover:text-white transition-colors"
                                >
                                    Contact
                                </button>
                            </li>
                        </ul>
                    </div>

                    {/* Social & Contact */}
                    <div>
                        <h3 className="text-white font-bold text-sm uppercase tracking-widest mb-5">
                            Follow Us
                        </h3>
                        <div className="flex flex-col gap-3">
                            <a
                                href=""
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-3 text-sm hover:text-pink-400 transition-colors"
                            >
                                <FaInstagram size={18} /> Instagram
                            </a>
                            <a
                                href="https://www.facebook.com/share/1DuvmoNCUk/?mibextid=wwXIfr"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-3 text-sm hover:text-blue-400 transition-colors"
                            >
                                <FaFacebook size={18} /> Facebook
                            </a>
                            <a
                                href="https://www.tiktok.com/@thriftbymmc?_r=1&_t=ZS-95tExzWyB6r"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-3 text-sm hover:text-white transition-colors"
                            >
                                <FaTiktok size={18} /> TikTok
                            </a>
                        </div>
                    </div>
                </div>

                {/* Divider */}
                <div className="border-t border-gray-800 pt-6 flex flex-col md:flex-row items-center justify-between gap-3">
                    <p className="text-xs text-gray-500">
                        © {currentYear} MMC Store. All rights reserved.
                    </p>
                    <p className="text-xs text-gray-500">Built with ❤️ in Nigeria</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
