import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema(
  {
    targetType: { type: String, enum: ['book', 'chapter'], required: true },
    targetId: { type: mongoose.Schema.Types.ObjectId, required: true, index: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    content: { type: String, required: true },
    parentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Comment', default: null },
  },
  { timestamps: true }
);

commentSchema.index({ targetType: 1, targetId: 1, createdAt: -1 });

export default mongoose.model('Comment', commentSchema);
