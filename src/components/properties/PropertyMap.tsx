"use client";

import * as React from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { cn } from "@/lib/utils";

// Fix for Leaflet marker icons in Next.js
// This is needed because Leaflet uses image files that need to be properly imported
const icon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

interface Property {
  id: string;
  address: string;
  latitude: number;
  longitude: number;
  name: string;
}

interface PropertyMapProps extends React.HTMLAttributes<HTMLDivElement> {
  properties: Property[];
  className?: string;
}

export function PropertyMap({ properties, className, ...props }: PropertyMapProps) {
  const mapContainer = React.useRef<HTMLDivElement>(null);
  const map = React.useRef<L.Map | null>(null);
  const markers = React.useRef<L.Marker[]>([]);
  const [mapError, setMapError] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (!mapContainer.current) return;

    try {
      // Initialize the map
      map.current = L.map(mapContainer.current).setView([42.35, -70.9], 9);

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
  }, []);

  React.useEffect(() => {
    if (!map.current || mapError) return;

    // Clear existing markers
    markers.current.forEach(marker => marker.remove());
    markers.current = [];

    // Add markers for each property
    properties.forEach((property) => {
      const marker = L.marker([property.latitude, property.longitude], { icon })
        .bindPopup(`<h3>${property.name}</h3><p>${property.address}</p>`)
        .addTo(map.current!);
      
      markers.current.push(marker);
    });

    // If there are properties, fit the map to show all markers
    if (properties.length > 0) {
      const bounds = L.latLngBounds(properties.map(p => [p.latitude, p.longitude]));
      map.current.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [properties, mapError]);

  if (mapError) {
    return (
      <div className={cn("h-[400px] w-full rounded-lg flex items-center justify-center bg-muted text-destructive p-4 text-center", className)} {...props}>
        <p>{mapError}</p>
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