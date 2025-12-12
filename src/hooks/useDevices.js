import { useState, useCallback } from 'react';
import api from '../services/api';

export const useDevices = () => {
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchDevices = useCallback(async (apiKey, accessToken) => {
    setLoading(true);
    setError('');
    
    try {
      const deviceList = await api.getDevices(apiKey, accessToken);
      setDevices(deviceList);
      return deviceList;
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const sendCommand = useCallback(async (apiKey, accessToken, deviceId, command) => {
    setLoading(true);
    setError('');
    
    try {
      await api.sendCommand(apiKey, accessToken, deviceId, command);
      
      // Update local state
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
      
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    devices,
    loading,
    error,
    setDevices,
    setError,
    fetchDevices,
    sendCommand,
  };
};