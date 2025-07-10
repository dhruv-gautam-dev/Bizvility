import { PlusIcon } from "@heroicons/react/24/outline";

const categories = [
  { id: 1, name: "Hotel", businesses: 486, growth: "+12%" },
  { id: 2, name: "Health", businesses: 156, growth: "+10%" },
  { id: 3, name: "Beauty & Spa", businesses: 134, growth: "+3%" },
];

export default function SalesCategories() {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">
          Business Categories
        </h1>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => (
          <div key={category.id} className="p-6 bg-white rounded-lg shadow">
            <div className="flex items-start justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">
                {category.name}
              </h3>
              <button className="text-gray-400 hover:text-gray-500">
                <span className="sr-only">Edit</span>
                {/* Three dots menu icon */}
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M10 3a2 2 0 110-4 2 2 0 010 4zM10 10a2 2 0 110-4 2 2 0 010 4zM10 17a2 2 0 110-4 2 2 0 010 4z" />
                </svg>
              </button>
            </div>
            <div className="flex items-baseline justify-between">
              <div>
                <p className="text-3xl font-semibold text-indigo-600">
                  {category.businesses}
                </p>
                <p className="text-sm text-gray-500">Active Businesses</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-green-600">
                  {category.growth}
                </p>
                <p className="text-xs text-gray-500">This month</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
