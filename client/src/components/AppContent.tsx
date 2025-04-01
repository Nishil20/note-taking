import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import AuthPage from './auth/AuthPage';
import NotesPage from './notes/NotesPage';
import { Layout } from './layout/Layout';
import { Sidebar } from './layout/Sidebar';

const AppContent: React.FC = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <AuthPage />;
  }

  return (
    <Layout sidebar={<Sidebar />}>
      <NotesPage />
    </Layout>
  );
};

export default AppContent; 