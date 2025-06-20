import React, { useState, useEffect } from 'react';
import { 
  Clock, 
  CheckCircle, 
  Package, 
  Truck, 
  Users, 
  MapPin,
  Calendar,
  Phone,
  History
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const VolunteerDashboard: React.FC = () => {
  const { currentUser } = useAuth();
  const [activeTab, setActiveTab] = useState('pending');
  const [requests, setRequests] = useState({
    pending: [],
    assigned: [],
    picked: [],
    delivered: []
  });

  // Mock data for demonstration
  useEffect(() => {
    // In a real app, this would fetch from Firestore
    setRequests({
      pending: [
        {
          id: '1',
          type: 'Annamitra Seva',
          donor: 'John Doe',
          location: 'Vijayawada',
          address: 'MG Road, Near City Center',
          items: 'Rice, Dal, Vegetables (5 servings)',
          phone: '+91 9876543210',
          createdAt: new Date('2024-01-15'),
          urgency: 'high'
        },
        {
          id: '2',
          type: 'Vidya Jyothi',
          donor: 'Jane Smith',
          location: 'Vijayawada',
          address: 'Governorpet, Opposite School',
          items: 'School fees for 2 children - ₹5000',
          phone: '+91 9876543211',
          createdAt: new Date('2024-01-14'),
          urgency: 'medium'
        }
      ],
      assigned: [
        {
          id: '3',
          type: 'Suraksha Setu',
          donor: 'Mary Johnson',
          location: 'Vijayawada',
          address: 'Patamata, Near Temple',
          items: 'Clothes, Blankets, Wheelchairs',
          phone: '+91 9876543212',
          createdAt: new Date('2024-01-13'),
          urgency: 'low'
        }
      ],
      picked: [
        {
          id: '4',
          type: 'PunarAsha',
          donor: 'Robert Wilson',
          location: 'Vijayawada',
          address: 'Benz Circle, Apartment 3B',
          items: 'Books, Electronics, Clothes',
          phone: '+91 9876543213',
          createdAt: new Date('2024-01-12'),
          urgency: 'medium'
        }
      ],
      delivered: [
        {
          id: '5',
          type: 'Annamitra Seva',
          donor: 'Sarah Davis',
          location: 'Vijayawada',
          address: 'Labbipet, Main Road',
          items: 'Cooked meals for 15 people',
          phone: '+91 9876543214',
          createdAt: new Date('2024-01-11'),
          urgency: 'high'
        },
        {
          id: '6',
          type: 'Jyothi Nilayam',
          donor: 'Michael Brown',
          location: 'Vijayawada',
          address: 'Kanuru, Near Bus Stand',
          items: 'Shelter construction contribution - ₹25000',
          phone: '+91 9876543215',
          createdAt: new Date('2024-01-10'),
          urgency: 'low'
        }
      ]
    });
  }, []);

  const handleStatusChange = (requestId: string, fromStatus: string, toStatus: string) => {
    setRequests(prev => {
      const request = prev[fromStatus as keyof typeof prev].find((r: any) => r.id === requestId);
      if (!request) return prev;

      return {
        ...prev,
        [fromStatus]: prev[fromStatus as keyof typeof prev].filter((r: any) => r.id !== requestId),
        [toStatus]: [...prev[toStatus as keyof typeof prev], request]
      };
    });
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const tabs = [
    { id: 'pending', label: 'Pending', icon: Clock, count: requests.pending.length },
    { id: 'assigned', label: 'Assigned', icon: Users, count: requests.assigned.length },
    { id: 'picked', label: 'Picked Up', icon: Package, count: requests.picked.length },
    { id: 'delivered', label: 'Delivered', icon: CheckCircle, count: requests.delivered.length },
    { id: 'history', label: 'History', icon: History, count: requests.delivered.length }
  ];

  const renderRequestCard = (request: any, status: string) => (
    <div key={request.id} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="flex items-center space-x-3 mb-2">
            <h3 className="text-lg font-bold text-gray-900">{request.type}</h3>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getUrgencyColor(request.urgency)}`}>
              {request.urgency}
            </span>
          </div>
          <p className="text-gray-600 font-medium">{request.donor}</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-500">
            {request.createdAt.toLocaleDateString()}
          </p>
        </div>
      </div>

      <div className="space-y-3 mb-4">
        <div className="flex items-center text-gray-600">
          <MapPin className="w-4 h-4 mr-2" />
          <span className="text-sm">{request.location} - {request.address}</span>
        </div>
        <div className="flex items-center text-gray-600">
          <Phone className="w-4 h-4 mr-2" />
          <span className="text-sm">{request.phone}</span>
        </div>
        <div className="bg-gray-50 rounded-lg p-3">
          <p className="text-sm text-gray-700">
            <strong>Items:</strong> {request.items}
          </p>
        </div>
      </div>

      <div className="flex space-x-2">
        {status === 'pending' && (
          <button
            onClick={() => handleStatusChange(request.id, 'pending', 'assigned')}
            className="bg-[#EAA640] text-white px-4 py-2 rounded-lg hover:bg-[#d4952e] transition-colors font-medium"
          >
            Accept Request
          </button>
        )}
        {status === 'assigned' && (
          <button
            onClick={() => handleStatusChange(request.id, 'assigned', 'picked')}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors font-medium"
          >
            Mark as Picked Up
          </button>
        )}
        {status === 'picked' && (
          <button
            onClick={() => handleStatusChange(request.id, 'picked', 'delivered')}
            className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors font-medium"
          >
            Mark as Delivered
          </button>
        )}
        {status === 'delivered' && (
          <div className="bg-green-100 text-green-800 px-4 py-2 rounded-lg font-medium">
            ✓ Completed
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#EBE7E1] via-white to-[#EAA640]/20">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Volunteer Dashboard</h1>
              <p className="text-gray-600 mt-2">Manage your volunteer activities and requests</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm text-gray-500">Total Deliveries</p>
                <p className="text-2xl font-bold text-[#EAA640]">{requests.delivered.length}</p>
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
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                    activeTab === tab.id
                      ? 'border-[#EAA640] text-[#EAA640]'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                  {tab.count > 0 && (
                    <span className="bg-[#EAA640] text-white text-xs rounded-full px-2 py-1">
                      {tab.count}
                    </span>
                  )}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-6">
          {activeTab === 'history' ? (
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Delivery History</h2>
              {requests.delivered.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {requests.delivered.map((request: any) => 
                    renderRequestCard(request, 'delivered')
                  )}
                </div>
              ) : (
                <div className="text-center py-8">
                  <History className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No delivery history yet</h3>
                  <p className="text-gray-500">Your completed deliveries will appear here.</p>
                </div>
              )}
            </div>
          ) : requests[activeTab as keyof typeof requests].length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {requests[activeTab as keyof typeof requests].map((request: any) => 
                renderRequestCard(request, activeTab)
              )}
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-lg p-12 text-center">
              <div className="text-gray-400 mb-4">
                {activeTab === 'pending' && <Clock className="w-16 h-16 mx-auto" />}
                {activeTab === 'assigned' && <Users className="w-16 h-16 mx-auto" />}
                {activeTab === 'picked' && <Package className="w-16 h-16 mx-auto" />}
                {activeTab === 'delivered' && <CheckCircle className="w-16 h-16 mx-auto" />}
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No {activeTab} requests
              </h3>
              <p className="text-gray-500">
                {activeTab === 'pending' && 'New donation requests will appear here'}
                {activeTab === 'assigned' && 'Requests you\'ve accepted will appear here'}
                {activeTab === 'picked' && 'Items you\'ve picked up will appear here'}
                {activeTab === 'delivered' && 'Completed deliveries will appear here'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VolunteerDashboard;