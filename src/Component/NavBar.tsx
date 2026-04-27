import { Link, NavLink, useNavigate } from 'react-router-dom';
import { ShoppingCart, Menu } from 'lucide-react';
import { useState } from 'react';
import { isSignedUp } from '../Hooks/Authen';

export const NavBar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();
    const loggedIn = isSignedUp();

    const navLinks = [
        { label: 'Home', to: '/' },
        { label: 'Shop', to: '/shop' },
        { label: 'About Us', to: '/about' },
        { label: 'Contact', to: '/contact' },
    ];

    return (
        <nav className='sticky top-0 z-50 bg-white border-b border-gray-200 py-3 px-6 flex items-center justify-between w-full'>

            <Link to="/" className='font-bold text-blue-700 text-xl'>MMC</Link>

            {/* Desktop Nav Links */}
            <div className='hidden md:flex items-center gap-6'>
                {navLinks.map(link => (
                    <NavLink
                        key={link.to}
                        to={link.to}
                        className={({ isActive }) =>
                            `text-sm font-bold transition-colors ${isActive ? "text-blue-700" : "text-gray-700 hover:text-blue-700"}`
                        }
                    >
                        {link.label}
                    </NavLink>
                ))}
            </div>

            {/* Right Side */}
            <div className='flex items-center gap-3'>
                {/* Cart */}
                <Link to="/cart" className='relative p-2 text-gray-600'>
                    <ShoppingCart className='w-5' />
                    <span className='absolute -top-0.5 -right-0.5 bg-blue-700 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center'>
                        0
                    </span>
                </Link>

                {/* Desktop Auth Button */}
                <div className='hidden md:flex items-center gap-2'>
                    {loggedIn ? (
                        <button
                            onClick={() => navigate("/dashboard")}
                            className='text-sm font-bold bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition-colors'
                        >
                            Dashboard
                        </button>
                    ) : (
                        <Link
                            to="/signup"
                            className='text-sm font-bold bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition-colors'
                        >
                            Sign Up
                        </Link>
                    )}
                </div>

                {/* Hamburger */}
                <button className='md:hidden p-2 text-gray-600' onClick={() => setMenuOpen(!menuOpen)}>
                    <Menu className='w-5' />
                </button>
            </div>

            {/* Mobile Menu */}
            {menuOpen && (
                <div className='absolute top-full left-0 w-full bg-white border-t border-gray-200 flex flex-col px-6 py-4 gap-4 md:hidden'>
                    {navLinks.map(link => (
                        <NavLink
                            key={link.to}
                            to={link.to}
                            onClick={() => setMenuOpen(false)}
                            className='text-sm font-bold text-gray-700 hover:text-blue-700 transition-colors'
                        >
                            {link.label}
                        </NavLink>
                    ))}

                    <div className='pt-2 border-t border-gray-100'>
                        {loggedIn ? (
                            <button
                                onClick={() => { navigate("/dashboard"); setMenuOpen(false); }}
                                className='w-full text-sm font-bold bg-blue-600 text-white px-4 py-2 rounded-xl text-center'
                            >
                                Dashboard
                            </button>
                        ) : (
                            <Link
                                to="/signup"
                                onClick={() => setMenuOpen(false)}
                                className='block text-sm font-bold bg-blue-600 text-white px-4 py-2 rounded-xl text-center'
                            >
                                Sign Up
                            </Link>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};