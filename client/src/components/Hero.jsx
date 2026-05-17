import React, { useState } from "react";
import { assets, cityList } from "../assets/assets";
import { useAppContext } from "../context/AppContext";
import { motion } from "motion/react";

const Hero = () => {
  const [pickupLocation, setPickupLocation] = useState("");
  const { pickupDate, setPickupDate, returnDate, setReturnDate, navigate } =
    useAppContext();

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(
      "/cars?pickupLocation=" +
        pickupLocation +
        "&pickupDate=" +
        pickupDate +
        "&returnDate=" +
        returnDate,
    );
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="relative min-h-screen flex flex-col items-center justify-center gap-10 md:gap-14 bg-light text-center px-4 overflow-hidden"
    >
      {/* Decorative blobs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-300/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 pointer-events-none" />

      <div>
        <motion.h1
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight"
        >
          Luxury Cars <span className="text-primary">On Rent</span>
        </motion.h1>
        <motion.p
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="mt-3 text-gray-500 text-base md:text-lg max-w-lg mx-auto"
        >
          Find and book premium vehicles for any occasion — effortlessly.
        </motion.p>
      </div>

      {/* Search Form */}
      <motion.form
        initial={{ scale: 0.95, opacity: 0, y: 30 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        onSubmit={handleSearch}
        className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 md:gap-0 p-4 md:p-2 md:pl-6 rounded-2xl md:rounded-full w-full max-w-xs md:max-w-3xl bg-white shadow-[0px_8px_40px_rgba(0,0,0,0.12)] border border-white"
      >
        <div className="flex flex-col md:flex-row items-stretch md:items-center gap-4 md:gap-0 flex-1">
          <div className="flex flex-col items-start gap-1 md:pr-6 md:border-r border-borderColor">
            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide px-1">
              Location
            </label>
            <select
              required
              value={pickupLocation}
              onChange={(e) => setPickupLocation(e.target.value)}
              className="w-full bg-transparent outline-none text-gray-700 text-sm px-1 cursor-pointer"
            >
              <option value="">Select city</option>
              {cityList.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col items-start gap-1 md:px-6 md:border-r border-borderColor">
            <label
              htmlFor="pickup-date"
              className="text-xs font-semibold text-gray-400 uppercase tracking-wide"
            >
              Pick-up Date
            </label>
            <input
              value={pickupDate}
              onChange={(e) => setPickupDate(e.target.value)}
              type="date"
              id="pickup-date"
              min={new Date().toISOString().split("T")[0]}
              className="bg-transparent outline-none text-sm text-gray-700 w-full cursor-pointer"
              required
            />
          </div>

          <div className="flex flex-col items-start gap-1 md:px-6">
            <label
              htmlFor="return-date"
              className="text-xs font-semibold text-gray-400 uppercase tracking-wide"
            >
              Return Date
            </label>
            <input
              value={returnDate}
              onChange={(e) => setReturnDate(e.target.value)}
              type="date"
              id="return-date"
              min={pickupDate || new Date().toISOString().split("T")[0]}
              className="bg-transparent outline-none text-sm text-gray-700 w-full cursor-pointer"
              required
            />
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          type="submit"
          className="flex items-center justify-center gap-2 px-8 py-3.5 bg-primary hover:bg-primary-dull text-white rounded-full cursor-pointer font-medium text-sm shadow-md shadow-primary/30"
        >
          <img
            src={assets.search_icon}
            alt="search"
            className="brightness-[10] w-4 h-4"
          />
          Search
        </motion.button>
      </motion.form>

      {/* Car image */}
      <motion.img
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, delay: 0.6 }}
        src={assets.main_car}
        alt="Featured car"
        className="max-h-56 md:max-h-72 lg:max-h-80 object-contain drop-shadow-2xl"
      />
    </motion.section>
  );
};

export default Hero;
