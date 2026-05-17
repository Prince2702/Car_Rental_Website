import React, { useState } from 'react'
import { motion } from 'motion/react'
import toast from 'react-hot-toast'

const contactInfo = [
  {
    icon: '📍',
    title: 'Our Office',
    lines: ['1234 Luxury Drive', 'Mumbai, MH 400001'],
  },
  {
    icon: '📞',
    title: 'Phone',
    lines: ['+91 98765 43210', 'Mon–Fri, 9am–6pm IST'],
  },
  {
    icon: '✉️',
    title: 'Email',
    lines: ['info@carrental.com', 'support@carrental.com'],
  },
  {
    icon: '⏰',
    title: 'Support Hours',
    lines: ['Mon–Fri: 9am – 6pm', 'Sat–Sun: 10am – 4pm'],
  },
]

const faqs = [
  {
    q: 'How do I cancel my booking?',
    a: 'You can cancel your booking from the "My Bookings" page up to 24 hours before pickup. Refunds are processed within 3–5 business days.',
  },
  {
    q: 'Is insurance included?',
    a: 'Yes, all rentals include basic insurance coverage. You may upgrade to full coverage during checkout for added protection.',
  },
  {
    q: 'Can I modify my booking dates?',
    a: 'Yes, you can modify your dates from "My Bookings" — subject to availability and any price difference.',
  },
  {
    q: 'How do I list my car?',
    a: 'Click "List cars" in the navigation, create an owner account and follow the steps to add your vehicle. We handle the rest.',
  },
]

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [loading, setLoading] = useState(false)
  const [openFaq, setOpenFaq] = useState(null)
  const [errors, setErrors] = useState({})

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value })

  const validate = () => {
    const newErrors = {}
    if (!form.name.trim()) newErrors.name = "Full Name is required"
    if (!form.email.trim()) newErrors.email = "Email Address is required"
    if (!form.subject) newErrors.subject = "Please select a subject"
    if (!form.message.trim()) newErrors.message = "Message cannot be empty"
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return
    
    setLoading(true)
    await new Promise(r => setTimeout(r, 1200))
    toast.success('Message sent! We\'ll get back to you within 24 hours.')
    setForm({ name: '', email: '', subject: '', message: '' })
    setLoading(false)
  }

  return (
    <div className='overflow-hidden'>

      {/* Hero */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className='relative bg-gradient-to-br from-primary via-blue-600 to-blue-400 text-white px-6 md:px-16 lg:px-24 xl:px-32 py-20 text-center overflow-hidden'
      >
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 right-0 w-80 h-80 border border-white rounded-full translate-x-1/3 -translate-y-1/3" />
          <div className="absolute bottom-0 left-0 w-60 h-60 border border-white rounded-full -translate-x-1/3 translate-y-1/3" />
        </div>
        <motion.span
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className='inline-block bg-white/20 px-4 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-4'
        >
          Contact Us
        </motion.span>
        <motion.h1
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className='text-4xl md:text-5xl font-bold max-w-2xl mx-auto'
        >
          We'd Love to Hear From You
        </motion.h1>
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.35 }}
          className='mt-4 text-blue-100 text-sm md:text-base max-w-lg mx-auto'
        >
          Have a question, feedback, or need support? Our team is here to help.
        </motion.p>
      </motion.section>

      {/* Contact info cards */}
      <section className='px-6 md:px-16 lg:px-24 xl:px-32 py-14'>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto'>
          {contactInfo.map((info, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              className='bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all text-center'
            >
              <div className='text-4xl mb-3'>{info.icon}</div>
              <h3 className='font-semibold text-gray-800 mb-2 text-sm'>{info.title}</h3>
              {info.lines.map((line, j) => (
                <p key={j} className='text-sm text-gray-400 leading-relaxed'>{line}</p>
              ))}
            </motion.div>
          ))}
        </div>
      </section>

      {/* Form + FAQ */}
      <section className='px-6 md:px-16 lg:px-24 xl:px-32 pb-20'>
        <div className='max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12'>

          {/* Contact form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className='text-2xl md:text-3xl font-bold text-gray-900 mb-2'>Send a Message</h2>
            <p className='text-gray-500 text-sm mb-8'>Fill out the form and we'll respond within 24 hours.</p>

            <form noValidate onSubmit={handleSubmit} className='space-y-4'>
              <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>Full Name</label>
                  <input
                    type='text'
                    name='name'
                    value={form.name}
                    onChange={(e) => { handleChange(e); if(errors.name) setErrors({...errors, name: ''}); }}
                    placeholder='John Smith'
                    className={`w-full border ${errors.name ? 'border-red-500' : 'border-borderColor'} focus:border-primary rounded-xl px-4 py-3 text-sm outline-none transition-all`}
                  />
                  {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                </div>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>Email Address</label>
                  <input
                    type='email'
                    name='email'
                    value={form.email}
                    onChange={(e) => { handleChange(e); if(errors.email) setErrors({...errors, email: ''}); }}
                    placeholder='you@example.com'
                    className={`w-full border ${errors.email ? 'border-red-500' : 'border-borderColor'} focus:border-primary rounded-xl px-4 py-3 text-sm outline-none transition-all`}
                  />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </div>
              </div>

              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>Subject</label>
                <select
                  name='subject'
                  value={form.subject}
                  onChange={(e) => { handleChange(e); if(errors.subject) setErrors({...errors, subject: ''}); }}
                  className={`w-full border ${errors.subject ? 'border-red-500' : 'border-borderColor'} focus:border-primary rounded-xl px-4 py-3 text-sm outline-none transition-all ${form.subject ? 'text-gray-800' : 'text-gray-500'}`}
                >
                  <option value=''>Select a topic</option>
                  <option value='booking'>Booking Help</option>
                  <option value='listing'>Listing My Car</option>
                  <option value='payment'>Payment Issue</option>
                  <option value='technical'>Technical Support</option>
                  <option value='other'>Other</option>
                </select>
                {errors.subject && <p className="text-red-500 text-xs mt-1">{errors.subject}</p>}
              </div>

              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>Message</label>
                <textarea
                  name='message'
                  value={form.message}
                  onChange={(e) => { handleChange(e); if(errors.message) setErrors({...errors, message: ''}); }}
                  rows={5}
                  placeholder='Describe your question or issue in detail...'
                  className={`w-full border ${errors.message ? 'border-red-500' : 'border-borderColor'} focus:border-primary rounded-xl px-4 py-3 text-sm outline-none transition-all resize-none`}
                />
                {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type='submit'
                disabled={loading}
                className='w-full bg-primary hover:bg-primary-dull disabled:opacity-60 text-white py-3.5 rounded-xl font-semibold text-sm cursor-pointer shadow-md shadow-primary/20 transition-all'
              >
                {loading ? 'Sending...' : 'Send Message'}
              </motion.button>
            </form>
          </motion.div>

          {/* FAQ */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h2 className='text-2xl md:text-3xl font-bold text-gray-900 mb-2'>Frequently Asked</h2>
            <p className='text-gray-500 text-sm mb-8'>Quick answers to common questions.</p>

            <div className='space-y-3'>
              {faqs.map((faq, i) => (
                <div
                  key={i}
                  className='border border-gray-100 rounded-2xl overflow-hidden shadow-sm'
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className='w-full flex items-center justify-between px-5 py-4 text-left cursor-pointer hover:bg-gray-50 transition-colors'
                  >
                    <span className='text-sm font-medium text-gray-800 pr-4'>{faq.q}</span>
                    <span className={`text-primary text-lg font-light transition-transform flex-shrink-0 ${openFaq === i ? 'rotate-45' : ''}`}>
                      +
                    </span>
                  </button>
                  <motion.div
                    initial={false}
                    animate={{ height: openFaq === i ? 'auto' : 0, opacity: openFaq === i ? 1 : 0 }}
                    transition={{ duration: 0.25 }}
                    className='overflow-hidden'
                  >
                    <p className='px-5 pb-4 text-sm text-gray-500 leading-relaxed'>{faq.a}</p>
                  </motion.div>
                </div>
              ))}
            </div>

            {/* Map placeholder */}
            {/* <div className='mt-8 rounded-2xl overflow-hidden border border-gray-100 shadow-sm bg-light h-48 flex items-center justify-center'>
              <div className='text-center text-gray-400'>
                <div className='text-4xl mb-2'>🗺️</div>
                <p className='text-sm font-medium'>1234 Luxury Drive, Mumbai, MH</p>
                <a
                  href='https://maps.google.com/?q=Mumbai,MH'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='mt-2 inline-block text-xs text-primary hover:underline'
                >
                  Open in Google Maps →
                </a>
              </div>
            </div> */}
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Contact
