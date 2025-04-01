import React from 'react';
import { Note } from '../../lib/services/noteService';
import { Button } from '../ui/button';
import { useNotes } from '../../contexts/NoteContext';

interface NoteCardProps {
  note: Note;
  onEdit: (note: Note) => void;
}

const NoteCard: React.FC<NoteCardProps> = ({ note, onEdit }) => {
  const { deleteNote } = useNotes();

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this note?')) {
      try {
        await deleteNote(note._id);
      } catch (error) {
        // Error is handled by the context
      }
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="bg-card rounded-lg shadow-sm border p-4 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-lg font-semibold text-primary truncate flex-1">
          {note.title}
        </h3>
        <div className="flex gap-2 ml-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onEdit(note)}
          >
            Edit
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleDelete}
          >
            Delete
          </Button>
        </div>
      </div>
      <p className="text-muted-foreground mb-4 line-clamp-3">
        {note.content}
      </p>
      <div className="text-sm text-muted-foreground">
        Last updated: {formatDate(note.updatedAt)}
      </div>
    </div>
  );
};

export default NoteCard; 