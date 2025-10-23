# Novel Fire Frontend

A modern React frontend for the Novel Fire book reading platform built with Vite, React Router, Tailwind CSS, and React Query.

## Features

- **Authentication System**: Login/Register with JWT tokens
- **Book Browsing**: Search and filter books by genre  
- **Personal Library**: Save books to your personal collection
- **User Dashboard**: Personalized reading statistics and quick actions
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **Modern Stack**: React 18, Vite, React Router v6, React Query

## Tech Stack

- **Frontend Framework**: React 18 with Vite
- **Routing**: React Router v6 with protected routes
- **State Management**: React Context API for auth state
- **Data Fetching**: React Query (@tanstack/react-query) with caching
- **HTTP Client**: Axios with interceptors
- **Styling**: Tailwind CSS with custom components
- **Build Tool**: Vite for fast development and building

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Novel Fire Backend running on http://localhost:5000

### Installation

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Configure environment variables**:
   The `.env` file is already configured with default values:
   ```env
   VITE_API_URL=http://localhost:5000
   VITE_APP_NAME=Novel Fire
   VITE_APP_VERSION=1.0.0
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. **Open your browser**:
   Navigate to `http://localhost:5173`

## Routes

- `/` - Redirects to `/books`
- `/login` - User login page
- `/register` - User registration page
- `/books` - Public books listing with search/filter
- `/book/:id` - Individual book details page
- `/dashboard` - User dashboard (protected)
- `/library` - User's personal library (protected)
- `/profile` - User profile management (protected)

## Project Structure

```
src/
├── api/           # API client and service functions
├── components/    # Reusable UI components  
├── context/       # React Context providers
├── hooks/         # Custom React hooks
├── pages/         # Page components
├── utils/         # Utility functions
├── assets/        # Static assets
└── App.jsx        # Main app component with routing
```

## Development

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
