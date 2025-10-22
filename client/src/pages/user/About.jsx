import {
  Globe,
  Shield,
  Award,
  Users,
  MapPin,
  Star,
  Heart,
  Compass,
  Trophy,
  Calendar,
} from "lucide-react";

const About = () => {
  const stats = [
    { number: "50K+", label: "Happy Travelers", icon: Users },
    { number: "150+", label: "Destinations", icon: MapPin },
    { number: "12+", label: "Years Experience", icon: Calendar },
    { number: "98%", label: "Satisfaction Rate", icon: Star },
  ];

  const values = [
    {
      icon: Shield,
      title: "Trust & Safety",
      description:
        "Your safety is our top priority. We maintain the highest standards of security and comfort.",
    },
    {
      icon: Globe,
      title: "Sustainable Travel",
      description:
        "We promote eco-friendly tourism and support local communities wherever we go.",
    },
    {
      icon: Award,
      title: "Quality Service",
      description:
        "Exceptional service is our promise. We go above and beyond to make your journey memorable.",
    },
    {
      icon: Heart,
      title: "Passionate Team",
      description:
        "Our team lives and breathes travel, bringing you authentic experiences with genuine care.",
    },
  ];
  const team = [
    {
      name: "Priya Sharma",
      role: "Founder & CEO",
      image:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      description: "Passionate about showcasing Indian heritage to the world",
    },
    {
      name: "Rajesh Kumar",
      role: "Head of Operations",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      description: "Expert in Indian travel logistics and cultural experiences",
    },
    {
      name: "Anjali Patel",
      role: "Travel Curator",
      image:
        "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      description: "Specializes in authentic Indian cultural experiences",
    },
    {
      name: "Arun Singh",
      role: "Customer Success",
      image:
        "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      description: "Ensuring memorable Indian travel experiences",
    },
  ];

  return (
    <div className="min-h-screen bg-background my-10 ">
      {/* Hero Section */}
      <section className="relative bg-[#FAFAFA] rounded-2xl  py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl lg:text-6xl font-bold text-text-normal mb-6">
                Our Story of
                <span className="text-primary"> Adventure</span>& Discovery
              </h1>
              <p className="text-xl text-text-secondary mb-8 leading-relaxed">
                For over a decade, TravelVista has been transforming ordinary
                trips into extraordinary journeys. We believe travel has the
                power to change lives, broaden perspectives, and create lasting
                memories.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 bg-white rounded-full px-4 py-2 shadow-sm">
                  <Trophy className="w-5 h-5 text-primary" />
                  <span className="text-text-primary font-semibold">
                    Award Winning
                  </span>
                </div>
                <div className="flex items-center gap-2 bg-white rounded-full px-4 py-2 shadow-sm">
                  <Compass className="w-5 h-5 text-secondary" />
                  <span className="text-text-primary font-semibold">
                    Expert Guides
                  </span>
                </div>
              </div>
            </div>
            <div className="relative ">
              <img
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
                alt="TravelVista team discussion"
                className="rounded-2xl shadow-2xl w-full h-auto"
              />
              <div className="absolute -inset-0 bg-black/30 rounded-2xl " />
              <div className="absolute -bottom-6 -left-6 bg-primary text-white p-6 rounded-2xl shadow-lg">
                <div className="text-3xl font-bold">12+</div>
                <div className="text-sm">Years of Excellence</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div key={index} className="text-center">
                  <div className="bg-card-bg w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="w-8 h-8 text-primary" />
                  </div>
                  <div className="text-3xl font-bold text-text-normal mb-2">
                    {stat.number}
                  </div>
                  <div className="text-text-secondary">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-card-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-text-normal mb-4">
              Our Mission & Vision
            </h2>
            <p className="text-xl text-text-secondary max-w-3xl mx-auto">
              To inspire and enable people to explore the world confidently,
              creating meaningful connections and unforgettable experiences.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <img
                src="https://images.unsplash.com/photo-1532375810709-75b1da00537c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2053&q=80"
                alt="Friends enjoying Indian culture"
                className="rounded-2xl shadow-lg w-full h-auto"
              />
            </div>
            <div className="space-y-6">
              <h3 className="text-3xl font-bold text-text-normal">
                Creating Memories That Last a Lifetime
              </h3>
              <p className="text-text-secondary text-lg leading-relaxed">
                We curate each journey with meticulous attention to detail,
                ensuring every moment is filled with wonder and discovery. From
                hidden local gems to iconic landmarks, we bring you authentic
                experiences.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="bg-primary text-white p-2 rounded-lg">
                    <Compass className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-text-normal">
                      Expert Guidance
                    </h4>
                    <p className="text-text-secondary text-sm">
                      Local experts who know the secrets
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="bg-secondary text-white p-2 rounded-lg">
                    <Heart className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-text-normal">
                      Personalized Service
                    </h4>
                    <p className="text-text-secondary text-sm">
                      Tailored to your preferences
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-text-normal mb-4">
              Our Core Values
            </h2>
            <p className="text-xl text-text-secondary max-w-3xl mx-auto">
              These principles guide everything we do and define who we are as a
              company.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const IconComponent = value.icon;
              return (
                <div key={index} className="text-center group">
                  <div className="bg-card-bg group-hover:bg-primary transition-colors duration-300 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <IconComponent className="w-10 h-10 text-primary group-hover:text-white transition-colors duration-300" />
                  </div>
                  <h3 className="text-xl font-bold text-text-normal mb-4">
                    {value.title}
                  </h3>
                  <p className="text-text-secondary leading-relaxed">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-[#FAFAFA] rounded-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-text-normal mb-4">
              Meet Our Team
            </h2>
            <p className="text-xl text-text-secondary max-w-3xl mx-auto">
              Passionate travelers and experts dedicated to making your journey
              unforgettable.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg overflow-hidden group hover:shadow-xl transition-shadow duration-300"
              >
                <div className="h-55 overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover  transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-text-normal mb-2">
                    {member.name}
                  </h3>
                  <div className="text-primary font-semibold mb-3">
                    {member.role}
                  </div>
                  <p className="text-text-secondary text-sm">
                    {member.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
