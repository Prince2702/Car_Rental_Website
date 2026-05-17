import React from 'react'
import { assets } from '../assets/assets'
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className='bg-gray-50 mt-20 border-t border-borderColor'
    >
      <div className='px-6 md:px-16 lg:px-24 xl:px-32 py-14'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10'>

          {/* Brand column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className='lg:col-span-1'
          >
            <img src={assets.logo} alt="CarRental logo" className='h-8 md:h-9 mb-4' />
            <p className='text-sm text-gray-500 leading-relaxed max-w-xs'>
              Premium car rental service with a wide selection of luxury and everyday vehicles for all your driving needs.
            </p>
            <div className='flex items-center gap-3 mt-6'>
              {[
                { href: '#', icon: assets.facebook_logo, label: 'Facebook' },
                { href: '#', icon: assets.instagram_logo, label: 'Instagram' },
                { href: '#', icon: assets.twitter_logo, label: 'Twitter' },
                { href: '#', icon: assets.gmail_logo, label: 'Email' },
              ].map(({ href, icon, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className='w-8 h-8 flex items-center justify-center rounded-full bg-white border border-borderColor hover:border-primary hover:bg-primary/5 transition-all'
                >
                  <img src={icon} className='w-4 h-4' alt={label} />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className='text-sm font-semibold text-gray-800 uppercase tracking-wider mb-4'>Quick Links</h3>
            <ul className='space-y-2.5'>
              {[
                { label: 'Home', to: '/' },
                { label: 'Browse Cars', to: '/cars' },
                { label: 'My Bookings', to: '/my-bookings' },
                { label: 'About Us', to: '/about' },
              ].map(({ label, to }) => (
                <li key={label}>
                  <Link to={to} className='text-sm text-gray-500 hover:text-primary transition-colors'>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Resources */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h3 className='text-sm font-semibold text-gray-800 uppercase tracking-wider mb-4'>Resources</h3>
            <ul className='space-y-2.5'>
              {[
                { label: 'Help Center', to: '/contact' },
                { label: 'Terms of Service', to: '/about' },
                { label: 'Privacy Policy', to: '/about' },
                { label: 'Insurance Info', to: '/about' },
              ].map(({ label, to }) => (
                <li key={label}>
                  <Link to={to} className='text-sm text-gray-500 hover:text-primary transition-colors'>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <h3 className='text-sm font-semibold text-gray-800 uppercase tracking-wider mb-4'>Contact</h3>
            <ul className='space-y-2.5 text-sm text-gray-500'>
              <li>1234 Luxury Drive</li>
              <li>Mumbai, MH 400001</li>
              <li>
                <a href="tel:+919876543210" className='hover:text-primary transition-colors'>+91 98765 43210</a>
              </li>
              <li>
                <a href="mailto:info@carrental.com" className='hover:text-primary transition-colors'>info@carrental.com</a>
              </li>
              <li className='mt-4'>
                <Link
                  to='/contact'
                  className='inline-block px-5 py-2 bg-primary text-white text-xs font-medium rounded-lg hover:bg-primary-dull transition-all'
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </motion.div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className='border-t border-borderColor px-6 md:px-16 lg:px-24 xl:px-32 py-5'>
        <div className='flex flex-col sm:flex-row gap-2 items-center justify-between text-xs text-gray-400'>
          <p>© {new Date().getFullYear()} CarRental. All rights reserved.</p>
          <ul className='flex items-center gap-4'>
            <li><Link to='/about' className='hover:text-primary transition-colors'>Privacy</Link></li>
            <li className='text-gray-300'>|</li>
            <li><Link to='/about' className='hover:text-primary transition-colors'>Terms</Link></li>
            <li className='text-gray-300'>|</li>
            <li><Link to='/about' className='hover:text-primary transition-colors'>Cookies</Link></li>
          </ul>
        </div>
      </div>
    </motion.footer>
  )
}

export default Footer
