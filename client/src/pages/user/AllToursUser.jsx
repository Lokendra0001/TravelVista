import React, { useEffect, useState } from "react";
import { Search } from "lucide-react";
import axios from "axios";
import { SERVER_API, SUB_API } from "../../utils/serverApiConfig";
import { TourCard } from "../../components/Index";

const AllToursUser = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [priceRange, setPriceRange] = useState([0, 50000]);
  const [sortBy, setSortBy] = useState("popular");
  const [tours, setTours] = useState([]);
  const [filteredTours, setFilteredTours] = useState([]);

  const categories = [
    { value: "all", label: "All Tours", count: tours.length },
    ...[
      "heritage",
      "nature",
      "beach",
      "adventure",
      "spiritual",
      "pilgrimage",
    ].map((cat) => ({
      value: cat,
      label: cat.charAt(0).toUpperCase() + cat.slice(1),
      count: tours.filter((t) => t.category === cat).length,
    })),
  ];

  useEffect(() => {
    setPriceRange([0, 50000]);
  }, [selectedCategory, searchTerm, sortBy]);

  useEffect(() => {
    const fetchAllTours = async () => {
      try {
        const res = await axios.get(
          `${SERVER_API}${SUB_API.TOUR.GET_ALL_TOURS}`,
          { withCredentials: true }
        );
        setTours(res?.data?.tours);
        setFilteredTours(res?.data?.tours);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllTours();
  }, []);

  useEffect(() => {
    if (!tours?.length) return;

    console.log(tours);

    let filtered = [...tours];

    // 🔍 Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (tour) =>
          tour.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          tour.destination.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // 🏞️ Category filter
    if (selectedCategory && selectedCategory !== "all") {
      filtered = filtered.filter((tour) => tour.category === selectedCategory);
    }

    // // 💰 Price range filter
    filtered = filtered.filter(
      (tour) =>
        tour?.pricePerPerson >= priceRange[0] &&
        tour.pricePerPerson <= priceRange[1]
    );

    // 📊 Sorting logic
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.pricePerPerson - b.pricePerPerson);
        break;
      case "price-high":
        filtered.sort((a, b) => b.pricePerPerson - a.pricePerPerson);
        break;
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case "popular":
        filtered.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        break;
    }

    console.log(filtered);

    // ✅ Update filtered list
    setFilteredTours(filtered);
  }, [tours, searchTerm, selectedCategory, priceRange, sortBy]);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="sticky top-0 h-130 bg-gradient-to-r -z-0 from-primary/20 to-secondary/20">
        <img
          src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=2000&q=80"
          alt="Beautiful Landscape"
          className="w-full h-full object-cover absolute inset-0 -z-0"
        />
        <div className="relative px-4 sm:px-6 h-full flex items-center justify-center text-center">
          <div className="text-white max-w-3xl">
            <h1 className="text-5xl lg:text-6xl font-bold mb-4">
              Discover Amazing Tours
            </h1>
            <p className="text-xl lg:text-2xl opacity-90">
              Curated experiences across incredible India
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-8 rounded-tl-[8%] rounded-tr-[8%] bg-background relative border-b border-light-border -mt-25 z-40">
        <div className="px-4 sm:px-6">
          <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between">
            <div className="relative flex-1 w-full md:max-w-2xl">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary w-5 h-5" />
              <input
                type="text"
                placeholder="Search tours by name or destination..."
                className="w-full pl-10 pr-4 py-3 border border-light-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="flex flex-wrap gap-4 items-center">
              <select
                className="px-4 py-2 border border-light-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="popular">Most Popular</option>
                <option value="rating">Highest Rated</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-4 mt-6">
            {categories.map((category) => (
              <button
                key={category.value}
                onClick={() => setSelectedCategory(category.value)}
                className={`px-4 py-2 rounded-full border transition-all duration-200 ${
                  selectedCategory === category.value
                    ? "bg-primary text-white border-primary"
                    : "bg-white text-text-secondary border-light-border hover:border-primary"
                }`}
              >
                {category.label} ({category.count})
              </button>
            ))}
          </div>

          {/* Price Range */}
          <div className="mt-4 gap-5">
            <label className="block text-sm font-medium text-text-secondary mb-2">
              Price Range: ₹{priceRange[0].toLocaleString()} - ₹
              {priceRange[1].toLocaleString()}
            </label>
            <input
              type="range"
              min="0"
              max="50000"
              step="1000"
              value={priceRange[1]}
              onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
              className="w-full max-w-md accent-primary"
            />
          </div>
        </div>
      </section>

      {/* Tours Grid */}
      <section className="py-12 relative bg-background">
        <div className="px-4 sm:px-6">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-text-primary">
              {filteredTours.length} Tours Found
            </h2>
            <p className="text-text-secondary">
              Showing {filteredTours.length} of {tours.length} tours
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {filteredTours.map((tour, idx) => (
              <TourCard key={idx} tour={tour} />
            ))}
          </div>

          {filteredTours.length === 0 && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold text-text-primary mb-2">
                No tours found
              </h3>
              <p className="text-text-secondary">
                Try adjusting your search or filters
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default AllToursUser;
