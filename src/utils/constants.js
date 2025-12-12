export const API_BASE_URL = 'https://api.developer.atomberg-iot.com';

export const FAN_MODELS = {
  'I1': { name: 'Aris Starlight', supportsColor: true, supportsBrightness: true },
  'I2': { name: 'Aris', supportsColor: false, supportsBrightness: false },
  'S1': { name: 'Renesa Elite / Studio Nexus', supportsColor: false, supportsBrightness: true },
  'M1': { name: 'Aris Contour', supportsColor: false, supportsBrightness: true },
  'R1': { name: 'Renesa Series', supportsColor: false, supportsBrightness: false },
  'R2': { name: 'Renesa Halo', supportsColor: false, supportsBrightness: false },
  'K1': { name: 'Erica', supportsColor: false, supportsBrightness: false }
};

export const TIMER_OPTIONS = [
  { value: 0, label: 'OFF' },
  { value: 1, label: '1h' },
  { value: 2, label: '2h' },
  { value: 3, label: '3h' },
  { value: 4, label: '6h' }
];

export const COLOR_MODES = [
  { value: 'warm', label: 'Warm', color: 'orange' },
  { value: 'cool', label: 'Cool', color: 'blue' },
  { value: 'daylight', label: 'Daylight', color: 'yellow' }
];

export const SPEED_RANGE = { min: 1, max: 6 };
export const BRIGHTNESS_RANGE = { min: 10, max: 100 };