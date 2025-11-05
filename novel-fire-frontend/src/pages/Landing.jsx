import { Link } from 'react-router-dom';
import { useCallback, useState } from 'react';
import { createDonationOrder, getRazorpayKey } from '../api/payments';

const Landing = () => {
  const [isPaying, setIsPaying] = useState(false);

  const loadRazorpay = useCallback(() => {
    return new Promise((resolve, reject) => {
      if (window.Razorpay) return resolve(true);
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => reject(new Error('Razorpay SDK failed to load.'));
      document.body.appendChild(script);
    });
  }, []);

  const handleDonate = useCallback(async () => {
    try {
      setIsPaying(true);
      await loadRazorpay();

      // Amount in INR paise (e.g., 19900 = ₹199.00)
      const amountPaise = 19900;
      const order = await createDonationOrder({ amount: amountPaise, currency: 'INR' });
      const keyId = await getRazorpayKey();

      const options = {
        key: keyId,
        amount: order.amount,
        currency: order.currency,
        name: 'Novashelf',
        description: 'Support our platform',
        order_id: order.id,
        prefill: {},
        theme: { color: '#2563eb' },
        handler: function (response) {
          alert('Thank you for your donation! Payment ID: ' + response.razorpay_payment_id);
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (e) {
      alert(e?.message || 'Payment initialization failed');
    } finally {
      setIsPaying(false);
    }
  }, [loadRazorpay]);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <header className="max-w-6xl mx-auto px-6 py-6 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <i className="fa-solid fa-book text-primary-600"></i>
          <span className="font-semibold text-lg bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Novashelf</span>
        </div>
        <nav className="space-x-3">
          <Link to="/login" className="btn btn-ghost">Log in</Link>
          <Link to="/register" className="btn btn-primary">Create account</Link>
        </nav>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-gray-100 mb-4">Read. Write. Share.</h1>
          <p className="text-gray-600 dark:text-gray-300 mb-8">Discover stories from indie authors and build your personal library. Join as a reader or become an author and publish your own books.</p>
          <div className="flex flex-wrap gap-3">
            <Link to="/register" className="btn btn-primary">Get started</Link>
            <button onClick={handleDonate} disabled={isPaying} className="btn btn-outline">
              {isPaying ? 'Processing...' : 'Donate'}
            </button>
          </div>
        </div>
        <div className="hidden md:block">
          <div className="rounded-xl border border-gray-200 dark:border-gray-800 p-6">
            <div className="aspect-video rounded-lg bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 flex items-center justify-center">
              <i className="fa-solid fa-book-open text-5xl text-blue-600"></i>
            </div>
          </div>
        </div>
      </main>

      {/* Features */}
      <section className="border-t border-gray-100 dark:border-gray-800">
        <div className="max-w-6xl mx-auto px-6 py-14">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-8">Why Novashelf?</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="card p-6">
              <div className="text-blue-600 mb-3"><i className="fa-solid fa-compass"></i></div>
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Discover Hidden Gems</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">Curated collections and smart recommendations help you find your next favorite book.</p>
            </div>
            <div className="card p-6">
              <div className="text-blue-600 mb-3"><i className="fa-solid fa-pen-nib"></i></div>
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Write Without Limits</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">Publish chapters, manage drafts, and grow your audience with built-in author tools.</p>
            </div>
            <div className="card p-6">
              <div className="text-blue-600 mb-3"><i className="fa-solid fa-heart"></i></div>
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Support Creators</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">Bookmark, review, and donate to the authors you love—directly on the platform.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Highlights / Stats */}
      <section className="bg-gray-50 dark:bg-gray-900/50">
        <div className="max-w-6xl mx-auto px-6 py-14 grid sm:grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="card p-6">
            <div className="text-3xl font-extrabold text-gray-900 dark:text-gray-100">10k+</div>
            <div className="text-sm text-gray-600 dark:text-gray-300">Chapters read</div>
          </div>
          <div className="card p-6">
            <div className="text-3xl font-extrabold text-gray-900 dark:text-gray-100">1k+</div>
            <div className="text-sm text-gray-600 dark:text-gray-300">Active readers</div>
          </div>
          <div className="card p-6">
            <div className="text-3xl font-extrabold text-gray-900 dark:text-gray-100">300+</div>
            <div className="text-sm text-gray-600 dark:text-gray-300">Authors publishing</div>
          </div>
          <div className="card p-6">
            <div className="text-3xl font-extrabold text-gray-900 dark:text-gray-100">4.8/5</div>
            <div className="text-sm text-gray-600 dark:text-gray-300">Community rating</div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section>
        <div className="max-w-6xl mx-auto px-6 py-14">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-8">Loved by readers and authors</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="card p-6">
              <p className="text-gray-700 dark:text-gray-300 mb-4">“The best place to discover new voices. My reading list never runs out.”</p>
              <div className="text-sm font-semibold text-gray-900 dark:text-gray-100">Aisha • Reader</div>
            </div>
            <div className="card p-6">
              <p className="text-gray-700 dark:text-gray-300 mb-4">“Publishing chapters weekly helped me build an audience faster than I imagined.”</p>
              <div className="text-sm font-semibold text-gray-900 dark:text-gray-100">Nitin • Author</div>
            </div>
            <div className="card p-6">
              <p className="text-gray-700 dark:text-gray-300 mb-4">“Clean UI, great reader, and the community feedback keeps me motivated.”</p>
              <div className="text-sm font-semibold text-gray-900 dark:text-gray-100">Sara • Author</div>
            </div>
          </div>
        </div>
      </section>

      {/* Secondary CTA */}
      <section className="py-14">
        <div className="max-w-6xl mx-auto px-6">
          <div className="rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-white text-2xl font-bold mb-2">Start your chapter today</h3>
              <p className="text-blue-100">Join free as a reader or author. Your next story begins here.</p>
            </div>
            <div className="flex gap-3">
              <Link to="/register" className="btn bg-white text-blue-700 hover:bg-blue-50">Create account</Link>
              <button onClick={handleDonate} disabled={isPaying} className="btn btn-ghost text-white border-white/30">
                {isPaying ? 'Processing…' : 'Donate'}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 dark:border-gray-800">
        <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
            <i className="fa-solid fa-book"></i>
            <span className="font-semibold">Novashelf</span>
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">© {new Date().getFullYear()} Novashelf. All rights reserved.</div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
