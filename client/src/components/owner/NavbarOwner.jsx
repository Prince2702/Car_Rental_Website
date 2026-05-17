import React from 'react'
import { assets } from '../../assets/assets'
import { Link, useNavigate } from 'react-router-dom'
import { useAppContext } from '../../context/AppContext'

const NavbarOwner = () => {
  const { logout, user } = useAppContext()
  const navigate = useNavigate()

  return (
    <div className='flex items-center justify-between px-6 md:px-10 py-3.5 border-b border-borderColor bg-white shadow-sm sticky top-0 z-50'>
      {/* Logo */}
      <Link to='/owner'>
        <img src={assets.logo} alt="CarRental logo" className='h-7 md:h-8' />
      </Link>

      {/* Right actions */}
      <div className='flex items-center gap-4'>
        <span className='text-sm text-gray-500 hidden sm:block'>
          Welcome, <span className='font-medium text-gray-800'>{user?.name || 'Owner'}</span>
        </span>
        <Link
          to='/'
          className='text-xs text-gray-500 hover:text-primary transition-colors border border-borderColor px-3 py-1.5 rounded-lg hover:border-primary hidden sm:block'
        >
          ← Home
        </Link>
        <button
          onClick={logout}
          className='text-xs bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 px-4 py-1.5 rounded-lg font-medium transition-all cursor-pointer'
        >
          Logout
        </button>
      </div>
    </div>
  )
}

export default NavbarOwner
