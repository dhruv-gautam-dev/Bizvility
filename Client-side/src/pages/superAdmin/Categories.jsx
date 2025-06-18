import { useState } from 'react';
import { PlusIcon } from '@heroicons/react/24/outline';
import { Menu, Transition, Dialog } from '@headlessui/react';
import { Fragment } from 'react';

const initialCategories = [
  { id: 1, name: 'Restaurants', businesses: 486, growth: '+12%' },
  { id: 2, name: 'Retail Shops', businesses: 342, growth: '+8%' },
  { id: 3, name: 'Professional Services', businesses: 275, growth: '+15%' },
  { id: 4, name: 'Entertainment', businesses: 198, growth: '+5%' },
  { id: 5, name: 'Health & Wellness', businesses: 156, growth: '+10%' },
  { id: 6, name: 'Automotive', businesses: 134, growth: '+3%' },
];

function CategoriesPage() {
  const [categories, setCategories] = useState(initialCategories);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [editName, setEditName] = useState('');
  const [editBusinesses, setEditBusinesses] = useState('');
  const [editGrowth, setEditGrowth] = useState('');

  const handleEdit = (category) => {
    setEditingCategory(category);
    setEditName(category.name);
    setEditBusinesses(category.businesses);
    setEditGrowth(category.growth);
    setIsEditModalOpen(true);
  };

  const handleDelete = (id) => {
    setCategories(categories.filter((category) => category.id !== id));
  };

  const handleSaveEdit = () => {
    setCategories(
      categories.map((category) =>
        category.id === editingCategory.id
          ? { ...category, name: editName, businesses: parseInt(editBusinesses), growth: editGrowth }
          : category
      )
    );
    setIsEditModalOpen(false);
    setEditingCategory(null);
  };

  return (
    <div className="p-6 ms-65 mt-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Business Categories</h1>
        <button className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">
          <PlusIcon className="h-5 w-5" />
          Add Category
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <div key={category.id} className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-medium text-gray-900">{category.name}</h3>
              <Menu as="div" className="relative">
                <Menu.Button className="text-gray-400 hover:text-gray-500">
                  <span className="sr-only">Edit</span>
                  <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                  </svg>
                </Menu.Button>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 z-10 mt-2 w-32 rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5">
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          onClick={() => handleEdit(category)}
                          className={`${
                            active ? 'bg-gray-100' : ''
                          } block w-full text-left px-4 py-2 text-sm text-gray-700`}
                        >
                          Edit
                        </button>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          onClick={() => handleDelete(category.id)}
                          className={`${
                            active ? 'bg-gray-100' : ''
                          } block w-full text-left px-4 py-2 text-sm text-gray-700`}
                        >
                          Delete
                        </button>
                      )}
                    </Menu.Item>
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
            <div className="flex justify-between items-baseline">
              <div>
                <p className="text-3xl font-semibold text-indigo-600">{category.businesses}</p>
                <p className="text-sm text-gray-500">Active Businesses</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-green-600">{category.growth}</p>
                <p className="text-xs text-gray-500">This month</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      <Transition appear show={isEditModalOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={() => setIsEditModalOpen(false)}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                    Edit Category
                  </Dialog.Title>
                  <div className="mt-4">
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700">Category Name</label>
                      <input
                        type="text"
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        className="mt-1 p-2 w-full border rounded-md"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700">Active Businesses</label>
                      <input
                        type="number"
                        value={editBusinesses}
                        onChange={(e) => setEditBusinesses(e.target.value)}
                        className="mt-1 p-2 w-full border rounded-md"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700">Growth</label>
                      <input
                        type="text"
                        value={editGrowth}
                        onChange={(e) => setEditGrowth(e.target.value)}
                        className="mt-1 p-2 w-full border rounded-md"
                      />
                    </div>
                  </div>

                  <div className="mt-4 flex justify-end gap-2">
                    <button
                      type="button"
                      className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                      onClick={() => setIsEditModalOpen(false)}
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
                      onClick={handleSaveEdit}
                    >
                      Save
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
}

export default CategoriesPage;