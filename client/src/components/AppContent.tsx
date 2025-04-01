import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import AuthPage from './auth/AuthPage';
import NotesPage from './notes/NotesPage';
import { Button } from './ui/button';

const AppContent: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();

  if (!isAuthenticated) {
    return <AuthPage />;
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-primary">NoteTaker</h1>
          <div className="flex items-center gap-4">
            <span className="text-muted-foreground">
              Welcome, {user?.username}
            </span>
            <Button variant="outline" onClick={logout}>
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main>
        <NotesPage />
      </main>
    </div>
  );
};

export default AppContent; 