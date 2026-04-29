import React, { useState, useEffect, useMemo } from 'react';
import { mobilityService } from './services/api';
import { 
  Activity, 
  Map as MapIcon, 
  BarChart3, 
  Settings, 
  Bike, 
  Car, 
  BatteryCharging, 
  Info,
  Menu,
  X,
  Search,
  Bell
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Component imports
import MobilityMap from './components/MobilityMap';
import StatsCard from './components/StatsCard';
import AvailabilityChart, { ComparisonChart } from './components/Charts';
import FrameworksList from './components/FrameworksList';

const App = () => {
  const [stations, setStations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedType, setSelectedType] = useState('Bicycle');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [selectedStation, setSelectedStation] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchData();
    // Real-time polling every 60 seconds
    const interval = setInterval(fetchData, 60000);
    return () => clearInterval(interval);
  }, [selectedType]);

  const fetchData = async () => {
    if (!loading) setLoading(true);
    const data = await mobilityService.getStations(selectedType);
    
    let formattedData = [];
    if (!data || data.length === 0) {
      formattedData = mobilityService.getMockStations().filter(s => s.type === selectedType);
    } else {
      formattedData = data.map(s => ({
        id: s.scode,
        name: s.sname,
        latitude: s.scoordinate?.y || 46.498,
        longitude: s.scoordinate?.x || 11.354,
        type: selectedType,
        available: Math.floor(Math.random() * 20), // Mocking availability for UI if missing
        total: 20,
        ...s
      }));
    }
    setStations(formattedData);
    setLoading(false);
  };

  const filteredStations = useMemo(() => {
    return stations.filter(s => 
      s.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [stations, searchQuery]);

  const navItems = [
    { id: 'Bicycle', icon: <Bike size={20} />, label: 'Bicycles', type: 'network' },
    { id: 'Parking', icon: <Car size={20} />, label: 'Parking', type: 'network' },
    { id: 'EChargingStation', icon: <BatteryCharging size={20} />, label: 'E-Charging', type: 'network' },
    { id: 'Resources', icon: <Info size={20} />, label: 'Frameworks', type: 'info' },
  ];

  return (
    <div className="flex h-screen bg-[#0a0b10] text-slate-100 overflow-hidden font-inter">
      {/* Sidebar */}
      <motion.aside 
        initial={false}
        animate={{ width: isSidebarOpen ? 260 : 80 }}
        className="bg-[#14161f] border-r border-white/5 flex flex-col z-20"
      >
        <div className="p-6 flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-600/20">
            <Activity size={20} className="text-white" />
          </div>
          {isSidebarOpen && (
            <span className="font-outfit font-bold text-xl tracking-tight">MOBILITY.io</span>
          )}
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                if (item.type === 'info') {
                  setActiveTab('info');
                } else {
                  setActiveTab('dashboard');
                  setSelectedType(item.id);
                }
                setSearchQuery('');
              }}
              className={`w-full flex items-center gap-4 p-3 rounded-xl transition-all duration-200 ${
                (activeTab === 'info' && item.type === 'info') || (activeTab === 'dashboard' && selectedType === item.id && item.type !== 'info')
                  ? 'bg-blue-600/10 text-blue-400 border border-blue-600/20' 
                  : 'text-slate-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              <span className={(activeTab === 'info' && item.type === 'info') || (activeTab === 'dashboard' && selectedType === item.id && item.type !== 'info') ? 'text-blue-400' : ''}>
                {item.icon}
              </span>
              {isSidebarOpen && <span className="font-medium">{item.label}</span>}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-white/5 space-y-2">
          <button className="w-full flex items-center gap-4 p-3 rounded-xl text-slate-400 hover:bg-white/5 hover:text-white transition-all">
            <Settings size={20} />
            {isSidebarOpen && <span className="font-medium">Settings</span>}
          </button>
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="w-full flex items-center gap-4 p-3 rounded-xl text-slate-400 hover:bg-white/5 hover:text-white transition-all"
          >
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
            {isSidebarOpen && <span className="font-medium">Collapse</span>}
          </button>
        </div>
      </motion.aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col relative overflow-hidden">
        {/* Header */}
        <header className="h-20 border-b border-white/5 px-8 flex items-center justify-between bg-[#14161f]/50 backdrop-blur-md z-10">
          <div className="flex items-center gap-8">
            <div>
              <h1 className="text-2xl font-bold font-outfit">
                {activeTab === 'info' ? 'Resource Hub' : `${selectedType} Network`}
              </h1>
              <p className="text-slate-400 text-sm">
                {activeTab === 'info' ? 'Technology stack recommendations' : 'Real-time monitoring'}
              </p>
            </div>
            
            <div className="relative group hidden md:block">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-400 transition-colors" size={18} />
              <input 
                type="text" 
                placeholder={`Search ${selectedType.toLowerCase()} stations...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <button className="p-2 text-slate-400 hover:text-white hover:bg-white/5 rounded-xl transition-all relative">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-blue-500 rounded-full border-2 border-[#14161f]"></span>
            </button>
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center font-bold shadow-lg shadow-blue-600/20">
              JD
            </div>
          </div>
        </header>

        {/* Dashboard Grid / Frameworks List */}
        <div className="flex-1 p-8 overflow-y-auto custom-scrollbar">
          <AnimatePresence mode="wait">
            {activeTab === 'info' ? (
              <motion.div
                key="info"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="max-w-4xl mx-auto"
              >
                <FrameworksList />
              </motion.div>
            ) : (
              <motion.div
                key="dashboard"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-full min-h-[900px]"
              >
                {/* Stats row */}
                <div className="lg:col-span-12 grid grid-cols-1 md:grid-cols-3 gap-6">
                  <StatsCard 
                    title="Total Stations" 
                    value={loading ? '...' : filteredStations.length} 
                    icon={<MapIcon className="text-blue-400" />}
                    trend="+2.4%"
                  />
                  <StatsCard 
                    title="Avg Availability" 
                    value="68%" 
                    icon={<BarChart3 className="text-indigo-400" />}
                    trend="+5.1%"
                  />
                  <StatsCard 
                    title="Network Status" 
                    value="Optimal" 
                    icon={<Activity className="text-green-400" />}
                    trend="Healthy"
                  />
                </div>

                {/* Map Section */}
                <div className="lg:col-span-8 glass relative overflow-hidden group min-h-[500px]">
                  {loading && (
                    <div className="absolute inset-0 z-[1000] bg-[#14161f]/40 backdrop-blur-sm flex items-center justify-center">
                      <div className="w-12 h-12 border-4 border-blue-600/20 border-t-blue-600 rounded-full animate-spin"></div>
                    </div>
                  )}
                  <MobilityMap 
                    stations={filteredStations} 
                    selectedStation={selectedStation}
                    onStationSelect={setSelectedStation}
                  />
                </div>

                {/* Data Analysis Section */}
                <div className="lg:col-span-4 flex flex-col gap-6">
                  <div className="flex-1 glass p-6 flex flex-col">
                    <h3 className="font-outfit text-lg mb-6 flex items-center gap-2">
                      <BarChart3 size={18} className="text-blue-400" />
                      Availability Trends
                    </h3>
                    <div className="flex-1 min-h-[250px]">
                      <AvailabilityChart />
                    </div>
                  </div>

                  <div className="flex-1 glass p-6 flex flex-col">
                    <h3 className="font-outfit text-lg mb-6 flex items-center gap-2">
                      <Activity size={18} className="text-indigo-400" />
                      Mobility Comparison
                    </h3>
                    <div className="flex-1 min-h-[250px]">
                      <ComparisonChart />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* Station Details Modal/Overlay */}
      <AnimatePresence>
        {selectedStation && (
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            className="fixed top-24 right-8 bottom-8 w-96 glass z-50 p-8 shadow-2xl flex flex-col"
          >
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-2xl font-bold font-outfit mb-1">{selectedStation.name}</h2>
                <span className="bg-blue-600/20 text-blue-400 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">
                  {selectedStation.type}
                </span>
              </div>
              <button 
                onClick={() => setSelectedStation(null)}
                className="p-2 hover:bg-white/10 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 space-y-8">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                  <p className="text-xs text-slate-500 uppercase font-bold mb-1">Available</p>
                  <p className="text-2xl font-outfit font-bold text-blue-400">{selectedStation.available}</p>
                </div>
                <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                  <p className="text-xs text-slate-500 uppercase font-bold mb-1">Capacity</p>
                  <p className="text-2xl font-outfit font-bold">{selectedStation.total}</p>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Live Occupancy</h4>
                <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${(selectedStation.available / selectedStation.total) * 100}%` }}
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 h-full"
                  ></motion.div>
                </div>
                <div className="flex justify-between mt-2">
                  <span className="text-xs text-slate-500">Current Load</span>
                  <span className="text-xs text-blue-400 font-bold">
                    {Math.round((selectedStation.available / selectedStation.total) * 100)}% FULL
                  </span>
                </div>
              </div>

              <div className="flex-1 bg-white/5 rounded-2xl border border-white/5 p-6 flex flex-col items-center justify-center text-center">
                <Info size={32} className="text-blue-500/50 mb-3" />
                <p className="text-sm text-slate-400">Peak hours for this station are usually between 08:00 and 10:00.</p>
              </div>
            </div>

            <button className="w-full bg-blue-600 hover:bg-blue-500 py-4 rounded-2xl font-bold transition-all shadow-lg shadow-blue-600/20 mt-6 active:scale-95">
              Get Directions
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
