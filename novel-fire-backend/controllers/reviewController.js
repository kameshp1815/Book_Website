const asyncHandler = require('express-async-handler');
const Review = require('../models/Review');

// @desc    Get reviews for a book
// @route   GET /api/reviews/book/:bookId
// @access  Public
const getReviewsByBook = asyncHandler(async (req, res) => {
  const reviews = await Review.find({ book: req.params.bookId }).populate('user', 'name');
  res.json(reviews);
});

// @desc    Create review
// @route   POST /api/reviews
// @access  Private
const createReview = asyncHandler(async (req, res) => {
  const { rating, comment, book } = req.body;
  const review = new Review({ rating, comment, book, user: req.user._id });
  const created = await review.save();
  res.status(201).json(created);
});

// @desc    Update review
// @route   PUT /api/reviews/:id
// @access  Private (owner)
const updateReview = asyncHandler(async (req, res) => {
  const review = await Review.findById(req.params.id);
  if (!review) {
    res.status(404);
    throw new Error('Review not found');
  }
  if (review.user.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error('Not authorized');
  }
  const { rating, comment } = req.body;
  if (rating !== undefined) review.rating = rating;
  if (comment !== undefined) review.comment = comment;
  const updated = await review.save();
  res.json(updated);
});

// @desc    Delete review
// @route   DELETE /api/reviews/:id
// @access  Private (owner)
const deleteReview = asyncHandler(async (req, res) => {
  const review = await Review.findById(req.params.id);
  if (!review) {
    res.status(404);
    throw new Error('Review not found');
  }
  if (review.user.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error('Not authorized');
  }
  await review.remove();
  res.json({ message: 'Review removed' });
});

module.exports = { getReviewsByBook, createReview, updateReview, deleteReview };
