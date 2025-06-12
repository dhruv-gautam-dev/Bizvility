import React from 'react';
import { MapPin } from 'lucide-react';

const LocationsPage = () => {
  const popularCities = [
    { name: 'New York', image: 'https://images.pexels.com/photos/466685/pexels-photo-466685.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', count: 1234 },
    { name: 'Los Angeles', image: 'https://images.pexels.com/photos/1444442/pexels-photo-1444442.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', count: 987 },
    { name: 'Chicago', image: 'https://images.pexels.com/photos/167676/pexels-photo-167676.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', count: 856 },
    { name: 'Houston', image: 'https://images.pexels.com/photos/1682462/pexels-photo-1682462.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', count: 743 },
    { name: 'Phoenix', image: 'https://images.pexels.com/photos/3855433/pexels-photo-3855433.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', count: 621 },
    { name: 'Philadelphia', image: 'https://images.pexels.com/photos/2412603/pexels-photo-2412603.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', count: 589 },
  ];

  return (
    <div className="pt-20">
      <div className="bg-blue-900 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Browse by Location</h1>
          <p className="text-xl text-blue-100">Find the best local businesses in your area</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {popularCities.map((city, idx) => (
            <div key={idx} className="group relative overflow-hidden rounded-xl shadow-lg">
              <div 
                className="h-64 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                style={{ backgroundImage: `url(${city.image})` }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent">
                  <div className="absolute bottom-0 left-0 p-6">
                    <div className="flex items-center text-white mb-2">
                      <MapPin className="w-5 h-5 mr-2" />
                      <h3 className="text-2xl font-semibold">{city.name}</h3>
                    </div>
                    <p className="text-gray-200">{city.count} listings</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-8">All Locations</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array.from({ length: 20 }, (_, i) => (
              <div key={i} className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <h3 className="font-medium text-gray-900">City Name {i + 1}</h3>
                <p className="text-sm text-gray-500 mt-1">123 listings</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationsPage;