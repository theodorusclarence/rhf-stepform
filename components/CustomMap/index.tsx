import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useState } from 'react';
import { MapContainer, LayersControl } from 'react-leaflet';
const { BaseLayer } = LayersControl;
import { useFormContext } from 'react-hook-form';
import ReactLeafletGoogleLayer from 'react-leaflet-google-layer';

import { getMarkerPosition } from '@/lib/helper';

import LocationMarker from '@/components/CustomMap/LocationMarker';
import Button from '@/components/Button';
import { LatLong } from './types';

export default function CustomMap() {
  const [map, setMap] = useState<L.Map | undefined>(undefined);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const { watch } = useFormContext();
  const markerPosition = getMarkerPosition(watch);

  const handleMapCreated = (map: L.Map) => {
    setMap(map);
  };

  const handleUseCurrent = () => {
    map?.locate();
  };

  // Move map if input is changing
  // TODO Optimize setView calling
  !isDragging && map?.setView(markerPosition);

  const distance: string = (
    (map?.distance(markerPosition, pickedLatlong) ?? 0) / 1000
  ).toFixed(3);

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
        <LocationMarker setIsDragging={setIsDragging} />
      </MapContainer>
      <Button type='button' onClick={handleUseCurrent}>
        Use current location
      </Button>
      <div className='space-y-1'>
        <p className='font-medium'>Position:</p>
        <p className='text-sm'>{markerPosition.lat}</p>
        <p className='text-sm'>{markerPosition.lng}</p>
      </div>
      <div className='space-y-1'>
        <p className='font-medium'>Distance to Monas: {distance}km</p>
      </div>
    </div>
  );
}

// Monas latlong
const pickedLatlong: LatLong = {
  lat: -6.1754,
  lng: 106.8272,
};
