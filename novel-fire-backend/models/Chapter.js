import mongoose from 'mongoose';

const chapterSchema = mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    book: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    order: { type: Number },
  },
  { timestamps: true }
);

export default mongoose.model('Chapter', chapterSchema);
