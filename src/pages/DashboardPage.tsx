import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import VolunteerDashboard from '../components/VolunteerDashboard';
import DonorDashboard from '../components/DonorDashboard';
import AdminDashboard from '../components/AdminDashboard';
import CommunityDashboard from '../components/CommunityDashboard';

const DashboardPage: React.FC = () => {
  const { userRole } = useAuth();

  if (userRole === 'Admin') {
    return <AdminDashboard />;
  } else if (userRole === 'Volunteer') {
    return <VolunteerDashboard />;
  } else if (userRole === 'Community Support') {
    return <CommunityDashboard />;
  } else {
    return <DonorDashboard />;
  }
};

export default DashboardPage;