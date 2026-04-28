import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { renderToStaticMarkup } from 'react-dom/server';
import { Bike, Car, BatteryCharging } from 'lucide-react';

// Custom component to handle map view updates
function ChangeView({ center, zoom }) {
  const map = useMap();
  map.setView(center, zoom);
  return null;
}

const createCustomIcon = (type, availability) => {
  let color = '#3b82f6'; // Default blue
  if (availability !== undefined) {
    if (availability > 0.5) color = '#10b981'; // Green
    else if (availability > 0.1) color = '#f59e0b'; // Yellow
    else color = '#ef4444'; // Red
  }

  const iconMarkup = renderToStaticMarkup(
    <div style={{
      backgroundColor: color,
      width: '32px',
      height: '32px',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      border: '2px solid rgba(255,255,255,0.2)',
      boxShadow: `0 0 10px ${color}80`
    }}>
      {type === 'Bicycle' && <Bike size={18} color="white" />}
      {type === 'Parking' && <Car size={18} color="white" />}
      {type === 'EChargingStation' && <BatteryCharging size={18} color="white" />}
    </div>
  );

  return L.divIcon({
    html: iconMarkup,
    className: 'custom-leaflet-icon',
    iconSize: [32, 32],
    iconAnchor: [16, 16],
  });
};

const MobilityMap = ({ stations, selectedStation, onStationSelect }) => {
  const defaultCenter = [46.498, 11.354]; // Bolzano center
  
  return (
    <MapContainer 
      center={defaultCenter} 
      zoom={13} 
      scrollWheelZoom={true}
      className="h-full w-full"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      
      {stations.map((station) => (
        <Marker 
          key={station.id} 
          position={[station.latitude, station.longitude]}
          icon={createCustomIcon(station.type, station.available / station.total)}
          eventHandlers={{
            click: () => onStationSelect(station),
          }}
        >
          <Popup>
            <div className="p-1">
              <h4 className="font-bold mb-1">{station.name}</h4>
              <p className="text-xs text-slate-400 mb-2">{station.type}</p>
              <div className="flex items-center gap-2">
                <div className="flex-1 bg-white/10 h-1 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-blue-500" 
                    style={{ width: `${(station.available / station.total) * 100}%` }}
                  ></div>
                </div>
                <span className="text-[10px] font-bold">{station.available}/{station.total}</span>
              </div>
            </div>
          </Popup>
        </Marker>
      ))}

      {selectedStation && (
        <ChangeView 
          center={[selectedStation.latitude, selectedStation.longitude]} 
          zoom={15} 
        />
      )}
    </MapContainer>
  );
};

export default MobilityMap;
