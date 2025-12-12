import CryptoJS from 'crypto-js';

// Generate a unique encryption key based on device fingerprint
const getEncryptionKey = () => {
  const fingerprint = `${navigator.userAgent}-${navigator.language}-${screen.width}x${screen.height}`;
  return CryptoJS.SHA256(fingerprint).toString();
};

export const encryptData = (data) => {
  try {
    const key = getEncryptionKey();
    return CryptoJS.AES.encrypt(JSON.stringify(data), key).toString();
  } catch (error) {
    console.error('Encryption error:', error);
    return null;
  }
};

export const decryptData = (encryptedData) => {
  try {
    const key = getEncryptionKey();
    const bytes = CryptoJS.AES.decrypt(encryptedData, key);
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  } catch (error) {
    console.error('Decryption error:', error);
    return null;
  }
};

export const secureStorage = {
  setItem: (key, value) => {
    const encrypted = encryptData(value);
    if (encrypted) {
      sessionStorage.setItem(key, encrypted);
    }
  },
  
  getItem: (key) => {
    const encrypted = sessionStorage.getItem(key);
    if (!encrypted) return null;
    return decryptData(encrypted);
  },
  
  removeItem: (key) => {
    sessionStorage.removeItem(key);
  },
  
  clear: () => {
    sessionStorage.clear();
  }
};