import React, { useState, useEffect } from 'react';
import SetupView from './components/SetupView';
import DeviceList from './components/DeviceList';
import DeviceControl from './components/DeviceControl';
import { useDevices } from './hooks/useDevices';
import api from './services/api';

const App = () => {
  const [view, setView] = useState('setup');
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [demoMode, setDemoMode] = useState(false);
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = (apiKey, refreshToken, isDemoMode = false) => {
    if (isDemoMode) {
      setDemoMode(true);
      setDevices([
        {
          device_id: 'demo001',
          device_name: 'Living Room Fan',
          model: 'Aris Starlight',
          series: 'I1',
          power: false,
          last_recorded_speed: 3,
          sleep_mode: false,
          led: false,
          is_online: true,
          timer_hours: 0,
          last_recorded_brightness: 80,
          last_recorded_color: 'cool'
        },
        {
          device_id: 'demo002',
          device_name: 'Bedroom Fan',
          model: 'Renesa Elite',
          series: 'S1',
          power: true,
          last_recorded_speed: 2,
          sleep_mode: true,
          led: true,
          is_online: true,
          timer_hours: 2,
          last_recorded_brightness: 50,
          last_recorded_color: 'warm'
        }
      ]);
      setView('devices');
      return true;
    }
    
    setError('API integration requires actual credentials');
    return false;
  };

  const handleLogout = () => {
    setDevices([]);
    setSelectedDevice(null);
    setDemoMode(false);
    setView('setup');
  };

  const handleSendCommand = (deviceId, command) => {
    if (demoMode) {
      setDevices(prev => prev.map(d => {
        if (d.device_id === deviceId) {
          const updated = { ...d };
          if ('power' in command) updated.power = command.power;
          if ('speed' in command) updated.last_recorded_speed = command.speed;
          if ('sleep' in command) updated.sleep_mode = command.sleep;
          if ('led' in command) updated.led = command.led;
          if ('timer' in command) updated.timer_hours = command.timer;
          if ('brightness' in command) updated.last_recorded_brightness = command.brightness;
          if ('light_mode' in command) updated.last_recorded_color = command.light_mode;
          return updated;
        }
        return d;
      }));
      
      if (selectedDevice && selectedDevice.device_id === deviceId) {
        setSelectedDevice(prev => {
          const updated = { ...prev };
          if ('power' in command) updated.power = command.power;
          if ('speed' in command) updated.last_recorded_speed = command.speed;
          if ('sleep' in command) updated.sleep_mode = command.sleep;
          if ('led' in command) updated.led = command.led;
          if ('timer' in command) updated.timer_hours = command.timer;
          if ('brightness' in command) updated.last_recorded_brightness = command.brightness;
          if ('light_mode' in command) updated.last_recorded_color = command.light_mode;
          return updated;
        });
      }
      return true;
    }
  };

  if (view === 'setup') {
    return (
      <SetupView 
        onLogin={handleLogin}
        error={error}
        loading={loading}
      />
    );
  }

  if (view === 'devices' && !selectedDevice) {
    return (
      <DeviceList
        devices={devices}
        onSelectDevice={setSelectedDevice}
        onLogout={handleLogout}
        demoMode={demoMode}
        loading={loading}
      />
    );
  }

  if (selectedDevice) {
    return (
      <DeviceControl
        device={selectedDevice}
        onBack={() => setSelectedDevice(null)}
        onSendCommand={handleSendCommand}
        loading={loading}
        error={error}
      />
    );
  }

  return null;
};

export default App;

<style>{`
  @keyframes fade-in {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes slide-up {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes scale-in {
    from {
      opacity: 0;
      transform: scale(0.9);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }

  @keyframes shake {
    0%, 100% {
      transform: translateX(0);
    }
    25% {
      transform: translateX(-5px);
    }
    75% {
      transform: translateX(5px);
    }
  }

  @keyframes float {
    0%, 100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-10px);
    }
  }

  .animate-fade-in {
    animation: fade-in 0.5s ease-out forwards;
  }

  .animate-slide-up {
    animation: slide-up 0.5s ease-out forwards;
  }

  .animate-scale-in {
    animation: scale-in 0.3s ease-out forwards;
  }

  .animate-shake {
    animation: shake 0.5s ease-in-out;
  }

  .animate-float {
    animation: float 3s ease-in-out infinite;
  }

  input[type="range"]::-webkit-slider-thumb {
    appearance: none;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: #eab308;
    cursor: pointer;
    box-shadow: 0 0 10px rgba(234, 179, 8, 0.5);
  }

  input[type="range"]::-moz-range-thumb {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: #eab308;
    cursor: pointer;
    border: none;
    box-shadow: 0 0 10px rgba(234, 179, 8, 0.5);
  }
`}</style>