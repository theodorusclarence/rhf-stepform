import { useMapEvents, Marker } from 'react-leaflet';
import { LatLong } from './types';
import L from 'leaflet';
import { Dispatch, SetStateAction } from 'react';
// import 'leaflet/dist/leaflet.css';

type LocationMarkerProps = {
  markerPosition: LatLong;
  setMarkerPosition: Dispatch<SetStateAction<LatLong>>;
};

export default function LocationMarker({
  markerPosition,
  setMarkerPosition,
}: LocationMarkerProps) {
  const map = useMapEvents({
    drag() {
      const center = map.getCenter();
      setMarkerPosition(center);
    },
    locationfound(e) {
      setMarkerPosition(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
    },
  });

  return <Marker position={markerPosition} icon={DefaultIcon}></Marker>;
}

const DefaultIcon = L.icon({
  iconSize: [24, 41],
  iconAnchor: [12, 41],
  iconUrl: '/images/leaflet/marker-icon.png',
  shadowUrl: '/images/leaflet/marker-shadow.png',
});
