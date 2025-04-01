import { api } from './api';

export interface Note {
  _id: string;
  title: string;
  content: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateNoteData {
  title: string;
  content: string;
}

export interface UpdateNoteData {
  title?: string;
  content?: string;
}

class NoteService {
  private endpoint = '/notes';

  async getAllNotes(): Promise<Note[]> {
    console.log('NoteService: Fetching all notes...');
    try {
      const notes = await api.get<Note[]>(this.endpoint);
      console.log('NoteService: Successfully fetched notes:', notes);
      return notes;
    } catch (error) {
      console.error('NoteService: Error fetching notes:', error);
      throw error;
    }
  }

  async getNoteById(id: string): Promise<Note> {
    console.log(`NoteService: Fetching note ${id}...`);
    try {
      const note = await api.get<Note>(`${this.endpoint}/${id}`);
      console.log('NoteService: Successfully fetched note:', note);
      return note;
    } catch (error) {
      console.error(`NoteService: Error fetching note ${id}:`, error);
      throw error;
    }
  }

  async createNote(data: CreateNoteData): Promise<Note> {
    console.log('NoteService: Creating note:', data);
    try {
      const note = await api.post<Note>(this.endpoint, data);
      console.log('NoteService: Successfully created note:', note);
      return note;
    } catch (error) {
      console.error('NoteService: Error creating note:', error);
      throw error;
    }
  }

  async updateNote(id: string, data: UpdateNoteData): Promise<Note> {
    console.log(`NoteService: Updating note ${id}:`, data);
    try {
      const note = await api.put<Note>(`${this.endpoint}/${id}`, data);
      console.log('NoteService: Successfully updated note:', note);
      return note;
    } catch (error) {
      console.error(`NoteService: Error updating note ${id}:`, error);
      throw error;
    }
  }

  async deleteNote(id: string): Promise<{ message: string }> {
    console.log(`NoteService: Deleting note ${id}...`);
    try {
      const result = await api.delete<{ message: string }>(`${this.endpoint}/${id}`);
      console.log('NoteService: Successfully deleted note:', result);
      return result;
    } catch (error) {
      console.error(`NoteService: Error deleting note ${id}:`, error);
      throw error;
    }
  }
}

export const noteService = new NoteService(); 