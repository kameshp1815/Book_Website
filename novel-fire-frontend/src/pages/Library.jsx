import { useLibrary } from '../hooks/useLibrary';

const Library = () => {
  const { data: library, isLoading } = useLibrary();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:px-6">
              <h1 className="text-3xl font-bold text-gray-900">My Library</h1>
              <p className="mt-1 text-sm text-gray-600">
                Your collection of saved books
              </p>
            </div>
            <div className="border-t border-gray-200 p-6">
              {isLoading ? (
                <div className="flex justify-center items-center h-32">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
                </div>
              ) : library && library.length > 0 ? (
                <>
                  <div className="mb-4 text-sm text-gray-600">{library.length} book(s) saved</div>
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {library.map((entry) => (
                      <a
                        key={entry._id}
                        href={`/book/${entry.book?._id || ''}`}
                        className="group block bg-white rounded-lg shadow hover:shadow-md transition-shadow overflow-hidden border border-gray-100"
                      >
                        <div className="bg-gray-100">
                          {entry.book?.coverImage ? (
                            <img
                              className="w-full h-48 object-cover group-hover:opacity-90 transition-opacity"
                              src={`${import.meta.env.VITE_API_URL}/uploads/${entry.book.coverImage}`}
                              alt={entry.book.title}
                            />
                          ) : (
                            <div className="w-full h-48 flex items-center justify-center text-gray-400">No cover</div>
                          )}
                        </div>
                        <div className="p-4">
                          <h3 className="font-semibold text-gray-900 truncate">{entry.book?.title || 'Untitled'}</h3>
                          <p className="text-sm text-gray-600 truncate">{entry.book?.author || 'Unknown Author'}</p>
                          <div className="mt-2 h-2 w-full bg-gray-200 rounded">
                            <div
                              className="h-2 bg-primary-500 rounded"
                              style={{ width: `${entry.progressPercent || 0}%` }}
                            />
                          </div>
                          <p className="mt-1 text-xs text-gray-500">Progress: {Math.round(entry.progressPercent || 0)}%</p>
                        </div>
                      </a>
                    ))}
                  </div>
                </>
              ) : (
                <div className="text-center py-12">
                  <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                  <h3 className="mt-2 text-sm font-medium text-gray-900">Your library is empty</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Start building your collection by adding books to your library.
                  </p>
                  <div className="mt-6">
                    <a href="/books" className="btn btn-primary">Browse Books</a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Library;