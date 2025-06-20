import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface PrivateRouteProps {
  children: React.ReactNode;
  requireApproval?: boolean;
  adminOnly?: boolean;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ 
  children, 
  requireApproval = false, 
  adminOnly = false 
}) => {
  const { currentUser, isApproved, userRole } = useAuth();

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  if (adminOnly && userRole !== 'Admin') {
    return <Navigate to="/dashboard" />;
  }

  if (requireApproval && !isApproved && userRole !== 'Admin') {
    return <Navigate to="/pending-approval" />;
  }

  // For volunteers who are not approved, redirect to pending approval
  if (userRole === 'Volunteer' && !isApproved) {
    return <Navigate to="/pending-approval" />;
  }

  return <>{children}</>;
};

export default PrivateRoute;