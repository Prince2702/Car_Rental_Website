import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { motion } from 'motion/react'

const CarCard = ({ car }) => {
  const currency = import.meta.env.VITE_CURRENCY
  const navigate = useNavigate()

  return (
    <motion.div
      whileHover={{ y: -4, boxShadow: '0 20px 40px rgba(0,0,0,0.12)' }}
      transition={{ duration: 0.25 }}
      onClick={() => { navigate(`/car-details/${car._id}`); scrollTo(0, 0) }}
      className='group rounded-2xl overflow-hidden shadow-md border border-gray-100 bg-white cursor-pointer'
    >
      {/* Image */}
      <div className='relative h-48 overflow-hidden bg-gray-50'>
        <img
          src={car.image}
          alt={`${car.brand} ${car.model}`}
          className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-105'
        />

        {/* Available badge */}
        {car.isAvaliable && (
          <span className='absolute top-3 left-3 bg-green-500 text-white text-xs px-2.5 py-1 rounded-full font-medium shadow'>
            Available
          </span>
        )}

        {/* Price overlay */}
        <div className='absolute bottom-3 right-3 bg-black/75 backdrop-blur-sm text-white px-3 py-1.5 rounded-lg'>
          <span className='font-bold text-sm'>{currency}{car.pricePerDay}</span>
          <span className='text-white/70 text-xs'> /day</span>
        </div>
      </div>

      {/* Content */}
      <div className='p-4 sm:p-5'>
        <div className='mb-3'>
          <h3 className='text-base font-semibold text-gray-900'>{car.brand} {car.model}</h3>
          <p className='text-sm text-gray-400'>{car.category} · {car.year}</p>
        </div>

        {car.owner && (
          <div className='flex items-center gap-2 mb-4'>
             <div className='relative'>
               {car.owner.image ? (
                  <img src={car.owner.image} className='w-7 h-7 rounded-full object-cover' alt='owner' />
               ) : (
                  <div className='w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary text-xs shadow-inner'>
                     {car.owner.name.charAt(0).toUpperCase()}
                  </div>
               )}
               <span className='absolute bottom-0 right-0 w-2 h-2 rounded-full border border-white bg-green-500'></span>
             </div>
             <p className='text-xs text-gray-500'>Hosted by <span className='font-medium text-gray-800'>{car.owner.name}</span></p>
          </div>
        )}

        <div className='grid grid-cols-2 gap-y-2 gap-x-2'>
          <div className='flex items-center gap-1.5 text-xs text-gray-500'>
            <img src={assets.users_icon} alt="seats" className='h-3.5 w-3.5 opacity-60' />
            <span>{car.seating_capacity} Seats</span>
          </div>
          <div className='flex items-center gap-1.5 text-xs text-gray-500'>
            <img src={assets.fuel_icon} alt="fuel" className='h-3.5 w-3.5 opacity-60' />
            <span>{car.fuel_type}</span>
          </div>
          <div className='flex items-center gap-1.5 text-xs text-gray-500'>
            <img src={assets.car_icon} alt="transmission" className='h-3.5 w-3.5 opacity-60' />
            <span>{car.transmission}</span>
          </div>
          <div className='flex items-center gap-1.5 text-xs text-gray-500'>
            <img src={assets.location_icon} alt="location" className='h-3.5 w-3.5 opacity-60' />
            <span>{car.location}</span>
          </div>
        </div>

        <div className='mt-4 pt-3 border-t border-gray-100 flex items-center justify-between'>
          <span className='text-xs text-gray-400'>{car.year} Model</span>
          <span className='text-xs font-medium text-primary bg-primary/10 px-2.5 py-1 rounded-full'>
            View Details →
          </span>
        </div>
      </div>
    </motion.div>
  )
}

export default CarCard
