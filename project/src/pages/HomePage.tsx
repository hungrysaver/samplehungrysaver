import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Users, Globe, Shield } from 'lucide-react';

const HomePage: React.FC = () => {
  const modules = [
    {
      id: 'annamitra-seva',
      title: 'Annamitra Seva',
      subtitle: 'Feeding Hope, Not Wasting Food',
      description: 'Every day, countless meals are thrown away while millions sleep hungry. Annamitra Seva is our heartfelt mission to bridge this painful gap. We believe that food is not just nourishment—it\'s a gesture of care, dignity, and humanity.',
      image: 'https://res-console.cloudinary.com/dlvc4lbod/thumbnails/v1/image/upload/v1750328572/QW5uYW1pdHJhX1NldmFfb2RpaXV5/drilldown',
      icon: '🍛',
      gradient: 'from-[#EAA640] to-[#EBE7E1]'
    },
    {
      id: 'vidya-jyothi',
      title: 'Vidya Jyothi',
      subtitle: 'Lighting the Path to Education',
      description: 'Education is every child\'s right—not a privilege reserved for a few. Vidya Jyothi is our commitment to ensure that no dream is buried under the weight of poverty.',
      image: 'https://res-console.cloudinary.com/dlvc4lbod/thumbnails/v1/image/upload/v1750330073/VmlkeWFfSnlvdGlfdnZ2eHFj/drilldown',
      icon: '📚',
      gradient: 'from-[#EAA640] to-[#EBE7E1]'
    },
    {
      id: 'suraksha-setu',
      title: 'Suraksha Setu',
      subtitle: 'A Bridge of Care for the Forgotten',
      description: 'In many orphanages and under-resourced shelters, even the simplest daily needs remain unmet. Suraksha Setu stands as a lifeline—connecting compassionate donors to those who need them most.',
      image: 'https://res-console.cloudinary.com/dlvc4lbod/thumbnails/v1/image/upload/v1750329992/U3VyYWtzaGFTZXR1X2h2aHNxeQ==/drilldown',
      icon: '🤝',
      gradient: 'from-[#EAA640] to-[#EBE7E1]'
    },
    {
      id: 'punar-asha',
      title: 'PunarAsha',
      subtitle: 'Giving Things a Second Life, Giving People a First Chance',
      description: 'Every discarded item tells a story—of potential, of purpose, of someone who still needs it. PunarAsha is our mission to turn waste into warmth and clutter into compassion.',
      image: 'https://res-console.cloudinary.com/dlvc4lbod/thumbnails/v1/image/upload/v1750328652/UHVuYXJBc2hhX3ppOXFmYw==/drilldown',
      icon: '🔄',
      gradient: 'from-[#EAA640] to-[#EBE7E1]'
    },
    {
      id: 'raksha-jyothi',
      title: 'Raksha Jyothi',
      subtitle: 'Because Every Life Deserves a Second Chance',
      description: 'On the streets, in the shadows, emergencies often go unnoticed. Raksha Jyothi is our urgent call to compassion—for people and animals who need immediate rescue.',
      image: 'https://res-console.cloudinary.com/dlvc4lbod/thumbnails/v1/image/upload/v1750330619/VW50aXRsZWRfZGVzaWduXzFfaDc1ZGxy/drilldown',
      icon: '🚑',
      gradient: 'from-[#EAA640] to-[#EBE7E1]'
    },
    {
      id: 'jyothi-nilayam',
      title: 'Jyothi Nilayam',
      subtitle: 'A Roof of Dignity, A Home of Hope',
      description: 'While many of us sleep in comfort, thousands spend their nights on sidewalks, under flyovers, or in silent corners of the city—cold, hungry, and forgotten.',
      image: 'https://res-console.cloudinary.com/dlvc4lbod/thumbnails/v1/image/upload/v1750328619/SnlvdGhpX05pbGF5YW1fYXNodXZ6/drilldown',
      icon: '🏠',
      gradient: 'from-[#EAA640] to-[#EBE7E1]'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#EBE7E1] via-white to-[#EAA640]/20">
      {/* Hero Section */}
      <section id="home" className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#EAA640]/10 to-[#EBE7E1]/10"></div>
        <div className="relative max-w-7xl mx-auto text-center">
          <h1 className="text-4xl sm:text-6xl font-bold text-gray-900 mb-6">
            Welcome to <span className="bg-gradient-to-r from-[#EAA640] to-[#d4952e] bg-clip-text text-transparent">Hungry Saver</span>
          </h1>
          <p className="text-xl sm:text-2xl text-gray-600 mb-8 max-w-4xl mx-auto leading-relaxed">
            A social impact platform that connects food donors, volunteers, and community members to reduce hunger and support the needy.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register"
              className="bg-gradient-to-r from-[#EAA640] to-[#d4952e] text-white px-8 py-4 rounded-full text-lg font-semibold hover:from-[#d4952e] hover:to-[#c08829] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Join Our Mission
            </Link>
            <button
              onClick={() => document.getElementById('overview')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-white text-gray-700 px-8 py-4 rounded-full text-lg font-semibold hover:bg-[#EBE7E1] transition-all duration-300 shadow-lg border border-gray-200"
            >
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-[#EBE7E1]/50 to-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-gradient-to-r from-[#EAA640] to-[#d4952e] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">6</div>
              <div className="text-gray-600">Impact Modules</div>
            </div>
            <div className="text-center">
              <div className="bg-gradient-to-r from-[#EAA640] to-[#d4952e] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">1000+</div>
              <div className="text-gray-600">Volunteers</div>
            </div>
            <div className="text-center">
              <div className="bg-gradient-to-r from-[#EAA640] to-[#d4952e] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="w-8 h-8 text-white" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">10</div>
              <div className="text-gray-600">Cities Covered</div>
            </div>
            <div className="text-center">
              <div className="bg-gradient-to-r from-[#EAA640] to-[#d4952e] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">24/7</div>
              <div className="text-gray-600">Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* Modules Section */}
      <section id="overview" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Platform Functionalities Overview
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Six comprehensive modules designed to address different aspects of social welfare and community support
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {modules.map((module, index) => (
              <div
                key={module.id}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group transform hover:-translate-y-2"
              >
                <div className={`h-2 bg-gradient-to-r ${module.gradient}`}></div>
                <div className="p-8">
                  <div className="flex items-center mb-4">
                    <div className={`w-12 h-12 bg-gradient-to-r ${module.gradient} rounded-full flex items-center justify-center text-white text-xl font-bold mr-4`}>
                      {module.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{module.title}</h3>
                      <p className="text-sm text-gray-500">{module.subtitle}</p>
                    </div>
                  </div>
                  <img
                    src={module.image}
                    alt={module.title}
                    className="w-full h-48 object-cover rounded-lg mb-4 group-hover:scale-105 transition-transform duration-300"
                  />
                  <p className="text-gray-600 text-sm leading-relaxed mb-6">
                    {module.description}
                  </p>
                  <Link
                    to={`/donate/${module.id}`}
                    className={`inline-flex items-center bg-gradient-to-r ${module.gradient} text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg transition-all duration-300 group-hover:scale-105`}
                  >
                    Contribute Now
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-[#EAA640] to-[#d4952e]">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-8">
            Ready to Make a Difference?
          </h2>
          <p className="text-xl text-[#EBE7E1] mb-8 leading-relaxed">
            Join thousands of compassionate individuals who are transforming lives through small acts of kindness. 
            Every contribution, no matter how small, creates ripples of positive change in our community.
          </p>
          <Link
            to="/register"
            className="bg-white text-[#EAA640] px-8 py-4 rounded-full text-lg font-semibold hover:bg-[#EBE7E1] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            Start Your Journey Today
          </Link>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 bg-gradient-to-r from-[#EBE7E1] to-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Contact Us</h2>
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-center justify-center mb-4">
              <div className="bg-gradient-to-r from-[#EAA640] to-[#d4952e] rounded-full p-4">
                <Heart className="w-8 h-8 text-white" />
              </div>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Get in Touch</h3>
            <p className="text-gray-600 mb-6">
              Send your queries or feedback to this email:
            </p>
            <a
              href="mailto:hungrysaver198@gmail.com"
              className="text-[#EAA640] font-bold text-lg hover:text-[#d4952e] transition-colors"
            >
              hungrysaver198@gmail.com
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;