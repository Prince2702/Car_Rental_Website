import React, { useState, useEffect } from 'react'
import { assets, menuLinks } from '../assets/assets'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'
import toast from 'react-hot-toast'
import { motion, AnimatePresence } from 'motion/react'

const Navbar = () => {

    const { setShowLogin, user, logout, isOwner, axios, setIsOwner } = useAppContext()

    const location = useLocation()
    const [open, setOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)
    const navigate = useNavigate()

    // Close menu on route change
    useEffect(() => {
        setOpen(false)
    }, [location.pathname])

    // Add shadow on scroll
    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 10)
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const isHomePage = location.pathname === "/"

    return (
        <motion.nav
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className={`flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 text-gray-600 border-b border-borderColor relative transition-all z-50 sticky top-0 ${isHomePage ? 'bg-light' : 'bg-white'} ${scrolled ? 'shadow-md' : ''}`}
        >
            <Link to='/'>
                <motion.img whileHover={{ scale: 1.05 }} src={assets.logo} alt="CarRental logo" className="h-8" />
            </Link>

            {/* Desktop nav links */}
            <div className="hidden sm:flex items-center gap-8">
                {menuLinks.map((link, index) => (
                    <NavLink
                        key={index}
                        to={link.path}
                        className={({ isActive }) =>
                            `relative font-medium pb-1 transition-all hover:text-primary ${isActive ? 'text-primary' : 'text-gray-600'}`
                        }
                    >
                        {({ isActive }) => (
                            <>
                                {link.name}
                                {isActive && (
                                    <motion.span
                                        layoutId="nav-underline"
                                        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full"
                                    />
                                )}
                            </>
                        )}
                    </NavLink>
                ))}
            </div>

            {/* Desktop search + actions */}
            <div className="hidden sm:flex items-center gap-4">
                <div className='hidden lg:flex items-center text-sm gap-2 border border-borderColor px-3 py-1.5 rounded-full bg-white'>
                    <img src={assets.search_icon} alt="search" className="w-4 h-4" />
                    <input
                        type="text"
                        className="w-32 bg-transparent outline-none placeholder-gray-400 text-sm"
                        placeholder="Search cars"
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' && e.target.value) {
                                navigate(`/cars?q=${e.target.value}`)
                            }
                        }}
                    />
                </div>

                {isOwner && (
                    <button
                        onClick={() => navigate('/owner')}
                        className="text-sm font-medium text-gray-600 hover:text-primary cursor-pointer"
                    >
                        Dashboard
                    </button>
                )}

                <button
                    onClick={() => { user ? logout() : setShowLogin(true) }}
                    className="cursor-pointer px-6 py-2 bg-primary hover:bg-primary-dull text-white rounded-lg text-sm font-medium shadow-sm"
                >
                    {user ? 'Logout' : 'Login'}
                </button>
            </div>

            {/* Mobile menu toggle */}
            <button
                className='sm:hidden cursor-pointer p-1 rounded-md hover:bg-gray-100'
                aria-label={open ? "Close menu" : "Open menu"}
                onClick={() => setOpen(!open)}
            >
                <img src={open ? assets.close_icon : assets.menu_icon} alt="menu" className="w-6 h-6" />
            </button>

            {/* Mobile dropdown */}
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className={`sm:hidden absolute top-full left-0 right-0 flex flex-col gap-1 p-4 border-t border-borderColor shadow-lg z-50 ${isHomePage ? 'bg-light' : 'bg-white'}`}
                    >
                        {menuLinks.map((link, index) => (
                            <NavLink
                                key={index}
                                to={link.path}
                                className={({ isActive }) =>
                                    `px-4 py-3 rounded-lg font-medium transition-all ${isActive ? 'bg-primary/10 text-primary' : 'text-gray-600 hover:bg-gray-100'}`
                                }
                            >
                                {link.name}
                            </NavLink>
                        ))}
                        <div className="border-t border-borderColor my-1 pt-2 flex flex-col gap-2">
                            {isOwner && (
                                <button
                                    onClick={() => navigate('/owner')}
                                    className="px-4 py-2.5 text-left rounded-lg text-gray-600 hover:bg-gray-100 font-medium cursor-pointer"
                                >
                                    Dashboard
                                </button>
                            )}
                            <button
                                onClick={() => { user ? logout() : setShowLogin(true) }}
                                className="px-4 py-2.5 bg-primary hover:bg-primary-dull text-white rounded-lg font-medium text-sm cursor-pointer"
                            >
                                {user ? 'Logout' : 'Login'}
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    )
}

export default Navbar
