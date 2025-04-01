import * as React from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { useNotes } from "../../contexts/NoteContext"

interface CreateNoteDialogProps {
  isOpen: boolean
  onClose: () => void
  onNoteCreated: (noteId: string) => void
}

export function CreateNoteDialog({ isOpen, onClose, onNoteCreated }: CreateNoteDialogProps) {
  const { createNote } = useNotes()
  const [title, setTitle] = React.useState("")
  const [isCreating, setIsCreating] = React.useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim() || isCreating) return

    setIsCreating(true)
    try {
      const newNote = await createNote({
        title: title.trim(),
        content: "Start writing your note here..."
      })
      onNoteCreated(newNote._id)
      onClose()
      setTitle("")
    } catch (error) {
      console.error("Failed to create note:", error)
    } finally {
      setIsCreating(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Create New Note</DialogTitle>
            <DialogDescription>
              Enter a title for your new note. You can start writing the content after creating it.
            </DialogDescription>
          </DialogHeader>

          <div className="py-4">
            <Input
              placeholder="Note title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full"
              autoFocus
            />
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isCreating}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={!title.trim() || isCreating}
            >
              {isCreating ? "Creating..." : "Create Note"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
} 