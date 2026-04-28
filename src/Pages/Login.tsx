import { useState } from "react";
import { ShoppingBag } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { signUpUser } from "../Hooks/Authen";
import Footer from "../Component/Footer";

export default function LoginPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    if (!trimmedName || !trimmedEmail) return;
    signUpUser(trimmedName, trimmedEmail);
    navigate("/dashboard");
  }

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-1 bg-gray-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 w-full max-w-sm flex flex-col gap-6">
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-3">
              <ShoppingBag />
            </div>
            <h1 className="text-xl font-semibold text-gray-800">
              Thrift By MMC
            </h1>
            <p className="text-xs text-black-800 mt-1 font-Bold">
              HOME OF QUALITY THRIFT WEARS
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* Name */}
            <label className="flex flex-col gap-2">
              <span className="text-sm font-medium text-gray-600">
                Your name
              </span>
              <input
                type="text"
                placeholder="e.g Adewale"
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoFocus
                className="rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
              />
            </label>

            {/* Email */}
            <label className="flex flex-col gap-2">
              <span className="text-sm font-medium text-gray-600">
                Email address
              </span>
              <input
                type="email"
                placeholder="e.g adewale@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
              />
            </label>

            <button
              type="submit"
              disabled={!name.trim() || !email.trim()}
              className="w-full bg-blue-600 text-white rounded-xl py-2.5 text-sm font-bold hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              Get started →
            </button>
            <p className="text-xs text-gray-300 text-center">
              No account needed. Your data stays on your device
            </p>
          </form>
        </div>
      </div>
      
    </div>
  );
}
