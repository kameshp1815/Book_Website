/**
 * Home Page Component
 * 
 * Modern landing page with hero section, featured books, and call-to-action elements.
 * Designed with engaging visuals and animations for an attractive user experience.
 */

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useBooks } from '../hooks/useBooks';
import { CardLoader } from '../components/Loader';

const Home = () => {
  const { getFeaturedBooks } = useBooks();
  const [featuredBooks, setFeaturedBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFeaturedBooks = async () => {
      try {
        setLoading(true);
        const books = await getFeaturedBooks();
        setFeaturedBooks(books.slice(0, 4)); // Get first 4 books
      } catch (error) {
        console.error('Failed to load featured books:', error);
      } finally {
        setLoading(false);
      }
    };

    loadFeaturedBooks();
  }, [getFeaturedBooks]);

  return (
    <div className="min-h-screen">
      {/* Hero Section with Gradient Background */}
      <div className="relative bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500">
        <div className="absolute inset-0 bg-[url('/src/assets/pattern-bg.svg')] opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="md:flex md:items-center md:justify-between">
            <div className="md:w-1/2 text-center md:text-left">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight">
                Discover Your Next <span className="text-yellow-300">Favorite Story</span>
              </h1>
              <p className="mt-6 text-xl text-indigo-100 max-w-3xl">
                Explore thousands of books from emerging and established authors. 
                Read, write, and connect with a community of book lovers.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row justify-center md:justify-start space-y-4 sm:space-y-0 sm:space-x-4">
                <Link
                  to="/books"
                  className="px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-white hover:bg-indigo-50 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Browse Books
                </Link>
                <Link
                  to="/register"
                  className="px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-800 bg-opacity-60 backdrop-blur-sm hover:bg-opacity-70 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Join Now
                </Link>
              </div>
            </div>
            <div className="hidden md:block md:w-1/2 mt-10 md:mt-0">
              <div className="relative">
                <div className="absolute -top-6 -left-6 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
                <div className="absolute -bottom-8 -right-8 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
                <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
                <div className="relative">
                  <img 
                    src="/src/assets/books-hero.png" 
                    alt="Stack of books illustration" 
                    className="relative rounded-lg shadow-2xl transform hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://via.placeholder.com/500x400?text=Novashelf';
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full h-auto">
            <path fill="#ffffff" fillOpacity="1" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,149.3C960,160,1056,160,1152,138.7C1248,117,1344,75,1392,53.3L1440,32L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-base font-semibold text-indigo-600 tracking-wide uppercase">Features</h2>
            <p className="mt-1 text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight">
              Everything you need for your reading journey
            </p>
          </div>

          <div className="mt-16">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              <div className="bg-gradient-to-br from-indigo-50 to-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h3 className="mt-5 text-lg font-medium text-gray-900">Vast Library</h3>
                <p className="mt-2 text-base text-gray-600">
                  Access thousands of books across all genres, from fantasy to non-fiction, all in one place.
                </p>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-purple-500 text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                </div>
                <h3 className="mt-5 text-lg font-medium text-gray-900">Personalized Experience</h3>
                <p className="mt-2 text-base text-gray-600">
                  Get recommendations based on your reading history and preferences, tailored just for you.
                </p>
              </div>

              <div className="bg-gradient-to-br from-pink-50 to-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-pink-500 text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="mt-5 text-lg font-medium text-gray-900">Community</h3>
                <p className="mt-2 text-base text-gray-600">
                  Connect with other readers, share reviews, and discover new books through a vibrant community.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Books Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-base font-semibold text-indigo-600 tracking-wide uppercase">Featured Books</h2>
            <p className="mt-1 text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight">
              Popular this week
            </p>
          </div>

          <div className="mt-12">
            {loading ? (
              <CardLoader text="Loading featured books..." />
            ) : (
              <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4">
                {featuredBooks.length > 0 ? (
                  featuredBooks.map((book) => (
                    <div key={book._id} className="group relative">
                      <div className="w-full min-h-80 bg-gray-200 rounded-lg overflow-hidden group-hover:opacity-75 transition-opacity duration-300">
                        <img
                          src={book.coverImage || `https://via.placeholder.com/300x450?text=${encodeURIComponent(book.title)}`}
                          alt={book.title}
                          className="w-full h-full object-center object-cover"
                        />
                      </div>
                      <div className="mt-4 flex justify-between">
                        <div>
                          <h3 className="text-sm text-gray-700">
                            <Link to={`/books/${book._id}`}>
                              <span aria-hidden="true" className="absolute inset-0" />
                              {book.title}
                            </Link>
                          </h3>
                          <p className="mt-1 text-sm text-gray-500">{book.author.name}</p>
                        </div>
                        <p className="text-sm font-medium text-gray-900">
                          {book.genre}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-span-full text-center py-12">
                    <p className="text-gray-500 text-lg">No featured books available at the moment.</p>
                    <div className="mt-6">
                      <Link
                        to="/books"
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
                      >
                        Browse all books
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="mt-12 text-center">
            <Link
              to="/books"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
            >
              View all books
              <svg xmlns="http://www.w3.org/2000/svg" className="ml-2 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-base font-semibold text-indigo-600 tracking-wide uppercase">Testimonials</h2>
            <p className="mt-1 text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight">
              What our readers say
            </p>
          </div>

          <div className="mt-12">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              <div className="bg-gray-50 rounded-xl shadow-md p-8 transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
                <div className="flex items-center mb-6">
                  <div className="h-12 w-12 rounded-full bg-gradient-to-r from-purple-400 to-indigo-500 flex items-center justify-center text-white font-bold text-xl">
                    S
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-bold text-gray-900">Sarah Johnson</h4>
                    <p className="text-gray-600">Avid Reader</p>
                  </div>
                </div>
                <p className="text-gray-600 italic">
                  "Novashelf has completely transformed my reading experience. The recommendations are spot-on, and I've discovered so many amazing books I would have never found otherwise!"
                </p>
                <div className="mt-4 flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl shadow-md p-8 transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
                <div className="flex items-center mb-6">
                  <div className="h-12 w-12 rounded-full bg-gradient-to-r from-pink-400 to-red-500 flex items-center justify-center text-white font-bold text-xl">
                    M
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-bold text-gray-900">Michael Chen</h4>
                    <p className="text-gray-600">Book Enthusiast</p>
                  </div>
                </div>
                <p className="text-gray-600 italic">
                  "The community features are what make Novashelf special. I love discussing books with fellow readers and getting insights that deepen my appreciation for what I'm reading."
                </p>
                <div className="mt-4 flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl shadow-md p-8 transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
                <div className="flex items-center mb-6">
                  <div className="h-12 w-12 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 flex items-center justify-center text-white font-bold text-xl">
                    A
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-bold text-gray-900">Aisha Patel</h4>
                    <p className="text-gray-600">Aspiring Author</p>
                  </div>
                </div>
                <p className="text-gray-600 italic">
                  "As someone who writes as well as reads, Novashelf has been invaluable. The platform makes it easy to share my work and get constructive feedback from a supportive community."
                </p>
                <div className="mt-4 flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-purple-800 to-indigo-700 relative">
        <div className="absolute inset-0 bg-[url('/src/assets/pattern-bg.svg')] opacity-10"></div>
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between relative z-10">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            <span className="block">Ready to start your journey?</span>
            <span className="block text-indigo-200">Join Novashelf today.</span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <div className="inline-flex rounded-md shadow">
              <Link
                to="/register"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50"
              >
                Get started
              </Link>
            </div>
            <div className="ml-3 inline-flex rounded-md shadow">
              <Link
                to="/books"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 bg-opacity-60 backdrop-blur-sm hover:bg-opacity-70"
              >
                Browse books
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;