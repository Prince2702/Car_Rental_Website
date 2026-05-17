import React, { useEffect, useState } from 'react'
import NavbarOwner from '../../components/owner/NavbarOwner'
import Sidebar from '../../components/owner/Sidebar'
import { Outlet } from 'react-router-dom'
import { useAppContext } from '../../context/AppContext'

const Layout = () => {
  const {isOwner, navigate, token, user, setShowLogin} = useAppContext()
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
    // Allow a small delay to let user load from context
    const timer = setTimeout(() => setLoading(false), 800)
    return () => clearTimeout(timer)
  }, [])

  useEffect(()=>{
    if(!loading) {
      if(!token) {
        setShowLogin(true)
        navigate('/')
      }
    }
  },[loading, token, isOwner])

  if(loading) return <div className="min-h-screen bg-gray-50 flex items-center justify-center">Loading...</div>

  if(!isOwner && user) return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center text-center px-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Access Denied</h2>
          <p className="text-gray-500 mb-6">You need an owner account to view this panel.</p>
          <button onClick={() => navigate('/')} className="bg-primary text-white px-6 py-2 rounded-xl text-sm font-medium">Go Home</button>
      </div>
  )

  if(isOwner) {
    return (
      <div className='flex flex-col bg-gray-50 min-h-screen'>
        <NavbarOwner />
        <div className='flex flex-1'>
          <Sidebar />
          <div className='flex-1 overflow-y-auto w-full'>
            <Outlet />
          </div>
        </div>
      </div>
    )
  }

  return null
}

export default Layout
