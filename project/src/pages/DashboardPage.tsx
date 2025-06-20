import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import VolunteerDashboard from '../components/VolunteerDashboard';
import DonorDashboard from '../components/DonorDashboard';
import AdminDashboard from '../components/AdminDashboard';

const DashboardPage: React.FC = () => {
  const { userRole } = useAuth();

  if (userRole === 'Admin') {
    return <AdminDashboard />;
  } else if (userRole === 'Volunteer') {
    return <VolunteerDashboard />;
  } else {
    return <DonorDashboard />;
  }
};

export default DashboardPage;