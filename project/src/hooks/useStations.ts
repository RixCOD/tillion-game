import { useState, useEffect } from 'react';
import { ChargingStation } from '../types';
import { getMockStations } from '../data/mockStations';

export const useStations = () => {
  const [stations, setStations] = useState<ChargingStation[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStations = async () => {
      try {
        setLoading(true);
        // In a real app, this would be an API call
        // For this demo, we're using mock data
        const data = getMockStations();
        
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 800));
        
        setStations(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load charging stations');
        setLoading(false);
        console.error('Error fetching stations:', err);
      }
    };

    fetchStations();
  }, []);

  return { stations, loading, error };
};