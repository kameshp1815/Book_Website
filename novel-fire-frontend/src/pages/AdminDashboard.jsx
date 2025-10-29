import { useAuth } from '../context/AuthContext';

const AdminDashboard = () => {
  const { user } = useAuth();
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-white shadow rounded-lg">
            <div className="px-6 py-4 border-b border-gray-200">
              <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="mt-1 text-sm text-gray-600">Welcome, {user?.name}. Manage the platform and users here.</p>
            </div>
            <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="border rounded-lg p-4">
                <h3 className="font-medium text-gray-900 mb-2">Overview</h3>
                <p className="text-sm text-gray-600">This is a placeholder admin dashboard. Add analytics and management tools here.</p>
              </div>
              <div className="border rounded-lg p-4">
                <h3 className="font-medium text-gray-900 mb-2">Users</h3>
                <p className="text-sm text-gray-600">Coming soon: user management, role assignments.</p>
              </div>
              <div className="border rounded-lg p-4">
                <h3 className="font-medium text-gray-900 mb-2">Content</h3>
                <p className="text-sm text-gray-600">Coming soon: moderation, featured books, reports.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
