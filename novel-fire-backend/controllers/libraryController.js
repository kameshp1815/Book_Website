import asyncHandler from 'express-async-handler';
import LibraryEntry from '../models/LibraryEntry.js';
import Book from '../models/Book.js';

// Add book to user's library
const addToLibrary = asyncHandler(async (req, res) => {
  const { book } = req.body;
  const exists = await LibraryEntry.findOne({ user: req.user._id, book });
  if (exists) return res.status(400).json({ message: 'Book already in library' });
  const entry = await LibraryEntry.create({ user: req.user._id, book, lastReadAt: new Date() });
  res.status(201).json(entry);
});

// Remove book from library
const removeFromLibrary = asyncHandler(async (req, res) => {
  const { bookId } = req.params;
  await LibraryEntry.findOneAndDelete({ user: req.user._id, book: bookId });
  res.json({ message: 'Removed' });
});

// Update reading progress
const updateProgress = asyncHandler(async (req, res) => {
  const { book, currentChapter, progressPercent } = req.body;
  let entry = await LibraryEntry.findOne({ user: req.user._id, book });
  if (!entry) {
    entry = await LibraryEntry.create({ user: req.user._id, book });
  }
  entry.currentChapter = currentChapter || entry.currentChapter;
  entry.lastReadAt = new Date();
  if (progressPercent !== undefined) entry.progressPercent = progressPercent;
  await entry.save();
  res.json(entry);
});

// Get user's library with book details and progress
const getLibrary = asyncHandler(async (req, res) => {
  const entries = await LibraryEntry.find({ user: req.user._id }).populate('book').populate('currentChapter');
  res.json(entries);
});

export { addToLibrary, removeFromLibrary, updateProgress, getLibrary };
