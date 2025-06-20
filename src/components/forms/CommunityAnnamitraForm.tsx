import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UtensilsCrossed, MapPin, Users, User } from 'lucide-react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { useAuth } from '../../contexts/AuthContext';

const CommunityAnnamitraForm: React.FC = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [formData, setFormData] = useState({
    location: '',
    count: '',
    description: ''
  });
  const [loading, setLoading] = useState(false);

  const cities = [
    'Vijayawada', 'Guntur', 'Vizag', 'Nellore', 'Kurnool',
    'Tirupati', 'Rajahmundry', 'Eluru', 'Anantapur', 'Ongole'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;

    setLoading(true);
    try {
      await addDoc(collection(db, 'community_annamitra'), {
        location: formData.location,
        count: parseInt(formData.count),
        description: formData.description,
        submittedBy: currentUser.uid,
        submitterEmail: currentUser.email,
        status: 'pending',
        createdAt: new Date()
      });

      alert('Hunger report submitted successfully! Volunteers and donors will be notified.');
      navigate('/dashboard');
    } catch (error) {
      console.error('Error submitting report:', error);
      alert('Failed to submit report. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-500 to-red-500 px-8 py-6">
          <div className="flex items-center">
            <div className="bg-white rounded-full p-3 mr-4">
              <UtensilsCrossed className="w-8 h-8 text-orange-500" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Community Report - Annamitra Seva</h1>
              <p className="text-orange-100">Report Hunger/Poor People in Your Locality</p>
            </div>
          </div>
        </div>

        {/* Info Section */}
        <div className="bg-orange-50 border-l-4 border-orange-500 p-4 m-8 mb-0">
          <div className="flex">
            <UtensilsCrossed className="w-5 h-5 text-orange-500 mr-2 mt-0.5" />
            <div>
              <h3 className="text-sm font-medium text-orange-800">Community Reporting</h3>
              <p className="text-sm text-orange-700 mt-1">
                Use this form to report hungry or poor people in your locality who need food assistance. 
                Your report will be visible to volunteers and donors in your area.
              </p>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <MapPin className="inline w-4 h-4 mr-2" />
                Location
              </label>
              <select
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
              >
                <option value="">Select location</option>
                {cities.map(city => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Users className="inline w-4 h-4 mr-2" />
                Number of People
              </label>
              <input
                type="number"
                name="count"
                value={formData.count}
                onChange={handleInputChange}
                required
                min="1"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                placeholder="How many people need food?"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description (Optional)
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
              placeholder="Additional details about the situation (e.g., '10 people living under flyover near bus stand', 'Homeless family with children')"
            />
          </div>

          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <p className="text-sm text-green-800">
              <strong>📍 Impact:</strong> Your report will help connect hungry people in your area with food donors and volunteers. 
              This creates a direct bridge between those who have surplus food and those who need it most.
            </p>
          </div>

          <div className="flex space-x-4">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 px-6 rounded-lg font-semibold hover:from-orange-600 hover:to-red-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 disabled:opacity-50"
            >
              {loading ? 'Submitting...' : 'Submit Hunger Report'}
            </button>
            <button
              type="button"
              onClick={() => navigate('/dashboard')}
              className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CommunityAnnamitraForm;