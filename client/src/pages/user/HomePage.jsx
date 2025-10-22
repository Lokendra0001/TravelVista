import React, { useEffect, useState } from "react";
import { Button } from "../../components/common/Index";
import { Star } from "lucide-react";
import axios from "axios";
import { SERVER_API, SUB_API } from "../../utils/serverApiConfig";
import { TourCard } from "../../components/Index";
import { Link } from "react-router-dom";

const HomePage = () => {
  const [tours, setTours] = useState([]);
  useEffect(() => {
    const fetchAllTours = async () => {
      try {
        const res = await axios.get(
          `${SERVER_API}${SUB_API.TOUR.GET_ALL_TOURS}`,
          { withCredentials: true }
        );
        setTours(res?.data?.tours);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllTours();
  }, []);
  return (
    <div className="min-h-screen px-2 bg-background overflow-hidden">
      {/* Hero Section */}
      <section className=" relative">
        {/* Background Decorations */}

        <div className="flex flex-col md:flex-row lg:items-center justify-between pt-20  z-10 ">
          {/* Left Content */}
          <div className="max-w-lg order-2 z-10">
            <p className="text-secondary font-bold text-[15px] lg:text-[20px] mb-4 tracking-wide animate-fade-in-up">
              Best Destinations around India
            </p>

            <h1 className="text-4xl lg:text-6xl font-bold text-text-normal -leading-[4%] mb-6">
              <div
                className="flex animate-fade-in-up"
                style={{ animationDelay: "0.2s" }}
              >
                Travel,{" "}
                <span className="relative inline-block w-fit z-10 ">
                  enjoy
                  <img
                    src="assets/home/smallDecore.png"
                    className="absolute -bottom-1 right-0 -z-10 w-full"
                  />
                </span>
              </div>
              <span
                className="block animate-fade-in-up"
                style={{ animationDelay: "0.3s" }}
              >
                and live a new
              </span>
              <span
                className="block animate-fade-in-up"
                style={{ animationDelay: "0.4s" }}
              >
                and full life
              </span>
            </h1>

            <p
              className="text-gray-600 text-sm lg:text-lg leading-relaxed mb-8 max-w-md animate-fade-in-up"
              style={{ animationDelay: "0.5s" }}
            >
              Explore India with TravelVista! From the Himalayas to serene
              backwaters, our tours bring you closer to the heart of the
              country.
            </p>

            <Link
            to={"/tours"}
              className="bg-primary flex w-fit items-center hover:bg-primary-hover cursor-pointer text-white py-2.5 px-4 rounded-lg font-semibold text-sm lg:text-lg shadow-lg group animate-fade-in-up "
              style={{ animationDelay: "0.6s" }}
            >
              Find Out More
              <svg
                className="w-5 h-5 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>
          </div>

          {/* Right Content - Image */}
          <div className="lg:w-1/2 order-1  md:order-2 ">
            <img
              src="assets/home/Image.png"
              className="z-10 relative animate-fade-in-left"
              alt="Travel Destination"
            />
            <img
              src="assets/home/Decore.png"
              className="absolute -right-14 -top-0 -z-0 animate-pulse-slow h-143"
              alt="Decoration"
            />
          </div>
        </div>
      </section>

      {/* Services Section with Professional Icons */}
      <section className="py-16 bg-white">
        <div className="relative  px-4 sm:px-6">
          <img
            src="assets/home/category/Group 4.png"
            className="absolute -z-0 right-0 top-0 h-35"
          />
          <div className="text-center mb-12">
            <p className="text-secondary font-semibold text-lg mb-2">
              CATEGORY
            </p>
            <h2 className="text-3xl lg:text-4xl font-bold text-text-primary">
              We Offer Best Services
            </h2>
          </div>

          <div className="z-10 relative grid grid-cols-2 place-items-center md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              {
                icon: <img src="assets/home/category/Group 48.png" />,
                title: "Calculated Weather",
                description:
                  "Built Wicket longer admire do barton vanity itself do in it.",
                features: [
                  "Perfect is more it",
                  "custom services for",
                  "verity final do in it",
                ],
              },
              {
                icon: <img src="assets/home/category/Group 51.png" />,
                title: "Best Transport",
                description:
                  "Engrossed listening. Park gate sell they west hard for the.",
                features: [
                  "used here for this",
                  "agreement listening",
                  "missing customers",
                ],
              },
              {
                icon: <img src="assets/home/category/Group 50.png" />,

                title: "Local Events",
                description:
                  "Barton vanity itself do in it. Preferd to men it engrossed listening.",
                features: [
                  "We deliver outsourced",
                  "active do bottom",
                  "Pure gaze set they",
                ],
              },
              {
                icon: <img src="assets/home/category/Group 49.png" />,

                title: "Customization",
                description:
                  "We deliver outsourced aviation services for military customers",
                features: [
                  "Fullt Wealth longer",
                  "Expressed listening",
                  "better verify itself do",
                ],
              },
            ].map((service, index) => (
              <div
                key={index}
                className="bg-background  w-[227px] rounded-2xl p-6 border border-light-border hover:shadow-md transition-all duration-300 transform hover:-translate-y-2 group flex flex-col items-center  cursor-pointer"
              >
                <div className="w-20 h-20   rounded-xl flex items-center justify-center mb-6 transition-colors text-primary">
                  {service.icon}
                </div>

                <h3 className="text-[18px] font-bold text-text-primary mb-3 group-hover:text-primary transition-colors">
                  {service.title}
                </h3>

                <p className="text-text-secondary text-center text-sm mb-4 leading-relaxed">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Top Destinations Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-2xl lg:text-4xl font-bold text-text-primary mb-4">
              Top Destinations
            </h2>
            <p className="text-text-secondary text-lg max-w-2xl mx-auto">
              Discover the most popular and breathtaking places to visit in
              India
            </p>
          </div>

          <div className="grid place-items-center grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tours.map(
              (tour, idx) => idx < 3 && <TourCard key={idx} tour={tour} />
            )}
          </div>
        </div>
      </section>

      {/* Book Trip Steps with Trip Card Section */}
      <section className="py-16 bg-zinc-50 mt-10 mx-2 px-2 rounded-xl">
        <div className="flex flex-col lg:flex-row gap-12 lg:px-6 lg:items-center">
          {/* Left Side - Steps */}
          <div className="lg:w-1/2">
            <h2 className="text-xl lg:text-3xl  font-bold text-primary mb-8">
              Book Your Next Trip In 3 Easy Steps
            </h2>

            <div className="space-y-8">
              {[
                {
                  step: "01",
                  title: "Choose Destination",
                  description:
                    "Browse through our curated list of destinations across India and select the one that excites you the most.",
                },
                {
                  step: "02",
                  title: "Make Payment",
                  description:
                    "Secure your trip by making a quick and safe online payment through our trusted payment gateway.",
                },
                {
                  step: "03",
                  title: "Reach Pickup Location",
                  description:
                    "On the selected date, arrive at your designated pickup location and get ready for an unforgettable journey.",
                },
              ].map((step, index) => (
                <div key={index} className="flex items-start gap-6">
                  <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-bold text-lg shrink-0">
                    {step.step}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-text-primary mb-2">
                      {step.title}
                    </h3>
                    <p className="text-text-secondary leading-relaxed text-sm">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side - Trip Card */}
          <div className="hidden lg:block lg:w-1/2">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden max-w-sm mx-auto">
              {/* Trip Image */}
              <div className="relative h-50 bg-gray-200">
                <img
                  src="data:image/jpeg;base64,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"
                  alt="Golden Triangle Tour"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                  <span className="text-sm font-semibold text-text-primary">
                    14–29 June
                  </span>
                </div>
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                  <span className="text-sm font-semibold text-text-primary">
                    by Rakesh
                  </span>
                </div>
              </div>

              {/* Trip Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-text-primary mb-4">
                  Trip To Ram Mandir Ayodhya
                </h3>

                {/* Progress Bar */}
                <div className="mb-6">
                  <div className="flex justify-between text-sm text-text-secondary mb-2">
                    <span>Trip to come</span>
                    <span>40% completed</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full"
                      style={{ width: "40%" }}
                    ></div>
                  </div>
                </div>

                {/* People Going */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex -space-x-2">
                      {[1, 2, 3, 4].map((item) => (
                        <div
                          key={item}
                          className="w-8 h-8 bg-primary rounded-full border-2 border-white"
                        ></div>
                      ))}
                    </div>
                    <span className="ml-3 text-text-secondary text-sm">
                      24 people going
                    </span>
                  </div>

                  <button className="bg-primary hover:bg-primary-hover text-white px-4 py-2 rounded-lg font-semibold transition-colors">
                    Show Trip
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-2xl lg:text-4xl font-bold text-text-primary mb-4">
              What People Say About Us
            </h2>
            <p className="text-text-secondary text-lg max-w-2xl mx-auto">
              Hear from our satisfied travelers who explored India with us
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Johnson",
                location: "New York, USA",
                rating: "5.0",
                comment:
                  "Amazing experience! The Golden Triangle tour was perfectly organized. The guides were knowledgeable and hotels were excellent.",
                image:
                  "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
              },
              {
                name: "Rajesh Kumar",
                location: "Mumbai, India",
                rating: "4.8",
                comment:
                  "Best travel agency I've used. They took care of everything from flights to local transportation. Highly recommended!",
                image:
                  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
              },
              {
                name: "Emily Chen",
                location: "London, UK",
                rating: "4.9",
                comment:
                  "Kerala backwaters experience was magical. The houseboat stay and Ayurvedic treatments were highlights of our trip.",
                image:
                  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
              },
            ].map((testimonial, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg p-6 border border-light-border hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gray-300 rounded-full mr-4 overflow-hidden">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold text-text-primary">
                      {testimonial.name}
                    </h4>
                    <p className="text-text-secondary text-sm">
                      {testimonial.location}
                    </p>
                  </div>
                  <div className="ml-auto bg-primary flex items-center gap-1 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    <Star fill="currentColor" size={15} /> {testimonial.rating}
                  </div>
                </div>
                <p className="text-text-secondary italic">
                  "{testimonial.comment}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Custom Animations */}
      <style>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fade-in-left {
          from {
            transform: translateX(30px);
            opacity: 0; /* add this */
          }
          to {
            transform: translateX(0);
            opacity: 1; /* add this */
          }
        }

        @keyframes pulse-slow {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.8;
          }
        }
        @keyframes bounce-slow {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        @keyframes bounce-slower {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-5px);
          }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
          opacity: 0;
        }
        .animate-fade-in-left {
          animation: fade-in-left 0.5s ease-out forwards;
          opacity: 0;
        }
        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }
        .animate-bounce-slow {
          animation: bounce-slow 4s ease-in-out infinite;
        }
        .animate-bounce-slower {
          animation: bounce-slower 5s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default HomePage;
