import { useState } from "react";
import { useAdminAuth } from "../../context/AdminAuthContext";

const AdminSettings = () => {
  const { admin } = useAdminAuth();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [newsletter, setNewsletter] = useState(false);

  return (
    <div data-testid="admin-settings-page" className="space-y-6">
      <div>
        <h1 data-testid="admin-settings-heading" className="text-3xl font-bold text-slate-800">Settings</h1>
        <p className="text-slate-500 mt-2">
          Configure your admin experience and account preferences.
        </p>
      </div>

      <section data-testid="admin-settings-section" className="grid gap-6 xl:grid-cols-3">
        <div data-testid="admin-profile-panel" className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-700">Admin Profile</h2>
          <p className="mt-4 text-slate-600">Name</p>
          <p className="text-slate-900 font-medium">{admin?.name}</p>
          <p className="mt-4 text-slate-600">Email</p>
          <p className="text-slate-900 font-medium">{admin?.email}</p>
          <p className="mt-4 text-slate-600">Role</p>
          <p className="text-slate-900 font-medium">Administrator</p>
        </div>

        <div data-testid="admin-preferences-panel" className="xl:col-span-2 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-700">Preferences</h2>
          <div className="mt-6 space-y-4">
            <label className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4">
              <div>
                <p className="font-medium text-slate-800">Notifications</p>
                <p className="text-sm text-slate-500">Receive admin alerts and inbox updates.</p>
              </div>
              <input
                type="checkbox"
                checked={notificationsEnabled}
                onChange={() => setNotificationsEnabled(!notificationsEnabled)}
                className="h-5 w-5 rounded border-slate-300 text-blue-600"
              />
            </label>

            <label className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4">
              <div>
                <p className="font-medium text-slate-800">Weekly Summary</p>
                <p className="text-sm text-slate-500">Receive a digest email with blog insights.</p>
              </div>
              <input
                type="checkbox"
                checked={newsletter}
                onChange={() => setNewsletter(!newsletter)}
                className="h-5 w-5 rounded border-slate-300 text-blue-600"
              />
            </label>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AdminSettings;
