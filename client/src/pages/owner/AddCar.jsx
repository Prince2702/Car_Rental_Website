import React, { useState } from 'react'
import Title from '../../components/owner/Title'
import { assets } from '../../assets/assets'
import { useAppContext } from '../../context/AppContext'
import toast from 'react-hot-toast'

const AddCar = () => {

  const {axios, currency} = useAppContext()

  const [image, setImage] = useState(null)
  const [car, setCar] = useState({
    brand: '',
    model: '',
    year: 0,
    pricePerDay: 0,
    category: '',
    transmission: '',
    fuel_type: '',
    seating_capacity: 0,
    location: '',
    description: '',
  })

  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  const validate = () => {
    const newErrors = {}
    if (!image) newErrors.image = "Image is required"
    if (!car.brand.trim()) newErrors.brand = "Brand is required"
    if (!car.model.trim()) newErrors.model = "Model is required"
    if (!car.year || car.year < 1990) newErrors.year = "Please enter a valid year"
    if (!car.pricePerDay || car.pricePerDay < 10) newErrors.pricePerDay = "Please enter a valid daily price"
    if (!car.category) newErrors.category = "Category is required"
    if (!car.transmission) newErrors.transmission = "Transmission is required"
    if (!car.fuel_type) newErrors.fuel_type = "Fuel type is required"
    if (!car.seating_capacity || car.seating_capacity < 2) newErrors.seating_capacity = "Please enter seating capacity"
    if (!car.location.trim()) newErrors.location = "Location is required"
    if (!car.description.trim()) newErrors.description = "Description is required"
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }
  const onSubmitHandler = async (e)=>{
    e.preventDefault()
    if(!validate()) return
    if(isLoading) return null

    setIsLoading(true)
    try {
      const formData = new FormData()
      formData.append('image', image)
      formData.append('carData', JSON.stringify(car))

      const {data} = await axios.post('/api/owner/add-car', formData)

      if(data.success){
        toast.success(data.message)
        setImage(null)
        setCar({
          brand: '',
          model: '',
          year: 0,
          pricePerDay: 0,
          category: '',
          transmission: '',
          fuel_type: '',
          seating_capacity: 0,
          location: '',
          description: '',
        })
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }finally{
      setIsLoading(false)
    }
  }

  return (
    <div className='px-4 py-10 md:px-10 flex-1'>

      <Title title="Add New Car" subTitle="Fill in details to list a new car for booking, including pricing, availability, and car specifications."/>

      <form noValidate onSubmit={onSubmitHandler} className='flex flex-col gap-6 text-gray-500 text-sm mt-8 max-w-4xl bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100'>

        {/* Car Image View */}
        <div className='flex flex-col md:flex-row items-center gap-6 w-full mb-2'>
          <label htmlFor="car-image" className='relative group cursor-pointer block w-full md:w-auto'>
            <div className={`h-32 w-full md:w-48 bg-gray-50 border-2 border-dashed ${errors.image ? 'border-red-500' : 'border-gray-200'} rounded-xl overflow-hidden flex flex-col items-center justify-center group-hover:border-primary transition-colors`}>
              <img src={image ? URL.createObjectURL(image) : assets.upload_icon} alt="" className={`transition-all ${image ? 'w-full h-full object-cover' : 'h-10 opacity-50 group-hover:opacity-100'}`} />
              {!image && <span className='text-xs text-gray-400 mt-2 font-medium'>Upload Image</span>}
            </div>
            <input type="file" id="car-image" accept="image/*" hidden onChange={e=> {setImage(e.target.files[0]); if(errors.image) setErrors({...errors, image: ''});}}/>
            {errors.image && <p className="text-red-500 text-xs mt-1 absolute -bottom-5 left-0">{errors.image}</p>}
          </label>
          <div className='text-center md:text-left'>
            <h3 className='text-gray-800 font-semibold mb-1'>Vehicle Photo</h3>
            <p className='text-xs text-gray-400 max-w-xs leading-relaxed'>Upload a high-quality picture of the car. We recommend a clear shot from the front or side angle.</p>
          </div>
        </div>

        <hr className='border-gray-50' />

        {/* Car Brand & Model */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <div className='flex flex-col w-full'>
            <label className='block text-sm font-medium text-gray-700 mb-1.5'>Brand</label>
            <input type="text" placeholder="e.g. BMW, Mercedes, Audi..." className={`border ${errors.brand ? 'border-red-500' : 'border-gray-200'} focus:border-primary rounded-xl w-full p-3 text-sm outline-none transition-all`} value={car.brand} onChange={e=> {setCar({...car, brand: e.target.value}); if(errors.brand) setErrors({...errors, brand: ''});}}/>
            {errors.brand && <p className="text-red-500 text-xs mt-1">{errors.brand}</p>}
          </div>
          <div className='flex flex-col w-full'>
            <label className='block text-sm font-medium text-gray-700 mb-1.5'>Model</label>
            <input type="text" placeholder="e.g. X5, E-Class, M4..." className={`border ${errors.model ? 'border-red-500' : 'border-gray-200'} focus:border-primary rounded-xl w-full p-3 text-sm outline-none transition-all`} value={car.model} onChange={e=> {setCar({...car, model: e.target.value}); if(errors.model) setErrors({...errors, model: ''});}}/>
            {errors.model && <p className="text-red-500 text-xs mt-1">{errors.model}</p>}
          </div>
        </div>

        {/* Car Year, Price, Category */}
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
          <div className='flex flex-col w-full'>
            <label className='block text-sm font-medium text-gray-700 mb-1.5'>Model Year</label>
            <input type="number" placeholder="2025" min="1990" max="2026" className={`border ${errors.year ? 'border-red-500' : 'border-gray-200'} focus:border-primary rounded-xl w-full p-3 text-sm outline-none transition-all`} value={car.year || ''} onChange={e=> {setCar({...car, year: e.target.value}); if(errors.year) setErrors({...errors, year: ''});}}/>
            {errors.year && <p className="text-red-500 text-xs mt-1">{errors.year}</p>}
          </div>
          <div className='flex flex-col w-full'>
            <label className='block text-sm font-medium text-gray-700 mb-1.5'>Daily Price ({currency})</label>
            <input type="number" placeholder="2000" min="10" className={`border ${errors.pricePerDay ? 'border-red-500' : 'border-gray-200'} focus:border-primary rounded-xl w-full p-3 text-sm outline-none transition-all`} value={car.pricePerDay || ''} onChange={e=> {setCar({...car, pricePerDay: e.target.value}); if(errors.pricePerDay) setErrors({...errors, pricePerDay: ''});}}/>
            {errors.pricePerDay && <p className="text-red-500 text-xs mt-1">{errors.pricePerDay}</p>}
          </div>
          <div className='flex flex-col w-full'>
            <label className='block text-sm font-medium text-gray-700 mb-1.5'>Category</label>
            <select onChange={e=> {setCar({...car, category: e.target.value}); if(errors.category) setErrors({...errors, category: ''});}} value={car.category} className={`border ${errors.category ? 'border-red-500' : 'border-gray-200'} focus:border-primary rounded-xl w-full p-3 text-sm outline-none transition-all appearance-none bg-white`}>
              <option value="" disabled>Select category</option>
              {['Sedan', 'SUV', 'Van', 'Sports', 'Luxury', 'Convertible'].map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            {errors.category && <p className="text-red-500 text-xs mt-1">{errors.category}</p>}
          </div>
        </div>

         {/* Car Transmission, Fuel Type, Seating Capacity */}
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
          <div className='flex flex-col w-full'>
            <label className='block text-sm font-medium text-gray-700 mb-1.5'>Transmission</label>
            <select onChange={e=> {setCar({...car, transmission: e.target.value}); if(errors.transmission) setErrors({...errors, transmission: ''});}} value={car.transmission} className={`border ${errors.transmission ? 'border-red-500' : 'border-gray-200'} focus:border-primary rounded-xl w-full p-3 text-sm outline-none transition-all appearance-none bg-white`}>
              <option value="" disabled>Select transmission</option>
              {['Automatic', 'Manual', 'Semi-Automatic'].map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            {errors.transmission && <p className="text-red-500 text-xs mt-1">{errors.transmission}</p>}
          </div>
          <div className='flex flex-col w-full'>
            <label className='block text-sm font-medium text-gray-700 mb-1.5'>Fuel Type</label>
            <select onChange={e=> {setCar({...car, fuel_type: e.target.value}); if(errors.fuel_type) setErrors({...errors, fuel_type: ''});}} value={car.fuel_type} className={`border ${errors.fuel_type ? 'border-red-500' : 'border-gray-200'} focus:border-primary rounded-xl w-full p-3 text-sm outline-none transition-all appearance-none bg-white`}>
              <option value="" disabled>Select fuel</option>
              {['Petrol', 'Diesel', 'Electric', 'Hybrid', 'Gas'].map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            {errors.fuel_type && <p className="text-red-500 text-xs mt-1">{errors.fuel_type}</p>}
          </div>
          <div className='flex flex-col w-full'>
            <label className='block text-sm font-medium text-gray-700 mb-1.5'>Seating Capacity</label>
            <input type="number" placeholder="4" min="2" max="15" className={`border ${errors.seating_capacity ? 'border-red-500' : 'border-gray-200'} focus:border-primary rounded-xl w-full p-3 text-sm outline-none transition-all`} value={car.seating_capacity || ''} onChange={e=> {setCar({...car, seating_capacity: e.target.value}); if(errors.seating_capacity) setErrors({...errors, seating_capacity: ''});}}/>
            {errors.seating_capacity && <p className="text-red-500 text-xs mt-1">{errors.seating_capacity}</p>}
          </div>
        </div>

         {/* Car Location */}
         <div className='flex flex-col w-full'>
            <label className='block text-sm font-medium text-gray-700 mb-1.5'>Pick-up / Drop-off Location</label>
            <input type="text" placeholder="e.g. Downtown Mumbai, Airport Terminal 1..." className={`border ${errors.location ? 'border-red-500' : 'border-gray-200'} focus:border-primary rounded-xl w-full p-3 text-sm outline-none transition-all`} value={car.location} onChange={e=> {setCar({...car, location: e.target.value}); if(errors.location) setErrors({...errors, location: ''});}}/>
            {errors.location && <p className="text-red-500 text-xs mt-1">{errors.location}</p>}
         </div>
         
        {/* Car Description */}
         <div className='flex flex-col w-full mb-2'>
            <label className='block text-sm font-medium text-gray-700 mb-1.5'>Description & Features</label>
            <textarea rows={4} placeholder="e.g. A luxurious SUV with a spacious interior and a powerful engine. Features include GPS, Bluetooth, and heated seats." className={`border ${errors.description ? 'border-red-500' : 'border-gray-200'} focus:border-primary rounded-xl w-full p-3 text-sm outline-none transition-all resize-none`} value={car.description} onChange={e=> {setCar({...car, description: e.target.value}); if(errors.description) setErrors({...errors, description: ''});}}></textarea>
            {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
          </div>

        <button disabled={isLoading} className='w-full sm:w-auto px-8 py-3 bg-primary hover:bg-primary-dull disabled:opacity-60 transition-all text-white rounded-xl font-semibold cursor-pointer shadow-md shadow-primary/20 flex items-center justify-center gap-2 self-start'>
          {isLoading ? (
            <span className='flex items-center gap-2'>
              <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
              Listing...
            </span>
          ) : (
            <>
              <img src={assets.tick_icon} alt="" className='h-4 shrink-0 filter brightness-0 invert'/>
              List Your Car
            </>
          )}
        </button>

      </form>

    </div>
  )
}

export default AddCar
