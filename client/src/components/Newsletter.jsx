import React, { useState } from 'react'
import { motion } from 'motion/react';
import toast from 'react-hot-toast';

const Newsletter = () => {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    setSubmitted(true)
    toast.success('You have subscribed successfully!')
    setEmail('')
    setTimeout(() => setSubmitted(false), 4000)
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      viewport={{ once: true, amount: 0.3 }}
      className="relative my-16 mx-4 md:mx-auto max-w-4xl rounded-3xl overflow-hidden"
    >
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-blue-600 to-blue-400" />
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-72 h-72 border border-white rounded-full translate-x-1/3 -translate-y-1/3" />
        <div className="absolute bottom-0 left-0 w-48 h-48 border border-white rounded-full -translate-x-1/3 translate-y-1/3" />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 md:px-16 py-14 md:py-20 space-y-4">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="bg-white/20 text-white text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider"
        >
          Newsletter
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-3xl md:text-4xl font-bold text-white"
        >
          Never Miss a Deal!
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-blue-100 max-w-md text-sm md:text-base"
        >
          Subscribe to get the latest offers, new arrivals, and exclusive discounts — delivered straight to your inbox.
        </motion.p>

        <motion.form
          noValidate
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          onSubmit={(e) => {
            e.preventDefault()
            let newError = ''
            if (!email.trim()) {
              newError = 'Email Address is required'
            } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
              newError = 'Please enter a valid email'
            }

            if (newError) {
               setError(newError)
               return
            }
            
            handleSubmit(e)
          }}
          className="flex flex-col w-full max-w-lg mt-4"
        >
          <div className="flex flex-col sm:flex-row items-stretch sm:items-start gap-3 w-full relative">
             <div className="flex-1 flex flex-col items-start w-full">
               <input
                 className={`w-full px-5 py-3.5 rounded-xl outline-none text-gray-700 placeholder-gray-400 text-sm bg-white shadow-lg border ${error ? 'border-red-500' : 'border-transparent'}`}
                 type="email"
                 placeholder="Enter your email address"
                 value={email}
                 onChange={e => { setEmail(e.target.value); if(error) setError(''); }}
               />
               {error && <p className="text-red-200 text-xs mt-1.5 ml-1 font-medium">{error}</p>}
             </div>
             
             <motion.button
               whileHover={{ scale: 1.03 }}
               whileTap={{ scale: 0.97 }}
               type="submit"
               className="px-8 py-3.5 bg-white text-primary hover:bg-blue-50 transition-all font-semibold rounded-xl cursor-pointer shadow-lg text-sm whitespace-nowrap self-stretch sm:self-start h-[50px]"
             >
               {submitted ? '✓ Subscribed!' : 'Subscribe'}
             </motion.button>
          </div>
        </motion.form>

        <p className="text-blue-200/70 text-xs pt-1">No spam, ever. Unsubscribe at any time.</p>
      </div>
    </motion.section>
  )
}

export default Newsletter
