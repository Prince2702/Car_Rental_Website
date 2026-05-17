import React, { useEffect, useState } from 'react'
import Title from '../../components/owner/Title'
import { useAppContext } from '../../context/AppContext'
import toast from 'react-hot-toast'
import { motion } from 'motion/react'

const ManageBookings = () => {

  const { currency, axios } = useAppContext()
  const [bookings, setBookings] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const fetchOwnerBookings = async () => {
    setIsLoading(true)
    try {
      const { data } = await axios.get('/api/bookings/owner')
      data.success ? setBookings(data.bookings) : toast.error(data.message)
    } catch (error) {
      toast.error(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  const changeBookingStatus = async (bookingId, status) => {
    try {
      const { data } = await axios.post('/api/bookings/change-status', { bookingId, status })
      if (data.success) {
        toast.success(data.message)
        fetchOwnerBookings()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    fetchOwnerBookings()
  }, [])

  const statusStyle = {
    confirmed: 'bg-green-100 text-green-600',
    cancelled: 'bg-red-100 text-red-500',
    pending: 'bg-yellow-100 text-yellow-600',
  }

  return (
    <div className='px-4 py-8 md:px-8 w-full overflow-auto'>

      <Title
        title="Manage Bookings"
        subTitle="Track all customer bookings, approve or cancel requests, and manage booking statuses."
      />

      {/* Loading skeleton */}
      {isLoading && (
        <div className='mt-8 space-y-3'>
          {[1,2,3].map(i => (
            <div key={i} className='animate-pulse flex items-center gap-4 p-4 border border-borderColor rounded-xl'>
              <div className='w-14 h-14 bg-gray-200 rounded-lg flex-shrink-0' />
              <div className='flex-1 space-y-2'>
                <div className='h-3 bg-gray-200 rounded w-1/3' />
                <div className='h-3 bg-gray-100 rounded w-1/5' />
              </div>
              <div className='w-20 h-7 bg-gray-200 rounded-full' />
            </div>
          ))}
        </div>
      )}

      {/* Empty state */}
      {!isLoading && bookings.length === 0 && (
        <div className='flex flex-col items-center justify-center py-20 text-center'>
          <p className='text-gray-500 font-medium'>No bookings found</p>
          <p className='text-sm text-gray-400 mt-1'>Customer bookings will appear here.</p>
        </div>
      )}

      {/* Table */}
      {!isLoading && bookings.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className='mt-6 w-full rounded-2xl overflow-hidden border border-borderColor shadow-sm'
        >
          <table className='w-full border-collapse text-left text-sm'>
            <thead className='bg-gray-50 text-xs text-gray-500 uppercase tracking-wide'>
              <tr>
                <th className="p-4 font-semibold">Car</th>
                <th className="p-4 font-semibold max-md:hidden">Dates</th>
                <th className="p-4 font-semibold">Total</th>
                <th className="p-4 font-semibold max-sm:hidden">Payment</th>
                <th className="p-4 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className='divide-y divide-borderColor'>
              {bookings.map((booking, index) => (
                <motion.tr
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className='hover:bg-gray-50 transition-colors'
                >
                  <td className='p-4'>
                    <div className='flex items-center gap-3'>
                      <img src={booking.car.image} alt="" className='h-12 w-14 rounded-lg object-cover flex-shrink-0' />
                      <span className='font-medium text-gray-800 max-md:hidden'>{booking.car.brand} {booking.car.model}</span>
                    </div>
                  </td>

                  <td className='p-4 text-gray-500 text-xs max-md:hidden'>
                    <p>{booking.pickupDate.split('T')[0]}</p>
                    <p className='text-gray-400'>→ {booking.returnDate.split('T')[0]}</p>
                  </td>

                  <td className='p-4 font-semibold text-gray-800'>{currency}{booking.price}</td>

                  <td className='p-4 max-sm:hidden'>
                    <span className='bg-gray-100 text-gray-500 px-3 py-1 rounded-full text-xs font-medium'>offline</span>
                  </td>

                  <td className='p-4'>
                    {booking.status === 'pending' ? (
                      <select
                        onChange={e => changeBookingStatus(booking._id, e.target.value)}
                        defaultValue={booking.status}
                        className='px-2 py-1.5 text-xs text-gray-600 border border-borderColor rounded-lg outline-none cursor-pointer bg-white'
                      >
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirm</option>
                        <option value="cancelled">Cancel</option>
                      </select>
                    ) : (
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${statusStyle[booking.status] || 'bg-gray-100 text-gray-500'}`}>
                        {booking.status}
                      </span>
                    )}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      )}
    </div>
  )
}

export default ManageBookings
