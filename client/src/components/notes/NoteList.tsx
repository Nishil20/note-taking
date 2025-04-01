import React, { useEffect } from 'react';
import { useNotes } from '../../contexts/NoteContext';
import { Button } from '../ui/button';
import NoteCard from './NoteCard';
import { Note } from '../../lib/services/noteService';

interface NoteListProps {
  onEditNote: (note: Note | null) => void;
}

const NoteList: React.FC<NoteListProps> = ({ onEditNote }) => {
  const { notes, isLoading, error, loadNotes } = useNotes();

  useEffect(() => {
    // Load notes only once when the component mounts
    loadNotes();
  }, []); // Remove loadNotes from dependencies to prevent multiple calls

  if (isLoading && (!notes || notes.length === 0)) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="text-lg text-muted-foreground">Loading notes...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center p-8 space-y-4">
        <div className="text-lg text-red-500">{error}</div>
        <Button onClick={() => loadNotes()}>Try Again</Button>
      </div>
    );
  }

  if (!notes || notes.length === 0) {
    return (
      <div className="flex flex-col items-center p-8 space-y-4">
        <div className="text-lg text-muted-foreground">No notes yet</div>
        <Button onClick={() => onEditNote(null)}>Create Your First Note</Button>
      </div>
    );
  }

  // Filter out any invalid notes that might have slipped through
  const validNotes = notes.filter(note => note && note._id);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {validNotes.map(note => (
        <NoteCard 
          key={note._id} 
          note={note} 
          onEdit={onEditNote} 
        />
      ))}
      <div className="flex items-center justify-center p-4 border-2 border-dashed rounded-lg hover:border-primary">
        <Button 
          variant="ghost" 
          onClick={() => onEditNote(null)}
          className="w-full h-full flex items-center justify-center text-lg font-medium hover:text-primary"
        >
          + Add New Note
        </Button>
      </div>
    </div>
  );
};

export default NoteList; 