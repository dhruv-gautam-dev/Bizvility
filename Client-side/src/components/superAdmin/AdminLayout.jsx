import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import NotificationSidebar from './NotificationSidebar';

const AdminLayout = () => (
  <div className="flex h-screen bg-gray-100">
    <Sidebar />
    <div className="flex flex-1 flex-col">
      <Header />
      <main className="flex-1 overflow-y-auto p-4">
        <Outlet />
      </main>
    </div>
  </div>
);

export default AdminLayout;
