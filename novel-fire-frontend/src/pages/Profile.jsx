import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { authAPI } from '../api/auth';
import { useUserProfile, useUpdateProfile, useFollowers, useFollowing, useFollow, useUnfollow } from '../hooks/useUsers';

const Profile = () => {
  const { user, updateUser } = useAuth();
  const { data: profile } = useUserProfile();
  const { data: followers } = useFollowers(user?._id);
  const { data: following } = useFollowing(user?._id);
  const updateProfile = useUpdateProfile();
  const followMut = useFollow();
  const unfollowMut = useUnfollow();

  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    username: profile?.username || '',
    bio: profile?.bio || '',
    avatar: profile?.avatar || '',
    social_website: profile?.social?.website || '',
    social_twitter: profile?.social?.twitter || '',
    social_github: profile?.social?.github || '',
    social_instagram: profile?.social?.instagram || '',
    social_facebook: profile?.social?.facebook || '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    // Validate passwords match if provided
    if (formData.password && formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    // Only include password if it was provided
    const updateData = {
      name: formData.name,
      email: formData.email,
      username: formData.username,
      bio: formData.bio,
      avatar: formData.avatar,
      social: {
        website: formData.social_website || undefined,
        twitter: formData.social_twitter || undefined,
        github: formData.social_github || undefined,
        instagram: formData.social_instagram || undefined,
        facebook: formData.social_facebook || undefined,
      },
    };

    if (formData.password) {
      updateData.password = formData.password;
    }

    try {
      setLoading(true);
      const updatedUser = await updateProfile.mutateAsync(updateData);
      updateUser(updatedUser);

      setIsEditing(false);
      setFormData({
        ...formData,
        password: '',
        confirmPassword: ''
      });
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const cancelEdit = () => {
    setIsEditing(false);
    setFormData({
      name: user?.name || '',
      email: user?.email || '',
      username: profile?.username || '',
      bio: profile?.bio || '',
      avatar: profile?.avatar || '',
      social_website: profile?.social?.website || '',
      social_twitter: profile?.social?.twitter || '',
      social_github: profile?.social?.github || '',
      social_instagram: profile?.social?.instagram || '',
      social_facebook: profile?.social?.facebook || '',
      password: '',
      confirmPassword: ''
    });

    setError(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:px-6">
              <h1 className="text-3xl font-bold text-gray-900">Profile</h1>
              <p className="mt-1 text-sm text-gray-600">
                Manage your account settings and preferences
              </p>
            </div>

            {isEditing ? (
              <form onSubmit={handleSubmit}>
                <div className="border-t border-gray-200">
                  <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <label htmlFor="name" className="text-sm font-medium text-gray-500">Full name</label>
                    <div className="mt-1 sm:mt-0 sm:col-span-2">
                      <input
                        type="text"
                        name="name"
                        id="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="max-w-lg block w-full shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                        required
                      />
                    </div>
                  </div>
                  <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <label htmlFor="username" className="text-sm font-medium text-gray-500">Username</label>
                    <div className="mt-1 sm:mt-0 sm:col-span-2">
                      <input
                        type="text"
                        name="username"
                        id="username"
                        value={formData.username}
                        onChange={handleChange}
                        className="max-w-lg block w-full shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                        placeholder="your_handle"
                      />
                    </div>
                  </div>

                  <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <label htmlFor="email" className="text-sm font-medium text-gray-500">Email address</label>
                    <div className="mt-1 sm:mt-0 sm:col-span-2">
                      <input
                        type="email"
                        name="email"
                        id="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="max-w-lg block w-full shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                        required
                      />
                    </div>
                  </div>

                  <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <label htmlFor="avatar" className="text-sm font-medium text-gray-500">Avatar URL</label>
                    <div className="mt-1 sm:mt-0 sm:col-span-2">
                      <input
                        type="url"
                        name="avatar"
                        id="avatar"
                        value={formData.avatar}
                        onChange={handleChange}
                        className="max-w-lg block w-full shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm border-gray-300 rounded-md"
                        placeholder="https://..."
                      />
                    </div>
                  </div>

                  <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <label htmlFor="bio" className="text-sm font-medium text-gray-500">Bio</label>
                    <div className="mt-1 sm:mt-0 sm:col-span-2">
                      <textarea
                        name="bio"
                        id="bio"
                        rows="3"
                        value={formData.bio}
                        onChange={handleChange}
                        className="max-w-lg block w-full shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm border-gray-300 rounded-md"
                        placeholder="A short bio..."
                      />
                    </div>
                  </div>

                  <div className="bg-gray-50 px-4 py-5 sm:px-6">
                    <label className="block text-sm font-medium text-gray-500 mb-2">Social Links</label>
                    <div className="grid sm:grid-cols-2 gap-3">
                      <input type="url" name="social_website" value={formData.social_website} onChange={handleChange} className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" placeholder="Website" />
                      <input type="text" name="social_twitter" value={formData.social_twitter} onChange={handleChange} className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" placeholder="Twitter handle" />
                      <input type="text" name="social_github" value={formData.social_github} onChange={handleChange} className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" placeholder="GitHub username" />
                      <input type="text" name="social_instagram" value={formData.social_instagram} onChange={handleChange} className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" placeholder="Instagram" />
                      <input type="text" name="social_facebook" value={formData.social_facebook} onChange={handleChange} className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" placeholder="Facebook" />
                    </div>
                  </div>

                  <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <label htmlFor="password" className="text-sm font-medium text-gray-500">New password</label>
                    <div className="mt-1 sm:mt-0 sm:col-span-2">
                      <input
                        type="password"
                        name="password"
                        id="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="max-w-lg block w-full shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                        placeholder="Leave blank to keep current password"
                      />
                    </div>
                  </div>

                  <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <label htmlFor="confirmPassword" className="text-sm font-medium text-gray-500">Confirm password</label>
                    <div className="mt-1 sm:mt-0 sm:col-span-2">
                      <input
                        type="password"
                        name="confirmPassword"
                        id="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className="max-w-lg block w-full shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                        placeholder="Leave blank to keep current password"
                      />
                    </div>
                  </div>

                  {error && (
                    <div className="bg-red-50 px-4 py-3 sm:px-6">
                      <p className="text-sm text-red-600">{error}</p>
                    </div>
                  )}
                </div>

                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6 space-x-3">
                  <button
                    type="button"
                    onClick={cancelEdit}
                    className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                  >
                    {loading ? 'Saving...' : 'Save Changes'}
                  </button>
                </div>
              </form>
            ) : (
              <>
                <div className="border-t border-gray-200">
                  <dl>
                    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">Full name</dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {profile?.name || user?.name || 'Not provided'}
                      </dd>
                    </div>
                    <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">Username</dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {profile?.username || 'Not set'}
                      </dd>
                    </div>
                    <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">Email address</dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {profile?.email || user?.email || 'Not provided'}
                      </dd>
                    </div>
                    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">Bio</dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {profile?.bio || '—'}
                      </dd>
                    </div>
                    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">Member since</dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {profile?.createdAt ? new Date(profile.createdAt).toLocaleDateString() : (user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'Unknown')}
                      </dd>
                    </div>
                  </dl>
                </div>
                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                  <button
                    onClick={() => setIsEditing(true)}
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Edit Profile
                  </button>
                </div>
              </>
            )}
          </div>
          {/* Followers & Following */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white shadow rounded-lg">
              <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Followers ({followers?.length || 0})</h3>
              </div>
              <div className="border-t border-gray-200 divide-y">
                {(followers || []).map((u) => (
                  <div key={u._id} className="px-4 py-4 sm:px-6 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <img src={u.avatar || 'https://via.placeholder.com/40'} alt={u.name} className="h-10 w-10 rounded-full object-cover" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">{u.name}</p>
                        <p className="text-xs text-gray-500">@{u.username || 'user'}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => followMut.mutate(u._id)}
                      className="px-3 py-1 text-sm rounded-md border border-gray-300 hover:bg-gray-50"
                    >
                      Follow back
                    </button>
                  </div>
                ))}
                {(!followers || followers.length === 0) && (
                  <div className="px-4 py-6 text-sm text-gray-500">No followers yet.</div>
                )}
              </div>
            </div>
            <div className="bg-white shadow rounded-lg">
              <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Following ({following?.length || 0})</h3>
              </div>
              <div className="border-t border-gray-200 divide-y">
                {(following || []).map((u) => (
                  <div key={u._id} className="px-4 py-4 sm:px-6 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <img src={u.avatar || 'https://via.placeholder.com/40'} alt={u.name} className="h-10 w-10 rounded-full object-cover" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">{u.name}</p>
                        <p className="text-xs text-gray-500">@{u.username || 'user'}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => unfollowMut.mutate(u._id)}
                      className="px-3 py-1 text-sm rounded-md border border-gray-300 hover:bg-gray-50"
                    >
                      Unfollow
                    </button>
                  </div>
                ))}
                {(!following || following.length === 0) && (
                  <div className="px-4 py-6 text-sm text-gray-500">You're not following anyone yet.</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;