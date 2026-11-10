import type { RegionId } from '@/types';

/**
 * Assigns a point to one of the navigation regions. The boxes are a rough,
 * deliberately simple approximation of modern geographic regions; they are
 * used for clicking on the map, never for drawing historical borders.
 */
export function regionAt(lat: number, lon: number): RegionId | null {
  // Americas
  if (lon < -30) {
    if (lat < 7.5 && lon > -92) return 'south-america';
    if (lat >= 7.5 && lat < 23.5 && lon > -118) return 'central-america';
    if (lat >= 23.5 && lat < 32.5 && lon > -118 && lon < -95) return 'central-america';
    if (lat >= 10 && lat < 27 && lon > -86 && lon < -59) return 'central-america'; // Caribbean
    if (lat >= 12) return 'north-america';
    return null;
  }
  // Europe
  if (lat >= 36 && lon >= -30 && lon < 26) return 'europe';
  if (lat >= 41.5 && lon >= 26 && lon < 60) return 'europe';
  if (lat >= 35 && lat < 41.5 && lon >= 19 && lon < 26) return 'europe';
  // Middle East
  if (lat >= 12 && lat < 41.5 && lon >= 26 && lon < 63) {
    if (lat < 22 && lon < 36) return 'africa'; // Sudan
    if (lat < 18 && lon < 43) return 'africa'; // Eritrea / Ethiopian highlands
    return 'middle-east';
  }
  // Africa
  if (lat < 37.5 && lat >= -36 && lon >= -20 && lon < 52) return 'africa';
  // South Asia
  if (lat >= 5 && lat < 36 && lon >= 60 && lon < 92) return 'south-asia';
  // Southeast Asia
  if (lat >= -11 && lat < 28 && lon >= 92 && lon < 142) {
    if (lat >= 21.5 && lon > 105) return 'east-asia';
    return 'southeast-asia';
  }
  // East Asia
  if (lat >= 18 && lat < 55 && lon >= 73 && lon < 150) return 'east-asia';
  if (lat >= 41.5 && lon >= 60) return 'east-asia'; // Siberia / Central Asia simplified
  return null;
}

export const DEG = Math.PI / 180;

/** Converts lat/lon to a position on a three.js SphereGeometry of radius r (equirectangular UVs). */
export function latLonToVec3(lat: number, lon: number, r = 1): [number, number, number] {
  const phi = (90 - lat) * DEG;
  const theta = (lon + 180) * DEG;
  return [-r * Math.sin(phi) * Math.cos(theta), r * Math.cos(phi), r * Math.sin(phi) * Math.sin(theta)];
}

export function projectEquirect(lat: number, lon: number, w: number, h: number): [number, number] {
  return [((lon + 180) / 360) * w, ((90 - lat) / 180) * h];
}
