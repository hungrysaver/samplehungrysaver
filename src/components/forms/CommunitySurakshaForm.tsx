import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, MapPin, Users } from 'lucide-react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { useAuth } from '../../contexts/AuthContext';

const CommunitySurakshaForm: React.FC = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [formData, setFormData] = useState({
    location: '',
    needType: [] as string[],
    count: '',
    description: ''
  });
  const [loading, setLoading] = useState(false);

  const cities = [
    'Vijayawada', 'Guntur', 'Vizag', 'Nellore', 'Kurnool',
    'Tirupati', 'Rajahmundry', 'Eluru', 'Anantapur', 'Ongole'
  ];

  const needTypes = [
    'Wheelchairs', 'Walking Aids', 'Hearing Aids', 'Prosthetics', 
    'Medical Equipment', 'Assistive Devices', 'Mobility Support'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;

    setLoading(true);
    try {
      await addDoc(collection(db, 'community_suraksha'), {
        location: formData.location,
        needType: formData.needType,
        count: parseInt(formData.count),
        description: formData.description,
        submittedBy: currentUser.uid,
        submitterEmail: currentUser.email,
        status: 'pending',
        createdAt: new Date()
      });

      alert('Disability assistance request submitted successfully! Donors will be notified.');
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

  const handleNeedTypeChange = (needType: string) => {
    setFormData(prev => ({
      ...prev,
      needType: prev.needType.includes(needType)
        ? prev.needType.filter(type => type !== needType)
        : [...prev.needType, needType]
    }));
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-500 to-blue-500 px-8 py-6">
          <div className="flex items-center">
            <div className="bg-white rounded-full p-3 mr-4">
              <Shield className="w-8 h-8 text-green-500" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Community Report - Suraksha Setu</h1>
              <p className="text-green-100">Report Disability Assistance Needs</p>
            </div>
          </div>
        </div>

        {/* Info Section */}
        <div className="bg-green-50 border-l-4 border-green-500 p-4 m-8 mb-0">
          <div className="flex">
            <Shield className="w-5 h-5 text-green-500 mr-2 mt-0.5" />
            <div>
              <h3 className="text-sm font-medium text-green-800">Disability Support Request</h3>
              <p className="text-sm text-green-700 mt-1">
                Report individuals who need assistive devices or disability support. This helps connect them with donors who can provide wheelchairs, medical equipment, and other essential aids.
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
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
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
                Number of People Needing Assistance
              </label>
              <input
                type="number"
                name="count"
                value={formData.count}
                onChange={handleInputChange}
                required
                min="1"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                placeholder="How many people need assistance?"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Type of Assistance Needed (Select all that apply)
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {needTypes.map(type => (
                <label key={type} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.needType.includes(type)}
                    onChange={() => handleNeedTypeChange(type)}
                    className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">{type}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              required
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
              placeholder="Describe the specific needs and situation (e.g., 'Elderly person needs wheelchair for mobility', 'Child with hearing impairment needs hearing aid')"
            />
          </div>

          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <p className="text-sm text-green-800">
              <strong>🛡️ Impact:</strong> Your report will help connect people with disabilities to the assistive devices and support they need. 
              This can significantly improve their quality of life and independence.
            </p>
          </div>

          <div className="flex space-x-4">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-gradient-to-r from-green-500 to-blue-500 text-white py-3 px-6 rounded-lg font-semibold hover:from-green-600 hover:to-blue-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 disabled:opacity-50"
            >
              {loading ? 'Submitting...' : 'Submit Assistance Request'}
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

export default CommunitySurakshaForm;