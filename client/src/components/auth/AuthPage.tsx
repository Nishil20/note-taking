import React, { useState } from 'react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import { ThemeToggle } from '../ui/theme-toggle';

type AuthMode = 'login' | 'register';

interface AuthPageProps {
  onAuthSuccess?: () => void;
}

const AuthPage: React.FC<AuthPageProps> = ({ onAuthSuccess }) => {
  const [mode, setMode] = useState<AuthMode>('login');

  const toggleMode = () => {
    setMode(mode === 'login' ? 'register' : 'login');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex justify-end mb-4">
            <ThemeToggle />
          </div>
          <h1 className="text-4xl font-bold text-primary">NoteTaker</h1>
          <p className="mt-2 text-muted-foreground">Your personal note-taking application</p>
        </div>

        {mode === 'login' ? (
          <LoginForm onSuccess={onAuthSuccess} onRegisterClick={toggleMode} />
        ) : (
          <RegisterForm onSuccess={onAuthSuccess} onLoginClick={toggleMode} />
        )}
      </div>
    </div>
  );
};

export default AuthPage; 