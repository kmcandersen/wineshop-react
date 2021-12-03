import React from 'react';
import { useLocation } from 'react-router-dom';

export default function NotFound() {
  const location = useLocation();
  const message = location.state ? location.state.message : null;

  return (
    <div>
      <h1>NOT FOUND</h1>
      <h3>{message}</h3>
    </div>
  );
}
