import React, { useEffect, useState } from "react";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import CarCard from "../components/CarCard";
import { useSearchParams } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";
import { motion } from "motion/react";

const Cars = () => {
  const [searchParams] = useSearchParams();
  const pickupLocation = searchParams.get("pickupLocation");
  const pickupDate = searchParams.get("pickupDate");
  const returnDate = searchParams.get("returnDate");

  const { cars, axios } = useAppContext();

  const [input, setInput] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isLoading, setIsLoading] = useState(false);

  const isSearchData = pickupLocation && pickupDate && returnDate;
  const [filteredCars, setFilteredCars] = useState([]);

  const categories = ["All", "Sedan", "SUV", "Van"];

  const applyFilter = () => {
    let filtered = [...cars];

    if (input.trim()) {
      const q = input.toLowerCase();
      filtered = filtered.filter(
        (car) =>
          car.brand.toLowerCase().includes(q) ||
          car.model.toLowerCase().includes(q) ||
          car.category.toLowerCase().includes(q) ||
          car.transmission.toLowerCase().includes(q) ||
          car.location.toLowerCase().includes(q),
      );
    }

    if (selectedCategory !== "All") {
      filtered = filtered.filter((car) => car.category === selectedCategory);
    }

    setFilteredCars(filtered);
  };

  const searchCarAvailability = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.post("/api/bookings/check-availability", {
        location: pickupLocation,
        pickupDate,
        returnDate,
      });
      if (data.success) {
        setFilteredCars(data.availableCars);
        if (data.availableCars.length === 0)
          toast("No cars available for selected dates");
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isSearchData) searchCarAvailability();
  }, []);

  useEffect(() => {
    if (cars.length > 0 && !isSearchData) applyFilter();
  }, [input, cars, selectedCategory]);

  return (
    <div className="min-h-screen">
      {/* Header section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="flex flex-col items-center py-14 md:py-20 bg-light px-4"
      >
        <Title
          title="Available Cars"
          subTitle="Browse our selection of premium vehicles available for your next adventure"
        />

        {/* Search bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="flex items-center bg-white px-4 mt-8 max-w-xl w-full h-12 rounded-full shadow-md border border-gray-100"
        >
          <img
            src={assets.search_icon}
            alt="search"
            className="w-4 h-4 mr-2 opacity-50"
          />
          <input
            onChange={(e) => setInput(e.target.value)}
            value={input}
            type="text"
            placeholder="Search by make, model, location or features..."
            className="w-full h-full outline-none text-gray-600 text-sm bg-transparent"
          />
          {input && (
            <button
              onClick={() => setInput("")}
              className="text-gray-400 hover:text-gray-600 cursor-pointer text-lg leading-none"
            >
              ×
            </button>
          )}
        </motion.div>

        {/* Category filters */}
        {!isSearchData && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.4 }}
            className="flex items-center gap-2 mt-5 flex-wrap justify-center"
          >
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2 text-sm rounded-full border transition-all cursor-pointer font-medium ${
                  selectedCategory === cat
                    ? "bg-primary text-white border-primary shadow-md"
                    : "bg-white text-gray-600 border-borderColor hover:border-primary hover:text-primary"
                }`}
              >
                {cat}
              </button>
            ))}
          </motion.div>
        )}

        {/* Search context banner */}
        {isSearchData && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-5 flex flex-wrap items-center gap-2 text-sm text-gray-600 bg-white px-4 py-2 rounded-full shadow border border-borderColor"
          >
            <img src={assets.location_icon} alt="" className="w-4 h-4" />
            <span className="font-medium">{pickupLocation}</span>
            <span className="text-gray-300">·</span>
            <span>{pickupDate}</span>
            <span>→</span>
            <span>{returnDate}</span>
          </motion.div>
        )}
      </motion.div>

      {/* Cars grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="px-6 md:px-16 lg:px-24 xl:px-32 py-10"
      >
        <div className="flex items-center justify-between mb-6 xl:px-4 max-w-7xl mx-auto">
          <p className="text-gray-500 text-sm">
            {isLoading
              ? "Searching..."
              : `Showing ${filteredCars.length} car${filteredCars.length !== 1 ? "s" : ""}`}
          </p>
        </div>

        {/* Loading skeleton */}
        {isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 xl:px-4 max-w-7xl mx-auto">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="rounded-2xl overflow-hidden border border-gray-100 animate-pulse"
              >
                <div className="h-48 bg-gray-200" />
                <div className="p-5 space-y-3">
                  <div className="h-4 bg-gray-200 rounded w-3/4" />
                  <div className="h-3 bg-gray-100 rounded w-1/2" />
                  <div className="grid grid-cols-2 gap-2 mt-4">
                    {[1, 2, 3, 4].map((j) => (
                      <div key={j} className="h-3 bg-gray-100 rounded" />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty state */}
        {!isLoading && filteredCars.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center py-24 text-center"
          >
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <img
                src={assets.car_icon}
                alt=""
                className="w-10 h-10 opacity-30"
              />
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              No cars found
            </h3>
            <p className="text-gray-400 text-sm max-w-xs">
              {input
                ? `No results for "${input}". Try a different search.`
                : "No cars available. Please check back later."}
            </p>
            {(input || selectedCategory !== "All") && (
              <button
                onClick={() => {
                  setInput("");
                  setSelectedCategory("All");
                }}
                className="mt-5 px-5 py-2 text-sm text-primary border border-primary rounded-full hover:bg-primary/5 transition-all cursor-pointer"
              >
                Clear filters
              </button>
            )}
          </motion.div>
        )}

        {/* Cars */}
        {!isLoading && filteredCars.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 xl:px-4 max-w-7xl mx-auto">
            {filteredCars.map((car, index) => (
              <motion.div
                key={car._id || index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * index, duration: 0.4 }}
              >
                <CarCard car={car} />
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default Cars;
