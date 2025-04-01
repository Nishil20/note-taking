import React from 'react';
import { useNotes } from '../../contexts/NoteContext';
import { NoteEditor } from './NoteEditor';
import { Input } from '../ui/input';
import { Skeleton } from '../ui/skeleton';
import { Button } from '../ui/button';
import { Trash2, Plus } from 'lucide-react';

const NotesPage: React.FC = () => {
  const { selectedNote, setSelectedNote, updateNote, deleteNote, createNote, isLoading } = useNotes();
  const [title, setTitle] = React.useState(selectedNote?.title || '');
  const [content, setContent] = React.useState(selectedNote?.content || '');
  const [isDeleting, setIsDeleting] = React.useState(false);

  // Update local state when selected note changes
  React.useEffect(() => {
    if (selectedNote) {
      setTitle(selectedNote.title);
      setContent(selectedNote.content);
    }
  }, [selectedNote]);

  // Debounce updates to avoid too many API calls
  const debouncedUpdate = React.useCallback(async (title: string, content: string) => {
    if (selectedNote) {
      // Update existing note
      updateNote(selectedNote._id, { title, content })
        .catch(error => {
          console.error('Failed to update note:', error);
          // Revert to the last known good state
          setTitle(selectedNote.title);
          setContent(selectedNote.content);
        });
    } else if (title.trim() || content.trim()) {
      // Create new note if there's content but no selected note
      try {
        const newNote = await createNote({ 
          title: title.trim() || 'Untitled Note', 
          content: content.trim() || 'Start writing your note here...' 
        });
        setSelectedNote(newNote);
      } catch (error) {
        console.error('Failed to create note:', error);
      }
    }
  }, [selectedNote, updateNote, createNote, setSelectedNote]);

  // Handle title changes
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
    debouncedUpdate(newTitle, content);
  };

  // Handle content changes
  const handleContentChange = (newContent: string) => {
    setContent(newContent);
    debouncedUpdate(title, newContent);
  };

  const handleDelete = async () => {
    if (!selectedNote || isDeleting) return;
    
    if (!window.confirm('Are you sure you want to delete this note? This action cannot be undone.')) {
      return;
    }

    setIsDeleting(true);
    try {
      await deleteNote(selectedNote._id);
      setSelectedNote(null);
      setTitle('');
      setContent('');
    } catch (error) {
      console.error('Failed to delete note:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleNewNote = () => {
    setSelectedNote(null);
    setTitle('');
    setContent('');
  };

  if (isLoading) {
    return (
      <div className="h-full">
        <div className="mb-6">
          <Skeleton className="h-12 w-3/4 mb-2" />
          <Skeleton className="h-5 w-1/2" />
        </div>
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-4">
          <div className="flex items-center gap-1 border-b pb-2">
            {Array(6).fill(0).map((_, i) => (
              <Skeleton key={i} className="h-8 w-8" />
            ))}
          </div>
          <div className="mt-4 space-y-4">
            {Array(3).fill(0).map((_, i) => (
              <Skeleton key={i} className="h-6 w-full" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <Input
            type="text"
            value={title}
            onChange={handleTitleChange}
            placeholder="Note title"
            className="text-3xl font-bold tracking-tight border-0 px-0 h-auto text-4xl bg-transparent focus-visible:ring-0"
          />
          <div className="flex gap-2">
            {!selectedNote && (
              <Button
                variant="secondary"
                size="sm"
                onClick={handleNewNote}
                className="ml-4"
              >
                <Plus className="h-4 w-4 mr-2" />
                New Note
              </Button>
            )}
            {selectedNote && (
              <Button
                variant="destructive"
                size="sm"
                onClick={handleDelete}
                disabled={isDeleting}
                className="ml-4"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                {isDeleting ? 'Deleting...' : 'Delete'}
              </Button>
            )}
          </div>
        </div>
        <p className="text-muted-foreground">
          {selectedNote 
            ? `Last updated ${new Date(selectedNote.updatedAt).toLocaleDateString()}`
            : 'Start typing to create a new note'}
        </p>
      </div>

      <NoteEditor
        content={content}
        onChange={handleContentChange}
        className="rounded-lg border bg-card text-card-foreground shadow-sm p-4"
      />
    </div>
  );
};

export default NotesPage; 