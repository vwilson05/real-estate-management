"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

// Define the Property interface
interface Property {
  id: string;
  address: string;
  latitude?: number | null;
  longitude?: number | null;
  name: string;
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

  // Set isClient to true when component mounts (client-side only)
  React.useEffect(() => {
    setIsClient(true);
    
    // Add Leaflet CSS to the document head
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
    link.integrity = 'sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=';
    link.crossOrigin = '';
    document.head.appendChild(link);
    
    return () => {
      // Clean up the link when component unmounts
      document.head.removeChild(link);
    };
  }, []);

  // Initialize map only on client-side
  React.useEffect(() => {
    if (!isClient || !mapContainer.current) return;

    // Dynamically import Leaflet only on client-side
    import('leaflet').then((L) => {
      try {
        // Fix for Leaflet marker icons in Next.js
        const icon = L.icon({
          iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
          iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
          shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
          iconSize: [25, 41],
          iconAnchor: [12, 41],
          popupAnchor: [1, -34],
          shadowSize: [41, 41]
        });

        // Initialize the map
        map.current = L.map(mapContainer.current!).setView([42.35, -70.9], 9);

        // Add OpenStreetMap tile layer
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map.current);

        // Cleanup on unmount
        return () => {
          if (map.current) {
            map.current.remove();
          }
        };
      } catch (error) {
        console.error("Error initializing map:", error);
        setMapError("Failed to initialize map. Please try again.");
      }
    }).catch(error => {
      console.error("Error loading Leaflet:", error);
      setMapError("Failed to load map library. Please try again.");
    });
  }, [isClient]);

  // Update markers when properties change
  React.useEffect(() => {
    if (!isClient || !map.current || mapError) return;

    // Dynamically import Leaflet only on client-side
    import('leaflet').then((L) => {
      // Clear existing markers
      markers.current.forEach(marker => marker.remove());
      markers.current = [];

      // Filter properties with valid coordinates
      const validProperties = properties.filter(
        property => 
          property.latitude !== null && 
          property.longitude !== null && 
          property.latitude !== undefined && 
          property.longitude !== undefined && 
          !isNaN(property.latitude) && 
          !isNaN(property.longitude)
      );

      // Add markers for each property with valid coordinates
      validProperties.forEach((property) => {
        try {
          const marker = L.marker([property.latitude!, property.longitude!], { icon: L.icon({
            iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
            iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
            shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41]
          }) })
            .bindPopup(`<h3>${property.name}</h3><p>${property.address}</p>`)
            .addTo(map.current);
          
          markers.current.push(marker);
        } catch (error) {
          console.error(`Error adding marker for property ${property.id}:`, error);
        }
      });

      // If there are valid properties, fit the map to show all markers
      if (validProperties.length > 0) {
        try {
          const bounds = L.latLngBounds(validProperties.map(p => [p.latitude!, p.longitude!]));
          map.current.fitBounds(bounds, { padding: [50, 50] });
        } catch (error) {
          console.error("Error fitting bounds:", error);
          // Fallback to default view if bounds fitting fails
          map.current.setView([42.35, -70.9], 9);
        }
      } else {
        // If no valid properties, set to default view
        map.current.setView([42.35, -70.9], 9);
      }
    }).catch(error => {
      console.error("Error loading Leaflet for markers:", error);
    });
  }, [properties, mapError, isClient]);

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