import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { assets } from '../assets/assets'
import Loader from '../components/Loader'
import { useAppContext } from '../context/AppContext'
import toast from 'react-hot-toast'
import { motion } from 'motion/react'

const features = ["360 Camera", "Bluetooth", "GPS Navigation", "Heated Seats", "Rear View Camera", "USB Charging"]

const CarDetails = () => {
  const { id } = useParams()
  const { cars, axios, pickupDate, setPickupDate, returnDate, setReturnDate, user, setShowLogin } = useAppContext()

  const navigate = useNavigate()
  const [car, setCar] = useState(null)
  const [isBooking, setIsBooking] = useState(false)
  const [errors, setErrors] = useState({})
  const currency = import.meta.env.VITE_CURRENCY

  const totalDays = pickupDate && returnDate
    ? Math.max(1, Math.ceil((new Date(returnDate) - new Date(pickupDate)) / (1000 * 60 * 60 * 24)))
    : null

  const totalPrice = car && totalDays ? car.pricePerDay * totalDays : null

  const validate = () => {
    const newErrors = {}
    if (!pickupDate) newErrors.pickupDate = "Pickup date is required"
    if (!returnDate) newErrors.returnDate = "Return date is required"
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return
    
    if (!user) {
      setShowLogin(true)
      return
    }
    if (isBooking) return
    setIsBooking(true)
    try {
      const { data } = await axios.post('/api/bookings/create', { car: id, pickupDate, returnDate })
      if (data.success) {
        toast.success(data.message)
        navigate('/my-bookings')
        scrollTo(0, 0)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    } finally {
      setIsBooking(false)
    }
  }

  useEffect(() => {
    setCar(cars.find(car => car._id === id))
  }, [cars, id])

  if (!car) return <Loader />

  return (
    <div className='px-4 md:px-16 lg:px-24 xl:px-32 mt-10 pb-20'>
      {/* Back button */}
      <motion.button
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        onClick={() => navigate(-1)}
        className='flex items-center gap-2 mb-8 text-gray-500 hover:text-primary transition-colors cursor-pointer group'
      >
        <img src={assets.arrow_icon} alt="" className='rotate-180 opacity-60 group-hover:opacity-100 transition-opacity' />
        <span className='text-sm font-medium'>Back to all cars</span>
      </motion.button>

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12'>

        {/* Left: Car Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className='lg:col-span-2 space-y-6'
        >
          {/* Car image */}
          <div className='relative rounded-2xl overflow-hidden shadow-lg bg-gray-50'>
            <motion.img
              initial={{ scale: 1.02, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              src={car.image}
              alt={`${car.brand} ${car.model}`}
              className='w-full h-auto md:max-h-96 object-cover'
            />
            {car.isAvaliable && (
              <span className='absolute top-4 left-4 bg-green-500 text-white text-xs px-3 py-1 rounded-full font-medium shadow'>
                Available Now
              </span>
            )}
          </div>

          {/* Title & category */}
          <div>
            <div className='flex flex-wrap items-start justify-between gap-3'>
              <div>
                <h1 className='text-2xl md:text-3xl font-bold text-gray-900'>{car.brand} {car.model}</h1>
                <p className='text-gray-500 mt-1'>{car.category} · {car.year}</p>
              </div>
              <div className='bg-primary/10 px-4 py-2 rounded-xl text-right'>
                <span className='text-2xl font-bold text-primary'>{currency}{car.pricePerDay}</span>
                <p className='text-xs text-gray-400'>per day</p>
              </div>
            </div>
          </div>

          <hr className='border-borderColor' />

          {/* Specs grid */}
          <div className='grid grid-cols-2 sm:grid-cols-4 gap-3'>
            {[
              { icon: assets.users_icon, label: 'Seats', value: `${car.seating_capacity} Passengers` },
              { icon: assets.fuel_icon, label: 'Fuel', value: car.fuel_type },
              { icon: assets.car_icon, label: 'Transmission', value: car.transmission },
              { icon: assets.location_icon, label: 'Location', value: car.location },
            ].map(({ icon, label, value }) => (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                key={label}
                className='flex flex-col items-center text-center bg-light p-4 rounded-xl gap-2'
              >
                <img src={icon} alt={label} className='h-5 opacity-70' />
                <div>
                  <p className='text-xs text-gray-400'>{label}</p>
                  <p className='text-sm font-medium text-gray-700'>{value}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Description */}
          <div>
            <h2 className='text-lg font-semibold mb-2'>About this car</h2>
            <p className='text-gray-500 text-sm leading-relaxed'>{car.description}</p>
          </div>

          {/* Features */}
          <div>
            <h2 className='text-lg font-semibold mb-3'>Features & Amenities</h2>
            <ul className='grid grid-cols-1 sm:grid-cols-2 gap-2'>
              {features.map(item => (
                <li key={item} className='flex items-center gap-2 text-sm text-gray-600'>
                  <img src={assets.check_icon} className='h-4 w-4 flex-shrink-0' alt="✓" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* Right: Booking form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className='lg:col-span-1'
        >
          <form
            noValidate
            onSubmit={handleSubmit}
            className='shadow-xl rounded-2xl p-6 border border-gray-100 sticky top-24 bg-white space-y-5'
          >
            <div>
              <p className='text-2xl font-bold text-gray-900'>
                {currency}{car.pricePerDay}
                <span className='text-sm text-gray-400 font-normal'> / day</span>
              </p>
              {!car.isAvaliable && (
                <span className='text-xs text-red-500 font-medium'>Currently Unavailable</span>
              )}
            </div>

            <hr className='border-borderColor' />

            <div className='flex flex-col gap-1.5'>
              <label htmlFor="pickup-date" className='text-sm font-medium text-gray-700'>Pickup Date</label>
              <input
                value={pickupDate}
                onChange={(e) => { setPickupDate(e.target.value); if(errors.pickupDate) setErrors({...errors, pickupDate: ''}); }}
                type="date"
                id='pickup-date'
                className={`border ${errors.pickupDate ? 'border-red-500' : 'border-borderColor'} focus:border-primary px-3 py-2.5 rounded-xl text-sm outline-none transition-all`}
                min={new Date().toISOString().split('T')[0]}
              />
              {errors.pickupDate && <p className="text-red-500 text-xs">{errors.pickupDate}</p>}
            </div>

            <div className='flex flex-col gap-1.5'>
              <label htmlFor="return-date" className='text-sm font-medium text-gray-700'>Return Date</label>
              <input
                value={returnDate}
                onChange={(e) => { setReturnDate(e.target.value); if(errors.returnDate) setErrors({...errors, returnDate: ''}); }}
                type="date"
                id='return-date'
                className={`border ${errors.returnDate ? 'border-red-500' : 'border-borderColor'} focus:border-primary px-3 py-2.5 rounded-xl text-sm outline-none transition-all`}
                min={pickupDate || new Date().toISOString().split('T')[0]}
              />
              {errors.returnDate && <p className="text-red-500 text-xs">{errors.returnDate}</p>}
            </div>

            {/* Price summary */}
            {totalDays && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className='bg-light rounded-xl p-4 space-y-2 text-sm'
              >
                <div className='flex justify-between text-gray-600'>
                  <span>{currency}{car.pricePerDay} × {totalDays} day{totalDays > 1 ? 's' : ''}</span>
                  <span>{currency}{totalPrice}</span>
                </div>
                <hr className='border-borderColor' />
                <div className='flex justify-between font-semibold text-gray-900'>
                  <span>Total</span>
                  <span className='text-primary'>{currency}{totalPrice}</span>
                </div>
              </motion.div>
            )}

            <button
              type='submit'
              disabled={isBooking || !car.isAvaliable}
              className={`w-full py-3 font-semibold text-white rounded-xl shadow-md transition-all ${
                !car.isAvaliable 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-primary hover:bg-primary-dull disabled:opacity-60 cursor-pointer shadow-primary/20'
              }`}
            >
              {!car.isAvaliable ? 'Unavailable' : isBooking ? 'Booking...' : user ? 'Book Now' : 'Login to Book'}
            </button>

            <p className='text-center text-xs text-gray-400'>No credit card required to reserve</p>
          </form>
        </motion.div>
      </div>
    </div>
  )
}

export default CarDetails
