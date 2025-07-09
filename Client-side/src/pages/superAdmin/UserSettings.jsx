import { useState } from 'react';
import { BellIcon, ShieldCheckIcon, UserIcon, Cog6ToothIcon } from '@heroicons/react/24/outline';

// Navigation Component
function SettingsNav({ activeTab, setActiveTab }) {
  const navItems = [
    { id: 'account', label: 'Account', icon: UserIcon },
    { id: 'notifications', label: 'Notifications', icon: BellIcon },
    { id: 'security', label: 'Security & Privacy', icon: ShieldCheckIcon },
    { id: 'preferences', label: 'Preferences', icon: Cog6ToothIcon },
  ];

  return (
    <nav className="w-full lg:w-64 bg-white rounded-lg shadow p-4">
      <ul className="space-y-1">
        {navItems.map((item) => (
          <li key={item.id}>
            <button
              className={`w-full text-left px-4 py-2 rounded-md flex items-center ${
                activeTab === item.id ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'
              }`}
              onClick={() => setActiveTab(item.id)}
            >
              <item.icon className="h-5 w-5 mr-3" />
              {item.label}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}

// Account Settings Component
function AccountSettings({ settings, handleSettingChange, handleDeleteAccount }) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-lg font-medium text-gray-900 mb-6">Account Settings</h2>
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Profile Visibility</label>
          <select
            value={settings.profileVisibility}
            onChange={(e) => handleSettingChange('profileVisibility', e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="public">Public</option>
            <option value="private">Private</option>
            <option value="friends">Friends Only</option>
          </select>
        </div>
        <div className="space-y-4">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="dataSharing"
              checked={settings.dataSharing}
              onChange={(e) => handleSettingChange('dataSharing', e.target.checked)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="dataSharing" className="ml-2 block text-sm text-gray-900">
              Allow data sharing for analytics and improvements
            </label>
          </div>
        </div>
        <div className="border-t pt-6">
          <h3 className="text-md font-medium text-red-600 mb-4">Danger Zone</h3>
          <button
            onClick={handleDeleteAccount}
            className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
          >
            Delete Account
          </button>
          <p className="text-sm text-gray-500 mt-2">
            Once you delete your account, there is no going back. Please be certain.
          </p>
        </div>
      </div>
    </div>
  );
}

// Notification Preferences Component
function NotificationPreferences({ settings, handleSettingChange }) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-lg font-medium text-gray-900 mb-6">Notification Preferences</h2>
      <div className="space-y-6">
        <div>
          <h3 className="text-md font-medium text-gray-900 mb-4">Email Notifications</h3>
          <div className="space-y-3">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="emailNotifications"
                checked={settings.emailNotifications}
                onChange={(e) => handleSettingChange('emailNotifications', e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="emailNotifications" className="ml-2 block text-sm text-gray-900">
                General email notifications
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="marketingEmails"
                checked={settings.marketingEmails}
                onChange={(e) => handleSettingChange('marketingEmails', e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="marketingEmails" className="ml-2 block text-sm text-gray-900">
                Marketing and promotional emails
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="weeklyDigest"
                checked={settings.weeklyDigest}
                onChange={(e) => handleSettingChange('weeklyDigest', e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="weeklyDigest" className="ml-2 block text-sm text-gray-900">
                Weekly digest emails
              </label>
            </div>
          </div>
        </div>
        <div>
          <h3 className="text-md font-medium text-gray-900 mb-4">Push Notifications</h3>
          <div className="space-y-3">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="pushNotifications"
                checked={settings.pushNotifications}
                onChange={(e) => handleSettingChange('pushNotifications', e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="pushNotifications" className="ml-2 block text-sm text-gray-900">
                Browser push notifications
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="smsNotifications"
                checked={settings.smsNotifications}
                onChange={(e) => handleSettingChange('smsNotifications', e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="smsNotifications" className="ml-2 block text-sm text-gray-900">
                SMS notifications
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Security & Privacy Component
function SecurityPrivacy({ settings, handleSettingChange }) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-lg font-medium text-gray-900 mb-6">Security & Privacy</h2>
      <div className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="twoFactorAuth"
              checked={settings.twoFactorAuth}
              onChange={(e) => handleSettingChange('twoFactorAuth', e.target.checked)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="twoFactorAuth" className="ml-2 block text-sm text-gray-900">
              Enable two-factor authentication
            </label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="loginAlerts"
              checked={settings.loginAlerts}
              onChange={(e) => handleSettingChange('loginAlerts', e.target.checked)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="loginAlerts" className="ml-2 block text-sm text-gray-900">
              Send alerts for new login attempts
            </label>
          </div>
        </div>
        <div className="space-y-4">
          <button className="w-full text-left p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="font-medium text-gray-900">Change Password</h4>
                <p className="text-sm text-gray-600">Update your account password</p>
              </div>
              <span className="text-blue-600">→</span>
            </div>
          </button>
          <button className="w-full text-left p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="font-medium text-gray-900">Active Sessions</h4>
                <p className="text-sm text-gray-600">Manage your active login sessions</p>
              </div>
              <span className="text-blue-600">→</span>
            </div>
          </button>
          <button className="w-full text-left p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="font-medium text-gray-900">Download Your Data</h4>
                <p className="text-sm text-gray-600">Export all your account data</p>
              </div>
              <span className="text-blue-600">→</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}

// Preferences Component
function Preferences({ settings, handleSettingChange }) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-lg font-medium text-gray-900 mb-6">Preferences</h2>
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
            <select
              value={settings.language}
              onChange={(e) => handleSettingChange('language', e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="en">English</option>
              <option value="es">Spanish</option>
              <option value="fr">French</option>
              <option value="de">German</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Timezone</label>
            <select
              value={settings.timezone}
              onChange={(e) => handleSettingChange('timezone', e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="UTC">UTC</option>
              <option value="America/New_York">Eastern Time</option>
              <option value="America/Chicago">Central Time</option>
              <option value="America/Denver">Mountain Time</option>
              <option value="America/Los_Angeles">Pacific Time</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Date Format</label>
            <select
              value={settings.dateFormat}
              onChange={(e) => handleSettingChange('dateFormat', e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="MM/DD/YYYY">MM/DD/YYYY</option>
              <option value="DD/MM/YYYY">DD/MM/YYYY</option>
              <option value="YYYY-MM-DD">YYYY-MM-DD</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Theme</label>
            <select
              value={settings.theme}
              onChange={(e) => handleSettingChange('theme', e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
              <option value="auto">Auto</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}

// Main UserSettings Component
export default function SuperUserSettings() {
  const [activeTab, setActiveTab] = useState('account');
  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: false,
    smsNotifications: false,
    marketingEmails: true,
    weeklyDigest: true,
    twoFactorAuth: false,
    loginAlerts: true,
    dataSharing: false,
    profileVisibility: 'public',
    language: 'en',
    timezone: 'UTC',
    dateFormat: 'MM/DD/YYYY',
    theme: 'light',
  });

  const handleSettingChange = (key, value) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const handleSaveSettings = () => {
    alert('Settings saved successfully!');
  };

  const handleResetSettings = () => {
    if (confirm('Are you sure you want to reset all settings to default?')) {
      alert('Settings reset to default values');
    }
  };

  const handleDeleteAccount = () => {
    if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      alert('Account deletion process initiated. You will receive a confirmation email.');
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Account Settings</h1>
        <div className="flex gap-2">
          <button
            onClick={handleResetSettings}
            className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700"
          >
            Reset to Default
          </button>
          <button
            onClick={handleSaveSettings}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Save Changes
          </button>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row gap-6">
        <SettingsNav activeTab={activeTab} setActiveTab={setActiveTab} />
        <div className="flex-1">
          {activeTab === 'account' && (
            <AccountSettings
              settings={settings}
              handleSettingChange={handleSettingChange}
              handleDeleteAccount={handleDeleteAccount}
            />
          )}
          {activeTab === 'notifications' && (
            <NotificationPreferences settings={settings} handleSettingChange={handleSettingChange} />
          )}
          {activeTab === 'security' && (
            <SecurityPrivacy settings={settings} handleSettingChange={handleSettingChange} />
          )}
          {activeTab === 'preferences' && (
            <Preferences settings={settings} handleSettingChange={handleSettingChange} />
          )}
        </div>
      </div>
    </div>
  );
}