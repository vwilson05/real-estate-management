"use client";

import * as React from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { cn } from "@/lib/utils";

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
  const map = React.useRef<mapboxgl.Map | null>(null);
  const [lng] = React.useState(-70.9);
  const [lat] = React.useState(42.35);
  const [zoom] = React.useState(9);

  React.useEffect(() => {
    if (!mapContainer.current) return;

    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || "";

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [lng, lat],
      zoom: zoom,
    });

    // Add navigation controls
    map.current.addControl(new mapboxgl.NavigationControl(), "top-right");

    // Cleanup on unmount
    return () => {
      map.current?.remove();
    };
  }, [lng, lat, zoom]);

  React.useEffect(() => {
    if (!map.current) return;

    // Add markers for each property
    properties.forEach((property) => {
      new mapboxgl.Marker()
        .setLngLat([property.longitude, property.latitude])
        .setPopup(
          new mapboxgl.Popup({ offset: 25 }).setHTML(
            `<h3>${property.name}</h3><p>${property.address}</p>`
          )
        )
        .addTo(map.current!);
    });
  }, [properties]);

  return (
    <div
      ref={mapContainer}
      className={cn("h-[400px] w-full rounded-lg", className)}
      {...props}
    />
  );
} 