import React, { useState, useEffect } from 'react';
import { Users, CheckCircle, XCircle, Eye, Clock } from 'lucide-react';
import { collection, query, where, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase/config';

interface VolunteerRequest {
  id: string;
  uid: string;
  firstName: string;
  email: string;
  education: string;
  location: string;
  createdAt: any;
  status: string;
  approved: boolean;
}

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('volunteers');
  const [volunteerRequests, setVolunteerRequests] = useState<VolunteerRequest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchVolunteerRequests();
  }, []);

  const fetchVolunteerRequests = async () => {
    try {
      const q = query(collection(db, 'volunteer_requests'));
      const querySnapshot = await getDocs(q);
      const requests: VolunteerRequest[] = [];
      
      querySnapshot.forEach((doc) => {
        requests.push({
          id: doc.id,
          ...doc.data()
        } as VolunteerRequest);
      });
      
      setVolunteerRequests(requests);
    } catch (error) {
      console.error('Error fetching volunteer requests:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleApproveVolunteer = async (request: VolunteerRequest) => {
    try {
      // Update volunteer request status
      await updateDoc(doc(db, 'volunteer_requests', request.id), {
        status: 'approved',
        approved: true,
        approvedAt: new Date()
      });

      // Create user record in users collection
      await updateDoc(doc(db, 'users', request.uid), {
        email: request.email,
        firstName: request.firstName,
        userType: 'Volunteer',
        education: request.education,
        location: request.location,
        approved: true,
        createdAt: request.createdAt
      });

      // Update local state
      setVolunteerRequests(prev =>
        prev.map(req =>
          req.id === request.id ? { ...req, status: 'approved', approved: true } : req
        )
      );

      alert('Volunteer approved successfully!');
    } catch (error) {
      console.error('Error approving volunteer:', error);
      alert('Failed to approve volunteer. Please try again.');
    }
  };

  const handleRejectVolunteer = async (id: string) => {
    try {
      await updateDoc(doc(db, 'volunteer_requests', id), {
        status: 'rejected',
        approved: false,
        rejectedAt: new Date()
      });

      setVolunteerRequests(prev =>
        prev.map(request =>
          request.id === id ? { ...request, status: 'rejected', approved: false } : request
        )
      );

      alert('Volunteer request rejected.');
    } catch (error) {
      console.error('Error rejecting volunteer:', error);
      alert('Failed to reject volunteer. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#EBE7E1] via-white to-[#EAA640]/20 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#EAA640] mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  const pendingRequests = volunteerRequests.filter(r => r.status === 'pending');
  const approvedRequests = volunteerRequests.filter(r => r.status === 'approved');
  const rejectedRequests = volunteerRequests.filter(r => r.status === 'rejected');

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#EBE7E1] via-white to-[#EAA640]/20">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-gray-600 mt-2">Manage volunteers and platform operations</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm text-gray-500">Pending Approvals</p>
                <p className="text-2xl font-bold text-[#EAA640]">{pendingRequests.length}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center">
              <div className="bg-[#EAA640] rounded-full p-3">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Pending Requests</p>
                <p className="text-2xl font-bold text-gray-900">{pendingRequests.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center">
              <div className="bg-green-500 rounded-full p-3">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Approved Volunteers</p>
                <p className="text-2xl font-bold text-gray-900">{approvedRequests.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center">
              <div className="bg-red-500 rounded-full p-3">
                <XCircle className="w-6 h-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Rejected Requests</p>
                <p className="text-2xl font-bold text-gray-900">{rejectedRequests.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center">
              <div className="bg-[#EAA640] rounded-full p-3">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Total Requests</p>
                <p className="text-2xl font-bold text-gray-900">{volunteerRequests.length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Volunteer Requests */}
        <div className="bg-white rounded-xl shadow-lg">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900">Volunteer Requests</h2>
          </div>
          <div className="p-6">
            {pendingRequests.length > 0 ? (
              <div className="space-y-4">
                {pendingRequests.map((request) => (
                  <div key={request.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-4 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900">{request.firstName}</h3>
                          <span className="bg-[#EAA640] text-white px-2 py-1 rounded-full text-xs font-medium">
                            Pending
                          </span>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                          <div>
                            <strong>Email:</strong> {request.email}
                          </div>
                          <div>
                            <strong>Education:</strong> {request.education}
                          </div>
                          <div>
                            <strong>Location:</strong> {request.location}
                          </div>
                        </div>
                        <div className="mt-2 text-sm text-gray-500">
                          Applied on: {request.createdAt?.toDate?.()?.toLocaleDateString() || 'Unknown'}
                        </div>
                      </div>
                      <div className="flex space-x-2 ml-4">
                        <button
                          onClick={() => handleApproveVolunteer(request)}
                          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors font-medium"
                        >
                          <CheckCircle className="w-4 h-4 mr-2 inline" />
                          Approve
                        </button>
                        <button
                          onClick={() => handleRejectVolunteer(request.id)}
                          className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors font-medium"
                        >
                          <XCircle className="w-4 h-4 mr-2 inline" />
                          Reject
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No pending requests</h3>
                <p className="text-gray-500">All volunteer requests have been processed.</p>
              </div>
            )}
          </div>
        </div>

        {/* Approved Volunteers */}
        {approvedRequests.length > 0 && (
          <div className="bg-white rounded-xl shadow-lg mt-8">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">Approved Volunteers</h2>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {approvedRequests.map((volunteer) => (
                  <div key={volunteer.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{volunteer.firstName}</h3>
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                        Active
                      </span>
                    </div>
                    <div className="space-y-1 text-sm text-gray-600">
                      <div><strong>Email:</strong> {volunteer.email}</div>
                      <div><strong>Education:</strong> {volunteer.education}</div>
                      <div><strong>Location:</strong> {volunteer.location}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;