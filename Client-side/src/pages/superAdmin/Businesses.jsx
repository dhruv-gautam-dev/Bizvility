import { useState } from "react";
import { MagnifyingGlassIcon, FunnelIcon } from "@heroicons/react/24/outline";

const businesses = [
  {
    id: 1,
    name: "The Coffee House",
    category: "Restaurant",
    location: "New York",
    status: "Active",
    rating: 4.5,
  },
  {
    id: 2,
    name: "Tech Solutions Inc",
    category: "Services",
    location: "San Francisco",
    status: "Active",
    rating: 4.8,
  },
  {
    id: 3,
    name: "Fashion Boutique",
    category: "Retail",
    location: "Los Angeles",
    status: "Pending",
    rating: 4.2,
  },
  {
    id: 4,
    name: "Fitness Center",
    category: "Health",
    location: "Chicago",
    status: "Active",
    rating: 4.7,
  },
  {
    id: 5,
    name: "Digital Marketing Pro",
    category: "Services",
    location: "Miami",
    status: "Active",
    rating: 4.4,
  },
];

export default function SuperBusinesses() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredBusinesses = businesses.filter(
    (business) =>
      business.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      business.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      business.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      business.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">
          Business Listings
        </h1>
        <button className="px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700">
          Add Business
        </button>
      </div>

      <div className="flex gap-4 mb-6">
        <div className="relative flex-1">
          <MagnifyingGlassIcon className="absolute w-5 h-5 text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
          <input
            type="text"
            placeholder="Search businesses..."
            className="w-full py-2 pl-10 pr-4 border rounded-md"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-2 border rounded-md hover:bg-gray-50">
          <FunnelIcon className="w-5 h-5 text-gray-400" />
          Filter
        </button>
      </div>

      <div className="overflow-hidden bg-white rounded-lg shadow-md">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                Business Name
              </th>
              <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                Category
              </th>
              <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                Location
              </th>
              <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                Status
              </th>
              <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                Rating
              </th>
              <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredBusinesses.map((business) => (
              <tr key={business.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {business.name}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">
                    {business.category}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">
                    {business.location}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      business.status === "Active"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {business.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">
                    {business.rating}/5.0
                  </div>
                </td>
                <td className="px-6 py-4 text-sm font-medium whitespace-nowrap">
                  <button className="mr-4 text-indigo-600 hover:text-indigo-900">
                    Edit
                  </button>
                  <button className="text-red-600 hover:text-red-900">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
