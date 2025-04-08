"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

// Define the Property interface
interface Property {
  id: string;
  address: string;
  latitude: number | null;
  longitude: number | null;
}

interface PropertyMapProps extends React.HTMLAttributes<HTMLDivElement> {
  properties: Property[];
  className?: string;
}

export function PropertyMap({ properties, className, ...props }: PropertyMapProps) {
  const mapContainer = React.useRef<HTMLDivElement>(null);
  const map = React.useRef<any>(null);
  const markers = React.useRef<any[]>([]);
  const [mapError, setMapError] = React.useState<string | null>(null);
  const [isClient, setIsClient] = React.useState(false);

  // Log the received properties
  console.log('PropertyMap props:', properties);

  // Set isClient to true when component mounts (client-side only)
  React.useEffect(() => {
    setIsClient(true);
  }, []);

  // Initialize map and add markers
  React.useEffect(() => {
    if (!isClient || !mapContainer.current) return;

    const initializeMap = async () => {
      try {
        // Dynamically import Leaflet
        const L = await import('leaflet');

        // Initialize the map if not already initialized
        if (!map.current && mapContainer.current) {
          // Create map
          map.current = L.map(mapContainer.current).setView([42.35, -70.9], 9);

          // Add OpenStreetMap tile layer
          L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          }).addTo(map.current);
        }

        // Clear existing markers
        markers.current.forEach(marker => marker.remove());
        markers.current = [];

        // Filter properties with valid coordinates
        const validProperties = properties.filter(
          property => 
            property.latitude !== null && 
            property.longitude !== null && 
            !isNaN(property.latitude) && 
            !isNaN(property.longitude)
        );

        console.log('Valid properties for markers:', validProperties);

        // Add markers for each property
        validProperties.forEach((property) => {
          try {
            console.log(`Adding marker for property ${property.id} at ${property.latitude}, ${property.longitude}`);
            const marker = L.marker([property.latitude!, property.longitude!])
              .bindPopup(`<h3>${property.address}</h3>`)
              .addTo(map.current);
            markers.current.push(marker);
          } catch (error) {
            console.error(`Error adding marker for property ${property.id}:`, error);
          }
        });

        // Fit bounds if there are valid properties
        if (validProperties.length > 0) {
          const bounds = L.latLngBounds(validProperties.map(p => [p.latitude!, p.longitude!]));
          map.current.fitBounds(bounds, { padding: [50, 50] });
        }

      } catch (error) {
        console.error("Error initializing map:", error);
        setMapError("Failed to initialize map. Please try again.");
      }
    };

    initializeMap();

    // Cleanup
    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, [isClient, properties]);

  if (mapError) {
    return (
      <div className={cn("h-[400px] w-full rounded-lg flex items-center justify-center bg-muted text-destructive p-4 text-center", className)} {...props}>
        <p>{mapError}</p>
      </div>
    );
  }

  // Show loading state during SSR
  if (!isClient) {
    return (
      <div className={cn("h-[400px] w-full rounded-lg flex items-center justify-center bg-muted p-4 text-center", className)} {...props}>
        <p>Loading map...</p>
      </div>
    );
  }

  return (
    <div
      ref={mapContainer}
      className={cn("h-[400px] w-full rounded-lg", className)}
      {...props}
    />
  );
} 