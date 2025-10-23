/**
 * My Books Page
 * 
 * Allows authors to view and manage their published books,
 * add new books, and access chapter management.
 */

import { Link } from 'react-router-dom';
import { useBooks } from '../hooks/useBooks';
import { useAuth } from '../context/AuthContext';
import { CardLoader } from '../components/Loader';

const MyBooks = () => {
  const { user } = useAuth();
  const { data: allBooks, isLoading, error } = useBooks();
  
  // Filter books by current user (in a real app, this would be done on the backend)
  const myBooks = allBooks?.filter(book => book.user === user?._id) || [];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <CardLoader text="Loading your books..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-white shadow rounded-lg">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">My Books</h1>
                <p className="mt-1 text-sm text-gray-600">
                  Manage your published books and create new ones
                </p>
              </div>
              <Link
                to="/create-book"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                New Book
              </Link>
            </div>

            <div className="p-6">
              {error && (
                <div className="rounded-md bg-red-50 p-4 mb-6">
                  <div className="text-sm text-red-800">
                    Error loading books: {error.message}
                  </div>
                </div>
              )}

              {myBooks.length === 0 ? (
                <div className="text-center py-12">
                  <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                  <h3 className="mt-2 text-sm font-medium text-gray-900">No books yet</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Get started by creating your first book.
                  </p>
                  <div className="mt-6">
                    <Link
                      to="/create-book"
                      className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                      Create Your First Book
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {myBooks.map((book) => (
                    <div
                      key={book._id}
                      className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
                    >
                      {/* Book Cover */}
                      <div className="aspect-w-3 aspect-h-4">
                        {book.coverImage ? (
                          <img
                            src={`${import.meta.env.VITE_API_URL}/uploads/${book.coverImage}`}
                            alt={book.title}
                            className="w-full h-48 object-cover rounded-t-lg"
                          />
                        ) : (
                          <div className="w-full h-48 bg-gray-200 rounded-t-lg flex items-center justify-center">
                            <svg className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                            </svg>
                          </div>
                        )}
                      </div>

                      {/* Book Info */}
                      <div className="p-4">
                        <h3 className="text-lg font-semibold text-gray-900 truncate">
                          {book.title}
                        </h3>
                        <p className="text-sm text-gray-600 mt-1">
                          by {book.author}
                        </p>
                        <p className="text-sm text-gray-500 mt-2 line-clamp-2">
                          {book.description}
                        </p>

                        {/* Stats */}
                        <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
                          <span>{book.chaptersCount || 0} chapters</span>
                          <span>{new Date(book.createdAt).toLocaleDateString()}</span>
                        </div>

                        {/* Actions */}
                        <div className="mt-4 flex space-x-2">
                          <Link
                            to={`/book/${book._id}`}
                            className="flex-1 bg-blue-50 text-blue-700 text-center px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-100"
                          >
                            View Book
                          </Link>
                          <Link
                            to={`/book/${book._id}/chapters`}
                            className="flex-1 bg-green-50 text-green-700 text-center px-3 py-2 rounded-md text-sm font-medium hover:bg-green-100"
                          >
                            Manage Chapters
                          </Link>
                        </div>

                        <div className="mt-2 flex space-x-2">
                          <Link
                            to={`/edit-book/${book._id}`}
                            className="flex-1 bg-gray-50 text-gray-700 text-center px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-100"
                          >
                            Edit Details
                          </Link>
                          <button
                            className="flex-1 bg-red-50 text-red-700 text-center px-3 py-2 rounded-md text-sm font-medium hover:bg-red-100"
                            onClick={() => {
                              if (window.confirm('Are you sure you want to delete this book?')) {
                                // TODO: Implement delete functionality
                                console.log('Delete book:', book._id);
                              }
                            }}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Publishing Statistics</h2>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{myBooks.length}</div>
                <div className="text-sm text-gray-500">Total Books</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {myBooks.reduce((sum, book) => sum + (book.chaptersCount || 0), 0)}
                </div>
                <div className="text-sm text-gray-500">Total Chapters</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">
                  {myBooks.filter(book => book.chaptersCount > 0).length}
                </div>
                <div className="text-sm text-gray-500">Active Books</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">
                  {new Set(myBooks.flatMap(book => book.genres || [])).size}
                </div>
                <div className="text-sm text-gray-500">Genres Covered</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyBooks;