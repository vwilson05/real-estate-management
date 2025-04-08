/**
 * Server-side geocoding utility
 * 
 * This module provides geocoding functionality using the OpenStreetMap Nominatim API.
 * It's designed to work in the Next.js server environment.
 */

// Keep track of the last request time to respect rate limits
let lastRequestTime = 0;
const MIN_REQUEST_INTERVAL = 1000; // 1 second between requests

/**
 * Geocode an address to get latitude and longitude coordinates
 * @param address The address to geocode
 * @returns An object containing latitude and longitude coordinates
 */
export async function geocodeAddress(address: string): Promise<{ latitude: number | null; longitude: number | null }> {
  try {
    console.log(`Geocoding address: ${address}`);
    
    // Ensure we wait at least 1 second between requests
    const now = Date.now();
    const timeSinceLastRequest = now - lastRequestTime;
    if (timeSinceLastRequest < MIN_REQUEST_INTERVAL) {
      await new Promise(resolve => setTimeout(resolve, MIN_REQUEST_INTERVAL - timeSinceLastRequest));
    }
    
    // Encode the address for use in a URL
    const encodedAddress = encodeURIComponent(address);
    
    // Use the OpenStreetMap Nominatim API
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodedAddress}&limit=1`;
    
    // Make the request with appropriate headers
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'RE-Portfolio-Management/1.0',
        'Accept-Language': 'en-US,en;q=0.9',
      },
    });
    
    // Update the last request time
    lastRequestTime = Date.now();
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Geocoding API error (${response.status}):`, errorText);
      throw new Error(`Geocoding API responded with status: ${response.status}`);
    }
    
    const data = await response.json();
    
    // Check if we got any results
    if (!data || data.length === 0) {
      console.log(`No results found for address: ${address}`);
      return { latitude: null, longitude: null };
    }
    
    // Extract latitude and longitude from the first result
    const result = data[0];
    const latitude = parseFloat(result.lat);
    const longitude = parseFloat(result.lon);
    
    if (isNaN(latitude) || isNaN(longitude)) {
      console.error(`Invalid coordinates returned for address: ${address}`);
      return { latitude: null, longitude: null };
    }
    
    console.log(`Geocoding result: ${latitude}, ${longitude}`);
    
    return { latitude, longitude };
  } catch (error) {
    console.error('Error geocoding address:', error);
    return { latitude: null, longitude: null };
  }
} 