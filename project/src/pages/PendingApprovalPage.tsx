import React from 'react';
import { Clock, CheckCircle, Users, BookOpen } from 'lucide-react';

const PendingApprovalPage: React.FC = () => {
  const modules = [
    {
      title: 'Annamitra Seva',
      subtitle: 'Feeding Hope, Not Wasting Food',
      description: 'Every day, countless meals are thrown away while millions sleep hungry. Annamitra Seva is our heartfelt mission to bridge this painful gap. We believe that food is not just nourishment—it\'s a gesture of care, dignity, and humanity. Through this initiative, we collect surplus food from homes, hostels, hotels, and events, ensuring it\'s hygienic, fresh, and safe to share. Our volunteers serve as the compassionate link between abundance and need, delivering meals to the hungry with respect and empathy. Your excess can be someone\'s survival—together, let\'s make sure no meal goes wasted and no person goes unfed.',
      image: 'https://res-console.cloudinary.com/dlvc4lbod/thumbnails/v1/image/upload/v1750328572/QW5uYW1pdHJhX1NldmFfb2RpaXV5/drilldown',
      icon: '🍛'
    },
    {
      title: 'Vidya Jyothi',
      subtitle: 'Lighting the Path to Education',
      description: 'Education is every child\'s right—not a privilege reserved for a few. Vidya Jyothi is our commitment to ensure that no dream is buried under the weight of poverty. Many bright young minds are forced to drop out due to lack of fees, uniforms, or basic school supplies. Through this initiative, generous donors can sponsor a child\'s education fully or partially, giving them not just books—but belief, not just a classroom—but a chance. Every contribution brings light into a child\'s future. Let\'s turn financial struggles into stepping stones and make sure every child gets the education they truly deserve.',
      image: 'https://res-console.cloudinary.com/dlvc4lbod/thumbnails/v1/image/upload/v1750330073/VmlkeWFfSnlvdGlfdnZ2eHFj/drilldown',
      icon: '📚'
    },
    {
      title: 'Suraksha Setu',
      subtitle: 'A Bridge of Care for the Forgotten',
      description: 'In many orphanages and under-resourced shelters, even the simplest daily needs remain unmet. Suraksha Setu stands as a lifeline—connecting compassionate donors to the children and elderly who need them most. From wheelchairs to warm clothes, notebooks to daily essentials, every donation builds a bridge between human kindness and those in silent struggle. With a single form, donors can offer hope, and with every accepted request, our volunteers ensure safe and respectful delivery. This isn\'t just about providing things—it\'s about restoring dignity and reminding the forgotten that they\'re never alone.',
      image: 'https://res-console.cloudinary.com/dlvc4lbod/thumbnails/v1/image/upload/v1750329992/U3VyYWtzaGFTZXR1X2h2aHNxeQ==/drilldown',
      icon: '🤝'
    },
    {
      title: 'PunarAsha',
      subtitle: 'Giving Things a Second Life, Giving People a First Chance',
      description: 'Every discarded item tells a story—of potential, of purpose, of someone who still needs it. PunarAsha (meaning "Renewed Hope") is our mission to turn waste into warmth and clutter into compassion. Instead of throwing away usable clothes, electronics, books, and household goods, we encourage thoughtful giving. Through organized donation drives and labeled collection events, we ensure that your unused items reach those who need them the most. Because what may seem old to you can be life-changing to someone else. Let\'s reduce waste and renew hope—together.',
      image: 'https://res-console.cloudinary.com/dlvc4lbod/thumbnails/v1/image/upload/v1750328652/UHVuYXJBc2hhX3ppOXFmYw==/drilldown',
      icon: '🔄'
    },
    {
      title: 'Raksha Jyothi',
      subtitle: 'Because Every Life Deserves a Second Chance',
      description: 'On the streets, in the shadows, emergencies often go unnoticed. Raksha Jyothi is our urgent call to compassion—for people and animals who need immediate rescue. Whether it\'s an injured dog hit by a vehicle, a homeless person collapsed from hunger, or a child with no one to turn to, this initiative lets anyone report the need for help. Donors or community members can fill a form with location and details, triggering a real-time alert to nearby volunteers. With no expectations of money, only kindness, volunteers rush in—providing aid, contacting families if possible, or getting the injured to safety. For those who have no one, Raksha Jyothi becomes someone.',
      image: 'https://res-console.cloudinary.com/dlvc4lbod/thumbnails/v1/image/upload/v1750330619/VW50aXRsZWRfZGVzaWduXzFfaDc1ZGxy/drilldown',
      icon: '🚑'
    },
    {
      title: 'Jyothi Nilayam',
      subtitle: 'A Roof of Dignity, A Home of Hope',
      description: 'While many of us sleep in comfort, thousands spend their nights on sidewalks, under flyovers, or in silent corners of the city—cold, hungry, and forgotten. Jyothi Nilayam is our heartfelt vision to build safe, loving shelters across Andhra Pradesh for the homeless and helpless. Through this initiative, donors can contribute fully or partially to the construction of shelter homes, selecting from a list of 10 cities. Each shelter is a sanctuary for those with nowhere to go—humans and rescued animals alike. With your support, we aren\'t just building structures—we\'re building lives, restoring dignity, and proving that everyone deserves a place to call home.',
      image: 'https://res-console.cloudinary.com/dlvc4lbod/thumbnails/v1/image/upload/v1750328619/SnlvdGhpX05pbGF5YW1fYXNodXZ6/drilldown',
      icon: '🏠'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Welcome to Hungry Saver – Volunteer Portal
            </h1>
          </div>
        </div>
      </div>

      {/* Pending Approval Status */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-8 mb-12">
          <div className="flex items-center justify-center mb-6">
            <div className="bg-yellow-500 rounded-full p-4">
              <Clock className="w-8 h-8 text-white" />
            </div>
          </div>
          <div className="text-center">
            <h2 className="text-2xl font-bold text-yellow-800 mb-4">
              Pending Approval
            </h2>
            <p className="text-yellow-700 text-lg mb-6">
              Your volunteer account is currently under review by our admin team. 
              You'll receive access to the volunteer dashboard once approved.
            </p>
            <div className="flex items-center justify-center space-x-4 text-sm text-yellow-600">
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 mr-2" />
                Account Created
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-2" />
                Pending Review
              </div>
              <div className="flex items-center opacity-50">
                <Users className="w-4 h-4 mr-2" />
                Access Granted
              </div>
            </div>
          </div>
        </div>

        {/* About Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
          <div className="text-center mb-8">
            <BookOpen className="w-12 h-12 text-blue-600 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-gray-900 mb-4">About Hungry Saver</h2>
            <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Hungry Saver is a social impact platform that connects food donors, volunteers, and community members 
              to reduce hunger and support the needy. Our platform collects surplus food, educational aid, and 
              essential resources through easy-to-use digital forms. Volunteers are automatically notified and 
              assigned based on location, ensuring transparency, timely delivery, and community-driven support.
            </p>
          </div>
        </div>

        {/* Platform Functionalities */}
        <div className="mb-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Platform Functionalities Overview
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Learn about our six comprehensive modules designed to address different aspects of social welfare
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {modules.map((module, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
                <img
                  src={module.image}
                  alt={module.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <span className="text-2xl mr-3">{module.icon}</span>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{module.title}</h3>
                      <p className="text-sm text-gray-500">{module.subtitle}</p>
                    </div>
                  </div>
                  <p className="text-gray-600 leading-relaxed">
                    {module.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-center text-white">
          <h3 className="text-2xl font-bold mb-4">
            Thank You for Joining Our Mission!
          </h3>
          <p className="text-lg text-blue-100 mb-6">
            Your application is being reviewed. Once approved, you'll be able to accept donation requests, 
            coordinate with donors, and help deliver aid to those who need it most in your city.
          </p>
          <div className="text-sm text-blue-200">
            <p>Questions? Contact us at support@hungrysaver.org</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PendingApprovalPage;