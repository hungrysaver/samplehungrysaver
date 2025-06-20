import React from 'react';
import { useParams } from 'react-router-dom';
import CommunityAnnamitraForm from '../components/forms/CommunityAnnamitraForm';
import CommunityVidyaForm from '../components/forms/CommunityVidyaForm';
import CommunityJyothiForm from '../components/forms/CommunityJyothiForm';
import CommunitySurakshaForm from '../components/forms/CommunitySurakshaForm';
import CommunityPunarForm from '../components/forms/CommunityPunarForm';
import CommunityRakshaForm from '../components/forms/CommunityRakshaForm';

const CommunityReportPage: React.FC = () => {
  const { moduleId } = useParams<{ moduleId: string }>();

  const renderForm = () => {
    switch (moduleId) {
      case 'annamitra-seva':
        return <CommunityAnnamitraForm />;
      case 'vidya-jyothi':
        return <CommunityVidyaForm />;
      case 'jyothi-nilayam':
        return <CommunityJyothiForm />;
      case 'suraksha-setu':
        return <CommunitySurakshaForm />;
      case 'punar-asha':
        return <CommunityPunarForm />;
      case 'raksha-jyothi':
        return <CommunityRakshaForm />;
      default:
        return (
          <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-red-50 flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-gray-900 mb-4">Module Not Found</h1>
              <p className="text-gray-600">The requested community report module could not be found.</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {renderForm()}
    </div>
  );
};

export default CommunityReportPage;