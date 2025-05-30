import { ChargingStation } from '../types';

// Generate random coordinates within a certain radius of a point
const generateRandomCoord = (base: number, radius: number): number => {
  return base + (Math.random() - 0.5) * 2 * radius;
};

// Generate random stations around San Francisco
export const getMockStations = (): ChargingStation[] => {
  const sfCoords = { lat: 37.7749, lng: -122.4194 };
  const radius = 0.05; // roughly 3-4 miles
  
  const stations: ChargingStation[] = [];
  const operators = ['ChargePoint', 'EVgo', 'Electrify America', 'Tesla', 'Blink', 'GreenCharge'];
  const statuses: ('available' | 'in-use' | 'offline')[] = ['available', 'in-use', 'offline'];
  const cities = ['San Francisco', 'Oakland', 'Berkeley', 'Daly City'];
  const amenities = ['Restrooms', 'Coffee Shop', 'Convenience Store', 'Grocery Store', 'Restaurant', 'Shopping'];
  
  // Common connector types for mock data
  const connectorTypes = ['CCS1', 'CCS2', 'CHAdeMO', 'Type2', 'Tesla'] as const;
  
  for (let i = 1; i <= 20; i++) {
    const lat = generateRandomCoord(sfCoords.lat, radius);
    const lng = generateRandomCoord(sfCoords.lng, radius);
    const operator = operators[Math.floor(Math.random() * operators.length)];
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    const city = cities[Math.floor(Math.random() * cities.length)];
    const chargingSpeed = Math.floor(Math.random() * 200) + 50; // 50-250 kW
    const isFavorite = Math.random() > 0.8; // 20% chance of being favorite
    const distance = parseFloat((Math.random() * 5).toFixed(1)); // 0-5 miles
    
    // Generate 1-3 random connector types
    const connectorCount = Math.floor(Math.random() * 3) + 1;
    const connectors = [];
    
    for (let j = 0; j < connectorCount; j++) {
      const type = connectorTypes[Math.floor(Math.random() * connectorTypes.length)];
      const count = Math.floor(Math.random() * 4) + 1; // 1-4 connectors
      
      // Available connectors based on status
      let available = 0;
      if (status === 'available') {
        available = Math.floor(Math.random() * count) + 1; // At least 1 available
      } else if (status === 'in-use') {
        available = Math.max(0, count - Math.floor(Math.random() * count) - 1); // At least 1 in use
      }
      
      connectors.push({
        type,
        count,
        available: status === 'offline' ? 0 : available,
      });
    }
    
    // Pick 0-3 random amenities
    const stationAmenities = [];
    const amenityCount = Math.floor(Math.random() * 4);
    for (let j = 0; j < amenityCount; j++) {
      const amenity = amenities[Math.floor(Math.random() * amenities.length)];
      if (!stationAmenities.includes(amenity)) {
        stationAmenities.push(amenity);
      }
    }
    
    // Generate pricing info
    const pricePerKWh = (Math.random() * 0.4 + 0.3).toFixed(2); // $0.30-$0.70 per kWh
    
    stations.push({
      id: `station-${i}`,
      name: `${operator} ${city} Station ${i}`,
      operator,
      location: {
        latitude: lat,
        longitude: lng,
        address: `${Math.floor(Math.random() * 2000)} Main St`,
        city,
        state: 'CA',
        zipCode: `9${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`,
      },
      connectors,
      status,
      pricing: `$${pricePerKWh}/kWh`,
      chargingSpeed,
      amenities: stationAmenities,
      lastReported: new Date(Date.now() - Math.random() * 36000000).toISOString(), // Within last 10 hours
      distance,
      isFavorite,
    });
  }
  
  return stations;
};