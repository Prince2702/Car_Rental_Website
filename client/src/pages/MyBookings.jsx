import React, { useEffect, useState } from 'react'
import { assets } from '../assets/assets'
import Title from '../components/Title'
import { useAppContext } from '../context/AppContext'
import toast from 'react-hot-toast'
import { motion } from 'motion/react'
import { Link } from 'react-router-dom'

const MyBookings = () => {
  const { axios, user, currency, navigate, setShowLogin } = useAppContext()
  const [bookings, setBookings] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const fetchMyBookings = async () => {
    setIsLoading(true)
    try {
      const { data } = await axios.get('/api/bookings/user')
      if (data.success) {
        setBookings(data.bookings)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (user) {
      fetchMyBookings()
    }
  }, [user])

  const statusStyles = {
    confirmed: 'bg-green-100 text-green-600',
    pending: 'bg-yellow-100 text-yellow-600',
    cancelled: 'bg-red-100 text-red-500',
  }

  if (!user) {
    return (
      <div className='flex flex-col items-center justify-center min-h-[60vh] px-4 text-center'>
        <div className='w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-4'>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </div>
        <h2 className='text-xl font-bold text-gray-800 mb-2'>Sign in to view bookings</h2>
        <p className='text-gray-500 text-sm mb-6'>Please log in to access your booking history.</p>
        <button 
          onClick={() => setShowLogin(true)} 
          className='px-6 py-2.5 bg-primary text-white rounded-xl text-sm font-medium hover:bg-primary-dull transition-all cursor-pointer'>
          Login
        </button>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className='px-4 md:px-16 lg:px-24 xl:px-32 2xl:px-48 mt-10 mb-20 max-w-7xl'
    >
      <Title title='My Bookings' subTitle='View and manage all your car rental bookings' align="left" />

      {/* Loading skeleton */}
      {isLoading && (
        <div className='space-y-4 mt-10'>
          {[1, 2, 3].map(i => (
            <div key={i} className='animate-pulse rounded-xl border border-gray-100 p-6 grid grid-cols-1 md:grid-cols-4 gap-4'>
              <div className='md:col-span-1 space-y-2'>
                <div className='h-32 bg-gray-200 rounded-lg' />
                <div className='h-4 bg-gray-200 rounded w-3/4' />
              </div>
              <div className='md:col-span-2 space-y-3 pt-2'>
                <div className='h-3 bg-gray-200 rounded w-1/2' />
                <div className='h-3 bg-gray-100 rounded w-3/4' />
                <div className='h-3 bg-gray-100 rounded w-2/3' />
              </div>
              <div className='md:col-span-1 flex items-end justify-end'>
                <div className='h-8 w-20 bg-gray-200 rounded' />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Empty state */}
      {!isLoading && bookings.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className='flex flex-col items-center justify-center py-24 text-center'
        >
          <div className='w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4'>
            <img src={assets.calendar_icon_colored} alt="" className='w-9 h-9 opacity-40' />
          </div>
          <h3 className='text-xl font-semibold text-gray-700 mb-2'>No bookings yet</h3>
          <p className='text-gray-400 text-sm max-w-xs mb-6'>You haven't made any car rentals. Browse our fleet and book your first ride!</p>
          <Link
            to='/cars'
            className='px-6 py-2.5 bg-primary text-white rounded-xl text-sm font-medium hover:bg-primary-dull transition-all shadow-md'
          >
            Browse Cars
          </Link>
        </motion.div>
      )}

      {/* Bookings list */}
      {!isLoading && bookings.length > 0 && (
        <div className='space-y-4 mt-10'>
          {bookings.map((booking, index) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08, duration: 0.4 }}
              key={booking._id}
              className='grid grid-cols-1 md:grid-cols-4 gap-5 p-5 md:p-6 border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-all bg-white'
            >
              {/* Car image + name */}
              <div className='md:col-span-1'>
                <div className='rounded-xl overflow-hidden aspect-video bg-gray-50'>
                  <img
                    src={booking.car.image}
                    alt={`${booking.car.brand} ${booking.car.model}`}
                    className='w-full h-full object-cover'
                  />
                </div>
                <p className='text-base font-semibold mt-3 text-gray-900'>{booking.car.brand} {booking.car.model}</p>
                <p className='text-xs text-gray-400'>{booking.car.year} · {booking.car.category} · {booking.car.location}</p>
              </div>

              {/* Booking info */}
              <div className='md:col-span-2 space-y-3 text-sm'>
                <div className='flex flex-wrap items-center gap-2'>
                  <span className='px-3 py-1 bg-light rounded-full text-xs font-medium text-gray-600'>
                    Booking #{index + 1}
                  </span>
                  <span className={`px-3 py-1 text-xs rounded-full font-medium capitalize ${statusStyles[booking.status] || 'bg-gray-100 text-gray-500'}`}>
                    {booking.status}
                  </span>
                </div>

                <div className='flex items-start gap-2.5'>
                  <img src={assets.calendar_icon_colored} alt="" className='w-4 h-4 mt-0.5 flex-shrink-0' />
                  <div>
                    <p className='text-gray-400 text-xs mb-0.5'>Rental Period</p>
                    <p className='font-medium text-gray-700'>
                      {booking.pickupDate.split('T')[0]} → {booking.returnDate.split('T')[0]}
                    </p>
                  </div>
                </div>

                <div className='flex items-start gap-2.5'>
                  <img src={assets.location_icon_colored} alt="" className='w-4 h-4 mt-0.5 flex-shrink-0' />
                  <div>
                    <p className='text-gray-400 text-xs mb-0.5'>Pick-up Location</p>
                    <p className='font-medium text-gray-700'>{booking.car.location}</p>
                  </div>
                </div>
              </div>

              {/* Price + date */}
              <div className='md:col-span-1 flex flex-row md:flex-col justify-between md:justify-end md:items-end gap-4 border-t md:border-t-0 md:border-l border-gray-100 pt-4 md:pt-0 md:pl-4'>
                <div className='text-right'>
                  <p className='text-xs text-gray-400'>Total Price</p>
                  <p className='text-2xl font-bold text-primary'>{currency}{booking.price}</p>
                  <p className='text-xs text-gray-400 mt-0.5'>Booked {booking.createdAt.split('T')[0]}</p>
                </div>
                <button
                  onClick={() => { navigate(`/car-details/${booking.car._id}`); scrollTo(0,0) }}
                  className='text-xs text-primary font-medium border border-primary/30 px-3 py-1.5 rounded-lg hover:bg-primary/5 transition-all cursor-pointer whitespace-nowrap'
                >
                  View Car
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  )
}

export default MyBookings
