import { db } from '@/lib/db';
import { geocodeAddress } from '@/lib/geocoding';

async function testGeocoding() {
  console.log('Starting geocoding test...');
  
  try {
    // Test address
    const testAddress = '1600 Amphitheatre Parkway, Mountain View, CA 94043';
    console.log(`Testing geocoding for address: ${testAddress}`);
    
    // Geocode the address
    const result = await geocodeAddress(testAddress);
    console.log('Geocoding result:', result);
    
    if (result.latitude && result.longitude) {
      console.log('✅ Geocoding successful!');
      console.log(`Latitude: ${result.latitude}`);
      console.log(`Longitude: ${result.longitude}`);
      
      // Create a test property
      const property = await db.property.create({
        data: {
          address: '1600 Amphitheatre Parkway',
          city: 'Mountain View',
          state: 'CA',
          zipCode: '94043',
          type: 'Commercial',
          marketValue: 1000000,
          purchasePrice: 900000,
          purchaseDate: new Date(),
          description: 'Test property for geocoding',
        },
      });
      
      console.log('✅ Test property created:', property);
      
      // Update the property with coordinates
      const updatedProperty = await db.property.update({
        where: { id: property.id },
        data: {
          latitude: result.latitude,
          longitude: result.longitude,
        },
      });
      
      console.log('✅ Property updated with coordinates:', updatedProperty);
      
      // Test the geocode property API
      console.log('Testing geocode property API...');
      try {
        const response = await fetch('http://localhost:3000/api/properties/geocode', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ propertyId: property.id }),
        });
        
        const apiResult = await response.json();
        console.log('API response:', apiResult);
        
        if (response.ok) {
          console.log('✅ Geocode property API test successful!');
        } else {
          console.error('❌ Geocode property API test failed:', apiResult.error);
        }
      } catch (error) {
        console.error('❌ API test failed (this is expected if the server is not running):', error);
      }
    } else {
      console.error('❌ Geocoding failed: No coordinates returned');
    }
  } catch (error) {
    console.error('❌ Test failed with error:', error);
  } finally {
    // Disconnect from the database
    await db.$disconnect();
    console.log('Database connection closed');
  }
}

// Run the test
testGeocoding()
  .then(() => console.log('Test completed'))
  .catch((error) => console.error('Test failed:', error)); 