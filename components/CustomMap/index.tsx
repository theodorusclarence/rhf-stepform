import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MapContainer, LayersControl } from 'react-leaflet';
const { BaseLayer } = LayersControl;
import ReactLeafletGoogleLayer from 'react-leaflet-google-layer';
import { useState } from 'react';

import LocationMarker from './LocationMarker';
import Button from '@/components/Button';

import { LatLong } from './types';

const defaultLoc: LatLong = {
  lat: -2.9879800596759156,
  lng: 104.73019636171288,
};

export default function CustomMap() {
  const [map, setMap] = useState<L.Map | undefined>(undefined);
  const [markerPosition, setMarkerPosition] = useState(defaultLoc);

  const handleMapCreated = (map: L.Map) => {
    setMap(map);
  };

  const handleUseCurrent = () => {
    map?.locate();
  };

  return (
    <div className='space-y-2'>
      <MapContainer
        className='w-full min-h-[500px]'
        zoom={14}
        scrollWheelZoom={false}
        doubleClickZoom={false}
        center={[-2.9879800596759156, 104.73019636171288]}
        whenCreated={handleMapCreated}
      >
        <LayersControl position='topleft' collapsed={false}>
          <BaseLayer checked name='Satellite'>
            <ReactLeafletGoogleLayer
              googleMapsLoaderConf={{ apiKey: '' }}
              type='hybrid'
            />
          </BaseLayer>
        </LayersControl>
        <LocationMarker
          markerPosition={markerPosition}
          setMarkerPosition={setMarkerPosition}
        />
      </MapContainer>
      <Button onClick={handleUseCurrent}>Use current location</Button>
      <div className='space-y-1'>
        <p className='font-medium'>Position:</p>
        <p className='text-sm'>{markerPosition.lat}</p>
        <p className='text-sm'>{markerPosition.lng}</p>
      </div>
    </div>
  );
}
