const mongoose = require('mongoose');

const libraryEntrySchema = mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    book: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
    currentChapter: { type: mongoose.Schema.Types.ObjectId, ref: 'Chapter' },
    currentChapterIndex: { type: Number },
    lastReadAt: { type: Date },
    progressPercent: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model('LibraryEntry', libraryEntrySchema);
