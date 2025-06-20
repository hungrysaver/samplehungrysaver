import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Heart, Users, TrendingUp, History, Clock } from 'lucide-react';

const DonorDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('modules');

  const modules = [
    {
      id: 'annamitra-seva',
      title: 'Annamitra Seva',
      description: 'Donate surplus food to feed the hungry',
      icon: '🍛',
      gradient: 'from-[#EAA640] to-[#d4952e]',
      count: '0 donations'
    },
    {
      id: 'vidya-jyothi',
      title: 'Vidya Jyothi',
      description: 'Support children\'s education',
      icon: '📚',
      gradient: 'from-[#EAA640] to-[#d4952e]',
      count: '0 donations'
    },
    {
      id: 'suraksha-setu',
      title: 'Suraksha Setu',
      description: 'Help orphanages and NGOs',
      icon: '🤝',
      gradient: 'from-[#EAA640] to-[#d4952e]',
      count: '0 donations'
    },
    {
      id: 'punar-asha',
      title: 'PunarAsha',
      description: 'Donate recyclable items',
      icon: '🔄',
      gradient: 'from-[#EAA640] to-[#d4952e]',
      count: '0 donations'
    },
    {
      id: 'raksha-jyothi',
      title: 'Raksha Jyothi',
      description: 'Report emergency situations',
      icon: '🚑',
      gradient: 'from-[#EAA640] to-[#d4952e]',
      count: '0 reports'
    },
    {
      id: 'jyothi-nilayam',
      title: 'Jyothi Nilayam',
      description: 'Contribute to shelter construction',
      icon: '🏠',
      gradient: 'from-[#EAA640] to-[#d4952e]',
      count: '0 contributions'
    }
  ];

  // Mock donation history data
  const donationHistory = [
    {
      id: 1,
      module: 'Annamitra Seva',
      description: 'Rice and vegetables for 10 people',
      status: 'Delivered',
      date: '2024-01-15',
      volunteer: 'John Doe',
      icon: '🍛'
    },
    {
      id: 2,
      module: 'Vidya Jyothi',
      description: 'School fees for 2 children - ₹5000',
      status: 'Picked',
      date: '2024-01-14',
      volunteer: 'Jane Smith',
      icon: '📚'
    },
    {
      id: 3,
      module: 'Suraksha Setu',
      description: 'Clothes and blankets',
      status: 'Assigned',
      date: '2024-01-13',
      volunteer: 'Mike Johnson',
      icon: '🤝'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Delivered': return 'bg-green-100 text-green-800';
      case 'Picked': return 'bg-blue-100 text-blue-800';
      case 'Assigned': return 'bg-yellow-100 text-yellow-800';
      case 'Pending': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#EBE7E1] via-white to-[#EAA640]/20">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Donor Dashboard</h1>
              <p className="text-gray-600 mt-2">Make a difference in your community</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm text-gray-500">Total Impact</p>
                <p className="text-2xl font-bold text-[#EAA640]">3</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-lg mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6" aria-label="Tabs">
              <button
                onClick={() => setActiveTab('modules')}
                className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                  activeTab === 'modules'
                    ? 'border-[#EAA640] text-[#EAA640]'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Plus className="w-4 h-4" />
                <span>Donation Modules</span>
              </button>
              <button
                onClick={() => setActiveTab('history')}
                className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                  activeTab === 'history'
                    ? 'border-[#EAA640] text-[#EAA640]'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <History className="w-4 h-4" />
                <span>History</span>
                <span className="bg-[#EAA640] text-white text-xs rounded-full px-2 py-1">
                  {donationHistory.length}
                </span>
              </button>
            </nav>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center">
              <div className="bg-[#EAA640] rounded-full p-3">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Total Donations</p>
                <p className="text-2xl font-bold text-gray-900">3</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center">
              <div className="bg-green-500 rounded-full p-3">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">People Helped</p>
                <p className="text-2xl font-bold text-gray-900">25</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center">
              <div className="bg-purple-500 rounded-full p-3">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Impact Score</p>
                <p className="text-2xl font-bold text-gray-900">85</p>
              </div>
            </div>
          </div>
        </div>

        {/* Content based on active tab */}
        {activeTab === 'modules' && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Donation Modules</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {modules.map((module) => (
                <div key={module.id} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
                  <div className={`h-2 bg-gradient-to-r ${module.gradient}`}></div>
                  <div className="p-6">
                    <div className="flex items-center mb-4">
                      <span className="text-3xl mr-3">{module.icon}</span>
                      <div>
                        <h3 className="text-lg font-bold text-gray-900">{module.title}</h3>
                        <p className="text-sm text-gray-500">{module.count}</p>
                      </div>
                    </div>
                    <p className="text-gray-600 mb-4">{module.description}</p>
                    <Link
                      to={`/donate/${module.id}`}
                      className={`inline-flex items-center bg-gradient-to-r ${module.gradient} text-white px-4 py-2 rounded-lg font-semibold hover:shadow-lg transition-all duration-300`}
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Donate Now
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'history' && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Donation History</h2>
            {donationHistory.length > 0 ? (
              <div className="space-y-4">
                {donationHistory.map((donation) => (
                  <div key={donation.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <span className="text-2xl">{donation.icon}</span>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">{donation.module}</h3>
                          <p className="text-gray-600">{donation.description}</p>
                          <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                            <span>Date: {donation.date}</span>
                            <span>Volunteer: {donation.volunteer}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col items-end space-y-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(donation.status)}`}>
                          {donation.status}
                        </span>
                        <Clock className="w-4 h-4 text-gray-400" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <History className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No donation history yet</h3>
                <p className="text-gray-500">Your donation history will appear here once you start contributing.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default DonorDashboard;