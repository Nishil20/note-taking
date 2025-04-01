import { useState } from 'react'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import AuthPage from './components/auth/AuthPage'
import { Button } from './components/ui/button'

function AppContent() {
  const { user, isAuthenticated, logout } = useAuth()

  return (
    <div className="min-h-screen bg-background">
      {!isAuthenticated ? (
        <AuthPage />
      ) : (
        <div className="container mx-auto px-4 py-8">
          <header className="flex justify-between items-center mb-8 pb-4 border-b">
            <h1 className="text-3xl font-bold text-primary">NoteTaker</h1>
            <div className="flex items-center gap-4">
              <span className="text-muted-foreground">
                Welcome, {user?.username}
              </span>
              <Button variant="outline" onClick={logout}>Logout</Button>
            </div>
          </header>

          <main>
            <div className="p-8 text-center bg-card rounded-lg shadow-sm border">
              <h2 className="text-2xl font-semibold mb-4">Welcome to NoteTaker!</h2>
              <p className="mb-6 text-muted-foreground">
                You've successfully logged in. Notes functionality will be implemented in the next task.
              </p>
              <div className="flex justify-center space-x-4">
                <Button variant="default">Create Note</Button>
                <Button variant="secondary">View All Notes</Button>
              </div>
            </div>
          </main>
        </div>
      )}
    </div>
  )
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  )
}

export default App
