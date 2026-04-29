import { useNavigate, Link } from "react-router-dom";
import {
  ShoppingCart,
  LogOut,
  Search,
  SlidersHorizontal,
  Heart,
} from "lucide-react";
import { useState, useMemo } from "react";
import { products, type Product } from "../Data/Product";
import LOGO1 from "../assets/LOGO1.png";
import Footer from "./Footer";

const Dashboard = () => {
  const navigate = useNavigate();

  // UI state
  const [selectedSizes, setSelectedSizes] = useState<Record<string, string>>(
    {},
  );

  // Filter & search state
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("All");
  const [conditionFilter, setConditionFilter] = useState<string>("All");
  const [sortBy, setSortBy] = useState("newest");
  const [showFilters, setShowFilters] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("mmc_user");
    navigate("/");
  };

  const WHATSAPP_NUMBER = "2347018703451";

  const handleAddToCart = (id: string) => {
    if (!selectedSizes[id]) {
      alert("Please select a size first");
      return;
    }

    const product = products.find((p) => p.id === id);
    if (!product) return;

    const message = `Hello MMC! 
I'd like to order the following:

Product: ${product.name}
Size: ${selectedSizes[id]}
Price: ₦${product.price.toLocaleString()}
Condition: ${product.condition}

Please confirm availability. Thank you!`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
    window.open(whatsappURL, "_blank");
  };

  // Filtered + sorted products
  const filtered = useMemo(() => {
    return products
      .filter((p) => p.name.toLowerCase().includes(search.toLowerCase()))
      .filter((p) =>
        categoryFilter === "All" ? true : p.category === categoryFilter,
      )
      .filter((p) =>
        conditionFilter === "All" ? true : p.condition === conditionFilter,
      )
      .sort((a, b) => {
        if (sortBy === "price-asc") return a.price - b.price;
        if (sortBy === "price-desc") return b.price - a.price;
        return 0;
      });
  }, [search, categoryFilter, conditionFilter, sortBy]);

  const discount = (price: number, original: number) =>
    Math.round(((original - price) / original) * 100);

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-1">
        <div className="min-h-screen bg-gray-50">
          {/* Navbar */}
          <nav className="bg-white shadow-sm px-6 py-4 flex items-center justify-between sticky top-0 z-10">
            <Link to="/">
              <img src={LOGO1} alt="MMC Logo" className="w-25" />
            </Link>

            <div className="hidden sm:flex items-center font-bold gap-6 text-sm text-black">
              <button
                onClick={() => navigate("/")}
                className="hover:text-blue-600 transition-colors"
              >
                Home
              </button>
              <button
                onClick={() => navigate("/")}
                className="hover:text-blue-600 transition-colors"
              >
                About
              </button>
              <button
                onClick={() => navigate("/")}
                className="hover:text-blue-600 transition-colors"
              >
                Contact
              </button>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={handleLogout}
                className="flex items-center gap-1 text-sm text-red-500 hover:underline"
              >
                <LogOut size={16} /> Log out
              </button>
            </div>
          </nav>

          <div className="max-w-6xl mx-auto px-6 py-8">
            {/* Search + Filter Bar */}
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              <div className="relative flex-1">
                <Search
                  size={15}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-200"
                />
              </div>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border border-gray-200 rounded-xl px-3 py-2.5 text-sm bg-white focus:outline-none"
              >
                <option value="newest">Newest</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>

              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 border border-gray-200 rounded-xl px-4 py-2.5 text-sm bg-white sm:hidden"
              >
                <SlidersHorizontal size={15} /> Filters
              </button>
            </div>

            {/* Filter Pills */}
            <div
              className={`flex flex-wrap gap-3 mb-6 ${showFilters ? "flex" : "hidden sm:flex"}`}
            >
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs text-gray-400 font-semibold uppercase tracking-wide">
                  Category:
                </span>
                {["All", "Men", "Women", "Unisex"].map((c) => (
                  <button
                    key={c}
                    onClick={() => setCategoryFilter(c)}
                    className={`text-xs px-3 py-1.5 rounded-full border font-medium transition-colors ${
                      categoryFilter === c
                        ? "bg-blue-600 text-white border-blue-600"
                        : "bg-white text-gray-600 border-gray-200 hover:border-blue-400"
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs text-gray-400 font-semibold uppercase tracking-wide">
                  Condition:
                </span>
                {["All", "Like New", "Good", "Fair"].map((c) => (
                  <button
                    key={c}
                    onClick={() => setConditionFilter(c)}
                    className={`text-xs px-3 py-1.5 rounded-full border font-medium transition-colors ${
                      conditionFilter === c
                        ? "bg-blue-600 text-white border-blue-600"
                        : "bg-white text-gray-600 border-gray-200 hover:border-blue-400"
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            {/* Result count */}
            <p className="text-sm text-gray-400 mb-5">
              Showing{" "}
              <strong className="text-gray-700">{filtered.length}</strong> of{" "}
              <strong className="text-gray-700">{products.length}</strong>{" "}
              products
            </p>

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filtered.map((p: Product) => (
                <div
                  key={p.id}
                  className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group"
                >
                  {/* Image */}
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Badges */}
                    <div className="absolute top-2 left-2 flex flex-col gap-1">
                      <button className="text-xs font-bold px-2 py-0.5 bg-white rounded hover:bg-red-50 transition-colors">
                        <Heart size={16} />
                      </button>
                    </div>

                    <span className="absolute top-2 right-2 text-xs font-semibold px-2 py-0.5 bg-white/90 rounded text-gray-700">
                      {p.condition}
                    </span>
                  </div>

                  {/* Body */}
                  <div className="p-4">
                    <h3 className="font-bold text-gray-800 text-sm">
                      {p.name}
                    </h3>
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

                    {/* Sizes */}
                    <div className="flex gap-1.5 flex-wrap mb-3">
                      {p.sizes.map((s, idx) => (
                        <button
                          key={`${p.id}-size-${idx}`}
                          onClick={() =>
                            setSelectedSizes((prev) => ({ ...prev, [p.id]: s }))
                          }
                          className={`text-xs px-2 py-0.5 rounded border font-medium transition-colors ${
                            selectedSizes[p.id] === s
                              ? "bg-blue-600 text-white border-blue-600"
                              : "bg-gray-50 text-gray-500 border-gray-200 hover:border-blue-400"
                          }`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>

                    {/* Add to Cart */}
                    <button
                      onClick={() => handleAddToCart(p.id)}
                      className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-colors bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      <ShoppingCart size={15} />
                      Order via WhatsApp
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Empty state */}
            {filtered.length === 0 && (
              <div className="text-center py-20 text-gray-400">
                <p className="text-5xl mb-4">🔍</p>
                <p className="font-semibold text-gray-600">No products found</p>
                <p className="text-sm mt-1">Try a different search or filter</p>
                <button
                  onClick={() => {
                    setSearch("");
                    setCategoryFilter("All");
                    setConditionFilter("All");
                  }}
                  className="mt-4 text-sm text-blue-600 hover:underline"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
