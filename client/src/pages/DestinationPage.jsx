// DestinationPage.jsx
import React from "react";

const tours = [
  {
    name: "Jaipur Royal Tour",
    duration: "3 Days / 2 Nights",
    price: "₹12,000",
    img: "https://source.unsplash.com/400x300/?jaipur,india",
  },
  {
    name: "Udaipur Lakes Tour",
    duration: "4 Days / 3 Nights",
    price: "₹18,000",
    img: "https://source.unsplash.com/400x300/?udaipur,india",
  },
  {
    name: "Jaisalmer Desert Safari",
    duration: "2 Days / 1 Night",
    price: "₹10,000",
    img: "https://source.unsplash.com/400x300/?jaisalmer,india",
  },
];

const DestinationPage = () => {
  return (
    <div className="bg-[var(--background)] min-h-screen">
      {/* Banner */}
      <div
        className="w-full h-64 bg-cover bg-center flex items-center justify-center"
        style={{
          backgroundImage:
            "url('https://source.unsplash.com/1200x400/?rajasthan,india')",
        }}
      >
        <h1 className="text-4xl md:text-5xl font-bold text-[var(--primary)] bg-white/30 px-6 py-2 rounded">
          Rajasthan - Land of Kings
        </h1>
      </div>

      {/* Overview */}
      <div className="max-w-5xl mx-auto px-4 py-8 text-[var(--text-primary)]">
        <h2 className="text-2xl font-semibold mb-4">About Rajasthan</h2>
        <p className="mb-4">
          Rajasthan, the Land of Kings, is known for its majestic palaces,
          vibrant culture, desert landscapes, and rich history. Explore the
          royal heritage, colorful festivals, and culinary delights in every
          city.
        </p>
        <div className="flex gap-6 text-[var(--secondary)]">
          <div>Best Time: Oct - Mar</div>
          <div>Famous Food: Dal Baati Churma</div>
          <div>Transport: Easy by train & car</div>
        </div>
      </div>

      {/* Popular Tours */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-semibold text-[var(--text-primary)] mb-6">
          Popular Tours
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {tours.map((tour, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow"
            >
              <img
                src={tour.img}
                alt={tour.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="font-bold text-lg mb-1">{tour.name}</h3>
                <p className="text-[var(--secondary)] mb-2">{tour.duration}</p>
                <p className="font-semibold text-[var(--primary)] mb-3">
                  {tour.price}
                </p>
                <button className="bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white px-4 py-2 rounded transition">
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Button */}
      <div className="text-center py-8">
        <button className="bg-[var(--secondary)] hover:bg-[var(--accent)] text-white px-6 py-3 rounded font-semibold transition">
          View All Tours
        </button>
      </div>
    </div>
  );
};

export default DestinationPage;
