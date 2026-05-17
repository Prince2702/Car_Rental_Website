import React, { useEffect, useState } from 'react'
import { assets } from '../../assets/assets'
import Title from '../../components/owner/Title'
import { useAppContext } from '../../context/AppContext'
import toast from 'react-hot-toast'
import { motion } from 'motion/react'

const Dashboard = () => {

  const { axios, isOwner, currency } = useAppContext()

  const [data, setData] = useState({
    totalCars: 0,
    totalBookings: 0,
    pendingBookings: 0,
    completedBookings: 0,
    recentBookings: [],
    monthlyRevenue: 0,
  })

  const dashboardCards = [
    { title: "Total Cars", value: data.totalCars, icon: assets.carIconColored, color: 'bg-blue-50', border: 'border-blue-100' },
    { title: "Total Bookings", value: data.totalBookings, icon: assets.listIconColored, color: 'bg-purple-50', border: 'border-purple-100' },
    { title: "Pending", value: data.pendingBookings, icon: assets.cautionIconColored, color: 'bg-yellow-50', border: 'border-yellow-100' },
    { title: "Confirmed", value: data.completedBookings, icon: assets.listIconColored, color: 'bg-green-50', border: 'border-green-100' },
  ]

  const fetchDashboardData = async () => {
    try {
      const { data } = await axios.get('/api/owner/dashboard')
      if (data.success) {
        setData(data.dashboardData)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if (isOwner) {
      fetchDashboardData()
    }
  }, [isOwner])

  return (
    <div className='px-4 py-8 md:px-8 flex-1 overflow-auto'>
      <Title
        title="Admin Dashboard"
        subTitle="Monitor overall platform performance including total cars, bookings, revenue, and recent activities"
      />

      {/* Stats cards */}
      <div className='grid grid-cols-2 lg:grid-cols-4 gap-4 my-8'>
        {dashboardCards.map((card, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.4 }}
            className={`flex items-center justify-between p-4 rounded-2xl border ${card.color} ${card.border} shadow-sm`}
          >
            <div>
              <p className='text-xs text-gray-500 font-medium mb-1'>{card.title}</p>
              <p className='text-2xl font-bold text-gray-800'>{card.value}</p>
            </div>
            <div className={`flex items-center justify-center w-11 h-11 rounded-xl ${card.color}`}>
              <img src={card.icon} alt={card.title} className='h-5 w-5' />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Revenue highlight */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className='bg-gradient-to-r from-primary to-blue-400 text-white rounded-2xl p-6 mb-6 shadow-lg shadow-primary/20 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4'
      >
        <div>
          <p className='text-xs text-blue-100 uppercase tracking-wider font-semibold'>Monthly Revenue</p>
          <p className='text-4xl font-bold mt-1'>{currency}{data.monthlyRevenue}</p>
          <p className='text-xs text-blue-200 mt-1'>Revenue for current month</p>
        </div>
        <div className='bg-white/15 backdrop-blur-sm rounded-xl p-4 text-center'>
          <p className='text-2xl font-bold'>{data.totalBookings}</p>
          <p className='text-xs text-blue-100'>Total Bookings</p>
        </div>
      </motion.div>

      {/* Recent bookings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className='bg-white border border-borderColor rounded-2xl shadow-sm overflow-hidden'
      >
        <div className='p-5 border-b border-borderColor'>
          <h2 className='text-base font-semibold text-gray-800'>Recent Bookings</h2>
          <p className='text-xs text-gray-400 mt-0.5'>Latest customer reservations</p>
        </div>

        {data.recentBookings.length === 0 ? (
          <div className='py-12 text-center text-gray-400 text-sm'>No bookings yet</div>
        ) : (
          <div className='divide-y divide-borderColor'>
            {data.recentBookings.map((booking, index) => (
              <div key={index} className='flex items-center justify-between px-5 py-4 hover:bg-gray-50 transition-colors'>
                <div className='flex items-center gap-3'>
                  <div className='hidden sm:flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 flex-shrink-0'>
                    <img src={assets.listIconColored} alt="" className='h-4 w-4' />
                  </div>
                  <div>
                    <p className='text-sm font-medium text-gray-800'>{booking.car.brand} {booking.car.model}</p>
                    <p className='text-xs text-gray-400'>{booking.createdAt.split('T')[0]}</p>
                  </div>
                </div>
                <div className='flex items-center gap-3'>
                  <p className='text-sm font-semibold text-gray-700'>{currency}{booking.price}</p>
                  <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${
                    booking.status === 'confirmed'
                      ? 'bg-green-50 text-green-600 border-green-200'
                      : booking.status === 'cancelled'
                      ? 'bg-red-50 text-red-500 border-red-200'
                      : 'bg-yellow-50 text-yellow-600 border-yellow-200'
                  }`}>
                    {booking.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  )
}

export default Dashboard
