import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertTriangle, MapPin, Phone } from 'lucide-react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { useAuth } from '../../contexts/AuthContext';

const CommunityRakshaForm: React.FC = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [formData, setFormData] = useState({
    location: '',
    emergencyType: '',
    urgencyLevel: '',
    description: '',
    contactNumber: ''
  });
  const [loading, setLoading] = useState(false);

  const cities = [
    'Vijayawada', 'Guntur', 'Vizag', 'Nellore', 'Kurnool',
    'Tirupati', 'Rajahmundry', 'Eluru', 'Anantapur', 'Ongole'
  ];

  const emergencyTypes = [
    'Medical Emergency', 'Accident', 'Natural Disaster', 'Fire Emergency', 
    'Animal Rescue', 'Child in Distress', 'Elderly Person in Need', 'Other'
  ];

  const urgencyLevels = [
    'Critical - Immediate Help Needed', 
    'High - Help Needed Soon', 
    'Medium - Help Needed Today', 
    'Low - Help Needed This Week'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;

    setLoading(true);
    try {
      await addDoc(collection(db, 'community_raksha'), {
        location: formData.location,
        emergencyType: formData.emergencyType,
        urgencyLevel: formData.urgencyLevel,
        description: formData.description,
        contactNumber: formData.contactNumber,
        submittedBy: currentUser.uid,
        submitterEmail: currentUser.email,
        status: 'pending',
        createdAt: new Date()
      });

      alert('Emergency report submitted successfully! Volunteers will be notified immediately.');
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
        <div className="bg-gradient-to-r from-red-500 to-pink-500 px-8 py-6">
          <div className="flex items-center">
            <div className="bg-white rounded-full p-3 mr-4">
              <AlertTriangle className="w-8 h-8 text-red-500" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Community Report - Raksha Jyothi</h1>
              <p className="text-red-100">Report Emergency Situations</p>
            </div>
          </div>
        </div>

        {/* Emergency Notice */}
        <div className="bg-red-50 border-l-4 border-red-500 p-4 m-8 mb-0">
          <div className="flex">
            <AlertTriangle className="w-5 h-5 text-red-500 mr-2 mt-0.5" />
            <div>
              <h3 className="text-sm font-medium text-red-800">Emergency Reporting</h3>
              <p className="text-sm text-red-700 mt-1">
                Report emergency situations that need immediate volunteer assistance. 
                For life-threatening situations, please call emergency services (108/112) first.
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
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
              >
                <option value="">Select location</option>
                {cities.map(city => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Emergency Type
              </label>
              <select
                name="emergencyType"
                value={formData.emergencyType}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
              >
                <option value="">Select emergency type</option>
                {emergencyTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Urgency Level
            </label>
            <select
              name="urgencyLevel"
              value={formData.urgencyLevel}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
            >
              <option value="">Select urgency level</option>
              {urgencyLevels.map(level => (
                <option key={level} value={level}>{level}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Phone className="inline w-4 h-4 mr-2" />
              Contact Number (Optional)
            </label>
            <input
              type="tel"
              name="contactNumber"
              value={formData.contactNumber}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
              placeholder="Contact number for follow-up"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Emergency Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              required
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
              placeholder="Describe the emergency situation in detail (location, what happened, what kind of help is needed, etc.)"
            />
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <p className="text-sm text-yellow-800">
              <strong>🚨 Important:</strong> Your emergency report will immediately notify volunteers in your area. 
              Please provide accurate information to ensure appropriate help is dispatched quickly.
            </p>
          </div>

          <div className="flex space-x-4">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-gradient-to-r from-red-500 to-pink-500 text-white py-3 px-6 rounded-lg font-semibold hover:from-red-600 hover:to-pink-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 disabled:opacity-50"
            >
              {loading ? 'Submitting...' : 'Submit Emergency Report'}
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

export default CommunityRakshaForm;