import React from 'react';
import { Wind, Power, LogOut, AlertCircle, Zap, Moon } from 'lucide-react';

const DeviceList = ({ devices, onSelectDevice, onLogout, demoMode, loading }) => {
  return (
    <div className="min-h-screen bg-atomberg-black">
      {/* Header */}
      <div className="bg-gradient-to-r from-atomberg-darkGray to-atomberg-black border-b-2 border-atomberg-yellow/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-gradient-to-br from-atomberg-yellow to-atomberg-gold p-3 rounded-xl glow-yellow">
                <Wind className="w-8 h-8 text-atomberg-black" strokeWidth={2.5} />
              </div>
              <div>
                <h1 className="text-3xl font-extrabold text-white text-shadow">
                  My Fans
                </h1>
                <p className="text-atomberg-yellow font-semibold">
                  {devices.length} device{devices.length !== 1 ? 's' : ''} connected
                </p>
              </div>
            </div>
            <button
              onClick={onLogout}
              className="flex items-center gap-2 bg-atomberg-darkGray border-2 border-red-500/50 text-red-400 px-5 py-2.5 rounded-lg font-bold hover:bg-red-500/10 hover:border-red-500 transition-all"
            >
              <LogOut className="w-5 h-5" />
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Demo Mode Banner */}
        {demoMode && (
          <div className="mb-8 bg-gradient-to-r from-atomberg-yellow/20 to-atomberg-gold/20 border-2 border-atomberg-yellow/50 rounded-xl p-5 flex items-center gap-4 glow-yellow">
            <div className="bg-atomberg-yellow/20 p-3 rounded-lg">
              <AlertCircle className="w-6 h-6 text-atomberg-yellow" />
            </div>
            <div>
              <p className="text-white font-bold text-lg">Demo Mode Active</p>
              <p className="text-atomberg-yellow/90 text-sm">
                You're exploring with simulated devices. Changes won't affect real fans.
              </p>
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading && devices.length === 0 && (
          <div className="text-center py-20">
            <Wind className="w-16 h-16 text-atomberg-yellow animate-spin mx-auto mb-4" />
            <p className="text-gray-400 text-lg">Loading your devices...</p>
          </div>
        )}

        {/* Empty State */}
        {!loading && devices.length === 0 && (
          <div className="text-center py-20">
            <div className="bg-atomberg-darkGray p-8 rounded-full w-32 h-32 mx-auto mb-6 flex items-center justify-center">
              <Wind className="w-16 h-16 text-gray-600" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">No Devices Found</h3>
            <p className="text-gray-400">Add fans to your Atomberg Home app to get started</p>
          </div>
        )}

        {/* Device Grid */}
        {devices.length > 0 && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {devices.map((device) => (
              <div
                key={device.device_id}
                onClick={() => onSelectDevice(device)}
                className="bg-atomberg-darkGray border-2 border-gray-700 hover:border-atomberg-yellow rounded-2xl p-6 cursor-pointer transition-all hover:scale-[1.02] hover:shadow-2xl card-shadow group"
              >
                {/* Device Header */}
                <div className="flex items-start justify-between mb-6">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-1 group-hover:text-atomberg-yellow transition">
                      {device.device_name || device.model}
                    </h3>
                    <p className="text-sm text-gray-400">
                      {device.model} • {device.series}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${device.is_online ? 'bg-green-500 animate-pulse' : 'bg-gray-500'}`} />
                    <span className={`text-xs font-semibold ${device.is_online ? 'text-green-400' : 'text-gray-500'}`}>
                      {device.is_online ? 'Online' : 'Offline'}
                    </span>
                  </div>
                </div>

                {/* Device Stats */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-between p-3 bg-atomberg-black rounded-lg">
                    <div className="flex items-center gap-2">
                      <Power className={`w-5 h-5 ${device.power ? 'text-green-400' : 'text-gray-500'}`} />
                      <span className="text-sm font-semibold text-gray-300">Power</span>
                    </div>
                    <span className={`font-bold text-sm ${device.power ? 'text-green-400' : 'text-gray-500'}`}>
                      {device.power ? 'ON' : 'OFF'}
                    </span>
                  </div>
                  
                  {device.power && (
                    <>
                      <div className="flex items-center justify-between p-3 bg-atomberg-black rounded-lg">
                        <div className="flex items-center gap-2">
                          <Zap className="w-5 h-5 text-atomberg-yellow" />
                          <span className="text-sm font-semibold text-gray-300">Speed</span>
                        </div>
                        <div className="flex items-center gap-1">
                          {[...Array(6)].map((_, i) => (
                            <div
                              key={i}
                              className={`w-1 h-3 rounded-full ${
                                i < device.last_recorded_speed 
                                  ? 'bg-atomberg-yellow' 
                                  : 'bg-gray-700'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      
                      {device.sleep_mode && (
                        <div className="flex items-center justify-between p-3 bg-indigo-500/10 border border-indigo-500/30 rounded-lg">
                          <div className="flex items-center gap-2">
                            <Moon className="w-5 h-5 text-indigo-400" />
                            <span className="text-sm font-semibold text-indigo-300">Sleep Mode</span>
                          </div>
                          <span className="font-bold text-sm text-indigo-400">Active</span>
                        </div>
                      )}
                    </>
                  )}
                </div>

                {/* Control Button */}
                <button className="w-full bg-gradient-to-r from-atomberg-yellow to-atomberg-gold text-atomberg-black py-3 rounded-lg font-bold hover:shadow-lg transition-all group-hover:scale-[1.02]">
                  Control Device
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DeviceList;