import React from 'react'
import { assets } from '../assets/assets'
import { motion } from 'motion/react'
import { useAppContext } from '../context/AppContext'

const Banner = () => {
  const { navigate, user, setShowLogin, isOwner } = useAppContext()

  const handleListCar = () => {
    if (!user) {
      setShowLogin(true)
      return
    }
    navigate(isOwner ? '/owner/add-car' : '/owner')
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      viewport={{ once: true }}
      className='relative flex flex-col md:flex-row md:items-end items-center justify-between px-8 md:pl-14 pt-10 bg-gradient-to-br from-[#0558FE] via-[#1a6bff] to-[#A9CFFF] max-w-6xl mx-4 md:mx-auto rounded-3xl overflow-hidden shadow-2xl shadow-blue-300/30'
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-4 right-40 w-40 h-40 border-2 border-white rounded-full" />
        <div className="absolute top-16 right-56 w-20 h-20 border-2 border-white rounded-full" />
        <div className="absolute -bottom-8 left-1/3 w-56 h-56 border-2 border-white rounded-full" />
      </div>

      <div className='relative text-white z-10 pb-10 md:pb-12 max-w-md'>
        <span className="inline-block bg-white/20 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1 rounded-full mb-4 uppercase tracking-wider">
          Car Owners
        </span>
        <h2 className='text-3xl md:text-4xl font-bold leading-tight'>Do You Own a Luxury Car?</h2>
        <p className='mt-3 text-blue-100 text-sm md:text-base'>
          Monetize your vehicle effortlessly by listing it on CarRental.
        </p>
        <p className='mt-1 text-blue-100/80 text-sm max-w-sm'>
          We handle insurance, driver verification, and secure payments — earn passive income, stress-free.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleListCar}
            className='px-6 py-2.5 bg-white hover:bg-slate-100 transition-all text-primary rounded-xl text-sm font-semibold cursor-pointer shadow-lg'
          >
            List your car
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/about')}
            className='px-6 py-2.5 bg-white/10 hover:bg-white/20 border border-white/30 text-white rounded-xl text-sm font-medium cursor-pointer backdrop-blur-sm'
          >
            Learn more
          </motion.button>
        </div>

        {/* Mini stats */}
        <div className="mt-8 flex gap-6">
          {[
            { value: '$2,400', label: 'Avg. monthly earn' },
            { value: '100%', label: 'Secure payments' },
          ].map((s, i) => (
            <div key={i}>
              <p className="text-xl font-bold text-white">{s.value}</p>
              <p className="text-xs text-blue-200">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      <motion.img
        initial={{ opacity: 0, x: 60, y: 20 }}
        whileInView={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 0.7, delay: 0.3 }}
        viewport={{ once: true }}
        src={assets.banner_car_image}
        alt="Luxury car"
        className='relative z-10 max-h-52 md:max-h-60 object-contain drop-shadow-2xl'
      />
    </motion.div>
  )
}

export default Banner
