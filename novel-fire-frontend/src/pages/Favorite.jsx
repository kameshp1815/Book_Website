import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const genresList = [
  "Fantasy",
  "Romance",
  "Mystery",
  "Sci-Fi",
  "Horror",
  "Adventure",
  "Drama",
  "Comedy",
  "Thriller",
  "Historical",
  "Young Adult",
  "Poetry",
  "Non-Fiction",
  "Biography",
];

const Favorite = () => {
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const toggleGenre = (genre) => {
    if (selectedGenres.includes(genre)) {
      setSelectedGenres(selectedGenres.filter((g) => g !== genre));
    } else {
      setSelectedGenres([...selectedGenres, genre]);
    }
    setErrorMsg(""); // Clear error when user changes selection
  };

  const handleSave = () => {
    if (selectedGenres.length === 0 || selectedGenres.length > 3) {
      setErrorMsg("Please select between 1 and 3 favorite genres.");
      return;
    }

    setErrorMsg("");
    navigate("/dashboard");
  };

  const handleClear = () => {
    setSelectedGenres([]);
    setErrorMsg("");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-purple-100 to-indigo-200 p-6">
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-2xl w-full text-center">
        <h2 className="text-3xl font-bold text-indigo-700 mb-2">
          📚 Select Your Favorite Genres
        </h2>
        <p className="text-gray-600 mb-6">
          Choose up to 3 genres you love most!
        </p>

        {/* Genre Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
          {genresList.map((genre, index) => (
            <button
              key={index}
              onClick={() => toggleGenre(genre)}
              className={`py-2 px-4 rounded-xl border transition-all duration-200 ${
                selectedGenres.includes(genre)
                  ? "bg-indigo-500 text-white border-indigo-500 shadow-md"
                  : "bg-gray-100 text-gray-700 border-gray-300 hover:bg-indigo-100"
              }`}
            >
              {genre}
            </button>
          ))}
        </div>

        {/* Inline Error Message */}
        {errorMsg && (
          <p className="text-red-500 font-medium mb-4">{errorMsg}</p>
        )}

        {/* Action Buttons */}
        <div className="flex justify-center gap-4">
          <button
            onClick={handleSave}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-6 rounded-xl shadow-md transition-all duration-200"
          >
            Save Preferences
          </button>

          {selectedGenres.length > 0 && (
            <button
              onClick={handleClear}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-6 rounded-xl shadow-md transition-all duration-200"
            >
              Clear All
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Favorite;
