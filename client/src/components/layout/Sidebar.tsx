import * as React from "react"
import { Button } from "../ui/button"
import { ThemeToggle } from "../ui/theme-toggle"
import { useAuth } from "../../contexts/AuthContext"
import { Plus, LogOut } from "lucide-react"
import { NoteList } from "../notes/NoteList"
import { useNotes } from "../../contexts/NoteContext"
import { CreateNoteDialog } from "../notes/CreateNoteDialog"

export function Sidebar() {
  const { user, logout } = useAuth()
  const { setSelectedNote, notes } = useNotes()
  const [isDialogOpen, setIsDialogOpen] = React.useState(false)

  return (
    <div className="flex h-full flex-col">
      {/* App title and new note button */}
      <div className="border-b p-4">
        <h1 className="text-2xl font-bold text-primary mb-4">NoteTaker</h1>
        <Button 
          className="w-full justify-start" 
          variant="secondary"
          onClick={() => setIsDialogOpen(true)}
        >
          <Plus className="mr-2 h-4 w-4" />
          New Note
        </Button>
      </div>

      {/* Navigation section */}
      <nav className="flex-1 overflow-auto p-4">
        <NoteList />
      </nav>

      {/* User section */}
      <div className="border-t p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex flex-col">
            <span className="font-medium text-sm">{user?.username}</span>
            <span className="text-xs text-muted-foreground">{user?.email}</span>
          </div>
          <ThemeToggle />
        </div>
        <Button 
          variant="outline" 
          className="w-full justify-start" 
          onClick={logout}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </div>

      <CreateNoteDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onNoteCreated={(noteId) => {
          setIsDialogOpen(false);
          const note = notes.find(n => n._id === noteId);
          if (note) {
            setSelectedNote(note);
          }
        }}
      />
    </div>
  )
} 