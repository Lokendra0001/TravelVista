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
          <div className="lg:max-w-lg md:w-fit order-2 z-10">
            <p className="text-secondary font-bold text-[15px] lg:text-[20px] mb-4 tracking-wide animate-fade-in-up">
              Best Destinations around India
            </p>

            <h1 className="text-4xl md:text-5xl  lg:text-6xl font-bold text-text-normal -leading-[4%] mb-6">
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
          <div className="lg:w-1/2 order-1 md:w-2/3   md:order-2 ">
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

          <div className="z-10 relative grid grid-cols-1 place-items-center md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
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
                  src="https://media.istockphoto.com/id/1322430711/photo/hindu-temple.jpg?b=1&s=612x612&w=0&k=20&c=hlTzI4oAkOWIA4Bxh_4wmc_eKctlxnQlksmk8jvnP5Q="
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
