import React, { useState, useEffect } from 'react';
import { Sun, Moon } from 'react-bootstrap-icons';

const initialLocationState = {
  latitude: null,
  longitude: null,
  speed: null,
};

const App = () => {
  const [count, setCount] = useState(0);
  const [isOn, setIsOn] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: null, y: null });
  const [status, setStatus] = useState(navigator.onLine);
  const [{ latitude, longitude, speed }, setLocation] = useState(
    initialLocationState
  );

  useEffect(() => {
    document.title = `You have clicked ${count} time`;
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    const watchId = navigator.geolocation.watchPosition(handleGeolocation);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      navigator.geolocation.clearWatch(watchId);
    };
  }, [count]);

  const handleGeolocation = (event) => {
    setLocation({
      latitude: event.coords.latitude,
      longitude: event.coords.longitude,
      speed: event.coords.speed,
    });
  };

  const handleOnline = () => {
    setStatus(true);
  };

  const handleOffline = () => {
    setStatus(false);
  };

  const handleMouseMove = (event) => {
    setMousePosition({
      x: event.pageX,
      y: event.pageY,
    });
  };

  const incrementCount = () => {
    setCount((prevCount) => prevCount + 1);
  };

  const toggleLight = () => {
    setIsOn((prevIsOn) => !prevIsOn);
  };

  return (
    <>
      <h2>Counter</h2>
      <button onClick={incrementCount}>I was clicked {count} times</button>

      <h2>Toggle light</h2>
      <div
        style={{
          height: '50px',
          width: '50px',
          cursor: 'pointer',
        }}
        alt='Flashlight'
        onClick={toggleLight}
      >
        {isOn ? (
          <Sun color='yellow' size={96} />
        ) : (
          <Moon color='black' size={96} />
        )}
      </div>
      <br />
      <br />

      <h2>Mouse Position</h2>
      {JSON.stringify(mousePosition, null, 2)}
      <br />

      <h2>Network status</h2>
      <p>
        You are <strong>{status ? 'online' : 'offline'}</strong>
      </p>
      <br />

      <h2>Geolocation</h2>
      <p>Latitude is {latitude}</p>
      <p>Longitude is {longitude}</p>
      <p>Your speed is {speed ? speed : '0'}</p>
    </>
  );
};

export default App;
