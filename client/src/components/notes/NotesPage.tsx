import React, { useState } from 'react';
import { useNotes } from '../../contexts/NoteContext';
import { Note, CreateNoteData } from '../../lib/services/noteService';
import { Button } from '../ui/button';
import NoteList from './NoteList';
import NoteForm from './NoteForm';

const NotesPage: React.FC = () => {
  const { createNote, updateNote } = useNotes();
  const [isCreating, setIsCreating] = useState(false);
  const [editingNote, setEditingNote] = useState<Note | null>(null);

  const handleCreateSubmit = async (data: CreateNoteData) => {
    await createNote(data);
    setIsCreating(false);
  };

  const handleEditSubmit = async (data: CreateNoteData) => {
    if (editingNote) {
      await updateNote(editingNote._id, data);
      setEditingNote(null);
    }
  };

  const handleCancel = () => {
    setIsCreating(false);
    setEditingNote(null);
  };

  const handleEditNote = (note: Note | null) => {
    if (note === null) {
      setIsCreating(true);
    } else {
      setEditingNote(note);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-primary">My Notes</h1>
        {!isCreating && !editingNote && (
          <Button onClick={() => setIsCreating(true)}>
            Create New Note
          </Button>
        )}
      </div>

      {isCreating ? (
        <div className="bg-card rounded-lg shadow-sm border p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Create New Note</h2>
          <NoteForm
            onSubmit={handleCreateSubmit}
            onCancel={handleCancel}
          />
        </div>
      ) : editingNote ? (
        <div className="bg-card rounded-lg shadow-sm border p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Edit Note</h2>
          <NoteForm
            note={editingNote}
            onSubmit={handleEditSubmit}
            onCancel={handleCancel}
          />
        </div>
      ) : (
        <NoteList onEditNote={handleEditNote} />
      )}
    </div>
  );
};

export default NotesPage; 