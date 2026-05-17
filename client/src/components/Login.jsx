import React from 'react'
import { useAppContext } from '../context/AppContext';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'motion/react';

const Login = () => {
  const { setShowLogin, axios, setToken, navigate } = useAppContext()

  const [state, setState] = React.useState("login");
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [role, setRole] = React.useState("user");
  const [loading, setLoading] = React.useState(false);
  const [errors, setErrors] = React.useState({});

  const validate = () => {
    const newErrors = {};
    if (state === "register" && !name.trim()) newErrors.name = "Full Name is required";
    if (!email.trim()) newErrors.email = "Email Address is required";
    if (!password) newErrors.password = "Password is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    if (!validate()) return;
    if (loading) return;
    setLoading(true);
    try {
      const { data } = await axios.post(`/api/user/${state}`, { name, email, password, role })
      if (data.success) {
        navigate('/')
        setToken(data.token)
        localStorage.setItem('token', data.token)
        setShowLogin(false)
        toast.success(state === 'login' ? 'Welcome back!' : 'Account created!')
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={() => setShowLogin(false)}
      className='fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm'
    >
      <motion.form
        noValidate
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: 'spring', duration: 0.4 }}
        onSubmit={onSubmitHandler}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-sm bg-white rounded-2xl shadow-2xl p-8"
      >
        {/* Close button */}
        <button
          type="button"
          onClick={() => setShowLogin(false)}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
          aria-label="Close"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <div className='w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3'>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800">
            {state === "login" ? "Welcome back" : "Create account"}
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            {state === "login" ? "Sign in to your CarRental account" : "Join CarRental today"}
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <AnimatePresence>
            {state === "register" && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden flex flex-col gap-4"
              >
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">I want to</label>
                  <div className="grid grid-cols-2 gap-3">
                    <div 
                      onClick={(e) => { e.stopPropagation(); setRole('user'); }}
                      className={`border rounded-lg p-3 flex flex-col items-center justify-center gap-1 cursor-pointer transition-all ${role === 'user' ? 'border-primary bg-primary/5 text-primary shadow-sm shadow-primary/10' : 'border-gray-200 text-gray-500 hover:border-gray-300 hover:bg-gray-50'}`}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
                      </svg>
                      <span className="text-sm font-medium">Rent a Car</span>
                    </div>
                    <div 
                      onClick={(e) => { e.stopPropagation(); setRole('owner'); }}
                      className={`border rounded-lg p-3 flex flex-col items-center justify-center gap-1 cursor-pointer transition-all ${role === 'owner' ? 'border-primary bg-primary/5 text-primary shadow-sm shadow-primary/10' : 'border-gray-200 text-gray-500 hover:border-gray-300 hover:bg-gray-50'}`}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                      </svg>
                      <span className="text-sm font-medium">List My Car</span>
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input
                    onChange={(e) => { setName(e.target.value); if (errors.name) setErrors({...errors, name: ''}); }}
                    value={name}
                    placeholder="John Smith"
                    className={`border ${errors.name ? 'border-red-500' : 'border-gray-200'} focus:border-primary rounded-lg w-full p-3 text-sm outline-none transition-all`}
                    type="text"
                  />
                  {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <input
              onChange={(e) => { setEmail(e.target.value); if (errors.email) setErrors({...errors, email: ''}); }}
              value={email}
              placeholder="you@example.com"
              className={`border ${errors.email ? 'border-red-500' : 'border-gray-200'} focus:border-primary rounded-lg w-full p-3 text-sm outline-none transition-all`}
              type="email"
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              onChange={(e) => { setPassword(e.target.value); if (errors.password) setErrors({...errors, password: ''}); }}
              value={password}
              placeholder="••••••••"
              className={`border ${errors.password ? 'border-red-500' : 'border-gray-200'} focus:border-primary rounded-lg w-full p-3 text-sm outline-none transition-all`}
              type="password"
            />
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-2 w-full bg-primary hover:bg-primary-dull disabled:opacity-60 transition-all text-white py-3 rounded-xl font-semibold text-sm cursor-pointer shadow-md shadow-primary/20"
          >
            {loading ? 'Please wait...' : state === "register" ? "Create Account" : "Sign In"}
          </button>
        </div>

        <p className="text-center text-sm text-gray-500 mt-5">
          {state === "register" ? (
            <>Already have an account?{' '}<span onClick={() => {setState("login"); setErrors({});}} className="text-primary font-medium cursor-pointer hover:underline">Sign in</span></>
          ) : (
            <>Don't have an account?{' '}<span onClick={() => {setState("register"); setErrors({});}} className="text-primary font-medium cursor-pointer hover:underline">Sign up</span></>
          )}
        </p>
      </motion.form>
    </motion.div>
  )
}

export default Login
