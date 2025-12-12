import React, { useState } from 'react';
import { Wind, AlertCircle, Lock, Eye, EyeOff, Sparkles } from 'lucide-react';
import SecurityWarning from './SecurityWarning';

const SetupView = ({ onLogin, error, loading }) => {
  const [apiKey, setApiKey] = useState('');
  const [refreshToken, setRefreshToken] = useState('');
  const [showApiKey, setShowApiKey] = useState(false);
  const [showRefreshToken, setShowRefreshToken] = useState(false);
  const [showSecurityInfo, setShowSecurityInfo] = useState(false);

  const handleSubmit = () => {
    onLogin(apiKey, refreshToken, false);
  };

  const handleDemoMode = () => {
    onLogin('', '', true);
  };

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center p-4">
      {showSecurityInfo && (
        <SecurityWarning onClose={() => setShowSecurityInfo(false)} />
      )}
      
      <div className="w-full max-w-md animate-fade-in">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-3xl mb-4 shadow-lg shadow-yellow-500/30 animate-float">
            <Wind className="w-11 h-11 text-black" strokeWidth={2.5} />
          </div>
          <h1 className="text-4xl font-extrabold text-white mb-2">
            Atomberg
          </h1>
          <div className="flex items-center justify-center gap-2 text-yellow-500">
            <Sparkles className="w-4 h-4" />
            <p className="text-lg font-semibold">Smart Fan Controller</p>
            <Sparkles className="w-4 h-4" />
          </div>
        </div>

        {/* Main Card */}
        <div className="bg-gray-900 border-2 border-gray-800 rounded-2xl shadow-2xl p-6 animate-slide-up">
          <div className="space-y-5">
            {/* API Key Input */}
            <div>
              <label className="block text-sm font-bold text-yellow-500 mb-2">
                API Key
              </label>
              <div className="relative">
                <input
                  type={showApiKey ? 'text' : 'password'}
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  className="w-full px-4 py-3 pr-11 rounded-xl bg-gray-950 border-2 border-gray-800 text-white placeholder-gray-600 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 outline-none transition-all"
                  placeholder="Enter your API key"
                />
                <button
                  type="button"
                  onClick={() => setShowApiKey(!showApiKey)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-yellow-500 transition-colors"
                >
                  {showApiKey ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Refresh Token Input */}
            <div>
              <label className="block text-sm font-bold text-yellow-500 mb-2">
                Refresh Token
              </label>
              <div className="relative">
                <input
                  type={showRefreshToken ? 'text' : 'password'}
                  value={refreshToken}
                  onChange={(e) => setRefreshToken(e.target.value)}
                  className="w-full px-4 py-3 pr-11 rounded-xl bg-gray-950 border-2 border-gray-800 text-white placeholder-gray-600 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 outline-none transition-all"
                  placeholder="Enter your refresh token"
                />
                <button
                  type="button"
                  onClick={() => setShowRefreshToken(!showRefreshToken)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-yellow-500 transition-colors"
                >
                  {showRefreshToken ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Security Info Button */}
            <button
              type="button"
              onClick={() => setShowSecurityInfo(true)}
              className="w-full flex items-center justify-center gap-2 text-sm text-gray-500 hover:text-yellow-500 transition-colors py-2"
            >
              <Lock className="w-4 h-4" />
              <span>How we protect your credentials</span>
            </button>

            {/* Error Message */}
            {error && (
              <div className="bg-red-500/10 border-2 border-red-500/50 rounded-xl p-3 flex items-start gap-2 animate-shake">
                <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-400 font-medium">{error}</p>
              </div>
            )}

            {/* Connect Button */}
            <button
              onClick={handleSubmit}
              disabled={loading || !apiKey || !refreshToken}
              className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 text-black py-3.5 rounded-xl font-bold text-base hover:shadow-lg hover:shadow-yellow-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:shadow-none"
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
          <div className="mt-6 pt-6 border-t-2 border-gray-800">
            <button
              onClick={handleDemoMode}
              className="w-full bg-gray-950 border-2 border-yellow-500/50 text-yellow-500 py-3 rounded-xl font-bold hover:bg-yellow-500/10 hover:border-yellow-500 transition-all"
            >
              Try Demo Mode
            </button>
            <p className="text-xs text-gray-600 mt-3 text-center leading-relaxed">
              Demo mode lets you explore all features without connecting to real devices. Perfect for testing!
            </p>
          </div>

          {/* Help Text */}
          <div className="mt-4 p-3 bg-yellow-500/5 border border-yellow-500/20 rounded-xl">
            <p className="text-xs text-gray-500 leading-relaxed">
              <span className="text-yellow-500 font-bold">Need credentials?</span> Open the Atomberg Home app, go to Settings → Developer Options, and enable Developer Mode to generate your API key and refresh token.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SetupView;