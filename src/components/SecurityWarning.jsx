import React from 'react';
import { Shield, Lock, Eye, EyeOff } from 'lucide-react';

const SecurityWarning = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-atomberg-darkGray border-2 border-atomberg-yellow rounded-2xl max-w-md w-full p-8 card-shadow">
        <div className="flex items-center justify-center mb-6">
          <div className="bg-atomberg-yellow/20 p-4 rounded-full">
            <Shield className="w-12 h-12 text-atomberg-yellow" />
          </div>
        </div>
        
        <h2 className="text-2xl font-bold text-white text-center mb-4">
          Security Information
        </h2>
        
        <div className="space-y-4 text-gray-300 text-sm">
          <div className="flex gap-3">
            <Lock className="w-5 h-5 text-atomberg-yellow flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-white mb-1">Encrypted Storage</p>
              <p>Your API credentials are encrypted using AES-256 and stored only in your browser's session storage.</p>
            </div>
          </div>
          
          <div className="flex gap-3">
            <Eye className="w-5 h-5 text-atomberg-yellow flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-white mb-1">Session Only</p>
              <p>Credentials are automatically cleared when you close the browser tab.</p>
            </div>
          </div>
          
          <div className="flex gap-3">
            <EyeOff className="w-5 h-5 text-atomberg-yellow flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-white mb-1">No Server Storage</p>
              <p>Your API keys never leave your device. All API calls are made directly from your browser.</p>
            </div>
          </div>
        </div>
        
        <div className="mt-6 p-4 bg-atomberg-yellow/10 border border-atomberg-yellow/30 rounded-lg">
          <p className="text-xs text-atomberg-yellow">
            <strong>Note:</strong> Keep your API credentials secure. Never share them or commit them to version control.
          </p>
        </div>
        
        <button
          onClick={onClose}
          className="w-full mt-6 bg-atomberg-yellow text-atomberg-black py-3 rounded-lg font-bold hover:bg-atomberg-gold transition"
        >
          Got it
        </button>
      </div>
    </div>
  );
};

export default SecurityWarning;