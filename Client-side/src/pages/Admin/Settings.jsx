import { useState } from 'react';

const initialSettingsSections = [
  {
    id: 'general',
    title: 'General Settings',
    settings: [
      { id: 'siteName', label: 'Site Name', type: 'text', value: 'BizDirectory' },
      { id: 'siteDescription', label: 'Site Description', type: 'textarea', value: 'Your trusted business directory platform' },
      { id: 'contactEmail', label: 'Contact Email', type: 'email', value: 'contact@bizdirectory.com' },
    ],
  },
  {
    id: 'appearance',
    title: 'Appearance',
    settings: [
      { id: 'theme', label: 'Theme', type: 'select', value: 'light', options: ['light', 'dark', 'system'] },
      { id: 'primaryColor', label: 'Primary Color', type: 'color', value: '#4F46E5' },
    ],
  },
  {
    id: 'notifications',
    title: 'Notifications',
    settings: [
      { id: 'emailNotifications', label: 'Email Notifications', type: 'checkbox', value: true },
      { id: 'pushNotifications', label: 'Push Notifications', type: 'checkbox', value: false },
    ],
  },
];

function SettingsPage() {
  const [activeSection, setActiveSection] = useState('general');
  const [settingsSections, setSettingsSections] = useState(initialSettingsSections);

  const handleInputChange = (sectionId, settingId, newValue) => {
    setSettingsSections((prevSections) =>
      prevSections.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              settings: section.settings.map((setting) =>
                setting.id === settingId ? { ...setting, value: newValue } : setting
              ),
            }
          : section
      )
    );
  };

  const handleSubmit = (sectionId, e) => {
    e.preventDefault();
    // For now, changes are already in state. You can add persistence (e.g., localStorage) here if needed.
    alert(`Settings for ${settingsSections.find((s) => s.id === sectionId).title} saved!`);
  };

  return (
    <div className="pt-10 transition-all duration-300 ml-[68px] lg:ml-0">
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">Settings</h1>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Settings Navigation */}
        <nav className="w-full lg:w-64 bg-white rounded-lg shadow p-4">
          <ul className="space-y-1">
            {settingsSections.map((section) => (
              <li key={section.id}>
                <button
                  className={`w-full text-left px-4 py-2 rounded-md ${
                    activeSection === section.id
                      ? 'bg-indigo-50 text-indigo-600'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                  onClick={() => setActiveSection(section.id)}
                >
                  {section.title}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Settings Content */}
        <div className="flex-1">
          {settingsSections.map((section) => (
            <div
              key={section.id}
              className={`bg-white rounded-lg shadow p-6 ${
                activeSection === section.id ? 'block' : 'hidden'
              }`}
            >
              <h2 className="text-lg font-medium text-gray-900 mb-6">{section.title}</h2>
              <form className="space-y-6" onSubmit={(e) => handleSubmit(section.id, e)}>
                {section.settings.map((setting) => (
                  <div key={setting.id} className="flex flex-col">
                    <label htmlFor={setting.id} className="text-sm font-medium text-gray-700 mb-1">
                      {setting.label}
                    </label>
                    {setting.type === 'text' || setting.type === 'email' ? (
                      <input
                        type={setting.type}
                        id={setting.id}
                        value={setting.value}
                        onChange={(e) => handleInputChange(section.id, setting.id, e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      />
                    ) : setting.type === 'textarea' ? (
                      <textarea
                        id={setting.id}
                        value={setting.value}
                        onChange={(e) => handleInputChange(section.id, setting.id, e.target.value)}
                        rows={3}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      />
                    ) : setting.type === 'select' ? (
                      <select
                        id={setting.id}
                        value={setting.value}
                        onChange={(e) => handleInputChange(section.id, setting.id, e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      >
                        {setting.options?.map((option) => (
                          <option key={option} value={option}>
                            {option.charAt(0).toUpperCase() + option.slice(1)}
                          </option>
                        ))}
                      </select>
                    ) : setting.type === 'checkbox' ? (
                      <label className="inline-flex items-center mt-1">
                        <input
                          type="checkbox"
                          id={setting.id}
                          checked={setting.value}
                          onChange={(e) => handleInputChange(section.id, setting.id, e.target.checked)}
                          className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        />
                        <span className="ml-2 text-sm text-gray-600">Enable</span>
                      </label>
                    ) : setting.type === 'color' ? (
                      <input
                        type="color"
                        id={setting.id}
                        value={setting.value}
                        onChange={(e) => handleInputChange(section.id, setting.id, e.target.value)}
                        className="mt-1 block w-full h-10 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      />
                    ) : null}
                  </div>
                ))}
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SettingsPage;