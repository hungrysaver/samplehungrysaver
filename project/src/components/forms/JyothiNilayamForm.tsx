import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, MapPin, DollarSign, Phone, User, Mail } from 'lucide-react';

const JyothiNilayamForm: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    donorName: '',
    phone: '',
    email: '',
    donationType: '',
    customAmount: '',
    selectedCity: '',
    specificAddress: '',
    shelterType: '',
    paymentMethod: '',
    additionalInfo: ''
  });

  const cities = [
    'Vijayawada', 'Guntur', 'Vizag', 'Nellore', 'Kurnool',
    'Tirupati', 'Rajahmundry', 'Eluru', 'Anantapur', 'Ongole'
  ];

  const donationTypes = [
    'Full Contribution (₹1,00,000)', 
    'Partial Contribution (Custom Amount)'
  ];

  const shelterTypes = [
    'For Humans', 'For Animals', 'For Both Humans & Animals'
  ];

  const paymentMethods = [
    'UPI', 'Bank Transfer', 'Cash', 'Online Payment', 'Cheque', 'Installments'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would save to Firestore
    console.log('Shelter contribution submitted:', formData);
    alert('Shelter contribution submitted successfully! Our team will contact you soon to coordinate the construction.');
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
        <div className="bg-gradient-to-r from-indigo-500 to-purple-500 px-8 py-6">
          <div className="flex items-center">
            <div className="bg-white rounded-full p-3 mr-4">
              <Home className="w-8 h-8 text-indigo-500" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Jyothi Nilayam</h1>
              <p className="text-indigo-100">A Roof of Dignity, A Home of Hope</p>
            </div>
          </div>
        </div>

        {/* Info Section */}
        <div className="bg-indigo-50 border-l-4 border-indigo-500 p-4 m-8 mb-0">
          <div className="flex">
            <Home className="w-5 h-5 text-indigo-500 mr-2 mt-0.5" />
            <div>
              <h3 className="text-sm font-medium text-indigo-800">Building Shelters for the Homeless</h3>
              <p className="text-sm text-indigo-700 mt-1">
                Your contribution will help build safe, dignified shelters for homeless individuals and rescued animals 
                across Andhra Pradesh. Every donation brings us closer to ensuring no one sleeps without a roof.
              </p>
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
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
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
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                placeholder="+91 XXXXXXXXXX"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Mail className="inline w-4 h-4 mr-2" />
              Email Address (Optional)
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
              placeholder="your.email@example.com"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <DollarSign className="inline w-4 h-4 mr-2" />
                Donation Type
              </label>
              <select
                name="donationType"
                value={formData.donationType}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
              >
                <option value="">Select donation type</option>
                {donationTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            {formData.donationType === 'Partial Contribution (Custom Amount)' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Custom Amount (₹)
                </label>
                <input
                  type="number"
                  name="customAmount"
                  value={formData.customAmount}
                  onChange={handleInputChange}
                  required
                  min="1000"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                  placeholder="Enter amount (minimum ₹1,000)"
                />
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <MapPin className="inline w-4 h-4 mr-2" />
                Select City for Shelter
              </label>
              <select
                name="selectedCity"
                value={formData.selectedCity}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
              >
                <option value="">Select city for shelter construction</option>
                {cities.map(city => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Shelter Type
              </label>
              <select
                name="shelterType"
                value={formData.shelterType}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
              >
                <option value="">Select shelter type</option>
                {shelterTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Your Address (Optional)
            </label>
            <input
              type="text"
              name="specificAddress"
              value={formData.specificAddress}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
              placeholder="Your address for correspondence"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Preferred Payment Method
            </label>
            <select
              name="paymentMethod"
              value={formData.paymentMethod}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
            >
              <option value="">Select payment method</option>
              {paymentMethods.map(method => (
                <option key={method} value={method}>{method}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Additional Information
            </label>
            <textarea
              name="additionalInfo"
              value={formData.additionalInfo}
              onChange={handleInputChange}
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
              placeholder="Any specific requirements, preferences for the shelter, or additional information..."
            />
          </div>

          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <p className="text-sm text-green-800">
              <strong>🏠 Impact:</strong> Your contribution will help provide safe shelter, basic amenities, and dignity to those who need it most. 
              We'll keep you updated on the construction progress and send photos once the shelter is completed.
            </p>
          </div>

          <div className="flex space-x-4">
            <button
              type="submit"
              className="flex-1 bg-gradient-to-r from-indigo-500 to-purple-500 text-white py-3 px-6 rounded-lg font-semibold hover:from-indigo-600 hover:to-purple-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Submit Shelter Contribution
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

export default JyothiNilayamForm;