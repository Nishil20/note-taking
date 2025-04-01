import { useState } from 'react'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import { NoteProvider } from './contexts/NoteContext'
import AuthPage from './components/auth/AuthPage'
import { Button } from './components/ui/button'
import AppContent from './components/AppContent'

function App() {
  return (
    <AuthProvider>
      <NoteProvider>
        <AppContent />
      </NoteProvider>
    </AuthProvider>
  )
}

export default App
