import React, { useState } from 'react';
import { Wind, AlertCircle, Lock, Eye, EyeOff, Sparkles } from 'lucide-react';
import SecurityWarning from './SecurityWarning';

const SetupView = ({ onLogin, error, loading }) => {
  const [apiKey, setApiKey] = useState('');
  const [refreshToken, setRefreshToken] = useState('');
  const [showApiKey, setShowApiKey] = useState(false);
  const [showRefreshToken, setShowRefreshToken] = useState(false);
  const [showSecurityInfo, setShowSecurityInfo] = useState(false);

  const handleSubmit = async () => {
    await onLogin(apiKey, refreshToken, false);
  };

  const handleDemoMode = () => {
    onLogin('', '', true);
  };

  return (
    <div className="min-h-screen bg-atomberg-black flex items-center justify-center p-4">
      {showSecurityInfo && (
        <SecurityWarning onClose={() => setShowSecurityInfo(false)} />
      )}
      
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-atomberg-yellow to-atomberg-gold rounded-3xl mb-6 card-shadow glow-yellow">
            <Wind className="w-14 h-14 text-atomberg-black" strokeWidth={2.5} />
          </div>
          <h1 className="text-5xl font-extrabold text-white mb-3 text-shadow">
            Atomberg
          </h1>
          <div className="flex items-center justify-center gap-2 text-atomberg-yellow">
            <Sparkles className="w-5 h-5" />
            <p className="text-xl font-semibold">Smart Fan Controller</p>
            <Sparkles className="w-5 h-5" />
          </div>
        </div>

        {/* Main Card */}
        <div className="bg-atomberg-darkGray border-2 border-atomberg-yellow/20 rounded-2xl shadow-2xl p-8 card-shadow">
          <div className="space-y-6">
            {/* API Key Input */}
            <div>
              <label className="block text-sm font-bold text-atomberg-yellow mb-3">
                API Key
              </label>
              <div className="relative">
                <input
                  type={showApiKey ? 'text' : 'password'}
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  className="w-full px-4 py-3.5 pr-12 rounded-lg bg-atomberg-black border-2 border-gray-700 text-white placeholder-gray-500 focus:border-atomberg-yellow focus:ring-2 focus:ring-atomberg-yellow/20 outline-none transition"
                  placeholder="Enter your API key"
                />
                <button
                  type="button"
                  onClick={() => setShowApiKey(!showApiKey)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-atomberg-yellow transition"
                >
                  {showApiKey ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Refresh Token Input */}
            <div>
              <label className="block text-sm font-bold text-atomberg-yellow mb-3">
                Refresh Token
              </label>
              <div className="relative">
                <input
                  type={showRefreshToken ? 'text' : 'password'}
                  value={refreshToken}
                  onChange={(e) => setRefreshToken(e.target.value)}
                  className="w-full px-4 py-3.5 pr-12 rounded-lg bg-atomberg-black border-2 border-gray-700 text-white placeholder-gray-500 focus:border-atomberg-yellow focus:ring-2 focus:ring-atomberg-yellow/20 outline-none transition"
                  placeholder="Enter your refresh token"
                />
                <button
                  type="button"
                  onClick={() => setShowRefreshToken(!showRefreshToken)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-atomberg-yellow transition"
                >
                  {showRefreshToken ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Security Info Button */}
            <button
              type="button"
              onClick={() => setShowSecurityInfo(true)}
              className="w-full flex items-center justify-center gap-2 text-sm text-gray-400 hover:text-atomberg-yellow transition"
            >
              <Lock className="w-4 h-4" />
              <span>How we protect your credentials</span>
            </button>

            {/* Error Message */}
            {error && (
              <div className="bg-red-500/10 border-2 border-red-500/50 rounded-lg p-4 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-400 font-medium">{error}</p>
              </div>
            )}

            {/* Connect Button */}
            <button
              onClick={handleSubmit}
              disabled={loading || !apiKey || !refreshToken}
              className="w-full bg-gradient-to-r from-atomberg-yellow to-atomberg-gold text-atomberg-black py-4 rounded-lg font-bold text-lg hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 glow-yellow"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <Wind className="w-5 h-5 animate-spin" />
                  Connecting...
                </span>
              ) : (
                'Connect to Atomberg'
              )}
            </button>
          </div>

          {/* Demo Mode Section */}
          <div className="mt-8 pt-8 border-t-2 border-gray-700">
            <button
              onClick={handleDemoMode}
              className="w-full bg-atomberg-black border-2 border-atomberg-yellow/50 text-atomberg-yellow py-3.5 rounded-lg font-bold hover:bg-atomberg-yellow/10 hover:border-atomberg-yellow transition-all"
            >
              Try Demo Mode
            </button>
            <p className="text-xs text-gray-500 mt-4 text-center leading-relaxed">
              Demo mode lets you explore all features without connecting to real devices. Perfect for testing!
            </p>
          </div>

          {/* Help Text */}
          <div className="mt-6 p-4 bg-atomberg-yellow/5 border border-atomberg-yellow/20 rounded-lg">
            <p className="text-xs text-gray-400 leading-relaxed">
              <span className="text-atomberg-yellow font-bold">Need credentials?</span> Open the Atomberg Home app, go to Settings → Developer Options, and enable Developer Mode to generate your API key and refresh token.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SetupView;