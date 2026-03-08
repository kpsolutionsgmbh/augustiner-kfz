/// <reference types="@types/google.maps" />

import { useCallback, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

declare global {
  interface Window {
    google?: typeof google;
  }
}

const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

function loadMapScript() {
  return new Promise((resolve) => {
    if (window.google?.maps) {
      resolve(null);
      return;
    }
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&v=weekly&libraries=marker,places,geocoding,geometry`;
    script.async = true;
    script.onload = () => resolve(null);
    script.onerror = () => console.error("Failed to load Google Maps script");
    document.head.appendChild(script);
  });
}

interface MapViewProps {
  className?: string;
  initialCenter?: google.maps.LatLngLiteral;
  initialZoom?: number;
  onMapReady?: (map: google.maps.Map) => void;
}

export function MapView({
  className,
  initialCenter = { lat: 48.1351, lng: 11.582 }, // München
  initialZoom = 12,
  onMapReady,
}: MapViewProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<google.maps.Map | null>(null);

  const init = useCallback(async () => {
    await loadMapScript();
    if (!mapContainer.current || !window.google) return;

    map.current = new window.google.maps.Map(mapContainer.current, {
      zoom: initialZoom,
      center: initialCenter,
      mapTypeControl: true,
      fullscreenControl: true,
      zoomControl: true,
      streetViewControl: true,
      mapId: "DEMO_MAP_ID",
    });

    onMapReady?.(map.current);
  }, []);

  useEffect(() => {
    init();
  }, [init]);

  return (
    <div ref={mapContainer} className={cn("h-[500px] w-full", className)} />
  );
}
