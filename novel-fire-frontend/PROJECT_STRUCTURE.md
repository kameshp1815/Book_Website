# Novel Fire Frontend - Project Structure

## 📁 Complete Project Structure

```
novel-fire-frontend/
├── public/
│   └── vite.svg
├── src/
│   ├── api/                    # API Layer
│   │   ├── auth.js            # Authentication API calls
│   │   ├── books.js           # Books API endpoints
│   │   ├── client.js          # Axios configuration & interceptors
│   │   └── library.js         # Library management API
│   │
│   ├── assets/                 # Static Assets
│   │   └── react.svg          # React logo
│   │
│   ├── components/             # Reusable UI Components
│   │   ├── Footer.jsx         # Site footer with links
│   │   ├── Layout.jsx         # Main layout wrapper
│   │   ├── Loader.jsx         # Loading states (5 variants)
│   │   ├── Navbar.jsx         # Navigation with mobile menu
│   │   ├── ProtectedRoute.jsx # Route authentication guard
│   │   └── index.js           # Component exports
│   │
│   ├── context/               # React Context Providers
│   │   └── AuthContext.jsx    # Authentication state management
│   │
│   ├── hooks/                 # Custom React Hooks
│   │   ├── useBooks.js        # Books data fetching
│   │   └── useLibrary.js      # Library management
│   │
│   ├── pages/                 # Route Components
│   │   ├── BookDetails.jsx    # Individual book page
│   │   ├── Books.jsx          # Books catalog with search
│   │   ├── Dashboard.jsx      # User dashboard
│   │   ├── Library.jsx        # Personal library
│   │   ├── Login.jsx          # Authentication form
│   │   ├── Profile.jsx        # User profile management
│   │   └── Register.jsx       # User registration
│   │
│   ├── utils/                 # Utility Functions
│   │   └── queryClient.js     # React Query configuration
│   │
│   ├── App.jsx                # Main app component with routing
│   ├── index.css              # Global styles with Tailwind
│   └── main.jsx               # React app entry point
│
├── .env                       # Environment variables
├── .gitignore                 # Git ignore rules
├── index.html                 # HTML template
├── package.json               # Dependencies and scripts
├── postcss.config.js          # PostCSS configuration
├── PROJECT_STRUCTURE.md       # This file
├── README.md                  # Project documentation
├── tailwind.config.js         # Tailwind CSS configuration
└── vite.config.js             # Vite build configuration
```

## 🧩 Component Architecture

### Layout Components
- **Layout**: Main wrapper with navbar and footer
- **Navbar**: Responsive navigation with mobile menu
- **Footer**: Site footer with links and branding

### Utility Components  
- **ProtectedRoute**: Authentication guard for routes
- **Loader**: 5 loading variants (Page, Button, Card, Inline, Default)

### Page Components
All pages are fully functional with proper error handling and loading states.

## 🔗 API Integration

### Axios Client (`/api/client.js`)
- Base URL configuration
- Request/response interceptors
- Automatic token handling
- Error handling with redirects

### API Services
- **Auth**: Login, register, profile management
- **Books**: CRUD operations, search, filtering
- **Library**: Add/remove books from personal collection

## 🎨 Styling System

### Tailwind Configuration
- Custom primary color palette
- Inter font family
- Form plugin integration
- Responsive breakpoints

### CSS Architecture
```css
/* Base Layer */
- Global element styling
- Font and color defaults

/* Component Layer */
- .btn (base button class)
- .btn-primary (primary variant)
- .btn-secondary (secondary variant)
```

## 🛣️ Routing Structure

```javascript
Routes:
├── / (public) → Redirects to /books
├── /login (public) → User authentication
├── /register (public) → User registration  
├── /books (public) → Books catalog
├── /book/:id (public) → Book details
├── /dashboard (protected) → User dashboard
├── /library (protected) → Personal library
├── /profile (protected) → Profile management
└── * (404) → Not found page
```

## 🔐 Authentication Flow

1. **Login/Register** → JWT token received
2. **Token Storage** → localStorage + context state
3. **API Requests** → Automatic token attachment
4. **Route Protection** → ProtectedRoute component
5. **Token Refresh** → Automatic on 401 errors

## 📱 Responsive Design

### Breakpoints
- **Mobile**: < 768px (stacked layout, hamburger menu)
- **Tablet**: 768px - 1024px (partial desktop features)
- **Desktop**: > 1024px (full feature set)

### Mobile Features
- Collapsible navigation menu
- Touch-friendly buttons and links
- Optimized content layout
- Swipe-friendly interfaces

## 🚀 Performance Optimizations

### React Query
- Automatic caching and background updates
- Optimistic updates for better UX
- Stale-while-revalidate strategy
- Query invalidation on mutations

### Code Organization
- Modular component structure
- Centralized API layer
- Custom hooks for reusability
- Context for global state

## 🛠️ Development Workflow

### Available Scripts
```bash
npm run dev     # Development server
npm run build   # Production build  
npm run preview # Preview production build
```

### Code Standards
- **Components**: PascalCase, JSX extension
- **Hooks**: camelCase with 'use' prefix
- **Files**: kebab-case for utilities
- **CSS**: BEM-inspired class naming

### Component Structure
```javascript
/**
 * Component documentation
 */
import statements...

const ComponentName = ({ props }) => {
  // Hooks
  // State
  // Effects
  // Handlers
  
  // Early returns (loading, error)
  // Main render
};

export default ComponentName;
```

## 🎯 Production Ready Features

### Error Handling
- Global error boundaries
- Form validation with user feedback
- API error handling with user-friendly messages
- Graceful fallbacks for failed operations

### Security
- JWT token management
- XSS prevention via React
- CSRF protection through SPA architecture
- Secure HTTP-only cookie support ready

### Accessibility
- ARIA labels on interactive elements
- Screen reader support
- Keyboard navigation
- Focus management
- Semantic HTML structure

### SEO
- Proper meta tags structure
- Clean URL routing
- Server-side rendering ready
- Semantic markup

## 📦 Dependencies

### Core Dependencies
```json
{
  "react": "^18.x",
  "react-dom": "^18.x", 
  "react-router-dom": "^6.x",
  "@tanstack/react-query": "^5.x",
  "axios": "^1.x",
  "tailwindcss": "^3.x"
}
```

### Development Dependencies
```json
{
  "vite": "^5.x",
  "@vitejs/plugin-react": "^4.x",
  "autoprefixer": "^10.x",
  "postcss": "^8.x"
}
```

This architecture provides a solid foundation for scaling the Novel Fire application while maintaining code quality, performance, and developer experience.