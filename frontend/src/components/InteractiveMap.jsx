import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { motion } from 'framer-motion';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default markers in react-leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom icon for obagaTeam
const obagaTeamIcon = new L.Icon({
  iconUrl: 'data:image/svg+xml;base64,' + btoa(`
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="16" cy="16" r="15" fill="#22c55e" stroke="white" stroke-width="2"/>
      <text x="16" y="21" text-anchor="middle" fill="white" font-weight="bold" font-size="14">OT</text>
    </svg>
  `),
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

// Map controller component for dynamic updates
const MapController = ({ center, zoom }) => {
  const map = useMap();
  
  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);
  
  return null;
};

const InteractiveMap = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState(null);

  // Sample locations for obagaTeam offices
  const locations = [
    {
      id: 1,
      name: 'obagaTeam Headquarters',
      position: [-1.2864, 36.8172], // Nairobi, Kenya
      address: '46 , Nairobi, Kenya',
      phone: '+254 748 312 468', // You can add a specific number here
      email: 'hq@obagaTeam.com'
    },
    {
      id: 2,
      name: 'obagaTeam Europe',
      position: [51.5074, -0.1278], // London
      address: '456 Tech Boulevard, London EC1A 1BB, UK',
      phone: '+44 20 7946 0958',
      email: 'europe@obagaTeam.com'
    },
    {
      id: 3,
      name: 'obagaTeam Asia',
      position: [35.6762, 139.6503], // Tokyo
      address: '789 Digital Street, Shibuya, Tokyo 150-0043',
      phone: '+81 3-1234-5678',
      email: 'asia@obagaTeam.com'
    },
    {
      id: 4,
      name: 'obagaTeam Africa (Cape Town)',
      position: [-33.9249, 18.4241], // Cape Town
      address: '321 Innovation Hub, Cape Town 8001, South Africa',
      phone: '+27 21 123 4567',
      email: 'africa@obagaTeam.com'
    },
    {
      id: 5,
      name: 'obagaTeam East Africa (Kampala)',
      position: [0.3167, 32.5833], // Kampala, Uganda
      address: 'Kampala, Uganda',
      phone: '+256 ...',
      email: 'kampala@obagaTeam.com'
    },
    {
      id: 6,
      name: 'obagaTeam East Africa (Dar es Salaam)',
      position: [-6.8235, 39.2695], // Dar es Salaam, Tanzania
      address: 'Dar es Salaam, Tanzania',
      phone: '+255 ...',
      email: 'daressalaam@obagaTeam.com'
    },
    {
      id: 7,
      name: 'obagaTeam East Africa (Bujumbura)',
      position: [-3.3833, 29.3667], // Bujumbura, Burundi
      address: 'Bujumbura, Burundi',
      phone: '+257 ...',
      email: 'bujumbura@obagaTeam.com'
    }
];


  const [filteredLocations, setFilteredLocations] = useState(locations);

  // Default center (New York)
  const defaultCenter = [40.7128, -74.0060];
  const defaultZoom = 2;

  // Filter locations based on search query
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredLocations(locations);
      return;
    }

    const query = searchQuery.toLowerCase();
    const filtered = locations.filter(location =>
      location.name.toLowerCase().includes(query) ||
      location.address.toLowerCase().includes(query) ||
      location.email.toLowerCase().includes(query)
    );
    
    setFilteredLocations(filtered);
    
    // Auto-select first filtered location
    if (filtered.length > 0 && !selectedLocation) {
      setSelectedLocation(filtered[0]);
    }
  }, [searchQuery, locations, selectedLocation]);

  const handleLocationSelect = (location) => {
    setSelectedLocation(location);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (filteredLocations.length > 0) {
      setSelectedLocation(filteredLocations[0]);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="card"
    >
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Find Our Offices Worldwide</h2>
        
        {/* Search Bar */}
        <form onSubmit={handleSearchSubmit} className="mb-4">
          <div className="flex gap-2">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by location, address, or email..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
            <button
              type="submit"
              className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors duration-200"
            >
              Search
            </button>
          </div>
        </form>

        {/* Location Results */}
        {filteredLocations.length === 0 ? (
          <div className="text-center py-4 text-gray-500">
            No locations found matching your search.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            {filteredLocations.map((location) => (
              <motion.div
                key={location.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`p-4 border rounded-lg cursor-pointer transition-all duration-200 ${
                  selectedLocation?.id === location.id
                    ? 'border-primary-500 bg-primary-50'
                    : 'border-gray-200 hover:border-primary-300'
                }`}
                onClick={() => handleLocationSelect(location)}
              >
                <h3 className="font-semibold text-gray-900">{location.name}</h3>
                <p className="text-sm text-gray-600 mt-1">{location.address}</p>
                <p className="text-xs text-gray-500 mt-1">{location.phone}</p>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Interactive Map */}
      <div className="h-96 rounded-lg overflow-hidden border border-gray-200">
        <MapContainer
          center={selectedLocation ? selectedLocation.position : defaultCenter}
          zoom={selectedLocation ? 13 : defaultZoom}
          style={{ height: '100%', width: '100%' }}
          scrollWheelZoom={true}
        >
          <MapController 
            center={selectedLocation ? selectedLocation.position : defaultCenter} 
            zoom={selectedLocation ? 13 : defaultZoom} 
          />
          
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          
          {filteredLocations.map((location) => (
            <Marker
              key={location.id}
              position={location.position}
              icon={obagaTeamIcon}
              eventHandlers={{
                click: () => handleLocationSelect(location),
              }}
            >
              <Popup>
                <div className="p-2">
                  <h3 className="font-bold text-gray-900">{location.name}</h3>
                  <p className="text-sm text-gray-600 mt-1">{location.address}</p>
                  <p className="text-sm text-gray-600">{location.phone}</p>
                  <p className="text-sm text-primary-600">{location.email}</p>
                  <button
                    onClick={() => handleLocationSelect(location)}
                    className="mt-2 bg-primary-600 text-white px-3 py-1 rounded text-sm hover:bg-primary-700 transition-colors duration-200"
                  >
                    View Details
                  </button>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      {/* Selected Location Details */}
      {selectedLocation && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {selectedLocation.name}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
            <div>
              <p><strong>Address:</strong> {selectedLocation.address}</p>
              <p><strong>Phone:</strong> {selectedLocation.phone}</p>
              <p><strong>Email:</strong> {selectedLocation.email}</p>
            </div>
            <div className="flex items-center space-x-4">
              <button className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors duration-200">
                Get Directions
              </button>
              <button className="border border-primary-600 text-primary-600 px-4 py-2 rounded-lg hover:bg-primary-50 transition-colors duration-200">
                Contact Office
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Map Legend */}
      <div className="mt-4 flex items-center justify-center space-x-6 text-sm text-gray-600">
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-primary-600 rounded-full"></div>
          <span>obagaTeam Offices</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
          <span>Click markers for details</span>
        </div>
      </div>
    </motion.div>
  );
};

export default InteractiveMap;