import { MessageCircle } from "lucide-react";

const Footer = () => {
    const currentYear = new Date().getFullYear();

    const handleWhatsAppClick = () => {
        const whatsappURL = "https://chat.whatsapp.com/EclRb7OwPqzEeE3Xdg8mt2";
        window.open(whatsappURL, "_blank");
    };

    const socialMediaLinks = [
        {
            name: "Instagram",
            emoji: "📷",
            url: "https://instagram.com/mmc_store",
            color: "hover:text-pink-400",
        },
        {
            name: "Facebook",
            emoji: "👍",
            url: "https://facebook.com/mmc_store",
            color: "hover:text-blue-400",
        },
        {
            name: "TikTok",
            emoji: "🎵",
            url: "https://tiktok.com/@mmc_store",
            color: "hover:text-white",
        },
    ];

    return (
        <footer className="bg-gray-900 text-gray-300">
            {/* Main Footer Content */}
            <div className="max-w-7xl mx-auto px-6 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                    {/* Left Section - Brand */}
                    <div className="lg:col-span-1">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-lg">MMC</span>
                            </div>
                            <span className="font-bold text-xl text-white">MMC Store</span>
                        </div>
                        <p className="text-sm text-gray-400 mb-6">
                            Your premier marketplace for quality items. Buy, sell, and connect
                            with confidence.
                        </p>
                        <button
                            onClick={handleWhatsAppClick}
                            className="flex items-center gap-2 text-green-400 hover:text-green-300 transition-colors font-medium mb-6"
                        >
                            <MessageCircle size={18} />
                            Join WhatsApp Community
                        </button>

                        {/* Social Media Links */}
                        <div className="flex items-center gap-4 text-2xl">
                            {socialMediaLinks.map((social) => (
                                <a
                                    key={social.name}
                                    href={social.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:scale-110 transition-transform"
                                    title={social.name}
                                >
                                    {social.emoji}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Platform Links */}
                    <div>
                        <h3 className="font-semibold text-white mb-4">Platform</h3>
                        <ul className="space-y-3">
                            <li>
                                <a
                                    href="#features"
                                    className="text-sm hover:text-white transition-colors"
                                >
                                    Features
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#pricing"
                                    className="text-sm hover:text-white transition-colors"
                                >
                                    Pricing
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#how-it-works"
                                    className="text-sm hover:text-white transition-colors"
                                >
                                    How it Works
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#security"
                                    className="text-sm hover:text-white transition-colors"
                                >
                                    Security
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Company Links */}
                    <div>
                        <h3 className="font-semibold text-white mb-4">Company</h3>
                        <ul className="space-y-3">
                            <li>
                                <a
                                    href="#about"
                                    className="text-sm hover:text-white transition-colors"
                                >
                                    About Us
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#careers"
                                    className="text-sm hover:text-white transition-colors"
                                >
                                    Careers
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#privacy"
                                    className="text-sm hover:text-white transition-colors"
                                >
                                    Privacy Policy
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#terms"
                                    className="text-sm hover:text-white transition-colors"
                                >
                                    Terms of Service
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Support Links */}
                    <div>
                        <h3 className="font-semibold text-white mb-4">Support</h3>
                        <ul className="space-y-3">
                            <li>
                                <a
                                    href="#help"
                                    className="text-sm hover:text-white transition-colors"
                                >
                                    Help Center
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#safety"
                                    className="text-sm hover:text-white transition-colors"
                                >
                                    Safety Tips
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#contact"
                                    className="text-sm hover:text-white transition-colors"
                                >
                                    Contact Us
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#faq"
                                    className="text-sm hover:text-white transition-colors"
                                >
                                    FAQ
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Divider */}
                <div className="border-t border-gray-800"></div>

                {/* Bottom Section */}
                <div className="py-8 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-sm text-gray-400">
                        © {currentYear} MMC Store. All rights reserved.
                    </p>
                    <div className="flex items-center gap-6">
                        <a
                            href="#privacy"
                            className="text-sm text-gray-400 hover:text-white transition-colors"
                        >
                            Privacy Policy
                        </a>
                        <a
                            href="#terms"
                            className="text-sm text-gray-400 hover:text-white transition-colors"
                        >
                            Terms of Service
                        </a>
                        <a
                            href="#sitemap"
                            className="text-sm text-gray-400 hover:text-white transition-colors"
                        >
                            Sitemap
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
