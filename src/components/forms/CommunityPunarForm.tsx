import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RefreshCw, MapPin, Package } from 'lucide-react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { useAuth } from '../../contexts/AuthContext';

const CommunityPunarForm: React.FC = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [formData, setFormData] = useState({
    location: '',
    itemType: [] as string[],
    description: ''
  });
  const [loading, setLoading] = useState(false);

  const cities = [
    'Vijayawada', 'Guntur', 'Vizag', 'Nellore', 'Kurnool',
    'Tirupati', 'Rajahmundry', 'Eluru', 'Anantapur', 'Ongole'
  ];

  const itemTypes = [
    'Clothes', 'Shoes', 'Books', 'Electronics', 'Furniture', 
    'Household Items', 'Toys', 'Sports Equipment'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;

    setLoading(true);
    try {
      await addDoc(collection(db, 'community_punar'), {
        location: formData.location,
        itemType: formData.itemType,
        description: formData.description,
        submittedBy: currentUser.uid,
        submitterEmail: currentUser.email,
        status: 'pending',
        createdAt: new Date()
      });

      alert('Recyclable items request submitted successfully! Donors will be notified.');
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

  const handleItemTypeChange = (itemType: string) => {
    setFormData(prev => ({
      ...prev,
      itemType: prev.itemType.includes(itemType)
        ? prev.itemType.filter(type => type !== itemType)
        : [...prev.itemType, itemType]
    }));
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-500 to-cyan-500 px-8 py-6">
          <div className="flex items-center">
            <div className="bg-white rounded-full p-3 mr-4">
              <RefreshCw className="w-8 h-8 text-emerald-500" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Community Report - PunarAsha</h1>
              <p className="text-emerald-100">Report Needs for Recyclable Items</p>
            </div>
          </div>
        </div>

        {/* Info Section */}
        <div className="bg-emerald-50 border-l-4 border-emerald-500 p-4 m-8 mb-0">
          <div className="flex">
            <RefreshCw className="w-5 h-5 text-emerald-500 mr-2 mt-0.5" />
            <div>
              <h3 className="text-sm font-medium text-emerald-800">Recyclable Items Request</h3>
              <p className="text-sm text-emerald-700 mt-1">
                Report people or organizations who need usable items that others might consider waste. This helps connect those who have surplus items with those who need them.
              </p>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
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
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
            >
              <option value="">Select location</option>
              {cities.map(city => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Package className="inline w-4 h-4 mr-2" />
              Type of Items Needed (Select all that apply)
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {itemTypes.map(type => (
                <label key={type} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.itemType.includes(type)}
                    onChange={() => handleItemTypeChange(type)}
                    className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
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
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
              placeholder="Describe who needs these items and why (e.g., 'Orphanage needs old clothes for children', 'Poor family needs household items after flood')"
            />
          </div>

          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <p className="text-sm text-green-800">
              <strong>♻️ Impact:</strong> Your report will help reduce waste by connecting people who have surplus items with those who need them. 
              This promotes sustainability while helping those in need.
            </p>
          </div>

          <div className="flex space-x-4">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white py-3 px-6 rounded-lg font-semibold hover:from-emerald-600 hover:to-cyan-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 disabled:opacity-50"
            >
              {loading ? 'Submitting...' : 'Submit Items Request'}
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

export default CommunityPunarForm;