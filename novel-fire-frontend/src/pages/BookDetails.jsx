import { useParams, useNavigate, Link } from 'react-router-dom';
import { useBook } from '../hooks/useBooks';
import { useAuth } from '../context/AuthContext';
import { useAddToLibrary } from '../hooks/useLibrary';
import { libraryAPI } from '../api/library';

const BookDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { data: book, isLoading, error } = useBook(id);
  const addToLibrary = useAddToLibrary();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Book not found</h1>
          <p className="text-gray-600">The book you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="bg-white shadow rounded-lg">
          <div className="px-6 py-8">
            <div className="lg:flex lg:items-start lg:space-x-8">
              {/* Book Cover */}
              <div className="flex-shrink-0">
                {book.coverImage ? (
                  <img
                    className="w-64 h-96 object-cover rounded-lg shadow-md"
                    src={`${import.meta.env.VITE_API_URL}/uploads/${book.coverImage}`}
                    alt={book.title}
                  />
                ) : (
                  <div className="w-64 h-96 bg-gray-200 rounded-lg shadow-md flex items-center justify-center">
                    <svg className="h-24 w-24 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                )}
              </div>

              {/* Book Details */}
              <div className="mt-6 lg:mt-0 flex-1">
                <h1 className="text-3xl font-bold text-gray-900">{book.title}</h1>
                <p className="text-lg text-gray-600 mt-2">
                  by {book.author || 'Unknown Author'}
                </p>

                {/* Genres */}
                {book.genres && book.genres.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {book.genres.map((genre, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-primary-100 text-primary-800"
                      >
                        {genre}
                      </span>
                    ))}
                  </div>
                )}

                {/* Tags */}
                {book.tags && book.tags.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {book.tags.map((tag) => (
                      <span key={tag} className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Description */}
                <div className="mt-6">
                  <h3 className="text-lg font-medium text-gray-900">Description</h3>
                  <p className="mt-2 text-gray-600 leading-relaxed">
                    {book.description || 'No description available for this book.'}
                  </p>
                </div>

                {/* Stats */}
                <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
                  <div className="bg-gray-50 rounded-lg p-4 text-center">
                    <dt className="text-sm font-medium text-gray-500">Chapters</dt>
                    <dd className="text-2xl font-bold text-gray-900">{book.chaptersCount || 0}</dd>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4 text-center">
                    <dt className="text-sm font-medium text-gray-500">Published</dt>
                    <dd className="text-lg font-semibold text-gray-900">
                      {new Date(book.createdAt).toLocaleDateString()}
                    </dd>
                  </div>
                </div>

                {/* Actions */}
                <div className="mt-8 flex flex-wrap gap-3 items-center">
                  <button
                    className="btn btn-primary"
                    disabled={addToLibrary.isPending}
                    onClick={async (e) => {
                      e.preventDefault();
                      try {
                        await addToLibrary.mutateAsync(book._id);
                        navigate('/library');
                      } catch (err) {
                        // Optional: feedback
                      }
                    }}
                  >
                    {addToLibrary.isPending ? 'Adding...' : 'Add to Library'}
                  </button>
                  <button
                    className="btn btn-secondary"
                    onClick={async (e) => {
                      e.preventDefault();
                      try {
                        // Ensure in library and set initial progress
                        await addToLibrary.mutateAsync(book._id).catch(() => {});
                        await libraryAPI.updateProgress({ bookId: book._id, progressPercent: 0 });
                        // Open Reader view
                        navigate(`/read/${book._id}`);
                      } catch (err) {
                        // Optional: feedback
                      }
                    }}
                  >
                    Start Reading
                  </button>

                  {/* Manage Chapters for owner */}
                  {user && book.user === user._id && (
                    <Link to={`/manage-chapters/${book._id}`} className="btn btn-outline">
                      Manage Chapters
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;