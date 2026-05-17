import React, { useEffect, useState } from 'react'
import { assets } from '../../assets/assets'
import Title from '../../components/owner/Title'
import { useAppContext } from '../../context/AppContext'
import toast from 'react-hot-toast'
import { motion } from 'motion/react'

const ManageCars = () => {

  const { isOwner, axios, currency } = useAppContext()
  const [cars, setCars] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const fetchOwnerCars = async () => {
    setIsLoading(true)
    try {
      const { data } = await axios.get('/api/owner/cars')
      if (data.success) {
        setCars(data.cars)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  const toggleAvailability = async (carId) => {
    try {
      const { data } = await axios.post('/api/owner/toggle-car', { carId })
      if (data.success) {
        toast.success(data.message)
        fetchOwnerCars()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const deleteCar = async (carId) => {
    if (!window.confirm('Are you sure you want to delete this car?')) return
    try {
      const { data } = await axios.post('/api/owner/delete-car', { carId })
      if (data.success) {
        toast.success(data.message)
        fetchOwnerCars()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if (isOwner) fetchOwnerCars()
  }, [isOwner])

  return (
    <div className='px-4 py-8 md:px-8 w-full overflow-auto'>

      <Title
        title="Manage Cars"
        subTitle="View all listed cars, update their availability, or remove them from the platform."
      />

      {/* Loading */}
      {isLoading && (
        <div className='mt-8 space-y-3'>
          {[1,2,3].map(i => (
            <div key={i} className='animate-pulse flex items-center gap-4 p-4 border border-borderColor rounded-xl'>
              <div className='w-14 h-14 bg-gray-200 rounded-lg flex-shrink-0' />
              <div className='flex-1 space-y-2'>
                <div className='h-3 bg-gray-200 rounded w-1/3' />
                <div className='h-3 bg-gray-100 rounded w-1/4' />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Empty state */}
      {!isLoading && cars.length === 0 && (
        <div className='flex flex-col items-center justify-center py-20 text-center'>
          <div className='w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4'>
            <img src={assets.carIcon} alt="" className='w-8 h-8 opacity-30' />
          </div>
          <p className='text-gray-500 font-medium'>No cars listed yet</p>
          <p className='text-sm text-gray-400 mt-1'>Add your first car to start earning.</p>
        </div>
      )}

      {/* Table */}
      {!isLoading && cars.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className='mt-6 w-full rounded-2xl overflow-hidden border border-borderColor shadow-sm'
        >
          <table className='w-full border-collapse text-left text-sm text-gray-600'>
            <thead className='bg-gray-50 text-xs text-gray-500 uppercase tracking-wide'>
              <tr>
                <th className="p-4 font-semibold">Car</th>
                <th className="p-4 font-semibold max-md:hidden">Category</th>
                <th className="p-4 font-semibold">Price</th>
                <th className="p-4 font-semibold max-sm:hidden">Status</th>
                <th className="p-4 font-semibold text-center">Actions</th>
              </tr>
            </thead>
            <tbody className='divide-y divide-borderColor'>
              {cars.map((car, index) => (
                <motion.tr
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className='hover:bg-gray-50 transition-colors'
                >
                  <td className='p-4'>
                    <div className='flex items-center gap-3'>
                      <img src={car.image} alt="" className="h-12 w-14 rounded-lg object-cover flex-shrink-0" />
                      <div className='max-sm:hidden'>
                        <p className='font-medium text-gray-800'>{car.brand} {car.model}</p>
                        <p className='text-xs text-gray-400'>{car.seating_capacity} seats · {car.transmission}</p>
                      </div>
                    </div>
                  </td>
                  <td className='p-4 max-md:hidden'>
                    <span className='px-2.5 py-1 bg-gray-100 rounded-full text-xs font-medium'>{car.category}</span>
                  </td>
                  <td className='p-4 font-semibold text-gray-800'>{currency}{car.pricePerDay}<span className='text-xs font-normal text-gray-400'>/day</span></td>
                  <td className='p-4 max-sm:hidden'>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${car.isAvaliable ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-500'}`}>
                      {car.isAvaliable ? "Available" : "Unavailable"}
                    </span>
                  </td>
                  <td className='p-4'>
                    <div className='flex items-center justify-center gap-2'>
                      <button
                        onClick={() => toggleAvailability(car._id)}
                        title={car.isAvaliable ? 'Hide car' : 'Show car'}
                        className='p-2 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer'
                      >
                        <img src={car.isAvaliable ? assets.eye_close_icon : assets.eye_icon} alt="" className='w-4 h-4' />
                      </button>
                      <button
                        onClick={() => deleteCar(car._id)}
                        title='Delete car'
                        className='p-2 rounded-lg hover:bg-red-50 transition-colors cursor-pointer'
                      >
                        <img src={assets.delete_icon} alt="" className='w-4 h-4' />
                      </button>
                    </div>
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

export default ManageCars
