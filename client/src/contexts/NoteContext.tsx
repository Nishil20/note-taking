import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { noteService, Note, CreateNoteData, UpdateNoteData } from '../lib/services/noteService';

interface NoteContextType {
  notes: Note[];
  isLoading: boolean;
  error: string | null;
  selectedNote: Note | null;
  setSelectedNote: (note: Note | null) => void;
  loadNotes: () => Promise<void>;
  getNote: (id: string) => Promise<Note>;
  createNote: (data: CreateNoteData) => Promise<Note>;
  updateNote: (id: string, data: UpdateNoteData) => Promise<Note>;
  deleteNote: (id: string) => Promise<void>;
  clearError: () => void;
}

const NoteContext = createContext<NoteContextType | undefined>(undefined);

export const useNotes = () => {
  const context = useContext(NoteContext);
  if (context === undefined) {
    throw new Error('useNotes must be used within a NoteProvider');
  }
  return context;
};

interface NoteProviderProps {
  children: ReactNode;
}

type ApiError = {
  message: string;
  status?: number;
};

export const NoteProvider: React.FC<NoteProviderProps> = ({ children }) => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadNotes = useCallback(async () => {
    console.log('Loading notes...');
    setIsLoading(true);
    setError(null);
    try {
      const fetchedNotes = await noteService.getAllNotes();
      console.log('Fetched notes:', fetchedNotes);
      
      if (!fetchedNotes || !Array.isArray(fetchedNotes)) {
        console.error('Invalid response format:', fetchedNotes);
        setError('Invalid response format from server');
        setNotes([]);
        return;
      }

      const validNotes = fetchedNotes.filter((note): note is Note => {
        const isValid = note && typeof note === 'object' && '_id' in note;
        if (!isValid) {
          console.warn('Invalid note found:', note);
        }
        return isValid;
      });

      console.log('Valid notes to display:', validNotes);
      setNotes(validNotes);
    } catch (err) {
      const error = err as ApiError;
      const errorMessage = error.message || 'Failed to load notes';
      console.error('Error loading notes:', error);
      setError(errorMessage);
      setNotes([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getNote = useCallback(async (id: string): Promise<Note> => {
    try {
      return await noteService.getNoteById(id);
    } catch (err) {
      const error = err as ApiError;
      setError(error.message || 'Failed to get note');
      console.error('Error getting note:', error);
      throw error;
    }
  }, []);

  const createNote = useCallback(async (data: CreateNoteData): Promise<Note> => {
    setError(null);
    try {
      const newNote = await noteService.createNote(data);
      console.log('Created new note:', newNote);
      setNotes(prevNotes => {
        const updatedNotes = [...prevNotes, newNote];
        console.log('Updated notes after creation:', updatedNotes);
        return updatedNotes;
      });
      return newNote;
    } catch (err) {
      const error = err as ApiError;
      setError(error.message || 'Failed to create note');
      console.error('Error creating note:', error);
      throw error;
    }
  }, []);

  const updateNote = useCallback(async (id: string, data: UpdateNoteData): Promise<Note> => {
    setError(null);
    try {
      const updatedNote = await noteService.updateNote(id, data);
      console.log('Updated note:', updatedNote);
      setNotes(prevNotes => {
        const updatedNotes = prevNotes.map(note => (note._id === id ? updatedNote : note));
        console.log('Updated notes after update:', updatedNotes);
        return updatedNotes;
      });
      return updatedNote;
    } catch (err) {
      const error = err as ApiError;
      setError(error.message || 'Failed to update note');
      console.error('Error updating note:', error);
      throw error;
    }
  }, []);

  const deleteNote = useCallback(async (id: string): Promise<void> => {
    setError(null);
    try {
      await noteService.deleteNote(id);
      setNotes(prevNotes => {
        const updatedNotes = prevNotes.filter(note => note._id !== id);
        console.log('Updated notes after deletion:', updatedNotes);
        return updatedNotes;
      });
    } catch (err) {
      const error = err as ApiError;
      setError(error.message || 'Failed to delete note');
      console.error('Error deleting note:', error);
      throw error;
    }
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  // Add an effect to log state changes
  React.useEffect(() => {
    console.log('Notes state updated:', notes);
  }, [notes]);

  // Load notes when the provider mounts
  React.useEffect(() => {
    loadNotes();
  }, [loadNotes]);

  const value = {
    notes,
    selectedNote,
    setSelectedNote,
    isLoading,
    error,
    loadNotes,
    getNote,
    createNote,
    updateNote,
    deleteNote,
    clearError
  };

  return <NoteContext.Provider value={value}>{children}</NoteContext.Provider>;
}; 