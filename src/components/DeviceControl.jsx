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
    <div className="min-h-screen bg-atomberg-black">
      {/* Header */}
      <div className="bg-gradient-to-r from-atomberg-darkGray to-atomberg-black border-b-2 border-atomberg-yellow/20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-atomberg-yellow hover:text-atomberg-gold transition mb-4 font-semibold"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Devices
          </button>
          
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-4xl font-extrabold text-white mb-2 text-shadow">
                {device.device_name || device.model}
              </h1>
              <p className="text-atomberg-yellow font-semibold text-lg">
                {device.model} • {device.series}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className={`w-4 h-4 rounded-full ${device.is_online ? 'bg-green-500 animate-pulse' : 'bg-gray-500'}`} />
              <span className={`text-sm font-bold ${device.is_online ? 'text-green-400' : 'text-gray-500'}`}>
                {device.is_online ? 'Online' : 'Offline'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Error Message */}
        {error && (
          <div className="mb-6 bg-red-500/10 border-2 border-red-500/50 rounded-xl p-4 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-red-400 font-medium">{error}</p>
          </div>
        )}

        {/* Control Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Power Control */}
          <div className="bg-atomberg-darkGray border-2 border-gray-700 rounded-2xl p-6 card-shadow">
            <div className="flex items-center gap-3 mb-6">
              <div className={`p-3 rounded-lg ${device.power ? 'bg-green-500/20' : 'bg-gray-700/50'}`}>
                <Power className={`w-6 h-6 ${device.power ? 'text-green-400' : 'text-gray-500'}`} />
              </div>
              <h3 className="text-xl font-bold text-white">Power</h3>
            </div>
            <button
              onClick={() => handleCommand({ power: !device.power })}
              disabled={loading || !device.is_online}
              className={`w-full py-4 rounded-xl font-bold text-lg transition-all ${
                device.power
                  ? 'bg-green-600 text-white hover:bg-green-700 hover:shadow-lg'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              } disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {device.power ? 'Turn OFF' : 'Turn ON'}
            </button>
          </div>

          {/* Speed Control */}
          <div className="bg-atomberg-darkGray border-2 border-gray-700 rounded-2xl p-6 card-shadow">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-purple-500/20 p-3 rounded-lg">
                <Wind className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-xl font-bold text-white">Speed</h3>
            </div>
            <div className="flex items-center justify-between gap-4">
              <button
                onClick={() => handleCommand({ speed: Math.max(1, device.last_recorded_speed - 1) })}
                disabled={loading || !device.power || device.last_recorded_speed <= 1 || !device.is_online}
                className="bg-purple-600 text-white p-4 rounded-xl hover:bg-purple-700 transition disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <Minus className="w-6 h-6" />
              </button>
              <div className="text-center flex-1">
                <div className="text-5xl font-extrabold text-atomberg-yellow mb-1">
                  {device.last_recorded_speed}
                </div>
                <div className="text-sm text-gray-400 font-semibold">of 6</div>
              </div>
              <button
                onClick={() => handleCommand({ speed: Math.min(6, device.last_recorded_speed + 1) })}
                disabled={loading || !device.power || device.last_recorded_speed >= 6 || !device.is_online}
                className="bg-purple-600 text-white p-4 rounded-xl hover:bg-purple-700 transition disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <Plus className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Sleep Mode */}
          <div className="bg-atomberg-darkGray border-2 border-gray-700 rounded-2xl p-6 card-shadow">
            <div className="flex items-center gap-3 mb-6">
              <div className={`p-3 rounded-lg ${device.sleep_mode ? 'bg-indigo-500/20' : 'bg-gray-700/50'}`}>
                <Moon className={`w-6 h-6 ${device.sleep_mode ? 'text-indigo-400' : 'text-gray-500'}`} />
              </div>
              <h3 className="text-xl font-bold text-white">Sleep Mode</h3>
            </div>
            <button
              onClick={() => handleCommand({ sleep: !device.sleep_mode })}
              disabled={loading || !device.power || !device.is_online}
              className={`w-full py-4 rounded-xl font-bold text-lg transition-all ${
                device.sleep_mode
                  ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              } disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {device.sleep_mode ? 'Enabled' : 'Disabled'}
            </button>
          </div>

          {/* Timer */}
          <div className="bg-atomberg-darkGray border-2 border-gray-700 rounded-2xl p-6 card-shadow">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-amber-500/20 p-3 rounded-lg">
                <Timer className="w-6 h-6 text-amber-400" />
              </div>
              <h3 className="text-xl font-bold text-white">Timer</h3>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {TIMER_OPTIONS.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleCommand({ timer: option.value })}
                  disabled={loading || !device.power || !device.is_online}
                  className={`py-3 rounded-lg font-bold transition-all ${
                    device.timer_hours === option.value
                      ? 'bg-gradient-to-r from-atomberg-yellow to-atomberg-gold text-atomberg-black'
                      : 'bg-atomberg-black text-gray-300 hover:bg-gray-700 border border-gray-700'
                  } disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* Light Control */}
          <div className="bg-atomberg-darkGray border-2 border-gray-700 rounded-2xl p-6 card-shadow">
            <div className="flex items-center gap-3 mb-6">
              <div className={`p-3 rounded-lg ${device.led ? 'bg-yellow-500/20' : 'bg-gray-700/50'}`}>
                <Lightbulb className={`w-6 h-6 ${device.led ? 'text-yellow-400' : 'text-gray-500'}`} />
              </div>
              <h3 className="text-xl font-bold text-white">Light</h3>
            </div>
            <button
              onClick={() => handleCommand({ led: !device.led })}
              disabled={loading || !device.power || !device.is_online}
              className={`w-full py-4 rounded-xl font-bold text-lg transition-all ${
                device.led
                  ? 'bg-yellow-500 text-atomberg-black hover:bg-yellow-600 hover:shadow-lg'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              } disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {device.led ? 'Turn OFF' : 'Turn ON'}
            </button>
          </div>

          {/* Brightness Control */}
          {supportsBrightness && (
            <div className="bg-atomberg-darkGray border-2 border-gray-700 rounded-2xl p-6 card-shadow">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-orange-500/20 p-3 rounded-lg">
                  <Sun className="w-6 h-6 text-orange-400" />
                </div>
                <h3 className="text-xl font-bold text-white">Brightness</h3>
              </div>
              <div className="space-y-4">
                <input
                  type="range"
                  min="10"
                  max="100"
                  value={device.last_recorded_brightness}
                  onChange={(e) => handleCommand({ brightness: parseInt(e.target.value) })}
                  disabled={loading || !device.power || !device.led || !device.is_online}
                  className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-atomberg-yellow disabled:opacity-50"
                />
                <div className="text-center">
                  <span className="text-4xl font-extrabold text-atomberg-yellow">
                    {device.last_recorded_brightness}%
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Color Control */}
          {supportsColor && (
            <div className={`bg-atomberg-darkGray border-2 border-gray-700 rounded-2xl p-6 card-shadow ${supportsBrightness ? 'md:col-span-2' : ''}`}>
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-pink-500/20 p-3 rounded-lg">
                  <CloudSun className="w-6 h-6 text-pink-400" />
                </div>
                <h3 className="text-xl font-bold text-white">Light Color</h3>
              </div>
              <div className="grid grid-cols-3 gap-4">
                {COLOR_MODES.map((mode) => (
                  <button
                    key={mode.value}
                    onClick={() => handleCommand({ light_mode: mode.value })}
                    disabled={loading || !device.power || !device.led || !device.is_online}
                    className={`py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2 ${
                      device.last_recorded_color === mode.value
                        ? `bg-${mode.color}-500 text-white hover:bg-${mode.color}-600`
                        : 'bg-atomberg-black text-gray-300 hover:bg-gray-700 border-2 border-gray-700'
                    } disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    {mode.value === 'warm' && <Sunset className="w-5 h-5" />}
                    {mode.value === 'cool' && <Moon className="w-5 h-5" />}
                    {mode.value === 'daylight' && <Sun className="w-5 h-5" />}
                    {mode.label}
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