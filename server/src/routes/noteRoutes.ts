import express from 'express';
import {
  createNote,
  getNotes,
  getNoteById,
  updateNote,
  deleteNote
} from '../controllers/noteController';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

// All routes are protected and require authentication
router.use(protect);

// @route   POST /api/notes
// @route   GET /api/notes
router.route('/')
  .post(createNote)
  .get(getNotes);

// @route   GET /api/notes/:id
// @route   PUT /api/notes/:id
// @route   DELETE /api/notes/:id
router.route('/:id')
  .get(getNoteById)
  .put(updateNote)
  .delete(deleteNote);

export default router; 