import { Link, NavLink } from 'react-router-dom'
import { ShoppingCart, Menu } from 'lucide-react'
import { useState } from 'react'

export const NavBar = () => {
    const [menuOpen, setMenuOpen] = useState(false)

    const navLinks = [
        { label: 'Home', to: '/' },
        { label: 'Shop', to: '/shop' },
        { label: 'Men', to: '/shop/men' },
        { label: 'Women', to: '/shop/women' },
        { label: 'Sale', to: '/sale' },
    ]

    return (
        <nav className='sticky top-0 z-50 bg-white border-b border-gray-200 py-3 px-6 flex items-center justify-between w-full'>


            <Link to="/" className='font-bold text-blue-700 text-xl'>
                MMC 
            </Link>

            <div className='hidden md:flex items-center gap-6'>
                {navLinks.map(link => (
                    <NavLink
                        key={link.to}
                        to={link.to}
                        className='text-sm font-bold transition-colors text-black-600 hover:text-blue-700'
                    >
                        {link.label}
                    </NavLink>
                ))}
            </div>

            {/* Right side actions */}
            <div className='flex items-center gap-3'>

                {/* ________cart______ */}
                <Link to="/cart" className='relative p-2 text-gray-600 transition-colors'>
                    <ShoppingCart className='w-5' />
                    <span className='absolute -top-0.5 -right-0.5 bg-blue-700 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center'>
                        0
                    </span>
                </Link>

                {/*  _______desktop btn_______ */}
                <div className='hidden md:flex items-center gap-2'>
                    <Link to="/signin" className='text-sm  btn font-bold'>
                        Sign In
                    </Link>
                    <Link to="/signup" className='text-sm btn btn-primary font-bold'>
                        Sign Up
                    </Link>
                </div>

                {/* _______Hamburger_____*/}
                <button
                    className='md:hidden p-2 text-gray-600'
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    <Menu className='w-5' />
                </button>
            </div>

            {/* _____menu dropdown_____ */}
            {menuOpen && (
                <div className='absolute top-full left-0 w-full bg-white border-t border-gray-200 flex flex-col px-6 py-4 gap-4 md:hidden'>
                    {navLinks.map(link => (
                        <NavLink
                            key={link.to}
                            to={link.to}
                            onClick={() => setMenuOpen(false)}
                            className='text-sm font-bold transition-colors text-black-600 hover:text-blue-700'
                        >
                            {link.label}
                        </NavLink>
                    ))}
                    <div className='flex gap-2 pt-2 border-t border-gray-100'>
                        <Link to="/signin" className='btn btn-primary font-bold flex-1 text-center'>Sign In</Link>
                        <Link to="/signup" className='btn btn-primary font-bold flex-1 text-center'>Sign Up</Link>
                    </div>
                </div>
            )}

        </nav>
    )
}