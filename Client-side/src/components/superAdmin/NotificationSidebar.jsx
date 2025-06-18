import { Transition, Dialog } from '@headlessui/react';
import { Fragment } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';

function NotificationSidebar({ isOpen, onClose, notifications }) {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        {/* Overlay */}
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        {/* Sidebar Panel */}
        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <Transition.Child
              as={Fragment}
              enter="transform transition ease-in-out duration-300"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transform transition ease-in-out duration-300"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <Dialog.Panel className="w-screen max-w-md absolute right-0 h-full bg-white shadow-xl">
                <div className="flex flex-col h-full">
                  {/* Sidebar Header */}
                  <div className="flex items-center justify-between px-4 py-3 border-b">
                    <Dialog.Title className="text-lg font-semibold text-gray-900">
                      Notifications
                    </Dialog.Title>
                    <button
                      onClick={onClose}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <XMarkIcon className="h-6 w-6" />
                    </button>
                  </div>

                  {/* Notification List */}
                  <div className="flex-1 overflow-y-auto p-4">
                    {notifications.length === 0 ? (
                      <p className="text-sm text-gray-500">No notifications</p>
                    ) : (
                      notifications.map(notification => (
                        <div
                          key={notification.id}
                          className={`p-3 mb-2 rounded-md ${
                            notification.read ? 'bg-gray-50' : 'bg-blue-50'
                          }`}
                        >
                          <p
                            className={`text-sm ${
                              notification.read ? 'text-gray-600' : 'text-gray-900 font-medium'
                            }`}
                          >
                            {notification.message}
                          </p>
                          <p className="text-xs text-gray-500">
                            {notification.timestamp}
                          </p>
                        </div>
                      ))
                    )}
                  </div>

                  {/* Sidebar Footer */}
                  <div className="p-4 border-t">
                    <button
                      onClick={onClose}
                      className="w-full px-4 py-2 text-sm text-white bg-gray-600 rounded-md hover:bg-gray-700"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

export default NotificationSidebar;