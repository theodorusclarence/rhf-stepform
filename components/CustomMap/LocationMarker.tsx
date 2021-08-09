import L from 'leaflet';
import { Dispatch, SetStateAction } from 'react';
import { useFormContext } from 'react-hook-form';
import { useMapEvents, Marker } from 'react-leaflet';

import { getMarkerPosition } from '@/lib/helper';

type LocationMarkerProps = {
  setIsDragging: Dispatch<SetStateAction<boolean>>;
};

export default function LocationMarker({ setIsDragging }: LocationMarkerProps) {
  const { watch, setValue } = useFormContext();
  const markerPosition = getMarkerPosition(watch);

  const map = useMapEvents({
    drag() {
      const { lat, lng } = map.getCenter();
      setValue('lat', lat);
      setValue('lng', lng);
    },
    dragstart() {
      setIsDragging(true);
    },
    dragend() {
      setIsDragging(false);
    },
    locationfound(e) {
      map.flyTo(e.latlng, map.getZoom());
      setValue('lat', e.latlng.lat, { shouldValidate: true });
      setValue('lng', e.latlng.lng, { shouldValidate: true });
    },
  });

  return <Marker position={markerPosition} icon={DefaultIcon}></Marker>;
}

export const DefaultIcon = L.icon({
  iconSize: [24, 41],
  iconAnchor: [12, 41],
  iconUrl: '/images/leaflet/marker-icon.png',
  shadowUrl: '/images/leaflet/marker-shadow.png',
});
