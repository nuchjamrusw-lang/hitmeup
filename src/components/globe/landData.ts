import { feature } from 'topojson-client';
import type { Topology, GeometryCollection } from 'topojson-specification';
import landTopo from 'world-atlas/land-110m.json';

/**
 * Natural Earth 1:110m land outlines (public domain), via the world-atlas package.
 * Coastlines are modern physical geography — they say nothing about political borders.
 */
type Ring = [number, number][];

function unwrapRing(ring: Ring): Ring {
  const out: Ring = [];
  let offset = 0;
  for (let i = 0; i < ring.length; i++) {
    const [lon, lat] = ring[i];
    if (i > 0) {
      const prev = ring[i - 1][0];
      const d = lon - prev;
      if (d > 180) offset -= 360;
      else if (d < -180) offset += 360;
    }
    out.push([lon + offset, lat]);
  }
  // A ring that wraps the whole globe (e.g. Antarctica) must be closed through the pole.
  const span = out[out.length - 1][0] - out[0][0];
  if (Math.abs(span) > 180) {
    const meanLat = out.reduce((s, p) => s + p[1], 0) / out.length;
    const pole = meanLat < 0 ? -90 : 90;
    out.push([out[out.length - 1][0], pole], [out[0][0], pole]);
  }
  return out;
}

function buildRings(): Ring[] {
  const topo = landTopo as unknown as Topology<{ land: GeometryCollection }>;
  const fc = feature(topo, topo.objects.land) as unknown as GeoJSON.FeatureCollection<GeoJSON.MultiPolygon | GeoJSON.Polygon>;
  const rings: Ring[] = [];
  for (const f of fc.features) {
    const polys = f.geometry.type === 'Polygon' ? [f.geometry.coordinates] : f.geometry.coordinates;
    for (const poly of polys) for (const ring of poly) rings.push(unwrapRing(ring as Ring));
  }
  return rings;
}

export const landRings: Ring[] = buildRings();

/** SVG path for an equirectangular map of the given size (drawn three times to cover wrapped rings). */
export function landPath(w: number, h: number): string {
  const parts: string[] = [];
  for (const shift of [-360, 0, 360]) {
    for (const ring of landRings) {
      let d = '';
      ring.forEach(([lon, lat], i) => {
        const x = (((lon + shift + 180) / 360) * w).toFixed(1);
        const y = (((90 - lat) / 180) * h).toFixed(1);
        d += (i ? 'L' : 'M') + x + ' ' + y;
      });
      parts.push(d + 'Z');
    }
  }
  return parts.join('');
}

export interface MapPalette {
  ocean: string;
  land: string;
  coast: string;
  grid: string;
}

export const defaultPalette: MapPalette = {
  ocean: '#D9E1E8',
  land: '#F5F1E8',
  coast: '#A99B84',
  grid: 'rgba(27,42,65,0.10)',
};

/** Paints an equirectangular texture for the 3D globe. */
export function paintLandCanvas(w = 2048, h = 1024, p: MapPalette = defaultPalette): HTMLCanvasElement {
  const c = document.createElement('canvas');
  c.width = w;
  c.height = h;
  const ctx = c.getContext('2d')!;
  ctx.fillStyle = p.ocean;
  ctx.fillRect(0, 0, w, h);

  // Graticule every 15°, stronger every 30°.
  for (let lon = -180; lon <= 180; lon += 15) {
    ctx.strokeStyle = lon % 30 === 0 ? p.grid : 'rgba(27,42,65,0.05)';
    ctx.lineWidth = 1;
    const x = ((lon + 180) / 360) * w;
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, h);
    ctx.stroke();
  }
  for (let lat = -75; lat <= 75; lat += 15) {
    ctx.strokeStyle = lat === 0 ? 'rgba(27,42,65,0.18)' : lat % 30 === 0 ? p.grid : 'rgba(27,42,65,0.05)';
    const y = ((90 - lat) / 180) * h;
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(w, y);
    ctx.stroke();
  }

  const path = new Path2D(landPath(w, h));
  ctx.fillStyle = p.land;
  ctx.fill(path, 'evenodd');
  ctx.strokeStyle = p.coast;
  ctx.lineWidth = 1.6;
  ctx.lineJoin = 'round';
  ctx.stroke(path);
  return c;
}
