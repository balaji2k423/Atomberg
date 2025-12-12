import React, { useState, useEffect } from 'react';
import SetupView from './components/SetupView';
import DeviceList from './components/DeviceList';
import DeviceControl from './components/DeviceControl';
import { useDevices } from './hooks/useDevices';
import api from './services/api';

const App = () => {
  const [view, setView] = useState('setup');
  const [credentials, setCredentials] = useState(null);
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [demoMode, setDemoMode] = useState(false);
  
  const { devices, loading, error, setDevices, setError, fetchDevices, sendCommand } = useDevices();

  // Check for stored credentials on mount
  useEffect(() => {
    const stored = api.getStoredCredentials();
    if (stored && stored.accessToken) {
      setCredentials(stored);
      setView('devices');
      fetchDevices(stored.apiKey, stored.accessToken);
    }
  }, [fetchDevices]);

  const handleLogin = async (apiKey, refreshToken, isDemoMode = false) => {
    if (isDemoMode) {
      setDemoMode(true);
      setCredentials({ apiKey: 'demo', refreshToken: 'demo', accessToken: 'demo' });
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

    try {
      const accessToken = await api.getAccessToken(apiKey, refreshToken);
      const creds = { apiKey, refreshToken, accessToken };
      setCredentials(creds);
      await fetchDevices(apiKey, accessToken);
      setView('devices');
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    }
  };

  const handleLogout = () => {
    api.clearCredentials();
    setCredentials(null);
    setDevices([]);
    setSelectedDevice(null);
    setDemoMode(false);
    setView('setup');
  };

  const handleSendCommand = async (deviceId, command) => {
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

    return await sendCommand(credentials.apiKey, credentials.accessToken, deviceId, command);
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