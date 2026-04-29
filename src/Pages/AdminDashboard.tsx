import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/Supabase";
import { LogOut, Plus, Trash2, Users, Package, X, Upload } from "lucide-react";

type Product = {
    id: string;
    name: string;
    price: number;
    original_price?: number;
    image: string;
    condition: string;
    sizes: string[];
    category: string;
    badge?: string;
    stock: number;
};

type User = {
    id: string;
    name: string;
    email: string;
    created_at: string;
};

export default function AdminDashboard() {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState<"products" | "users">("products");
    const [products, setProducts] = useState<Product[]>([]);
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string>("");
    const [submitting, setSubmitting] = useState(false);
    const [successMsg, setSuccessMsg] = useState("");

    const [form, setForm] = useState({
        name: "",
        price: "",
        original_price: "",
        condition: "Like New",
        sizes: [] as string[],
        category: "Unisex",
        badge: "",
        stock: "1",
    });

    const handleLogout = () => {
        localStorage.removeItem("mmc_admin");
        navigate("/admin");
    };

    const loadProducts = async () => {
        const { data, error } = await supabase
            .from("products")
            .select("*")
            .order("created_at", { ascending: false });
        if (!error && data) setProducts(data);
    };

    const loadUsers = async () => {
        const { data, error } = await supabase
            .from("users")
            .select("*")
            .order("created_at", { ascending: false });
        if (!error && data) setUsers(data);
    };

    useEffect(() => {
        const load = async () => {
            setLoading(true);
            await Promise.all([loadProducts(), loadUsers()]);
            setLoading(false);
        };
        load();
    }, []);

    const toggleSize = (size: string) => {
        setForm((prev) => ({
            ...prev,
            sizes: prev.sizes.includes(size)
                ? prev.sizes.filter((s) => s !== size)
                : [...prev.sizes, size],
        }));
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setImageFile(file);
        setImagePreview(URL.createObjectURL(file));
    };

    const uploadImage = async (): Promise<string | null> => {
        if (!imageFile) return null;
        const fileName = `${Date.now()}-${imageFile.name.replace(/\s/g, "-")}`;
        const { error } = await supabase.storage
            .from("products")
            .upload(fileName, imageFile);
        if (error) {
            alert("Image upload failed: " + error.message);
            return null;
        }
        const { data } = supabase.storage.from("products").getPublicUrl(fileName);
        return data.publicUrl;
    };

    const handleAddProduct = async (e: React.FormEvent) => {
        e.preventDefault();
        if (form.sizes.length === 0) {
            alert("Please select at least one size");
            return;
        }
        if (!imageFile) {
            alert("Please select an image");
            return;
        }
        setSubmitting(true);

        const imageUrl = await uploadImage();
        if (!imageUrl) {
            setSubmitting(false);
            return;
        }

        const { error } = await supabase.from("products").insert([{
            name: form.name,
            price: parseInt(form.price),
            original_price: form.original_price ? parseInt(form.original_price) : null,
            image: imageUrl,
            condition: form.condition,
            sizes: form.sizes,
            category: form.category,
            badge: form.badge || null,
            stock: parseInt(form.stock),
        }]);

        if (!error) {
            setSuccessMsg("Product added successfully!");
            setForm({ name: "", price: "", original_price: "", condition: "Like New", sizes: [], category: "Unisex", badge: "", stock: "1" });
            setImageFile(null);
            setImagePreview("");
            setShowForm(false);
            await loadProducts();
            setTimeout(() => setSuccessMsg(""), 3000);
        } else {
            alert("Error adding product: " + error.message);
        }
        setSubmitting(false);
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this product?")) return;
        const { error } = await supabase.from("products").delete().eq("id", id);
        if (!error) {
            setProducts((prev) => prev.filter((p) => p.id !== id));
        }
    };

    const resetForm = () => {
        setShowForm(false);
        setImageFile(null);
        setImagePreview("");
        setForm({ name: "", price: "", original_price: "", condition: "Like New", sizes: [], category: "Unisex", badge: "", stock: "1" });
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Navbar */}
            <nav className="bg-white shadow-sm px-6 py-4 flex items-center justify-between sticky top-0 z-10">
                <div>
                    <h1 className="font-extrabold text-blue-700 text-lg">MMC Admin</h1>
                    <p className="text-xs text-gray-400">Store Management</p>
                </div>
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-1 text-sm text-red-500 hover:underline"
                >
                    <LogOut size={15} /> Log out
                </button>
            </nav>

            <div className="max-w-6xl mx-auto px-6 py-8">

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                    <div className="bg-white rounded-2xl p-5 shadow-sm">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
                                <Package size={20} className="text-blue-600" />
                            </div>
                            <div>
                                <p className="text-2xl font-extrabold text-gray-800">{products.length}</p>
                                <p className="text-xs text-gray-400">Total Products</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-2xl p-5 shadow-sm">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center">
                                <Users size={20} className="text-green-600" />
                            </div>
                            <div>
                                <p className="text-2xl font-extrabold text-gray-800">{users.length}</p>
                                <p className="text-xs text-gray-400">Registered Users</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex gap-2 mb-6">
                    <button
                        onClick={() => setActiveTab("products")}
                        className={`px-5 py-2 rounded-xl text-sm font-bold transition-colors ${activeTab === "products" ? "bg-blue-600 text-white" : "bg-white text-gray-600 hover:bg-gray-100"
                            }`}
                    >
                        Products
                    </button>
                    <button
                        onClick={() => setActiveTab("users")}
                        className={`px-5 py-2 rounded-xl text-sm font-bold transition-colors ${activeTab === "users" ? "bg-blue-600 text-white" : "bg-white text-gray-600 hover:bg-gray-100"
                            }`}
                    >
                        Users ({users.length})
                    </button>
                </div>

                {/* Success message */}
                {successMsg && (
                    <div className="bg-green-50 text-green-700 text-sm font-semibold px-4 py-3 rounded-xl mb-4">
                        ✅ {successMsg}
                    </div>
                )}

                {/* Products Tab */}
                {activeTab === "products" && (
                    <div>
                        <div className="flex items-center justify-between mb-4">
                            <p className="text-sm text-gray-500">{products.length} products</p>
                            <button
                                onClick={() => setShowForm(!showForm)}
                                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold px-4 py-2 rounded-xl transition-colors"
                            >
                                <Plus size={15} /> Add Product
                            </button>
                        </div>

                        {/* Add Product Form */}
                        {showForm && (
                            <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
                                <div className="flex items-center justify-between mb-4">
                                    <h2 className="font-bold text-gray-800">Add New Product</h2>
                                    <button onClick={resetForm}>
                                        <X size={18} className="text-gray-400" />
                                    </button>
                                </div>

                                <form onSubmit={handleAddProduct} className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                                    {/* Image Upload */}
                                    <div className="flex flex-col gap-1 sm:col-span-2">
                                        <label className="text-xs font-semibold text-gray-500">Product Image *</label>
                                        <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-200 rounded-xl cursor-pointer hover:border-blue-400 transition-colors bg-gray-50 overflow-hidden">
                                            {imagePreview ? (
                                                <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                                            ) : (
                                                <div className="flex flex-col items-center gap-2 text-gray-400">
                                                    <Upload size={28} className="text-gray-300" />
                                                    <span className="text-xs font-semibold">Click to upload image</span>
                                                    <span className="text-xs text-gray-300">JPG, PNG, WEBP up to 5MB</span>
                                                </div>
                                            )}
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={handleImageChange}
                                                className="hidden"
                                            />
                                        </label>
                                        {imagePreview && (
                                            <button
                                                type="button"
                                                onClick={() => { setImageFile(null); setImagePreview(""); }}
                                                className="text-xs text-red-500 hover:underline text-left"
                                            >
                                                Remove image
                                            </button>
                                        )}
                                    </div>

                                    {/* Name */}
                                    <div className="flex flex-col gap-1">
                                        <label className="text-xs font-semibold text-gray-500">Product Name *</label>
                                        <input
                                            type="text"
                                            placeholder="e.g Unisex Baggy Jeans"
                                            value={form.name}
                                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                                            required
                                            className="border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
                                        />
                                    </div>

                                    {/* Price */}
                                    <div className="flex flex-col gap-1">
                                        <label className="text-xs font-semibold text-gray-500">Price (₦) *</label>
                                        <input
                                            type="number"
                                            placeholder="e.g 5500"
                                            value={form.price}
                                            onChange={(e) => setForm({ ...form, price: e.target.value })}
                                            required
                                            className="border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
                                        />
                                    </div>

                                    {/* Original Price */}
                                    <div className="flex flex-col gap-1">
                                        <label className="text-xs font-semibold text-gray-500">Original Price (₦) — optional</label>
                                        <input
                                            type="number"
                                            placeholder="e.g 8000"
                                            value={form.original_price}
                                            onChange={(e) => setForm({ ...form, original_price: e.target.value })}
                                            className="border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
                                        />
                                    </div>

                                    {/* Stock */}
                                    <div className="flex flex-col gap-1">
                                        <label className="text-xs font-semibold text-gray-500">Stock *</label>
                                        <input
                                            type="number"
                                            placeholder="e.g 3"
                                            value={form.stock}
                                            onChange={(e) => setForm({ ...form, stock: e.target.value })}
                                            required
                                            className="border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
                                        />
                                    </div>

                                    {/* Category */}
                                    <div className="flex flex-col gap-1">
                                        <label className="text-xs font-semibold text-gray-500">Category *</label>
                                        <select
                                            value={form.category}
                                            onChange={(e) => setForm({ ...form, category: e.target.value })}
                                            className="border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none"
                                        >
                                            <option>Unisex</option>
                                            <option>Men</option>
                                            <option>Women</option>
                                        </select>
                                    </div>

                                    {/* Condition */}
                                    <div className="flex flex-col gap-1">
                                        <label className="text-xs font-semibold text-gray-500">Condition *</label>
                                        <select
                                            value={form.condition}
                                            onChange={(e) => setForm({ ...form, condition: e.target.value })}
                                            className="border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none"
                                        >
                                            <option>Like New</option>
                                            <option>Good</option>
                                            <option>Fair</option>
                                        </select>
                                    </div>

                                    {/* Badge */}
                                    <div className="flex flex-col gap-1">
                                        <label className="text-xs font-semibold text-gray-500">Badge — optional</label>
                                        <select
                                            value={form.badge}
                                            onChange={(e) => setForm({ ...form, badge: e.target.value })}
                                            className="border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none"
                                        >
                                            <option value="">None</option>
                                            <option>New</option>
                                            <option>Sale</option>
                                        </select>
                                    </div>

                                    {/* Sizes */}
                                    <div className="flex flex-col gap-2 sm:col-span-2">
                                        <label className="text-xs font-semibold text-gray-500">Sizes *</label>
                                        <div className="flex gap-2 flex-wrap">
                                            {["XS", "S", "M", "L", "XL", "XXL"].map((s) => (
                                                <button
                                                    type="button"
                                                    key={s}
                                                    onClick={() => toggleSize(s)}
                                                    className={`px-3 py-1.5 rounded-lg border text-xs font-bold transition-colors ${form.sizes.includes(s)
                                                            ? "bg-blue-600 text-white border-blue-600"
                                                            : "bg-white text-gray-600 border-gray-200 hover:border-blue-400"
                                                        }`}
                                                >
                                                    {s}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Submit */}
                                    <div className="sm:col-span-2">
                                        <button
                                            type="submit"
                                            disabled={submitting}
                                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 rounded-xl text-sm transition-colors disabled:opacity-50"
                                        >
                                            {submitting ? "Uploading & Adding..." : "Add Product →"}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        )}

                        {/* Products List */}
                        {loading ? (
                            <p className="text-center text-gray-400 py-10">Loading...</p>
                        ) : products.length === 0 ? (
                            <div className="text-center py-20 text-gray-400">
                                <p className="text-4xl mb-3">📦</p>
                                <p className="font-semibold">No products yet</p>
                                <p className="text-sm mt-1">Click "Add Product" to get started</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                                {products.map((p) => (
                                    <div key={p.id} className="bg-white rounded-2xl shadow-sm overflow-hidden">
                                        <div className="relative h-48 overflow-hidden">
                                            <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                                            <button
                                                onClick={() => handleDelete(p.id)}
                                                className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1.5 shadow hover:bg-red-600 transition-colors"
                                            >
                                                <Trash2 size={14} />
                                            </button>
                                            {p.badge && (
                                                <span className={`absolute top-2 left-2 text-xs font-bold px-2 py-0.5 rounded text-white ${p.badge === "Sale" ? "bg-red-500" : "bg-blue-600"}`}>
                                                    {p.badge}
                                                </span>
                                            )}
                                        </div>
                                        <div className="p-3">
                                            <p className="font-bold text-sm text-gray-800">{p.name}</p>
                                            <p className="text-xs text-gray-400">{p.category} · {p.condition}</p>
                                            <div className="flex items-center gap-2 mt-1">
                                                <span className="font-bold text-blue-700 text-sm">₦{p.price.toLocaleString()}</span>
                                                {p.original_price && (
                                                    <span className="text-xs text-gray-400 line-through">₦{p.original_price.toLocaleString()}</span>
                                                )}
                                            </div>
                                            <div className="flex gap-1 flex-wrap mt-2">
                                                {p.sizes.map((s, idx) => (
                                                    <span key={`${p.id}-size-${idx}`} className="text-xs px-1.5 py-0.5 bg-gray-100 rounded text-gray-500">{s}</span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {/* Users Tab */}
                {activeTab === "users" && (
                    <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                        {loading ? (
                            <p className="text-center text-gray-400 py-10">Loading...</p>
                        ) : users.length === 0 ? (
                            <div className="text-center py-20 text-gray-400">
                                <p className="text-4xl mb-3">👥</p>
                                <p className="font-semibold">No users yet</p>
                            </div>
                        ) : (
                            <table className="w-full text-sm">
                                <thead className="bg-gray-50 border-b border-gray-100">
                                    <tr>
                                        <th className="text-left px-5 py-3 text-xs font-bold text-gray-500 uppercase tracking-wide">#</th>
                                        <th className="text-left px-5 py-3 text-xs font-bold text-gray-500 uppercase tracking-wide">Name</th>
                                        <th className="text-left px-5 py-3 text-xs font-bold text-gray-500 uppercase tracking-wide">Email</th>
                                        <th className="text-left px-5 py-3 text-xs font-bold text-gray-500 uppercase tracking-wide">Joined</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.map((u, i) => (
                                        <tr key={u.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                                            <td className="px-5 py-3 text-gray-400">{i + 1}</td>
                                            <td className="px-5 py-3 font-medium text-gray-800">{u.name}</td>
                                            <td className="px-5 py-3 text-gray-500">{u.email}</td>
                                            <td className="px-5 py-3 text-gray-400">
                                                {new Date(u.created_at).toLocaleDateString("en-NG", {
                                                    day: "numeric",
                                                    month: "short",
                                                    year: "numeric",
                                                })}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}