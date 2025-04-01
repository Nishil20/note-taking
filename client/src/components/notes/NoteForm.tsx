import React, { useState, useEffect } from 'react';
import { Note, CreateNoteData } from '../../lib/services/noteService';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

interface NoteFormProps {
  note?: Note;
  onSubmit: (data: CreateNoteData) => Promise<void>;
  onCancel: () => void;
}

const NoteForm: React.FC<NoteFormProps> = ({ note, onSubmit, onCancel }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setContent(note.content);
    }
  }, [note]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    setIsSubmitting(true);
    try {
      await onSubmit({ title: title.trim(), content: content.trim() });
      setTitle('');
      setContent('');
    } catch (error) {
      // Error is handled by the context
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="title" className="block text-sm font-medium mb-1">
          Title
        </label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Note title"
          required
          maxLength={200}
        />
      </div>

      <div>
        <label htmlFor="content" className="block text-sm font-medium mb-1">
          Content
        </label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write your note here..."
          required
          className="w-full min-h-[200px] p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <div className="flex justify-end space-x-2">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={isSubmitting}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Saving...' : note ? 'Update Note' : 'Create Note'}
        </Button>
      </div>
    </form>
  );
};

export default NoteForm; 