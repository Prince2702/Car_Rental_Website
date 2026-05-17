import React, { useState } from 'react'
import { assets, ownerMenuLinks } from '../../assets/assets'
import { NavLink, useLocation } from 'react-router-dom'
import { useAppContext } from '../../context/AppContext'
import toast from 'react-hot-toast'

const Sidebar = () => {

  const { user, axios, fetchUser } = useAppContext()
  const location = useLocation()
  const [image, setImage] = useState('')

  const updateImage = async () => {
    try {
      const formData = new FormData()
      formData.append('image', image)
      const { data } = await axios.post('/api/owner/update-image', formData)
      if (data.success) {
        fetchUser()
        toast.success(data.message)
        setImage('')
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <aside className='relative flex flex-col items-center pt-8 min-h-[calc(100vh-57px)] w-16 md:w-56 border-r border-borderColor bg-white flex-shrink-0'>

      {/* Profile */}
      <div className='group relative mb-1'>
        <label htmlFor="sidebar-image" className='cursor-pointer block'>
          <img
            src={image ? URL.createObjectURL(image) : user?.image || "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=300"}
            alt="Profile"
            className='h-12 w-12 md:h-16 md:w-16 rounded-full object-cover mx-auto ring-4 ring-primary/10'
          />
          <input type="file" id='sidebar-image' accept="image/*" hidden onChange={e => setImage(e.target.files[0])} />
          <div className='absolute inset-0 bg-black/20 rounded-full hidden group-hover:flex items-center justify-center'>
            <img src={assets.edit_icon} alt="edit" className='w-4 h-4' />
          </div>
        </label>
      </div>

      {image && (
        <button
          onClick={updateImage}
          className='flex items-center gap-1 text-xs bg-primary/10 text-primary px-3 py-1 rounded-full cursor-pointer hover:bg-primary/20 transition-all mb-2'
        >
          Save <img src={assets.check_icon} width={10} alt="" />
        </button>
      )}

      <p className='mt-1 text-sm font-medium text-gray-700 max-md:hidden truncate max-w-[10rem] text-center'>{user?.name}</p>
      <p className='text-xs text-gray-400 max-md:hidden mb-6'>Car Owner</p>

      {/* Nav links */}
      <nav className='w-full mt-4'>
        {ownerMenuLinks.map((link, index) => {
          const isActive = link.path === location.pathname
          return (
            <NavLink
              key={index}
              to={link.path}
              title={link.name}
              className={`relative flex items-center gap-3 py-3 pl-4 md:pl-5 w-full transition-all ${
                isActive
                  ? 'bg-primary/10 text-primary'
                  : 'text-gray-500 hover:bg-gray-50 hover:text-gray-800'
              }`}
            >
              <img
                src={isActive ? link.coloredIcon : link.icon}
                alt={link.name}
                className='w-5 h-5 flex-shrink-0'
              />
              <span className='max-md:hidden text-sm font-medium'>{link.name}</span>
              {isActive && (
                <span className='absolute right-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-primary rounded-l-full' />
              )}
            </NavLink>
          )
        })}
      </nav>
    </aside>
  )
}

export default Sidebar
