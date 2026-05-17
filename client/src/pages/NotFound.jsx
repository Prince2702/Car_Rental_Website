import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import { assets } from '../assets/assets'

const NotFound = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className='flex flex-col items-center justify-center min-h-[80vh] px-6 text-center'
    >
      {/* Big 404 */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', duration: 0.6, delay: 0.1 }}
        className='relative'
      >
        <p className='text-[10rem] md:text-[14rem] font-black text-gray-100 select-none leading-none'>
          404
        </p>
        <motion.img
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          src={assets.main_car}
          alt="Lost car"
          className='absolute inset-0 m-auto max-h-28 md:max-h-40 object-contain drop-shadow-xl'
        />
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className='mt-4'
      >
        <h1 className='text-2xl md:text-3xl font-bold text-gray-800 mb-3'>Looks like you're lost!</h1>
        <p className='text-gray-500 text-sm md:text-base max-w-sm mx-auto'>
          The page you're looking for doesn't exist or has been moved. Let's get you back on track.
        </p>
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.65, duration: 0.5 }}
        className='mt-8 flex flex-wrap gap-3 justify-center'
      >
        <Link
          to='/'
          className='px-7 py-3 bg-primary hover:bg-primary-dull text-white rounded-xl font-semibold text-sm shadow-md shadow-primary/20 transition-all'
        >
          Go Home
        </Link>
        <Link
          to='/cars'
          className='px-7 py-3 bg-light border border-borderColor hover:bg-gray-200 text-gray-700 rounded-xl font-semibold text-sm transition-all'
        >
          Browse Cars
        </Link>
        <Link
          to='/contact'
          className='px-7 py-3 text-primary border border-primary/30 hover:bg-primary/5 rounded-xl font-semibold text-sm transition-all'
        >
          Contact Support
        </Link>
      </motion.div>
    </motion.div>
  )
}

export default NotFound
