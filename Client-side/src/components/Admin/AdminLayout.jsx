import React, { useState, Component } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';

class ErrorBoundary extends Component {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="pt-0 min-h-screen bg-gray-100">
          <h2>Something went wrong</h2>
          <p>{this.state.error?.message}</p>
          <button className="mt-2 text-blue-600 hover:underline" onClick={() => window.location.reload()}>
            Reload Page
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

const AdminLayout = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="flex h-screen bg-gray-100">
      <ErrorBoundary>
        <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      </ErrorBoundary>
      <div className="flex-1 flex flex-col relative">
        <ErrorBoundary>
          <Header isCollapsed={isCollapsed} />
        </ErrorBoundary>
        <main
          className={`flex-1 overflow-y-auto p-4 pt-20 transition-all duration-300 ${
            isCollapsed ? 'pl-16' : 'pl-64'
          }`}
          role="main"
          aria-label="Main Content Area"
        >
          <ErrorBoundary>
            <Outlet />
          </ErrorBoundary>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;