# Novel Fire Backend

This is a starter backend for the Novel Fire application using Node.js, Express and MongoDB (Mongoose).

Quick start

1. Copy `.env.example` to `.env` and fill in values.
2. Run `npm install`.
3. Start the server: `npm run dev` (with nodemon) or `node server.js`.

Available routes

- POST /api/auth/register
- POST /api/auth/login
- GET /api/users/profile (protected)
- GET /api/books
- POST /api/books (protected)
- GET /api/chapters/book/:bookId
- POST /api/chapters (protected)
- GET /api/reviews/book/:bookId
- POST /api/reviews (protected)

Notes

- This project includes basic models and controllers as starting points. Add validations and more robust error handling as needed.
