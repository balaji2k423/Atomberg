import React from 'react';
import { Wind, Power, LogOut, AlertCircle, Zap, Moon } from 'lucide-react';

const DeviceList = ({ devices, onSelectDevice, onLogout, demoMode, loading }) => {
  return (
    <div className="min-h-screen bg-gray-950">
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-950 border-b-2 border-yellow-500/20 sticky top-0 z-10 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-yellow-500 to-orange-500 p-2.5 rounded-xl shadow-lg shadow-yellow-500/30">
                <Wind className="w-7 h-7 text-black" strokeWidth={2.5} />
              </div>
              <div>
                <h1 className="text-2xl font-extrabold text-white">
                  My Fans
                </h1>
                <p className="text-yellow-500 font-semibold text-sm">
                  {devices.length} device{devices.length !== 1 ? 's' : ''} connected
                </p>
              </div>
            </div>
            <button
              onClick={onLogout}
              className="flex items-center gap-2 bg-gray-900 border-2 border-red-500/50 text-red-400 px-4 py-2 rounded-xl font-bold hover:bg-red-500/10 hover:border-red-500 transition-all"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Demo Mode Banner */}
        {demoMode && (
          <div className="mb-6 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border-2 border-yellow-500/50 rounded-xl p-4 flex items-center gap-3 shadow-lg animate-fade-in">
            <div className="bg-yellow-500/20 p-2.5 rounded-lg flex-shrink-0">
              <AlertCircle className="w-5 h-5 text-yellow-500" />
            </div>
            <div>
              <p className="text-white font-bold text-base">Demo Mode Active</p>
              <p className="text-yellow-500/90 text-xs">
                You're exploring with simulated devices. Changes won't affect real fans.
              </p>
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading && devices.length === 0 && (
          <div className="text-center py-20 animate-fade-in">
            <Wind className="w-16 h-16 text-yellow-500 animate-spin mx-auto mb-4" />
            <p className="text-gray-500 text-lg">Loading your devices...</p>
          </div>
        )}

        {/* Empty State */}
        {!loading && devices.length === 0 && (
          <div className="text-center py-20 animate-fade-in">
            <div className="bg-gray-900 p-8 rounded-full w-32 h-32 mx-auto mb-6 flex items-center justify-center border-2 border-gray-800">
              <Wind className="w-16 h-16 text-gray-700" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">No Devices Found</h3>
            <p className="text-gray-500">Add fans to your Atomberg Home app to get started</p>
          </div>
        )}

        {/* Device Grid */}
        {devices.length > 0 && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {devices.map((device, index) => (
              <div
                key={device.device_id}
                onClick={() => onSelectDevice(device)}
                className="bg-gray-900 border-2 border-gray-800 hover:border-yellow-500 rounded-2xl p-5 cursor-pointer transition-all hover:scale-[1.02] hover:shadow-xl hover:shadow-yellow-500/10 group animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Device Header */}
                <div className="flex items-start justify-between mb-5">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-white mb-1 group-hover:text-yellow-500 transition-colors">
                      {device.device_name || device.model}
                    </h3>
                    <p className="text-xs text-gray-500">
                      {device.model} • {device.series}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className={`w-2.5 h-2.5 rounded-full ${device.is_online ? 'bg-green-500 animate-pulse' : 'bg-gray-600'}`} />
                    <span className={`text-xs font-semibold ${device.is_online ? 'text-green-400' : 'text-gray-600'}`}>
                      {device.is_online ? 'Online' : 'Offline'}
                    </span>
                  </div>
                </div>

                {/* Device Stats */}
                <div className="space-y-2.5 mb-5">
                  <div className="flex items-center justify-between p-2.5 bg-gray-950 rounded-lg border border-gray-800">
                    <div className="flex items-center gap-2">
                      <Power className={`w-4 h-4 ${device.power ? 'text-green-400' : 'text-gray-600'}`} />
                      <span className="text-sm font-semibold text-gray-400">Power</span>
                    </div>
                    <span className={`font-bold text-sm ${device.power ? 'text-green-400' : 'text-gray-600'}`}>
                      {device.power ? 'ON' : 'OFF'}
                    </span>
                  </div>
                  
                  {device.power && (
                    <>
                      <div className="flex items-center justify-between p-2.5 bg-gray-950 rounded-lg border border-gray-800">
                        <div className="flex items-center gap-2">
                          <Zap className="w-4 h-4 text-yellow-500" />
                          <span className="text-sm font-semibold text-gray-400">Speed</span>
                        </div>
                        <div className="flex items-center gap-1">
                          {[...Array(6)].map((_, i) => (
                            <div
                              key={i}
                              className={`w-1 h-3 rounded-full transition-colors ${
                                i < device.last_recorded_speed 
                                  ? 'bg-yellow-500' 
                                  : 'bg-gray-800'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      
                      {device.sleep_mode && (
                        <div className="flex items-center justify-between p-2.5 bg-indigo-500/10 border border-indigo-500/30 rounded-lg">
                          <div className="flex items-center gap-2">
                            <Moon className="w-4 h-4 text-indigo-400" />
                            <span className="text-sm font-semibold text-indigo-300">Sleep Mode</span>
                          </div>
                          <span className="font-bold text-sm text-indigo-400">Active</span>
                        </div>
                      )}
                    </>
                  )}
                </div>

                {/* Control Button */}
                <button className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 text-black py-2.5 rounded-xl font-bold hover:shadow-lg hover:shadow-yellow-500/30 transition-all group-hover:scale-[1.02]">
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