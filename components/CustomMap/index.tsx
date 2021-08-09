import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-geosearch/assets/css/leaflet.css';
import { useEffect, useState } from 'react';
import { MapContainer, LayersControl } from 'react-leaflet';
const { BaseLayer } = LayersControl;
import { useFormContext } from 'react-hook-form';
import ReactLeafletGoogleLayer from 'react-leaflet-google-layer';
import { SearchControl, GoogleProvider } from 'leaflet-geosearch';

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

    if (map) {
      const provider = new GoogleProvider({
        params: {
          key: '',
          language: 'id',
          region: 'id',
        },
      });

      map.addControl(
        // @ts-ignore
        new SearchControl({
          provider: provider,
          style: 'bar',
          showMarker: false,
          showPopup: false,
          searchLabel: "Search (Won't work due to no API Key)",
        })
      );
    }
  };

  const handleUseCurrent = () => {
    map?.locate();
  };

  // Move map if input is changing
  // TODO Optimize setView calling
  useEffect(() => {
    if (isDragging) return;

    map?.setView(markerPosition);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDragging, map, markerPosition.lat, markerPosition.lng]);

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
        center={pickedLatlong}
        whenCreated={handleMapCreated}
      >
        <LayersControl position='bottomleft' collapsed={false}>
          <BaseLayer name='Map'>
            <ReactLeafletGoogleLayer
              googleMapsLoaderConf={{ apiKey: '' }}
              type='roadmap'
            />
          </BaseLayer>
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
        Use GPS location
      </Button>
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
