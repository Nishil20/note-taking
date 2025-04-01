import { Request, Response } from 'express';
import Note, { INote } from '../models/Note';

// @desc    Create a new note
// @route   POST /api/notes
// @access  Private
export const createNote = async (req: Request, res: Response) => {
  try {
    const { title, content } = req.body;
    const userId = req.user?._id; // Assuming user is attached by auth middleware

    const note = await Note.create({
      title,
      content,
      userId
    });

    res.status(201).json(note);
  } catch (error: any) {
    res.status(400).json({
      message: error.message || 'Error creating note'
    });
  }
};

// @desc    Get all notes for a user
// @route   GET /api/notes
// @access  Private
export const getNotes = async (req: Request, res: Response) => {
  try {
    const userId = req.user?._id; // Assuming user is attached by auth middleware
    const notes = await Note.find({ userId })
      .sort({ createdAt: -1 })
      .select('-__v'); // Exclude version key

    res.json(notes);
  } catch (error: any) {
    res.status(500).json({
      message: error.message || 'Error fetching notes'
    });
  }
};

// @desc    Get a single note by ID
// @route   GET /api/notes/:id
// @access  Private
export const getNoteById = async (req: Request, res: Response) => {
  try {
    const note = await Note.findOne({
      _id: req.params.id,
      userId: req.user?._id
    }).select('-__v');

    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }

    res.json(note);
  } catch (error: any) {
    res.status(500).json({
      message: error.message || 'Error fetching note'
    });
  }
};

// @desc    Update a note
// @route   PUT /api/notes/:id
// @access  Private
export const updateNote = async (req: Request, res: Response) => {
  try {
    const { title, content } = req.body;
    const note = await Note.findOneAndUpdate(
      {
        _id: req.params.id,
        userId: req.user?._id
      },
      { title, content },
      { new: true, runValidators: true }
    );

    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }

    res.json(note);
  } catch (error: any) {
    res.status(400).json({
      message: error.message || 'Error updating note'
    });
  }
};

// @desc    Delete a note
// @route   DELETE /api/notes/:id
// @access  Private
export const deleteNote = async (req: Request, res: Response) => {
  try {
    const note = await Note.findOneAndDelete({
      _id: req.params.id,
      userId: req.user?._id
    });

    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }

    res.json({ message: 'Note deleted successfully' });
  } catch (error: any) {
    res.status(500).json({
      message: error.message || 'Error deleting note'
    });
  }
}; 