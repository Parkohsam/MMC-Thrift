import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ShoppingBag, Eye, EyeOff } from "lucide-react";

export default function AdminLogin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const adminEmail = import.meta.env.VITE_ADMIN_EMAIL;
        const adminPassword = import.meta.env.VITE_ADMIN_PASSWORD;

        if (email === adminEmail && password === adminPassword) {
            localStorage.setItem("mmc_admin", "true");
            navigate("/admin/dashboard");
        } else {
            setError("Invalid email or password");
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 w-full max-w-sm flex flex-col gap-6">
                <div className="text-center">
                    <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-3">
                        <ShoppingBag className="text-blue-600" />
                    </div>
                    <h1 className="text-xl font-semibold text-gray-800">Admin Access</h1>
                    <p className="text-xs text-gray-400 mt-1">MMC Store Management</p>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    {/* Email */}
                    <label className="flex flex-col gap-2">
                        <span className="text-sm font-medium text-gray-600">Email</span>
                        <input
                            type="email"
                            placeholder="admin@gmail.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            autoFocus
                            className="rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
                        />
                    </label>

                    {/* Password */}
                    <label className="flex flex-col gap-2">
                        <span className="text-sm font-medium text-gray-600">Password</span>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                            >
                                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                            </button>
                        </div>
                    </label>

                    {/* Error */}
                    {error && (
                        <p className="text-xs text-red-500 text-center">{error}</p>
                    )}

                    <button
                        type="submit"
                        disabled={!email.trim() || !password.trim()}
                        className="w-full bg-blue-600 text-white rounded-xl py-2.5 text-sm font-bold hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                    >
                        Access Dashboard →
                    </button>
                </form>
            </div>
        </div>
    );
}