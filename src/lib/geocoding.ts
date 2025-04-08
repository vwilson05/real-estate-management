/**
 * Client-side geocoding utility
 * 
 * This module provides geocoding functionality by calling the server-side API.
 * It's designed to work in the browser environment.
 */

/**
 * Geocode an address to get latitude and longitude coordinates
 * @param address The address to geocode
 * @returns An object containing latitude and longitude coordinates
 */
export async function geocodeAddress(address: string): Promise<{ latitude: number | null; longitude: number | null }> {
  try {
    console.log(`Client-side geocoding request for: ${address}`);
    
    const response = await fetch('/api/geocode', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ address }),
    });
    
    if (!response.ok) {
      throw new Error(`Geocoding API responded with status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log(`Client-side geocoding result:`, data);
    
    return {
      latitude: data.latitude,
      longitude: data.longitude,
    };
  } catch (error) {
    console.error('Error geocoding address:', error);
    return { latitude: null, longitude: null };
  }
}

/**
 * Geocode a property by its ID
 * @param propertyId The ID of the property to geocode
 * @returns The updated property with latitude and longitude coordinates
 */
export async function geocodeProperty(propertyId: string): Promise<any> {
  try {
    console.log(`Geocoding property with ID: ${propertyId}`);
    
    const response = await fetch('/api/properties/geocode', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ propertyId }),
    });
    
    if (!response.ok) {
      throw new Error(`Geocoding API responded with status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log(`Geocoded property:`, data);
    
    return data;
  } catch (error) {
    console.error('Error geocoding property:', error);
    throw error;
  }
} 