import { useState } from 'react';
import { SwatchIcon, PhotoIcon, Cog6ToothIcon } from '@heroicons/react/24/outline';

export default function SuperThemeOptions() {
  const [activeTab, setActiveTab] = useState('general');
  const [settings, setSettings] = useState({
    primaryColor: '#3B82F6',
    secondaryColor: '#10B981',
    accentColor: '#F59E0B',
    backgroundColor: '#FFFFFF',
    textColor: '#1F2937',
    fontFamily: 'Inter',
    fontSize: '16',
    logoUrl: '',
    faviconUrl: '',
    headerLayout: 'default',
    footerLayout: 'default',
    sidebarPosition: 'left',
    enableDarkMode: false,
    enableAnimations: true,
    enableShadows: true,
    borderRadius: '8',
  });

  const handleSettingChange = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const colorPresets = [
    { name: 'Blue', primary: '#3B82F6', secondary: '#10B981' },
    { name: 'Purple', primary: '#8B5CF6', secondary: '#EC4899' },
    { name: 'Green', primary: '#10B981', secondary: '#3B82F6' },
    { name: 'Orange', primary: '#F59E0B', secondary: '#EF4444' },
    { name: 'Red', primary: '#EF4444', secondary: '#F59E0B' },
  ];

  const fontOptions = [
    'Inter', 'Roboto', 'Open Sans', 'Lato', 'Montserrat', 'Poppins', 'Source Sans Pro'
  ];

  const handlePreviewChanges = () => {
    console.log('Preview Changes:', settings);
    alert('Preview functionality would show live preview of changes');
  };

  const handleSaveChanges = () => {
    console.log('Saving Changes:', settings);
    alert('Settings saved successfully!');
  };

  const handleColorPresetClick = (preset) => {
    handleSettingChange('primaryColor', preset.primary);
    handleSettingChange('secondaryColor', preset.secondary);
  };

  const syncColorInputs = (colorKey, hexValue) => {
    if (/^#[0-9A-F]{6}$/i.test(hexValue)) {
      handleSettingChange(colorKey, hexValue);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <h1 className="text-2xl font-semibold text-gray-900">Theme Options</h1>
          <div className="flex gap-2 w-full sm:w-auto">
            <button 
              onClick={handlePreviewChanges}
              className="flex-1 sm:flex-none bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors"
            >
              Preview Changes
            </button>
            <button 
              onClick={handleSaveChanges}
              className="flex-1 sm:flex-none bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              Save Changes
            </button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Settings Navigation */}
          <nav className="w-full lg:w-64 bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <ul className="space-y-1">
              <li>
                <button
                  className={`w-full text-left px-4 py-2 rounded-md flex items-center transition-colors ${
                    activeTab === 'general'
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                  onClick={() => setActiveTab('general')}
                >
                  <Cog6ToothIcon className="h-5 w-5 mr-3" />
                  General
                </button>
              </li>
              <li>
                <button
                  className={`w-full text-left px-4 py-2 rounded-md flex items-center transition-colors ${
                    activeTab === 'colors'
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                  onClick={() => setActiveTab('colors')}
                >
                  <SwatchIcon className="h-5 w-5 mr-3" />
                  Colors
                </button>
              </li>
              <li>
                <button
                  className={`w-full text-left px-4 py-2 rounded-md flex items-center transition-colors ${
                    activeTab === 'typography'
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                  onClick={() => setActiveTab('typography')}
                >
                  <span className="h-5 w-5 mr-3 text-lg font-bold">Aa</span>
                  Typography
                </button>
              </li>
              <li>
                <button
                  className={`w-full text-left px-4 py-2 rounded-md flex items-center transition-colors ${
                    activeTab === 'layout'
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                  onClick={() => setActiveTab('layout')}
                >
                  <PhotoIcon className="h-5 w-5 mr-3" />
                  Layout
                </button>
              </li>
            </ul>
          </nav>

          {/* Settings Content */}
          <div className="flex-1">
            {activeTab === 'general' && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-lg font-medium text-gray-900 mb-6">General Settings</h2>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Site Logo URL
                    </label>
                    <input
                      type="url"
                      value={settings.logoUrl}
                      onChange={(e) => handleSettingChange('logoUrl', e.target.value)}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      placeholder="https://example.com/logo.png"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Favicon URL
                    </label>
                    <input
                      type="url"
                      value={settings.faviconUrl}
                      onChange={(e) => handleSettingChange('faviconUrl', e.target.value)}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      placeholder="https://example.com/favicon.ico"
                    />
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="enableDarkMode"
                        checked={settings.enableDarkMode}
                        onChange={(e) => handleSettingChange('enableDarkMode', e.target.checked)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <label htmlFor="enableDarkMode" className="ml-2 block text-sm text-gray-900">
                        Enable Dark Mode
                      </label>
                    </div>

                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="enableAnimations"
                        checked={settings.enableAnimations}
                        onChange={(e) => handleSettingChange('enableAnimations', e.target.checked)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <label htmlFor="enableAnimations" className="ml-2 block text-sm text-gray-900">
                        Enable Animations
                      </label>
                    </div>

                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="enableShadows"
                        checked={settings.enableShadows}
                        onChange={(e) => handleSettingChange('enableShadows', e.target.checked)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <label htmlFor="enableShadows" className="ml-2 block text-sm text-gray-900">
                        Enable Shadows
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Border Radius (px)
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="20"
                      value={settings.borderRadius}
                      onChange={(e) => handleSettingChange('borderRadius', e.target.value)}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>0px</span>
                      <span>{settings.borderRadius}px</span>
                      <span>20px</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'colors' && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-lg font-medium text-gray-900 mb-6">Color Settings</h2>
                
                <div className="mb-6">
                  <h3 className="text-md font-medium text-gray-700 mb-4">Color Presets</h3>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                    {colorPresets.map((preset) => (
                      <button
                        key={preset.name}
                        onClick={() => handleColorPresetClick(preset)}
                        className="p-3 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors"
                      >
                        <div className="flex space-x-1 mb-2">
                          <div 
                            className="w-4 h-4 rounded"
                            style={{ backgroundColor: preset.primary }}
                          ></div>
                          <div 
                            className="w-4 h-4 rounded"
                            style={{ backgroundColor: preset.secondary }}
                          ></div>
                        </div>
                        <span className="text-xs text-gray-600">{preset.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Primary Color
                      </label>
                      <div className="flex items-center space-x-3">
                        <input
                          type="color"
                          value={settings.primaryColor}
                          onChange={(e) => handleSettingChange('primaryColor', e.target.value)}
                          className="w-12 h-10 border border-gray-300 rounded cursor-pointer"
                        />
                        <input
                          type="text"
                          value={settings.primaryColor}
                          onChange={(e) => syncColorInputs('primaryColor', e.target.value)}
                          className="flex-1 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Secondary Color
                      </label>
                      <div className="flex items-center space-x-3">
                        <input
                          type="color"
                          value={settings.secondaryColor}
                          onChange={(e) => handleSettingChange('secondaryColor', e.target.value)}
                          className="w-12 h-10 border border-gray-300 rounded cursor-pointer"
                        />
                        <input
                          type="text"
                          value={settings.secondaryColor}
                          onChange={(e) => syncColorInputs('secondaryColor', e.target.value)}
                          className="flex-1 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Accent Color
                      </label>
                      <div className="flex items-center space-x-3">
                        <input
                          type="color"
                          value={settings.accentColor}
                          onChange={(e) => handleSettingChange('accentColor', e.target.value)}
                          className="w-12 h-10 border border-gray-300 rounded cursor-pointer"
                        />
                        <input
                          type="text"
                          value={settings.accentColor}
                          onChange={(e) => syncColorInputs('accentColor', e.target.value)}
                          className="flex-1 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Background Color
                      </label>
                      <div className="flex items-center space-x-3">
                        <input
                          type="color"
                          value={settings.backgroundColor}
                          onChange={(e) => handleSettingChange('backgroundColor', e.target.value)}
                          className="w-12 h-10 border border-gray-300 rounded cursor-pointer"
                        />
                        <input
                          type="text"
                          value={settings.backgroundColor}
                          onChange={(e) => syncColorInputs('backgroundColor', e.target.value)}
                          className="flex-1 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'typography' && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-lg font-medium text-gray-900 mb-6">Typography Settings</h2>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Font Family
                    </label>
                    <select 
                      value={settings.fontFamily}
                      onChange={(e) => handleSettingChange('fontFamily', e.target.value)}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                    >
                      {fontOptions.map((font) => (
                        <option key={font} value={font}>{font}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Base Font Size (px)
                    </label>
                    <input
                      type="range"
                      min="12"
                      max="24"
                      value={settings.fontSize}
                      onChange={(e) => handleSettingChange('fontSize', e.target.value)}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>12px</span>
                      <span>{settings.fontSize}px</span>
                      <span>24px</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Text Color
                    </label>
                    <div className="flex items-center space-x-3">
                      <input
                        type="color"
                        value={settings.textColor}
                        onChange={(e) => handleSettingChange('textColor', e.target.value)}
                        className="w-12 h-10 border border-gray-300 rounded cursor-pointer"
                      />
                      <input
                        type="text"
                        value={settings.textColor}
                        onChange={(e) => syncColorInputs('textColor', e.target.value)}
                        className="flex-1 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      />
                    </div>
                  </div>

                  {/* Typography Preview */}
                  <div className="mt-8 p-6 border border-gray-200 rounded-lg bg-gray-50">
                    <h3 className="text-sm font-medium text-gray-700 mb-4">Typography Preview</h3>
                    <div 
                      className="space-y-3"
                      style={{ 
                        fontFamily: settings.fontFamily,
                        color: settings.textColor,
                        fontSize: settings.fontSize + 'px'
                      }}
                    >
                      <h1 className="text-3xl font-bold">Heading 1 - The quick brown fox</h1>
                      <h2 className="text-2xl font-semibold">Heading 2 - The quick brown fox</h2>
                      <h3 className="text-xl font-medium">Heading 3 - The quick brown fox</h3>
                      <p className="text-base">Body text - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                      <p className="text-sm opacity-75">Small text - Ut enim ad minim veniam, quis nostrud exercitation.</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'layout' && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-lg font-medium text-gray-900 mb-6">Layout Settings</h2>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Header Layout
                    </label>
                    <select 
                      value={settings.headerLayout}
                      onChange={(e) => handleSettingChange('headerLayout', e.target.value)}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                    >
                      <option value="default">Default</option>
                      <option value="centered">Centered</option>
                      <option value="split">Split</option>
                      <option value="minimal">Minimal</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Footer Layout
                    </label>
                    <select 
                      value={settings.footerLayout}
                      onChange={(e) => handleSettingChange('footerLayout', e.target.value)}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                    >
                      <option value="default">Default</option>
                      <option value="minimal">Minimal</option>
                      <option value="columns">Columns</option>
                      <option value="centered">Centered</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Sidebar Position
                    </label>
                    <div className="flex gap-4">
                      <label className="flex items-center">
                        <input 
                          type="radio" 
                          name="sidebarPosition" 
                          value="left" 
                          checked={settings.sidebarPosition === 'left'}
                          onChange={(e) => handleSettingChange('sidebarPosition', e.target.value)}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300" 
                        />
                        <span className="ml-2 text-sm text-gray-900">Left</span>
                      </label>
                      <label className="flex items-center">
                        <input 
                          type="radio" 
                          name="sidebarPosition" 
                          value="right" 
                          checked={settings.sidebarPosition === 'right'}
                          onChange={(e) => handleSettingChange('sidebarPosition', e.target.value)}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300" 
                        />
                        <span className="ml-2 text-sm text-gray-900">Right</span>
                      </label>
                      <label className="flex items-center">
                        <input 
                          type="radio" 
                          name="sidebarPosition" 
                          value="none" 
                          checked={settings.sidebarPosition === 'none'}
                          onChange={(e) => handleSettingChange('sidebarPosition', e.target.value)}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300" 
                        />
                        <span className="ml-2 text-sm text-gray-900">None</span>
                      </label>
                    </div>
                  </div>

                  {/* Layout Preview */}
                  <div className="mt-8 p-6 border border-gray-200 rounded-lg bg-gray-50">
                    <h3 className="text-sm font-medium text-gray-700 mb-4">Layout Preview</h3>
                    <div className="space-y-4">
                      <div className="h-8 bg-blue-200 rounded flex items-center px-4 text-xs text-blue-800">Header</div>
                      <div className={`flex gap-4 ${settings.sidebarPosition === 'right' ? 'flex-row-reverse' : 'flex-row'}`}>
                        {settings.sidebarPosition !== 'none' && (
                          <div className="w-1/4 h-32 bg-gray-200 rounded flex items-center justify-center text-xs text-gray-600">
                            Sidebar
                          </div>
                        )}
                        <div className="flex-1 h-32 bg-green-100 rounded flex items-center justify-center text-xs text-green-800">
                          Main Content
                        </div>
                      </div>
                      <div className="h-8 bg-gray-300 rounded flex items-center px-4 text-xs text-gray-700">Footer</div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
