import { useEffect, useMemo, useRef, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useBook, useBookChapters } from '../hooks/useBooks';
import { libraryAPI } from '../api/library';

const Reader = () => {
  const { bookId } = useParams();
  const navigate = useNavigate();
  const { data: book } = useBook(bookId);
  const { data: chapters = [], isLoading } = useBookChapters(bookId);

  const [index, setIndex] = useState(0);
  const contentRef = useRef(null);
  const tickingRef = useRef(false);

  useEffect(() => {
    if (chapters.length > 0) {
      // reset scroll to top when chapter changes
      window.scrollTo({ top: 0, behavior: 'instant' });
      // update progress to start of chapter
      void libraryAPI.updateProgress({ bookId, currentChapter: chapters[index]?._id, progressPercent: 0 });
    }
  }, [index, chapters, bookId]);

  useEffect(() => {
    // Ensure user has an entry
    (async () => {
      try {
        await libraryAPI.updateProgress({ bookId, progressPercent: 0 });
      } catch {}
    })();
  }, [bookId]);

  useEffect(() => {
    const onScroll = () => {
      if (tickingRef.current) return;
      window.requestAnimationFrame(async () => {
        tickingRef.current = false;
        const el = contentRef.current || document.documentElement;
        const scrollTop = window.scrollY;
        const docHeight = el.scrollHeight - window.innerHeight;
        const percent = Math.max(0, Math.min(100, Math.round((scrollTop / (docHeight || 1)) * 100)));
        try {
          await libraryAPI.updateProgress({ bookId, currentChapter: chapters[index]?._id, progressPercent: percent });
        } catch {}
      });
      tickingRef.current = true;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [bookId, chapters, index]);

  const hasPrev = index > 0;
  const hasNext = index < Math.max(0, chapters.length - 1);

  const goPrev = () => {
    if (hasPrev) setIndex((i) => Math.max(0, i - 1));
  };
  const goNext = () => {
    if (hasNext) setIndex((i) => Math.min(chapters.length - 1, i + 1));
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Book not found</h1>
          <Link to="/books" className="btn btn-primary">Back to Books</Link>
        </div>
      </div>
    );
  }

  const chapter = chapters[index];

  return (
    <div className="min-h-screen bg-white">
      {/* Top bar */}
      <div className="sticky top-0 z-10 border-b bg-white/80 backdrop-blur">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="min-w-0">
            <h1 className="truncate text-lg font-semibold text-gray-900">{book.title}</h1>
            <p className="text-xs text-gray-500">{chapter ? chapter.title : 'No chapters yet'}</p>
          </div>
          <div className="flex items-center gap-2">
            <button className="btn btn-secondary" onClick={goPrev} disabled={!hasPrev}>Prev</button>
            <button className="btn btn-primary" onClick={goNext} disabled={!hasNext}>Next</button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div ref={contentRef} className="max-w-3xl mx-auto px-4 py-8">
        {chapter ? (
          <article className="prose max-w-none">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">{chapter.title}</h2>
            <div className="whitespace-pre-wrap leading-8 text-gray-800">{chapter.content || 'No content.'}</div>
          </article>
        ) : (
          <div className="text-center text-gray-500 py-20">This book has no chapters yet.</div>
        )}
      </div>

      {/* Bottom bar */}
      <div className="sticky bottom-0 z-10 border-t bg-white/80 backdrop-blur">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link to={`/book/${bookId}`} className="text-sm text-primary-600 hover:text-primary-700">Back to Book</Link>
          <div className="flex items-center gap-2">
            <button className="btn btn-secondary" onClick={goPrev} disabled={!hasPrev}>Prev</button>
            <button className="btn btn-primary" onClick={goNext} disabled={!hasNext}>Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reader;
