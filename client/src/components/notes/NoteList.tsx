import * as React from "react"
import { Search } from "lucide-react"
import { Input } from "../ui/input"
import { useNotes } from "../../contexts/NoteContext"

type SortOption = "title" | "updatedAt" | "createdAt"

export function NoteList() {
  const { notes, selectedNote, setSelectedNote } = useNotes()
  const [searchQuery, setSearchQuery] = React.useState("")
  const [sortBy, setSortBy] = React.useState<SortOption>("updatedAt")

  // Filter and sort notes
  const filteredAndSortedNotes = React.useMemo(() => {
    return notes
      .filter(note =>
        note.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .sort((a, b) => {
        switch (sortBy) {
          case "title":
            return a.title.localeCompare(b.title)
          case "updatedAt":
            return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
          case "createdAt":
            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          default:
            return 0
        }
      })
  }, [notes, searchQuery, sortBy])

  // Ensure selected note is still in filtered list
  React.useEffect(() => {
    if (selectedNote && !filteredAndSortedNotes.some(note => note._id === selectedNote._id)) {
      setSelectedNote(null)
    }
  }, [filteredAndSortedNotes, selectedNote, setSelectedNote])

  const handleNoteSelect = (note: typeof notes[0]) => {
    setSelectedNote(note)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search notes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8"
          />
        </div>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as SortOption)}
          className="h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          <option value="updatedAt">Last Updated</option>
          <option value="createdAt">Created Date</option>
          <option value="title">Title</option>
        </select>
      </div>

      <div className="space-y-2">
        {filteredAndSortedNotes.length === 0 ? (
          <p className="text-center text-sm text-muted-foreground">
            {notes.length === 0
              ? "No notes yet. Create your first note!"
              : "No notes found matching your search."}
          </p>
        ) : (
          filteredAndSortedNotes.map((note) => (
            <button
              key={note._id}
              onClick={() => handleNoteSelect(note)}
              className={`w-full rounded-lg border p-3 text-left transition-colors hover:bg-accent ${
                selectedNote?._id === note._id ? "bg-accent" : ""
              }`}
            >
              <h3 className="font-medium line-clamp-1">{note.title}</h3>
              <p className="text-sm text-muted-foreground">
                {new Date(note.updatedAt).toLocaleDateString()}
              </p>
            </button>
          ))
        )}
      </div>
    </div>
  )
} 