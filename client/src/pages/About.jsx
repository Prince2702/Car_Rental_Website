import React from 'react'
import { motion } from 'motion/react'
import { Link } from 'react-router-dom'
import { assets } from '../assets/assets'

const stats = [
  { value: '500+', label: 'Vehicles Available' },
  { value: '50k+', label: 'Happy Customers' },
  { value: '4.9★', label: 'Average Rating' },
  { value: '12+', label: 'Years Experience' },
]

const team = [
  { name: 'James Carter', role: 'CEO & Founder', image: assets.testimonial_image_2 },
  { name: 'Sofia Martinez', role: 'Head of Operations', image: assets.testimonial_image_1 },
  { name: 'Liam Chen', role: 'Chief Technology Officer', image: assets.testimonial_image_2 },
]

const values = [
  {
    icon: '🛡️',
    title: 'Safety First',
    desc: 'Every vehicle is thoroughly inspected and insured before listing, ensuring your complete peace of mind.',
  },
  {
    icon: '💰',
    title: 'Transparent Pricing',
    desc: 'No hidden fees, no surprise charges. What you see is exactly what you pay.',
  },
  {
    icon: '⚡',
    title: 'Instant Booking',
    desc: 'Reserve your car in seconds. Receive confirmation immediately and get on the road faster.',
  },
  {
    icon: '🤝',
    title: 'Trusted Partners',
    desc: 'All car owners on our platform are verified and rated by real customers.',
  },
]

const About = () => {
  return (
    <div className='overflow-hidden'>

      {/* Hero */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7 }}
        className='relative bg-gradient-to-br from-primary via-blue-600 to-blue-400 text-white px-6 md:px-16 lg:px-24 xl:px-32 py-24 md:py-32 text-center overflow-hidden'
      >
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-4 right-10 w-64 h-64 border border-white rounded-full" />
          <div className="absolute -bottom-20 -left-10 w-96 h-96 border border-white rounded-full" />
        </div>
        <motion.span
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className='inline-block bg-white/20 px-4 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-4'
        >
          About Us
        </motion.span>
        <motion.h1
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className='text-4xl md:text-5xl lg:text-6xl font-bold max-w-3xl mx-auto leading-tight'
        >
          We Make Car Rental <span className='text-blue-100'>Simple & Affordable</span>
        </motion.h1>
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.35, duration: 0.5 }}
          className='mt-5 text-blue-100 text-base md:text-lg max-w-xl mx-auto'
        >
          Founded in 2012, CarRental is the leading peer-to-peer car rental marketplace connecting vehicle owners with drivers across India.
        </motion.p>
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className='mt-8 flex flex-wrap gap-3 justify-center'
        >
          <Link to='/cars' className='px-7 py-3 bg-white text-primary rounded-xl font-semibold text-sm hover:bg-blue-50 transition-all shadow-lg'>
            Browse Cars
          </Link>
          <Link to='/contact' className='px-7 py-3 bg-white/15 border border-white/30 text-white rounded-xl font-medium text-sm hover:bg-white/25 transition-all backdrop-blur-sm'>
            Contact Us
          </Link>
        </motion.div>
      </motion.section>

      {/* Stats */}
      <section className='px-6 md:px-16 lg:px-24 xl:px-32 py-16'>
        <div className='grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto'>
          {stats.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              className='text-center p-6 rounded-2xl bg-light border border-gray-100'
            >
              <p className='text-3xl md:text-4xl font-bold text-primary'>{s.value}</p>
              <p className='text-sm text-gray-500 mt-1'>{s.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Story */}
      <section className='px-6 md:px-16 lg:px-24 xl:px-32 py-12'>
        <div className='max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center'>
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <span className='text-xs font-semibold text-primary uppercase tracking-wider'>Our Story</span>
            <h2 className='text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-5 leading-tight'>
              Built by Drivers, for Drivers
            </h2>
            <p className='text-gray-500 text-sm md:text-base leading-relaxed mb-4'>
              CarRental was born out of a simple frustration: renting a car was complicated, expensive, and impersonal. We set out to change that by creating a marketplace where real people can share their vehicles at fair prices.
            </p>
            <p className='text-gray-500 text-sm md:text-base leading-relaxed'>
              Today, we serve hundreds of thousands of customers across 50+ cities, with a fleet of over 500 vehicles ranging from everyday sedans to luxury SUVs. Our commitment to trust, transparency, and technology drives everything we do.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className='relative'
          >
            <div className='rounded-3xl overflow-hidden shadow-2xl bg-light aspect-video'>
              <img src={assets.main_car} alt="CarRental fleet" className='w-full h-full object-contain p-6' />
            </div>
            <div className='absolute -bottom-4 -left-4 bg-primary text-white px-5 py-3 rounded-xl shadow-lg text-sm font-semibold'>
              🚘 Est. 2012 · Mumbai
            </div>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className='px-6 md:px-16 lg:px-24 xl:px-32 py-20 bg-light'>
        <div className='text-center mb-12'>
          <span className='text-xs font-semibold text-primary uppercase tracking-wider'>Why Choose Us</span>
          <h2 className='text-3xl md:text-4xl font-bold text-gray-900 mt-2'>Our Core Values</h2>
          <p className='text-gray-500 mt-3 max-w-lg mx-auto text-sm md:text-base'>
            Everything we build is guided by a commitment to safety, simplicity, and community.
          </p>
        </div>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto'>
          {values.map((v, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              className='bg-white p-6 rounded-2xl shadow-sm hover:shadow-md hover:-translate-y-1 transition-all border border-gray-100'
            >
              <div className='text-3xl mb-4'>{v.icon}</div>
              <h3 className='text-base font-semibold text-gray-800 mb-2'>{v.title}</h3>
              <p className='text-sm text-gray-500 leading-relaxed'>{v.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

    </div>
  )
}

export default About
