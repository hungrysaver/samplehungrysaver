import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { User, Mail, Lock, MapPin, GraduationCap, Users } from 'lucide-react';

const RegisterPage: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    email: '',
    password: '',
    confirmPassword: '',
    userType: '',
    education: '',
    location: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const cities = [
    'Vijayawada', 'Guntur', 'Vizag', 'Nellore', 'Kurnool',
    'Tirupati', 'Rajahmundry', 'Eluru', 'Anantapur', 'Ongole'
  ];

  const educationOptions = [
    '10th', '12th', 'Diploma', 'ITI', 'B.Tech', 'B.Sc', 'B.Com', 'M.Tech', 'M.Sc', 'MBA'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    if (formData.userType === 'Volunteer' && (!formData.education || !formData.location)) {
      setError('Education and Location are required for volunteers');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await register(formData.email, formData.password, formData);
      if (formData.userType === 'Volunteer') {
        navigate('/pending-approval');
      } else {
        navigate('/dashboard');
      }
    } catch (error: any) {
      setError(error.message || 'Failed to create account');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#EBE7E1] via-white to-[#EAA640]/20 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Join Our Mission</h2>
          <p className="text-gray-600">Create your account to start making a difference</p>
        </div>

        <div className="bg-white shadow-2xl rounded-2xl p-8">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <User className="inline w-4 h-4 mr-2" />
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#EAA640] focus:border-[#EAA640] transition-colors"
                placeholder="Enter your first name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Mail className="inline w-4 h-4 mr-2" />
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#EAA640] focus:border-[#EAA640] transition-colors"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Lock className="inline w-4 h-4 mr-2" />
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#EAA640] focus:border-[#EAA640] transition-colors"
                placeholder="Create a password"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Lock className="inline w-4 h-4 mr-2" />
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#EAA640] focus:border-[#EAA640] transition-colors"
                placeholder="Confirm your password"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Users className="inline w-4 h-4 mr-2" />
                User Type
              </label>
              <select
                name="userType"
                value={formData.userType}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#EAA640] focus:border-[#EAA640] transition-colors"
              >
                <option value="">Select user type</option>
                <option value="Donor">Donor</option>
                <option value="Volunteer">Volunteer</option>
                <option value="Community Support">Community Support</option>
              </select>
            </div>

            {formData.userType === 'Volunteer' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <GraduationCap className="inline w-4 h-4 mr-2" />
                    Educational Qualification
                  </label>
                  <select
                    name="education"
                    value={formData.education}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#EAA640] focus:border-[#EAA640] transition-colors"
                  >
                    <option value="">Select education level</option>
                    {educationOptions.map(option => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </div>

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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#EAA640] focus:border-[#EAA640] transition-colors"
                  >
                    <option value="">Select your city</option>
                    {cities.map(city => (
                      <option key={city} value={city}>{city}</option>
                    ))}
                  </select>
                </div>
              </>
            )}

            {formData.userType === 'Community Support' && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-800">
                  <strong>Community Support:</strong> You'll be able to report community needs and problems to help connect those in need with donors and volunteers.
                </p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-[#EAA640] to-[#d4952e] text-white py-3 px-4 rounded-lg font-semibold hover:from-[#d4952e] hover:to-[#c08829] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="text-[#EAA640] hover:text-[#d4952e] font-semibold">
                Sign in here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;