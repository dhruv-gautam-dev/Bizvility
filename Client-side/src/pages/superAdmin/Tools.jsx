import React, { useState } from 'react';
import { WrenchScrewdriverIcon, DocumentArrowDownIcon, CloudArrowUpIcon, TrashIcon, Cog6ToothIcon } from '@heroicons/react/24/outline';

const tools = [
  {
    id: 1,
    name: 'Database Backup',
    description: 'Create a complete backup of your database',
    category: 'Backup',
    lastRun: '2024-01-20 10:30 AM',
    status: 'Ready',
    icon: DocumentArrowDownIcon
  },
  {
    id: 2,
    name: 'Import/Export Data',
    description: 'Import or export listings, users, and other data',
    category: 'Data Management',
    lastRun: '2024-01-19 3:45 PM',
    status: 'Ready',
    icon: CloudArrowUpIcon
  },
  {
    id: 3,
    name: 'Cache Management',
    description: 'Clear and manage application cache',
    category: 'Performance',
    lastRun: '2024-01-20 9:15 AM',
    status: 'Ready',
    icon: TrashIcon
  },
  {
    id: 4,
    name: 'System Maintenance',
    description: 'Run system maintenance and optimization tasks',
    category: 'Maintenance',
    lastRun: '2024-01-18 11:00 PM',
    status: 'Running',
    icon: Cog6ToothIcon
  },
  {
    id: 5,
    name: 'SEO Tools',
    description: 'Generate sitemaps and optimize SEO settings',
    category: 'SEO',
    lastRun: '2024-01-17 2:30 PM',
    status: 'Ready',
    icon: WrenchScrewdriverIcon
  }
];

const systemInfo = {
  phpVersion: '8.1.2',
  mysqlVersion: '8.0.28',
  serverSpace: '45.2 GB / 100 GB',
  memoryUsage: '512 MB / 2 GB',
  activeUsers: 1247,
  totalListings: 2847,
  lastBackup: '2024-01-20 10:30 AM',
  systemStatus: 'Healthy'
};

export default function SuperTools() {
  const [activeTab, setActiveTab] = useState('tools');
  const [runningTool, setRunningTool] = useState(null);

  const handleRunTool = (toolId) => {
    setRunningTool(toolId);
    setTimeout(() => {
      setRunningTool(null);
    }, 3000);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Ready': return 'bg-green-100 text-green-800';
      case 'Running': return 'bg-blue-100 text-blue-800';
      case 'Error': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">System Tools</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
          Run All Maintenance
        </button>
      </div>

      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('tools')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'tools'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            System Tools
          </button>
          <button
            onClick={() => setActiveTab('info')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'info'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            System Information
          </button>
          <button
            onClick={() => setActiveTab('logs')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'logs'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            System Logs
          </button>
        </nav>
      </div>

      {activeTab === 'tools' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool) => {
            const Icon = tool.icon;
            const isRunning = runningTool === tool.id || tool.status === 'Running';

            return (
              <div key={tool.id} className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="flex-shrink-0">
                    <Icon className="h-8 w-8 text-blue-500" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-medium text-gray-900">{tool.name}</h3>
                    <span className="px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                      {tool.category}
                    </span>
                  </div>
                </div>

                <p className="text-gray-600 mb-4">{tool.description}</p>

                <div className="flex items-center justify-between mb-4">
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(tool.status)}`}>
                    {isRunning ? 'Running...' : tool.status}
                  </span>
                  <span className="text-sm text-gray-500">Last run: {tool.lastRun}</span>
                </div>

                <button
                  onClick={() => handleRunTool(tool.id)}
                  disabled={isRunning}
                  className={`w-full py-2 px-4 rounded text-sm font-medium ${
                    isRunning
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  {isRunning ? 'Running...' : 'Run Tool'}
                </button>
              </div>
            );
          })}
        </div>
      )}

      {activeTab === 'info' && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-6">System Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">PHP Version:</span>
                  <span className="font-medium">{systemInfo.phpVersion}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">MySQL Version:</span>
                  <span className="font-medium">{systemInfo.mysqlVersion}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Server Space:</span>
                  <span className="font-medium">{systemInfo.serverSpace}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Memory Usage:</span>
                  <span className="font-medium">{systemInfo.memoryUsage}</span>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Active Users:</span>
                  <span className="font-medium">{systemInfo.activeUsers.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Listings:</span>
                  <span className="font-medium">{systemInfo.totalListings.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Last Backup:</span>
                  <span className="font-medium">{systemInfo.lastBackup}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">System Status:</span>
                  <span className="font-medium text-green-600">{systemInfo.systemStatus}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-6">Performance Metrics</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-gray-600">Server Space Usage</span>
                  <span className="text-sm text-gray-600">45.2%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: '45.2%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-gray-600">Memory Usage</span>
                  <span className="text-sm text-gray-600">25.6%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full" style={{ width: '25.6%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-gray-600">CPU Usage</span>
                  <span className="text-sm text-gray-600">12.3%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-yellow-600 h-2 rounded-full" style={{ width: '12.3%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'logs' && (
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">System Logs</h3>
          </div>
          <div className="p-6 space-y-4">
            <div className="flex items-center justify-between p-3 bg-green-50 rounded">
              <div>
                <span className="text-sm font-medium text-green-800">Database backup completed successfully</span>
                <div className="text-xs text-green-600">2024-01-20 10:30:15</div>
              </div>
              <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">Success</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded">
              <div>
                <span className="text-sm font-medium text-blue-800">Cache cleared successfully</span>
                <div className="text-xs text-blue-600">2024-01-20 09:15:42</div>
              </div>
              <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">Info</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-yellow-50 rounded">
              <div>
                <span className="text-sm font-medium text-yellow-800">High memory usage detected</span>
                <div className="text-xs text-yellow-600">2024-01-19 18:22:33</div>
              </div>
              <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded">Warning</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-green-50 rounded">
              <div>
                <span className="text-sm font-medium text-green-800">System maintenance completed</span>
                <div className="text-xs text-green-600">2024-01-18 23:45:12</div>
              </div>
              <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">Success</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-red-50 rounded">
              <div>
                <span className="text-sm font-medium text-red-800">Failed to send email notification</span>
                <div className="text-xs text-red-600">2024-01-17 14:30:28</div>
              </div>
              <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded">Error</span>
            </div>
            <div className="mt-6 flex justify-center">
              <button className="text-blue-600 hover:text-blue-800 text-sm">
                Load More Logs
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
