import mongoose from 'mongoose';

export interface INote {
  title: string;
  content: string;
  userId: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const noteSchema = new mongoose.Schema<INote>(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      minlength: [1, 'Title cannot be empty'],
      maxlength: [200, 'Title cannot exceed 200 characters']
    },
    content: {
      type: String,
      required: [true, 'Content is required'],
      trim: true
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User ID is required']
    }
  },
  { timestamps: true }
);

// Add index for faster queries by userId
noteSchema.index({ userId: 1, createdAt: -1 });

const Note = mongoose.model<INote>('Note', noteSchema);

export default Note; 