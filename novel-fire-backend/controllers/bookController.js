const asyncHandler = require('express-async-handler');
const Book = require('../models/Book');

// @desc    Get all books
// @route   GET /api/books
// @access  Public
const getBooks = asyncHandler(async (req, res) => {
  const { search, genre } = req.query;
  const filter = {};
  if (search && String(search).trim()) {
    const s = String(search).trim();
    filter.$or = [
      { title: { $regex: s, $options: 'i' } },
      { author: { $regex: s, $options: 'i' } },
    ];
  }
  if (genre && String(genre).trim()) {
    filter.genres = String(genre).trim();
  }
  const books = await Book.find(filter).sort({ createdAt: -1 });
  res.json(books);
});

// @desc    Get single book
// @route   GET /api/books/:id
// @access  Public
const getBookById = asyncHandler(async (req, res) => {
  const book = await Book.findById(req.params.id).populate('chapters');
  if (!book) {
    res.status(404);
    throw new Error('Book not found');
  }
  res.json(book);
});

// @desc    Create a book
// @route   POST /api/books
// @access  Private
const createBook = asyncHandler(async (req, res) => {
  const { title, author, description, genres, tags } = req.body;
  
  // Parse genres if it's a JSON string (from FormData)
  let parsedGenres = genres;
  if (typeof genres === 'string') {
    try {
      parsedGenres = JSON.parse(genres);
    } catch (error) {
      parsedGenres = [genres]; // fallback to single genre array
    }
  }
  // Parse tags if provided
  let parsedTags = tags;
  if (typeof tags === 'string') {
    try {
      parsedTags = JSON.parse(tags);
    } catch (error) {
      parsedTags = [tags];
    }
  }
  
  const book = new Book({ title, author, description, genres: parsedGenres, tags: parsedTags, user: req.user._id });
  if (req.file) book.coverImage = req.file.filename;
  const created = await book.save();
  res.status(201).json(created);
});

// @desc    Update a book
// @route   PUT /api/books/:id
// @access  Private (owner)
const updateBook = asyncHandler(async (req, res) => {
  const book = await Book.findById(req.params.id);
  if (!book) {
    res.status(404);
    throw new Error('Book not found');
  }
  if (book.user.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error('Not authorized');
  }
  const { title, author, description, genres, tags } = req.body;
  if (title) book.title = title;
  if (author) book.author = author;
  if (description) book.description = description;
  if (genres) {
    // Parse genres if it's a JSON string (from FormData)
    let parsedGenres = genres;
    if (typeof genres === 'string') {
      try {
        parsedGenres = JSON.parse(genres);
      } catch (error) {
        parsedGenres = [genres]; // fallback to single genre array
      }
    }
    book.genres = parsedGenres;
  }
  if (tags) {
    let parsedTags = tags;
    if (typeof tags === 'string') {
      try {
        parsedTags = JSON.parse(tags);
      } catch (error) {
        parsedTags = [tags];
      }
    }
    book.tags = parsedTags;
  }
  if (req.file) book.coverImage = req.file.filename;
  const updated = await book.save();
  res.json(updated);
});

// @desc    Delete a book
// @route   DELETE /api/books/:id
// @access  Private (owner)
const deleteBook = asyncHandler(async (req, res) => {
  const book = await Book.findById(req.params.id);
  if (!book) {
    res.status(404);
    throw new Error('Book not found');
  }
  if (book.user.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error('Not authorized');
  }
  await Book.findByIdAndDelete(req.params.id);
  res.json({ message: 'Book removed' });
});

module.exports = { getBooks, getBookById, createBook, updateBook, deleteBook };
