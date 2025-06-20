import React from 'react';
import { useParams } from 'react-router-dom';
import AnnamitraSevaForm from '../components/forms/AnnamitraSevaForm';
import VidyaJyothiForm from '../components/forms/VidyaJyothiForm';
import SurakshaSetuForm from '../components/forms/SurakshaSetuForm';
import PunarAshaForm from '../components/forms/PunarAshaForm';
import RakshaJyothiForm from '../components/forms/RakshaJyothiForm';
import JyothiNilayamForm from '../components/forms/JyothiNilayamForm';

const DonatePage: React.FC = () => {
  const { moduleId } = useParams<{ moduleId: string }>();

  const renderForm = () => {
    switch (moduleId) {
      case 'annamitra-seva':
        return <AnnamitraSevaForm />;
      case 'vidya-jyothi':
        return <VidyaJyothiForm />;
      case 'suraksha-setu':
        return <SurakshaSetuForm />;
      case 'punar-asha':
        return <PunarAshaForm />;
      case 'raksha-jyothi':
        return <RakshaJyothiForm />;
      case 'jyothi-nilayam':
        return <JyothiNilayamForm />;
      default:
        return <div>Module not found</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {renderForm()}
    </div>
  );
};

export default DonatePage;