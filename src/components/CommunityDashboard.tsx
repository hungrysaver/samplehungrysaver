import React, { useState, useEffect } from 'react';
import { Plus, Users, MapPin, Clock, History, AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import { db } from '../firebase/config';
import { useAuth } from '../contexts/AuthContext';

const CommunityDashboard: React.FC = () => {
  const { currentUser } = useAuth();
  const [activeTab, setActiveTab] = useState('modules');
  const [submissions, setSubmissions] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const modules = [
    {
      id: 'annamitra-seva',
      title: 'Annamitra Seva',
      description: 'Report hunger/poor people in your locality',
      icon: '🍛',
      gradient: 'from-[#EAA640] to-[#d4952e]',
      count: '0 reports'
    },
    {
      id: 'vidya-jyothi',
      title: 'Vidya Jyothi',
      description: 'Report students needing education support',
      icon: '📚',
      gradient: 'from-[#EAA640] to-[#d4952e]',
      count: '0 reports'
    },
    {
      id: 'suraksha-setu',
      title: 'Suraksha Setu',
      description: 'Report disability assistance needs',
      icon: '🤝',
      gradient: 'from-[#EAA640] to-[#d4952e]',
      count: '0 reports'
    },
    {
      id: 'punar-asha',
      title: 'PunarAsha',
      description: 'Report needs for recyclable items',
      icon: '🔄',
      gradient: 'from-[#EAA640] to-[#d4952e]',
      count: '0 reports'
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
      description: 'Report homeless people needing shelter',
      icon: '🏠',
      gradient: 'from-[#EAA640] to-[#d4952e]',
      count: '0 reports'
    }
  ];

  useEffect(() => {
    if (activeTab === 'history') {
      fetchSubmissions();
    }
  }, [activeTab, currentUser]);

  const fetchSubmissions = async () => {
    if (!currentUser) return;
    
    setLoading(true);
    try {
      const collections = [
        'community_annamitra',
        'community_vidya',
        'community_suraksha',
        'community_punar',
        'community_raksha',
        'community_jyothi'
      ];

      const allSubmissions: any[] = [];

      for (const collectionName of collections) {
        const q = query(
          collection(db, collectionName),
          where('submittedBy', '==', currentUser.uid),
          orderBy('createdAt', 'desc')
        );
        
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          allSubmissions.push({
            id: doc.id,
            type: collectionName.replace('community_', ''),
            ...doc.data()
          });
        });
      }

      // Sort by creation date
      allSubmissions.sort((a, b) => b.createdAt?.toDate() - a.createdAt?.toDate());
      setSubmissions(allSubmissions);
    } catch (error) {
      console.error('Error fetching submissions:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'resolved': return 'bg-green-100 text-green-800';
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getModuleTitle = (type: string) => {
    const moduleMap: { [key: string]: string } = {
      'annamitra': 'Annamitra Seva',
      'vidya': 'Vidya Jyothi',
      'suraksha': 'Suraksha Setu',
      'punar': 'PunarAsha',
      'raksha': 'Raksha Jyothi',
      'jyothi': 'Jyothi Nilayam'
    };
    return moduleMap[type] || type;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#EBE7E1] via-white to-[#EAA640]/20">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Community Support Dashboard</h1>
              <p className="text-gray-600 mt-2">Report community needs and track your submissions</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm text-gray-500">Total Reports</p>
                <p className="text-2xl font-bold text-[#EAA640]">{submissions.length}</p>
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
                <span>Report Modules</span>
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
                <span>My Reports</span>
                {submissions.length > 0 && (
                  <span className="bg-[#EAA640] text-white text-xs rounded-full px-2 py-1">
                    {submissions.length}
                  </span>
                )}
              </button>
            </nav>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center">
              <div className="bg-[#EAA640] rounded-full p-3">
                <AlertTriangle className="w-6 h-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Total Reports</p>
                <p className="text-2xl font-bold text-gray-900">{submissions.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center">
              <div className="bg-yellow-500 rounded-full p-3">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Pending</p>
                <p className="text-2xl font-bold text-gray-900">
                  {submissions.filter(s => s.status === 'pending' || !s.status).length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center">
              <div className="bg-green-500 rounded-full p-3">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Community Impact</p>
                <p className="text-2xl font-bold text-gray-900">High</p>
              </div>
            </div>
          </div>
        </div>

        {/* Content based on active tab */}
        {activeTab === 'modules' && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Report Community Needs</h2>
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
                      to={`/community-report/${module.id}`}
                      className={`inline-flex items-center bg-gradient-to-r ${module.gradient} text-white px-4 py-2 rounded-lg font-semibold hover:shadow-lg transition-all duration-300`}
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Submit Report
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'history' && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">My Community Reports</h2>
            {loading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#EAA640] mx-auto"></div>
                <p className="mt-4 text-gray-600">Loading reports...</p>
              </div>
            ) : submissions.length > 0 ? (
              <div className="space-y-4">
                {submissions.map((submission) => (
                  <div key={submission.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">{getModuleTitle(submission.type)}</h3>
                          <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                            <div className="flex items-center">
                              <MapPin className="w-4 h-4 mr-1" />
                              {submission.location}
                            </div>
                            <div className="flex items-center">
                              <Clock className="w-4 h-4 mr-1" />
                              {submission.createdAt?.toDate?.()?.toLocaleDateString() || 'Unknown'}
                            </div>
                          </div>
                          {submission.description && (
                            <p className="text-gray-600 mt-2">{submission.description}</p>
                          )}
                        </div>
                      </div>
                      <div className="flex flex-col items-end space-y-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(submission.status || 'pending')}`}>
                          {submission.status || 'Pending'}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <History className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No reports submitted yet</h3>
                <p className="text-gray-500">Your community reports will appear here once you start submitting them.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CommunityDashboard;