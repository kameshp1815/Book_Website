import { useEffect, useState } from 'react';
import { notificationsAPI } from '../api/notifications';

const NotificationsBell = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([]);
  const [unread, setUnread] = useState(0);

  const load = async () => {
    setLoading(true);
    try {
      const data = await notificationsAPI.list({ limit: 10 });
      setItems(data);
      setUnread(data.filter((n) => !n.read).length);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    const id = setInterval(load, 20000);
    return () => clearInterval(id);
  }, []);

  const openDropdown = async () => {
    setOpen((v) => !v);
    if (!open) await load();
  };

  const markAll = async () => {
    await notificationsAPI.markAllRead();
    await load();
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={openDropdown}
        className="relative p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-800 transition"
        aria-label="Notifications"
      >
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 006 14h12a1 1 0 00.707-1.707L18 11.586V8a6 6 0 00-6-6zm0 20a3 3 0 01-3-3h6a3 3 0 01-3 3z"/></svg>
        {unread > 0 && (
          <span className="absolute -top-1 -right-1 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-white bg-red-600 rounded-full">
            {unread}
          </span>
        )}
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-md shadow-lg z-50">
          <div className="flex items-center justify-between px-3 py-2 border-b border-gray-200 dark:border-gray-800">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-200">Notifications</span>
            <button onClick={markAll} className="text-xs text-primary-600 hover:underline">Mark all as read</button>
          </div>
          <div className="max-h-80 overflow-auto divide-y divide-gray-100 dark:divide-gray-800">
            {loading ? (
              <div className="p-4 text-sm text-gray-500">Loading...</div>
            ) : items.length === 0 ? (
              <div className="p-4 text-sm text-gray-500">No notifications</div>
            ) : (
              items.map((n) => (
                <div key={n._id} className={`p-3 ${n.read ? 'opacity-70' : ''}`}>
                  <div className="text-sm font-medium text-gray-900 dark:text-gray-100">{n.title}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">{n.body}</div>
                  <div className="mt-1 text-xs text-gray-400">{new Date(n.createdAt).toLocaleString()}</div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationsBell;
