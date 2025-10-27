/**
 * Create Book Page
 * 
 * Allows authors to create and publish new books with cover images,
 * descriptions, genres, and other metadata.
 */

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCreateBook } from '../hooks/useBooks';

const CreateBook = () => {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    description: '',
    genres: [],
    tagsInput: '',
  });

  const [coverImage, setCoverImage] = useState(null);
  const [coverImagePreview, setCoverImagePreview] = useState(null);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [tags, setTags] = useState([]);
  const [errors, setErrors] = useState({});

  const createBookMutation = useCreateBook();
  const navigate = useNavigate();

  const availableGenres = [
    'Fantasy', 'Romance', 'Mystery', 'Sci-Fi', 'Horror', 
    'Adventure', 'Drama', 'Comedy', 'Thriller', 'Historical',
    'Young Adult', 'Poetry', 'Non-Fiction', 'Biography'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleTagsKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      const value = formData.tagsInput.trim().replace(/^,|,$/g, '');
      if (value && !tags.includes(value)) {
        setTags(prev => [...prev, value]);
      }
      setFormData(prev => ({ ...prev, tagsInput: '' }));
      if (errors.tags) {
        setErrors(prev => ({ ...prev, tags: '' }));
      }
    }
  };

  const removeTag = (tag) => {
    setTags(prev => prev.filter(t => t !== tag));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCoverImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setCoverImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGenreToggle = (genre) => {
    setSelectedGenres(prev => {
      if (prev.includes(genre)) {
        return prev.filter(g => g !== genre);
      } else {
        return [...prev, genre];
      }
    });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Book title is required';
    }

    if (!formData.author.trim()) {
      newErrors.author = 'Author name is required';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Book description is required';
    } else if (formData.description.length < 50) {
      newErrors.description = 'Description must be at least 50 characters';
    }

    if (selectedGenres.length === 0) {
      newErrors.genres = 'Please select at least one genre';
    }

    if (tags.some(t => t.length > 24)) {
      newErrors.tags = 'Each tag must be 24 characters or less';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const bookData = new FormData();
      bookData.append('title', formData.title);
      bookData.append('author', formData.author);
      bookData.append('description', formData.description);
      bookData.append('genres', JSON.stringify(selectedGenres));
      if (tags.length) {
        bookData.append('tags', JSON.stringify(tags));
      }

      if (coverImage) {
        bookData.append('cover', coverImage);
      }

      const result = await createBookMutation.mutateAsync(bookData);

      // Redirect to the newly created book or books management page
      navigate(`/book/${result._id}`);
    } catch (error) {
      console.error('Error creating book:', error);
      setErrors({ 
        submit: error.response?.data?.message || 'Failed to create book' 
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow rounded-lg">
          {/* Header */}
          <div className="px-6 py-4 border-b border-gray-200">
            <h1 className="text-2xl font-bold text-gray-900">Publish a New Book</h1>
            <p className="mt-1 text-sm text-gray-600">
              Create your book and start adding chapters to share your story with the world.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Basic Information */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                  Book Title *
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  required
                  className={`mt-1 block w-full px-3 py-2 border ${
                    errors.title ? 'border-red-300' : 'border-gray-300'
                  } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                  placeholder="Enter your book title"
                  value={formData.title}
                  onChange={handleInputChange}
                />
                {errors.title && (
                  <p className="mt-1 text-sm text-red-600">{errors.title}</p>
                )}
              </div>

              <div>
                <label htmlFor="author" className="block text-sm font-medium text-gray-700">
                  Author Name *
                </label>
                <input
                  type="text"
                  id="author"
                  name="author"
                  required
                  className={`mt-1 block w-full px-3 py-2 border ${
                    errors.author ? 'border-red-300' : 'border-gray-300'
                  } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                  placeholder="Your name or pen name"
                  value={formData.author}
                  onChange={handleInputChange}
                />
                {errors.author && (
                  <p className="mt-1 text-sm text-red-600">{errors.author}</p>
                )}
              </div>
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Book Description *
              </label>
              <textarea
                id="description"
                name="description"
                rows={4}
                required
                className={`mt-1 block w-full px-3 py-2 border ${
                  errors.description ? 'border-red-300' : 'border-gray-300'
                } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                placeholder="Write a compelling description of your book..."
                value={formData.description}
                onChange={handleInputChange}
              />
              <p className="mt-1 text-sm text-gray-500">
                {formData.description.length}/500 characters (minimum 50 required)
              </p>
              {errors.description && (
                <p className="mt-1 text-sm text-red-600">{errors.description}</p>
              )}
            </div>

            {/* Tags */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tags (optional)
              </label>
              <div className="flex flex-wrap gap-2 mb-2">
                {tags.map((tag) => (
                  <span key={tag} className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                    {tag}
                    <button type="button" onClick={() => removeTag(tag)} className="ml-2 text-gray-400 hover:text-gray-600">×</button>
                  </span>
                ))}
              </div>
              <input
                type="text"
                name="tagsInput"
                value={formData.tagsInput}
                onChange={handleInputChange}
                onKeyDown={handleTagsKeyDown}
                className={`mt-1 block w-full px-3 py-2 border ${errors.tags ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                placeholder="Type a tag and press Enter"
              />
              {errors.tags && (
                <p className="mt-1 text-sm text-red-600">{errors.tags}</p>
              )}
            </div>

            {/* Genres */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Genres * (Select up to 3)
              </label>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
                {availableGenres.map((genre) => (
                  <label
                    key={genre}
                    className={`relative flex items-center p-3 cursor-pointer rounded-lg border ${
                      selectedGenres.includes(genre)
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <input
                      type="checkbox"
                      className="sr-only"
                      checked={selectedGenres.includes(genre)}
                      onChange={() => handleGenreToggle(genre)}
                      disabled={!selectedGenres.includes(genre) && selectedGenres.length >= 3}
                    />
                    <span className="text-sm font-medium">{genre}</span>
                  </label>
                ))}
              </div>
              {errors.genres && (
                <p className="mt-1 text-sm text-red-600">{errors.genres}</p>
              )}
            </div>

            {/* Cover Image */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Book Cover Image
              </label>
              <div className="flex items-start space-x-6">
                <div className="flex-shrink-0">
                  {coverImagePreview ? (
                    <img
                      src={coverImagePreview}
                      alt="Cover preview"
                      className="h-32 w-24 object-cover rounded-lg border border-gray-300"
                    />
                  ) : (
                    <div className="h-32 w-24 bg-gray-200 rounded-lg border border-gray-300 flex items-center justify-center">
                      <svg className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <input
                    type="file"
                    id="coverImage"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  />
                  <p className="mt-1 text-sm text-gray-500">
                    Upload a cover image for your book. Recommended size: 1920x1080px
                  </p>
                </div>
              </div>
            </div>

            {/* Submit Error */}
            {errors.submit && (
              <div className="rounded-md bg-red-50 p-4">
                <div className="text-sm text-red-800">{errors.submit}</div>
              </div>
            )}

            {/* Actions */}
            <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={() => navigate('/my-books')}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={createBookMutation.isPending}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {createBookMutation.isPending ? 'Creating...' : 'Publish Book'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateBook;