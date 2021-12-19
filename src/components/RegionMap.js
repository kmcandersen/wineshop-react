import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax

export default function RegionMap({ coords }) {
  mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_API;
  const mapContainer = useRef(null);
  const map = useRef(null);
  //   const [lng, setLng] = useState(-70.9);
  //   const [lat, setLat] = useState(42.35);
  //   const [zoom, setZoom] = useState(6);

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v10',
      center: [coords[0], coords[2]],
      zoom: 6,
    });
  });

  return (
    <div>
      <div
        ref={mapContainer}
        className='map-container'
        style={{ height: '150px' }}
      />
    </div>
  );
}
