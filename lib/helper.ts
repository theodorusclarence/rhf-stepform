import { LatLong } from '@/types';

export function classNames(...classes: string[]): string {
  return classes.filter(Boolean).join(' ');
}

function clean(input: string): number {
  const str = input + '';

  if (str === '') return 0;

  const replaced = str.replace(/[^0-9.-]/g, '');
  if (replaced === '-') return 0;
  else return parseFloat(replaced);
}

export function getMarkerPosition(watch: (name: string) => number): LatLong {
  const lat: number = watch('lat');
  const lng: number = watch('lng');
  return {
    lat: clean(lat + ''),
    lng: clean(lng + ''),
  };
}
