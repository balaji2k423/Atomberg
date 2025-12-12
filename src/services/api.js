import { API_BASE_URL } from '../utils/constants';
import { secureStorage } from './encryption';

class AtombergAPI {
  constructor() {
    this.baseURL = API_BASE_URL;
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    
    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP ${response.status}: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  async getAccessToken(apiKey, refreshToken) {
    const data = await this.request('/v1/get_access_token', {
      headers: {
        'Authorization': `Bearer ${refreshToken}`,
        'x-api-key': apiKey,
      },
    });
    
    // Store credentials securely
    secureStorage.setItem('atomberg_credentials', {
      apiKey,
      refreshToken,
      accessToken: data.access_token,
      timestamp: Date.now()
    });
    
    return data.access_token;
  }

  async getDevices(apiKey, accessToken) {
    const data = await this.request('/v1/get_list_of_devices', {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'x-api-key': apiKey,
      },
    });
    
    return data.message?.device_list || [];
  }

  async sendCommand(apiKey, accessToken, deviceId, command) {
    return await this.request('/v1/send_command', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'x-api-key': apiKey,
      },
      body: JSON.stringify({
        device_id: deviceId,
        command,
      }),
    });
  }

  async getDeviceState(apiKey, accessToken, deviceId = 'all') {
    const data = await this.request(`/v1/get_device_state?device_id=${deviceId}`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'x-api-key': apiKey,
      },
    });
    
    return data.message?.device_state || [];
  }

  getStoredCredentials() {
    return secureStorage.getItem('atomberg_credentials');
  }

  clearCredentials() {
    secureStorage.clear();
  }
}

export default new AtombergAPI();