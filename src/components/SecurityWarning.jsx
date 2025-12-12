import React from 'react';
import { Shield, Lock, Eye, EyeOff } from 'lucide-react';

const SecurityWarning = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
      <div className="bg-gray-900 border-2 border-yellow-500 rounded-2xl max-w-md w-full p-6 shadow-2xl animate-scale-in">
        <div className="flex items-center justify-center mb-4">
          <div className="bg-yellow-500/20 p-3 rounded-full">
            <Shield className="w-10 h-10 text-yellow-500" />
          </div>
        </div>
        
        <h2 className="text-2xl font-bold text-white text-center mb-4">
          Security Information
        </h2>
        
        <div className="space-y-3 text-gray-300 text-sm mb-4">
          <div className="flex gap-3 items-start">
            <Lock className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-white mb-1">Encrypted Storage</p>
              <p className="text-xs">Your API credentials are encrypted using AES-256 and stored only in your browser's session storage.</p>
            </div>
          </div>
          
          <div className="flex gap-3 items-start">
            <Eye className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-white mb-1">Session Only</p>
              <p className="text-xs">Credentials are automatically cleared when you close the browser tab.</p>
            </div>
          </div>
          
          <div className="flex gap-3 items-start">
            <EyeOff className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-white mb-1">No Server Storage</p>
              <p className="text-xs">Your API keys never leave your device. All API calls are made directly from your browser.</p>
            </div>
          </div>
        </div>
        
        <div className="p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg mb-4">
          <p className="text-xs text-yellow-500">
            <strong>Note:</strong> Keep your API credentials secure. Never share them or commit them to version control.
          </p>
        </div>
        
        <button
          onClick={onClose}
          className="w-full bg-yellow-500 text-black py-3 rounded-xl font-bold hover:bg-yellow-400 transition-all"
        >
          Got it
        </button>
      </div>
    </div>
  );
};
export default SecurityWarning;