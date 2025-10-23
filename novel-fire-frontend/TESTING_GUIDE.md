# 🧪 Novel Fire Testing Guide

## ✅ Summary of Fixes Applied

### Backend Fixes Applied:
1. **✅ Added missing `getBookById` route** - Books can now be accessed individually at `/api/books/:id`
2. **✅ Fixed CORS configuration** - Frontend (localhost:5173) can now communicate with backend
3. **✅ Added Morgan logging** - All API requests are now logged for debugging
4. **✅ Created uploads directory** - Cover image uploads will work properly
5. **✅ All route files verified** - Auth, Books, Chapters, Library, Reviews, Users all present

### Frontend Configuration Verified:
1. **✅ API client properly configured** - Points to `http://localhost:5000/api`
2. **✅ Authentication interceptors working** - JWT tokens automatically attached
3. **✅ Environment variables set** - VITE_API_URL correctly configured

## 🚀 How to Test the Complete Application

### Step 1: Start Backend Server
```powershell
# In backend directory
cd D:\book_personal-main\book_personal-main\novel-fire-backend
npm run dev
```

You should see:
```
Server running on port 5000
MongoDB Connected: localhost
```

### Step 2: Start Frontend Server
```powershell
# In frontend directory (new terminal)
cd D:\book_personal-main\book_personal-main\novel-fire-frontend
npm run dev
```

You should see:
```
Local:   http://localhost:5173/
```

### Step 3: Test Core Functionality

#### 📝 User Registration & Login
1. Go to `http://localhost:5173/register`
2. Create a new account
3. Login with the credentials
4. Verify you're redirected to dashboard

#### 📚 Book Creation & Management
1. Navigate to **"Create Book"** (should be in navigation)
2. Fill out book details:
   - Title: "My Test Book"
   - Author: "Test Author"
   - Description: "A description over 50 characters long to meet validation requirements"
   - Select 1-3 genres
   - Upload cover image (now supports up to 1920x1080px as requested)
3. Click **"Publish Book"**
4. Verify book appears in **"My Books"** page

#### 📖 Chapter Management
1. From **"My Books"**, click **"Manage Chapters"** on your book
2. Add a new chapter:
   - Title: "Chapter 1"
   - Content: Write some test content
3. Click **"Add Chapter"**
4. Verify chapter appears in the list
5. Test editing and deleting chapters

#### 📈 Author Dashboard
1. Visit **"Author Dashboard"**
2. Verify statistics show:
   - Number of books created
   - Number of chapters written
   - Recent activity

## 🔍 API Endpoints Testing

If you want to test API endpoints directly:

### Test Basic Connectivity
```powershell
# Test server health
Invoke-WebRequest -Uri "http://localhost:5000" -UseBasicParsing

# Test books endpoint
Invoke-WebRequest -Uri "http://localhost:5000/api/books" -UseBasicParsing
```

### Test Authentication
```powershell
# Register new user
$headers = @{ 'Content-Type' = 'application/json' }
$body = @{
    name = "Test User"
    email = "test@example.com"
    password = "123456"
} | ConvertTo-Json

Invoke-WebRequest -Uri "http://localhost:5000/api/auth/register" -Method POST -Headers $headers -Body $body -UseBasicParsing
```

## 🐛 Common Issues & Solutions

### Backend Won't Start
- ✅ **MongoDB Service**: Ensure MongoDB is running (`Get-Service *mongo*`)
- ✅ **Dependencies**: Run `npm install` in backend directory
- ✅ **Environment**: Check `.env` file exists with correct MongoDB URI

### Frontend Can't Connect to Backend
- ✅ **CORS**: Fixed in server.js to allow localhost:5173
- ✅ **API URL**: Verified in frontend `.env` file
- ✅ **Network**: Both servers must be running simultaneously

### Image Upload Issues
- ✅ **Uploads Directory**: Created at `/novel-fire-backend/uploads`
- ✅ **File Size**: Now supports larger images (1920x1080px)
- ✅ **File Types**: Only image files accepted (jpg, png, gif, etc.)

### Authentication Problems
- ✅ **JWT Secret**: Configured in backend `.env`
- ✅ **Token Storage**: Stored in localStorage on frontend
- ✅ **Protected Routes**: Middleware properly configured

## 🎯 Key Features Ready for Testing

1. **✅ User Registration & Login**
2. **✅ Book Creation with Cover Images** (now 1920x1080px)
3. **✅ Chapter Management** (Add, Edit, Delete, Reorder)
4. **✅ Author Dashboard** with statistics
5. **✅ Book Publishing Workflow**
6. **✅ Protected Routes** (authentication required)
7. **✅ File Upload System** for cover images
8. **✅ Responsive Design** with Tailwind CSS

## 📊 Expected Test Results

After completing the tests above, you should have:
- ✅ A working user account
- ✅ At least one published book
- ✅ At least one chapter in your book
- ✅ Statistics showing in author dashboard
- ✅ Cover image displayed properly
- ✅ All navigation working smoothly

## 🔧 Next Steps

If everything works as expected:
1. The frontend and backend are fully connected
2. Book publishing and chapter management are functional
3. Image uploads work with your requested 1920x1080px size
4. The application is ready for further development or deployment

Any issues encountered during testing can be debugged using the Morgan logs now enabled in the backend console.