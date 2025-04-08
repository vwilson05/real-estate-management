import NodeGeocoder from 'node-geocoder';

// Initialize the geocoder with OpenStreetMap provider (free to use)
const geocoder = NodeGeocoder({
  provider: 'openstreetmap',
});

export interface GeocodingResult {
  latitude: number | null;
  longitude: number | null;
  error?: string;
}

export async function geocodeAddress(address: string): Promise<GeocodingResult> {
  try {
    const results = await geocoder.geocode(address);
    
    if (results.length === 0) {
      return {
        latitude: null,
        longitude: null,
        error: 'No results found for the given address',
      };
    }

    return {
      latitude: results[0].latitude || null,
      longitude: results[0].longitude || null,
    };
  } catch (error) {
    return {
      latitude: null,
      longitude: null,
      error: `Geocoding failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
    };
  }
} 