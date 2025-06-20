import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RefreshCw, MapPin, Package, Phone, User } from 'lucide-react';

const PunarAshaForm: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    donorName: '',
    phone: '',
    email: '',
    itemCategory: '',
    items: '',
    quantity: '',
    condition: '',
    location: '',
    specificAddress: '',
    description: ''
  });

  const cities = [
    'Vijayawada', 'Guntur', 'Vizag', 'Nellore', 'Kurnool',
    'Tirupati', 'Rajahmundry', 'Eluru', 'Anantapur', 'Ongole'
  ];

  const itemCategories = [
    'Clothes', 'Electronics', 'Books', 'Household Goods', 
    'Toys', 'Furniture', 'Appliances', 'Sports Equipment', 'Mixed Items'
  ];

  const conditions = [
    'Excellent', 'Good', 'Fair', 'Needs Minor Repair', 'For Parts Only'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would save to Firestore
    console.log('PunarAsha donation submitted:', formData);
    alert('Recyclable donation submitted successfully! Our volunteers will contact you soon.');
    navigate('/dashboard');
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
        <div className="bg-gradient-to-r from-emerald-500 to-cyan-500 px-8 py-6">
          <div className="flex items-center">
            <div className="bg-white rounded-full p-3 mr-4">
              <RefreshCw className="w-8 h-8 text-emerald-500" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">PunarAsha</h1>
              <p className="text-emerald-100">Giving Things a Second Life, Giving People a First Chance</p>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <User className="inline w-4 h-4 mr-2" />
                Donor Name
              </label>
              <input
                type="text"
                name="donorName"
                value={formData.donorName}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                placeholder="Enter your name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Phone className="inline w-4 h-4 mr-2" />
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                placeholder="+91 XXXXXXXXXX"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address (Optional)
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
              placeholder="your.email@example.com"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Package className="inline w-4 h-4 mr-2" />
                Item Category
              </label>
              <select
                name="itemCategory"
                value={formData.itemCategory}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
              >
                <option value="">Select item category</option>
                {itemCategories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Quantity/Count
              </label>
              <input
                type="text"
                name="quantity"
                value={formData.quantity}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                placeholder="e.g., 5 items, 2 bags"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Specific Items
            </label>
            <textarea
              name="items"
              value={formData.items}
              onChange={handleInputChange}
              required
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
              placeholder="List the specific items you want to donate (e.g., winter clothes, mobile phone, textbooks, etc.)"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Overall Condition
            </label>
            <select
              name="condition"
              value={formData.condition}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
            >
              <option value="">Select condition</option>
              {conditions.map(condition => (
                <option key={condition} value={condition}>{condition}</option>
              ))}
            </select>
          </div>

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
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
              >
                <option value="">Select your city</option>
                {cities.map(city => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Specific Address
              </label>
              <input
                type="text"
                name="specificAddress"
                value={formData.specificAddress}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                placeholder="Building name, street, landmark"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Additional Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
              placeholder="Any special instructions, pickup preferences, or additional details about the items..."
            />
          </div>

          <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
            <p className="text-sm text-emerald-800">
              <strong>💡 Remember:</strong> By donating these items, you're not just reducing waste - you're giving someone else the opportunity to benefit from things you no longer need. Every donation helps build a more sustainable and caring community.
            </p>
          </div>

          <div className="flex space-x-4">
            <button
              type="submit"
              className="flex-1 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white py-3 px-6 rounded-lg font-semibold hover:from-emerald-600 hover:to-cyan-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Submit Recyclable Donation
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

export default PunarAshaForm;