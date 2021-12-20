import React, { useRef, useEffect } from 'react';
import mapboxgl from '!mapbox-gl';
import customTheme from './../styles/theme.js';

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_API;

export default function RegionMap({ coords, style }) {
  const mapContainer = useRef(null);
  const mapContCurr = mapContainer.current;
  useEffect(() => {
    const regionCoords = coords && [coords[1], coords[0]];
    if (mapContCurr && regionCoords) {
      const map = new mapboxgl.Map({
        container: mapContCurr,
        style: 'mapbox://styles/mapbox/light-v10',
        center: regionCoords,
        zoom: 1,
      });
      const marker = new mapboxgl.Marker({
        color: customTheme.palette.gold.main,
      });
      marker.setLngLat(regionCoords).addTo(map);
      return () => map.remove();
    }
  }, [coords, mapContCurr]);
  return <div ref={mapContainer} style={style} />;
}
