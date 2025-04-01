import { AuthProvider } from './contexts/AuthContext'
import { NoteProvider } from './contexts/NoteContext'
import { ThemeProvider } from './components/theme-provider'
import AppContent from './components/AppContent'

function App() {
  return (
    <AuthProvider>
      <ThemeProvider defaultTheme="light" storageKey="note-app-theme">
        <NoteProvider>
          <AppContent />
        </NoteProvider>
      </ThemeProvider>
    </AuthProvider>
  )
}

export default App
