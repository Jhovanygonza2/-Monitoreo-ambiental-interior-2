import axios from 'axios';

const BASE_URL = 'https://mobility.api.opendatahub.com/v2';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'accept': 'application/json'
  }
});

export const mobilityService = {
  /**
   * Fetch stations of a specific type
   * @param {string} type - 'Bicycle', 'Parking', 'EChargingStation', etc.
   */
  getStations: async (type = '') => {
    try {
      const endpoint = type ? `/flat/Station/${type}` : '/flat/Station';
      const response = await api.get(endpoint, {
        params: {
          limit: 100,
          offset: 0
        }
      });
      return response.data.data || [];
    } catch (error) {
      console.error(`Error fetching ${type} stations:`, error);
      return [];
    }
  },

  /**
   * Fetch latest data for a station
   */
  getLatestData: async (stationId) => {
    try {
      const response = await api.get(`/flat/Station/${stationId}/Latest`);
      return response.data.data || {};
    } catch (error) {
      console.error(`Error fetching latest data for station ${stationId}:`, error);
      return {};
    }
  },

  /**
   * Mock data for fallback or development
   */
  getMockStations: () => {
    return [
      {
        id: 'mock-1',
        name: 'Central Station Bike Hub',
        type: 'Bicycle',
        latitude: 46.498,
        longitude: 11.354,
        available: 12,
        total: 20
      },
      {
        id: 'mock-2',
        name: 'Piazza Walther Parking',
        type: 'Parking',
        latitude: 46.499,
        longitude: 11.358,
        available: 45,
        total: 150
      },
      {
        id: 'mock-3',
        name: 'Via Roma E-Charge',
        type: 'EChargingStation',
        latitude: 46.492,
        longitude: 11.348,
        available: 2,
        total: 4
      }
    ];
  }
};
