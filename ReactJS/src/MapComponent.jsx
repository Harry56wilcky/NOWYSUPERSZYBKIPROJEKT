import React, { useRef, useEffect } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

const MapComponent = () => {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);

  useEffect(() => {
    if (mapInstanceRef.current) return;

    mapInstanceRef.current = new maplibregl.Map({
      container: mapContainerRef.current,
      // Konfiguracja darmowej mapy OpenStreetMap (ulice, nazwy, obszary)
      style: {
        version: 8,
        sources: {
          'osm-tiles': {
            type: 'raster',
            tiles: [
              'https://tile.openstreetmap.org/{z}/{x}/{y}.png'
            ],
            tileSize: 256,
            attribution: '&copy; OpenStreetMap Contributors',
          },
        },
        layers: [
          {
            id: 'osm-tiles-layer',
            type: 'raster',
            source: 'osm-tiles',
            minzoom: 0,
            maxzoom: 19,
          },
        ],
      },
      center: [21.012, 52.23], // Warszawa
      zoom: 13
    });

    mapInstanceRef.current.addControl(new maplibregl.NavigationControl(), 'top-right');

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Usunąłem position: absolute, żeby było bezpieczniej dla layoutu
  return (
    <div 
      ref={mapContainerRef} 
      style={{ width: '100%', height: '100%', minHeight: '400px' }} 
    />
  );
};

export default MapComponent;