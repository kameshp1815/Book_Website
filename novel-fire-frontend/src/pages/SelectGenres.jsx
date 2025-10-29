import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { usersAPI } from '../api/users';

const DEFAULT_GENRES = [
  'Fantasy',
  'Science Fiction',
  'Romance',
  'Mystery',
  'Thriller',
  'Horror',
  'Historical',
  'Young Adult',
  'Non-Fiction',
  'Self-Help',
  'Biography',
  'Poetry',
];

const SelectGenres = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [selected, setSelected] = useState([]);
  const [saving, setSaving] = useState(false);

  const toggle = (g) => {
    setSelected((prev) =>
      prev.includes(g) ? prev.filter((x) => x !== g) : [...prev, g]
    );
  };

  const { updateUser } = useAuth();

  const handleContinue = async () => {
    setSaving(true);
    try {
      const { favoriteGenres } = await usersAPI.saveFavoriteGenres(selected);
      updateUser({ favoriteGenres });
      const role = user?.role || 'reader';
      const target = role === 'admin' ? '/admin' : role === 'author' ? '/author-dashboard' : '/dashboard';
      navigate(target, { replace: true });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-blue-50/40 to-white dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="card card-hover p-6 sm:p-8">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Select your favorite genres</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-300 text-sm">This will help us personalize recommendations.</p>

          <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-3">
            {DEFAULT_GENRES.map((g) => {
              const active = selected.includes(g);
              return (
                <button
                  key={g}
                  type="button"
                  onClick={() => toggle(g)}
                  className={`px-3 py-2 rounded-md border text-sm transition ${
                    active
                      ? 'border-primary-600 bg-primary-50 text-primary-700'
                      : 'border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-900'
                  }`}
                >
                  {g}
                </button>
              );
            })}
          </div>

          <div className="mt-8">
            <button
              type="button"
              onClick={handleContinue}
              disabled={saving || selected.length === 0}
              className="btn btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? 'Saving...' : 'Continue'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectGenres;
