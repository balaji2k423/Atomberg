import React from 'react';
import { ArrowLeft, Power, Wind, Moon, Timer, Lightbulb, Sun, Sunset, CloudSun, Plus, Minus, AlertCircle } from 'lucide-react';
import { FAN_MODELS, TIMER_OPTIONS, COLOR_MODES } from '../utils/constants';

const DeviceControl = ({ device, onBack, onSendCommand, loading, error }) => {
  const modelInfo = FAN_MODELS[device.series] || {};
  const supportsColor = modelInfo.supportsColor || false;
  const supportsBrightness = modelInfo.supportsBrightness || false;

  const handleCommand = (command) => {
    onSendCommand(device.device_id, command);
  };

  return (
    <div className="min-h-screen bg-gray-950">
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-950 border-b-2 border-yellow-500/20 sticky top-0 z-10 backdrop-blur-sm">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-yellow-500 hover:text-yellow-400 transition mb-3 font-semibold"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Devices
          </button>
          
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-extrabold text-white mb-1">
                {device.device_name || device.model}
              </h1>
              <p className="text-yellow-500 font-semibold text-sm">
                {device.model} • {device.series}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${device.is_online ? 'bg-green-500 animate-pulse' : 'bg-gray-600'}`} />
              <span className={`text-sm font-bold ${device.is_online ? 'text-green-400' : 'text-gray-600'}`}>
                {device.is_online ? 'Online' : 'Offline'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Error Message */}
        {error && (
          <div className="mb-5 bg-red-500/10 border-2 border-red-500/50 rounded-xl p-3 flex items-start gap-2 animate-shake">
            <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-red-400 font-medium">{error}</p>
          </div>
        )}

        {/* Control Grid */}
        <div className="grid sm:grid-cols-2 gap-4">
          {/* Power Control */}
          <div className="bg-gray-900 border-2 border-gray-800 rounded-2xl p-5 shadow-xl animate-fade-in">
            <div className="flex items-center gap-3 mb-4">
              <div className={`p-2.5 rounded-lg ${device.power ? 'bg-green-500/20' : 'bg-gray-800'}`}>
                <Power className={`w-5 h-5 ${device.power ? 'text-green-400' : 'text-gray-600'}`} />
              </div>
              <h3 className="text-lg font-bold text-white">Power</h3>
            </div>
            <button
              onClick={() => handleCommand({ power: !device.power })}
              disabled={loading || !device.is_online}
              className={`w-full py-3 rounded-xl font-bold transition-all ${
                device.power
                  ? 'bg-green-600 text-white hover:bg-green-700 hover:shadow-lg hover:shadow-green-600/30'
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
              } disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {device.power ? 'Turn OFF' : 'Turn ON'}
            </button>
          </div>

          {/* Speed Control */}
          <div className="bg-gray-900 border-2 border-gray-800 rounded-2xl p-5 shadow-xl animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-purple-500/20 p-2.5 rounded-lg">
                <Wind className="w-5 h-5 text-purple-400" />
              </div>
              <h3 className="text-lg font-bold text-white">Speed</h3>
            </div>
            <div className="flex items-center justify-between gap-3">
              <button
                onClick={() => handleCommand({ speed: Math.max(1, device.last_recorded_speed - 1) })}
                disabled={loading || !device.power || device.last_recorded_speed <= 1 || !device.is_online}
                className="bg-purple-600 text-white p-3 rounded-xl hover:bg-purple-700 transition disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <Minus className="w-5 h-5" />
              </button>
              <div className="text-center flex-1">
                <div className="text-4xl font-extrabold text-yellow-500 mb-0.5">
                  {device.last_recorded_speed}
                </div>
                <div className="text-xs text-gray-500 font-semibold">of 6</div>
              </div>
              <button
                onClick={() => handleCommand({ speed: Math.min(6, device.last_recorded_speed + 1) })}
                disabled={loading || !device.power || device.last_recorded_speed >= 6 || !device.is_online}
                className="bg-purple-600 text-white p-3 rounded-xl hover:bg-purple-700 transition disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Sleep Mode */}
          <div className="bg-gray-900 border-2 border-gray-800 rounded-2xl p-5 shadow-xl animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="flex items-center gap-3 mb-4">
              <div className={`p-2.5 rounded-lg ${device.sleep_mode ? 'bg-indigo-500/20' : 'bg-gray-800'}`}>
                <Moon className={`w-5 h-5 ${device.sleep_mode ? 'text-indigo-400' : 'text-gray-600'}`} />
              </div>
              <h3 className="text-lg font-bold text-white">Sleep Mode</h3>
            </div>
            <button
              onClick={() => handleCommand({ sleep: !device.sleep_mode })}
              disabled={loading || !device.power || !device.is_online}
              className={`w-full py-3 rounded-xl font-bold transition-all ${
                device.sleep_mode
                  ? 'bg-indigo-600 text-white hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-600/30'
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
              } disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {device.sleep_mode ? 'Enabled' : 'Disabled'}
            </button>
          </div>

          {/* Timer */}
          <div className="bg-gray-900 border-2 border-gray-800 rounded-2xl p-5 shadow-xl animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-amber-500/20 p-2.5 rounded-lg">
                <Timer className="w-5 h-5 text-amber-400" />
              </div>
              <h3 className="text-lg font-bold text-white">Timer</h3>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {TIMER_OPTIONS.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleCommand({ timer: option.value })}
                  disabled={loading || !device.power || !device.is_online}
                  className={`py-2.5 rounded-lg font-bold transition-all text-sm ${
                    device.timer_hours === option.value
                      ? 'bg-gradient-to-r from-yellow-500 to-orange-500 text-black shadow-lg shadow-yellow-500/30'
                      : 'bg-gray-950 text-gray-400 hover:bg-gray-800 border border-gray-800'
                  } disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* Light Control */}
          <div className="bg-gray-900 border-2 border-gray-800 rounded-2xl p-5 shadow-xl animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <div className="flex items-center gap-3 mb-4">
              <div className={`p-2.5 rounded-lg ${device.led ? 'bg-yellow-500/20' : 'bg-gray-800'}`}>
                <Lightbulb className={`w-5 h-5 ${device.led ? 'text-yellow-400' : 'text-gray-600'}`} />
              </div>
              <h3 className="text-lg font-bold text-white">Light</h3>
            </div>
            <button
              onClick={() => handleCommand({ led: !device.led })}
              disabled={loading || !device.power || !device.is_online}
              className={`w-full py-3 rounded-xl font-bold transition-all ${
                device.led
                  ? 'bg-yellow-500 text-black hover:bg-yellow-600 hover:shadow-lg hover:shadow-yellow-500/30'
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
              } disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {device.led ? 'Turn OFF' : 'Turn ON'}
            </button>
          </div>

          {/* Brightness Control */}
          {supportsBrightness && (
            <div className="bg-gray-900 border-2 border-gray-800 rounded-2xl p-5 shadow-xl animate-fade-in" style={{ animationDelay: '0.5s' }}>
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-orange-500/20 p-2.5 rounded-lg">
                  <Sun className="w-5 h-5 text-orange-400" />
                </div>
                <h3 className="text-lg font-bold text-white">Brightness</h3>
              </div>
              <div className="space-y-3">
                <input
                  type="range"
                  min="10"
                  max="100"
                  value={device.last_recorded_brightness}
                  onChange={(e) => handleCommand({ brightness: parseInt(e.target.value) })}
                  disabled={loading || !device.power || !device.led || !device.is_online}
                  className="w-full h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-yellow-500 disabled:opacity-50"
                />
                <div className="text-center">
                  <span className="text-3xl font-extrabold text-yellow-500">
                    {device.last_recorded_brightness}%
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Color Control */}
          {supportsColor && (
            <div className={`bg-gray-900 border-2 border-gray-800 rounded-2xl p-5 shadow-xl animate-fade-in ${supportsBrightness ? 'sm:col-span-2' : ''}`} style={{ animationDelay: '0.6s' }}>
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-pink-500/20 p-2.5 rounded-lg">
                  <CloudSun className="w-5 h-5 text-pink-400" />
                </div>
                <h3 className="text-lg font-bold text-white">Light Color</h3>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {COLOR_MODES.map((mode) => (
                  <button
                    key={mode.value}
                    onClick={() => handleCommand({ light_mode: mode.value })}
                    disabled={loading || !device.power || !device.led || !device.is_online}
                    className={`py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2 ${
                      device.last_recorded_color === mode.value
                        ? mode.value === 'warm' 
                          ? 'bg-orange-500 text-white hover:bg-orange-600 shadow-lg shadow-orange-500/30'
                          : mode.value === 'cool'
                          ? 'bg-blue-500 text-white hover:bg-blue-600 shadow-lg shadow-blue-500/30'
                          : 'bg-yellow-500 text-black hover:bg-yellow-600 shadow-lg shadow-yellow-500/30'
                        : 'bg-gray-950 text-gray-400 hover:bg-gray-800 border-2 border-gray-800'
                    } disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    {mode.value === 'warm' && <Sunset className="w-4 h-4" />}
                    {mode.value === 'cool' && <Moon className="w-4 h-4" />}
                    {mode.value === 'daylight' && <Sun className="w-4 h-4" />}
                    <span className="text-sm">{mode.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DeviceControl;