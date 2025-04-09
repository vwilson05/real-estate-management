'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { geocodeProperty } from '@/lib/geocoding';
import { useProperties } from '@/app/hooks/useProperties';
import { Property } from '@/types/property';

// Utility function to add delay between requests
const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export function GeocodeButton() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { properties, isLoading: isPropertiesLoading } = useProperties();
  const router = useRouter();

  const handleGeocodeAll = async () => {
    setIsLoading(true);
    try {
      console.log('Properties:', properties);
      
      if (isPropertiesLoading) {
        console.log('Properties are still loading');
        toast({
          title: 'Please wait',
          description: 'Properties are still loading. Please try again in a moment.',
        });
        return;
      }
      
      if (!properties || properties.length === 0) {
        console.log('No properties found');
        toast({
          title: 'No properties found',
          description: 'Add some properties first before geocoding.',
        });
        return;
      }
      
      const propertiesWithoutCoordinates = properties.filter(
        (property: Property) => property.latitude === null || property.longitude === null
      );
      
      console.log('Properties without coordinates:', propertiesWithoutCoordinates);

      if (!propertiesWithoutCoordinates.length) {
        console.log('No properties need geocoding');
        toast({
          title: 'No properties to geocode',
          description: 'All properties already have coordinates.',
        });
        return;
      }

      let successCount = 0;
      let failCount = 0;

      for (const property of propertiesWithoutCoordinates) {
        try {
          console.log(`Geocoding property: ${property.id} - ${property.address}`);
          const result = await geocodeProperty(property.id);
          console.log('Geocoding result:', result);
          successCount++;
          // Add a 100ms delay between requests to prevent overwhelming the server
          await sleep(100);
        } catch (error) {
          console.error(`Failed to geocode property ${property.id}:`, error);
          failCount++;
        }
      }

      console.log(`Geocoding complete. Success: ${successCount}, Failed: ${failCount}`);
      
      // Refresh the page using Next.js router
      router.refresh();

      toast({
        title: 'Geocoding complete',
        description: `Successfully geocoded ${successCount} properties. Failed: ${failCount}`,
      });
    } catch (error) {
      console.error('Error during geocoding:', error);
      toast({
        title: 'Error',
        description: 'Failed to geocode properties. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      onClick={handleGeocodeAll}
      disabled={isLoading || isPropertiesLoading}
      variant="outline"
      className="w-full"
    >
      {isLoading ? 'Geocoding...' : 'Geocode All Properties'}
    </Button>
  );
} 