/**
 * Manage Chapters Page
 * 
 * Allows authors to add, edit, delete, and reorder chapters for their books.
 * Includes a simple rich text editor for chapter content.
 */

import { useState, useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';

import toast from 'react-hot-toast';
import { useBook, useBookChapters, useCreateChapter, useUpdateChapter, useDeleteChapter } from '../hooks/useBooks';
import { CardLoader } from '../components/Loader';
import { useAuth } from '../context/AuthContext';

const ManageChapters = () => {
  const { user } = useAuth();
  const { bookId } = useParams();
  const { data: book, isLoading: isLoadingBook, error: bookError } = useBook(bookId);
  const { data: chapters, isLoading: isLoadingChapters, error: chaptersError, refetch } = useBookChapters(bookId);

  const { mutate: createChapter } = useCreateChapter();
  const { mutate: updateChapter } = useUpdateChapter();
  const { mutate: deleteChapter } = useDeleteChapter();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentChapter, setCurrentChapter] = useState(null);
  const [chapterTitle, setChapterTitle] = useState('');
  const [chapterContent, setChapterContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Check if the current user is the book owner
  const isBookOwner = user && book && book.user === user._id;

  useEffect(() => {
    if (bookError) {
      toast.error(bookError.message || 'Error fetching book details');
    }
    if (chaptersError) {
      toast.error(chaptersError.message || 'Error fetching chapters');
    }
  }, [bookError, chaptersError]);

  if (isLoadingBook || isLoadingChapters) {
    return <CardLoader text="Loading book and chapters..." />;
  }

  if (bookError) {
    return <div className="text-red-500 text-center">Error: {bookError.message}</div>;
  }

  if (!book) {
    return <div className="text-center">Book not found.</div>;
  }

  // Redirect if not book owner
  if (!isBookOwner) {
    toast.error("You are not authorized to manage chapters for this book.");
    return <Navigate to={`/book/${bookId}`} replace />;
  }

  const openCreateModal = () => {
    setCurrentChapter(null);
    setChapterTitle('');
    setChapterContent('');
    setIsModalOpen(true);
  };

  const openEditModal = (chapter) => {
    setCurrentChapter(chapter);
    setChapterTitle(chapter.title);
    setChapterContent(chapter.content);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentChapter(null);
    setChapterTitle('');
    setChapterContent('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!isBookOwner) {
      toast.error("You are not authorized to perform this action.");
      setIsSubmitting(false);
      return;
    }

    try {
      if (currentChapter) {
        // Update chapter
        await updateChapter({
          chapterId: currentChapter._id,
          chapterData: {
            title: chapterTitle,
            content: chapterContent,
          },
        });
        toast.success('Chapter updated successfully!');
      } else {
        // Create chapter
        await createChapter({
          bookId,
          chapterData: {
            title: chapterTitle,
            content: chapterContent,
          },
        });
        toast.success('Chapter created successfully!');
      }
      refetch();
      closeModal();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to save chapter.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteChapter = async (chapterId) => {
    if (!isBookOwner) {
      toast.error("You are not authorized to perform this action.");
      return;
    }

    if (window.confirm('Are you sure you want to delete this chapter?')) {
      try {
        await deleteChapter(chapterId);
        toast.success('Chapter deleted successfully!');
        refetch();
      } catch (err) {
        toast.error(err.response?.data?.message || 'Failed to delete chapter.');
      }
    }
  };

  const handleReorderChapters = async (newOrder) => {
    // This would typically involve an API call to update the order on the backend
    // For now, we'll just log the new order
    console.log('New chapter order:', newOrder);
    toast.info('Chapter reordering is not yet implemented on the backend.');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-white shadow rounded-lg">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Manage Chapters for "{book.title}"</h1>
                <p className="mt-1 text-sm text-gray-600">
                  Add, edit, delete, and reorder chapters for your book.
                </p>
              </div>
              {isBookOwner && (
                <button
                  onClick={openCreateModal}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Add New Chapter
                </button>
              )}
            </div>

            <div className="p-6">
              {chapters && chapters.length > 0 ? (
                <ul className="divide-y divide-gray-200">
                  {chapters.map((chapter) => (
                    <li key={chapter._id} className="py-4 flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">{chapter.title}</h3>
                        <p className="mt-1 text-sm text-gray-600">Order: {chapter.order}</p>
                      </div>
                      {isBookOwner && (
                        <div className="flex space-x-2">
                          <button
                            onClick={() => openEditModal(chapter)}
                            className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteChapter(chapter._id)}
                            className="inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                          >
                            Delete
                          </button>
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-600">No chapters found. Start by adding a new chapter!</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Chapter Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full" role="dialog" aria-modal="true" aria-labelledby="modal-headline">
              <form onSubmit={handleSubmit}>
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                      <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-headline">
                        {currentChapter ? 'Edit Chapter' : 'Add New Chapter'}
                      </h3>
                      <div className="mt-2">
                        <label htmlFor="chapterTitle" className="block text-sm font-medium text-gray-700">Title</label>
                        <input
                          type="text"
                          name="chapterTitle"
                          id="chapterTitle"
                          className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                          value={chapterTitle}
                          onChange={(e) => setChapterTitle(e.target.value)}
                          required
                        />
                      </div>
                      <div className="mt-4">
                        <label htmlFor="chapterContent" className="block text-sm font-medium text-gray-700">Content</label>
                        <textarea
                          name="chapterContent"
                          id="chapterContent"
                          rows="10"
                          className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                          value={chapterContent}
                          onChange={(e) => setChapterContent(e.target.value)}
                          required
                        ></textarea>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="submit"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Saving...' : 'Save Chapter'}
                  </button>
                  <button
                    type="button"
                    onClick={closeModal}
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    disabled={isSubmitting}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageChapters;