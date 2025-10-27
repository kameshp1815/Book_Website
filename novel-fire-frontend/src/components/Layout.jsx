import Navbar from './Navbar';
import Footer from './Footer';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white via-blue-50/50 to-white dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      <Navbar />
      <main className="flex-grow">
        <div className="container mx-auto max-w-7xl py-6 sm:py-8 lg:py-10 px-4 sm:px-6 lg:px-8">
          {children}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Layout;