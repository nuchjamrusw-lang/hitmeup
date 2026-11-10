import type { PolityType } from '@/types';

/**
 * Approximate centres of major political powers, used for the optional
 * "Historical powers" layer on the globe. These are deliberately shown as
 * labelled points — NOT as borders — because frontiers in this period were
 * often fluid, overlapping or contested, and reliable boundary data for the
 * whole world is not available at this level of detail.
 */
export interface PolityCentre {
  name: string;
  type: PolityType;
  from: number;
  to: number;
  lat: number;
  lon: number;
  /** Smaller or densely packed powers, labelled on the globe only when zoomed in. */
  minor?: boolean;
}

export const polityCentres: PolityCentre[] = [
  { name: 'Holy Roman Empire', type: 'Empire', from: 1300, to: 1700, lat: 50.5, lon: 10.5 },
  { name: 'Kingdom of France', type: 'Kingdom', from: 1300, to: 1700, lat: 46.8, lon: 2.4 },
  { minor: true, name: 'Kingdom of England', type: 'Kingdom', from: 1300, to: 1700, lat: 52.5, lon: -1.5 },
  { minor: true, name: 'Republic of Venice', type: 'City-state', from: 1300, to: 1700, lat: 45.44, lon: 12.33 },
  { minor: true, name: 'Republic of Florence', type: 'City-state', from: 1300, to: 1532, lat: 43.77, lon: 11.25 },
  { minor: true, name: 'Crown of Castile', type: 'Kingdom', from: 1300, to: 1516, lat: 40.4, lon: -4.0 },
  { name: 'Spanish Monarchy', type: 'Empire', from: 1516, to: 1700, lat: 40.4, lon: -3.7 },
  { minor: true, name: 'Kingdom of Portugal', type: 'Kingdom', from: 1300, to: 1700, lat: 39.5, lon: -8.2 },
  { minor: true, name: 'Byzantine Empire', type: 'Empire', from: 1300, to: 1453, lat: 41.0, lon: 28.9 },
  { name: 'Grand Duchy of Muscovy', type: 'Kingdom', from: 1300, to: 1547, lat: 55.75, lon: 37.6 },
  { name: 'Tsardom of Russia', type: 'Kingdom', from: 1547, to: 1700, lat: 55.75, lon: 37.6 },
  { minor: true, name: 'Polish–Lithuanian union', type: 'Kingdom', from: 1386, to: 1700, lat: 52.2, lon: 21.0 },
  { minor: true, name: 'Ottoman state', type: 'Empire', from: 1300, to: 1453, lat: 40.2, lon: 29.1 },
  { name: 'Ottoman Empire', type: 'Empire', from: 1453, to: 1700, lat: 39.0, lon: 33.0 },
  { name: 'Mamluk Sultanate', type: 'Sultanate', from: 1300, to: 1517, lat: 30.0, lon: 31.2 },
  { name: 'Timurid Empire', type: 'Empire', from: 1370, to: 1507, lat: 39.65, lon: 66.96 },
  { name: 'Safavid Iran', type: 'Dynasty', from: 1501, to: 1700, lat: 33.5, lon: 52.0 },
  { name: 'Yuan dynasty', type: 'Dynasty', from: 1300, to: 1368, lat: 38.0, lon: 112.0 },
  { name: 'Ming dynasty', type: 'Dynasty', from: 1368, to: 1644, lat: 33.0, lon: 113.0 },
  { name: 'Qing dynasty', type: 'Dynasty', from: 1644, to: 1700, lat: 36.0, lon: 112.0 },
  { minor: true, name: 'Joseon dynasty', type: 'Dynasty', from: 1392, to: 1700, lat: 37.0, lon: 127.5 },
  { minor: true, name: 'Goryeo', type: 'Kingdom', from: 1300, to: 1392, lat: 37.0, lon: 127.5 },
  { name: 'Japan (Ashikaga shogunate)', type: 'Dynasty', from: 1338, to: 1573, lat: 35.0, lon: 135.8 },
  { name: 'Japan (Tokugawa shogunate)', type: 'Dynasty', from: 1603, to: 1700, lat: 35.7, lon: 139.7 },
  { name: 'Delhi Sultanate', type: 'Sultanate', from: 1300, to: 1526, lat: 28.6, lon: 77.2 },
  { name: 'Mughal Empire', type: 'Empire', from: 1526, to: 1700, lat: 26.5, lon: 78.5 },
  { minor: true, name: 'Vijayanagara', type: 'Empire', from: 1336, to: 1565, lat: 15.3, lon: 76.5 },
  { name: 'Majapahit', type: 'Kingdom', from: 1300, to: 1500, lat: -7.5, lon: 112.4 },
  { name: 'Ayutthaya', type: 'Kingdom', from: 1351, to: 1700, lat: 14.4, lon: 100.6 },
  { minor: true, name: 'Melaka Sultanate', type: 'Sultanate', from: 1400, to: 1511, lat: 2.2, lon: 102.25 },
  { name: 'Đại Việt', type: 'Kingdom', from: 1300, to: 1700, lat: 21.0, lon: 105.8 },
  { minor: true, name: 'Aceh Sultanate', type: 'Sultanate', from: 1496, to: 1700, lat: 5.55, lon: 95.3 },
  { name: 'Spanish Philippines', type: 'Colonial territory', from: 1565, to: 1700, lat: 14.6, lon: 121.0 },
  { name: 'Mali Empire', type: 'Empire', from: 1300, to: 1450, lat: 13.5, lon: -6.5 },
  { name: 'Songhai Empire', type: 'Empire', from: 1464, to: 1591, lat: 16.3, lon: -0.05 },
  { name: 'Swahili city-states', type: 'City-state', from: 1300, to: 1700, lat: -6.0, lon: 39.3 },
  { name: 'Kingdom of Zimbabwe', type: 'Kingdom', from: 1300, to: 1450, lat: -20.3, lon: 30.9 },
  { name: 'Mutapa kingdom', type: 'Kingdom', from: 1450, to: 1700, lat: -16.5, lon: 31.5 },
  { name: 'Ethiopian kingdom', type: 'Kingdom', from: 1300, to: 1700, lat: 11.5, lon: 38.5 },
  { name: 'Kingdom of Kongo', type: 'Kingdom', from: 1390, to: 1700, lat: -6.3, lon: 14.3 },
  { minor: true, name: 'Kingdom of Benin', type: 'Kingdom', from: 1300, to: 1700, lat: 6.34, lon: 5.62 },
  { name: 'Morocco (Saadi Sultanate)', type: 'Sultanate', from: 1549, to: 1659, lat: 31.6, lon: -8.0 },
  { name: 'Mexica / Aztec Triple Alliance', type: 'Empire', from: 1428, to: 1521, lat: 19.4, lon: -99.1 },
  { name: 'New Spain', type: 'Colonial territory', from: 1535, to: 1700, lat: 20.5, lon: -100.5 },
  { minor: true, name: 'Maya city-states', type: 'City-state', from: 1300, to: 1697, lat: 20.0, lon: -89.0 },
  { name: 'Inca Empire (Tawantinsuyu)', type: 'Empire', from: 1438, to: 1533, lat: -13.5, lon: -72.0 },
  { minor: true, name: 'Chimú kingdom', type: 'Kingdom', from: 1300, to: 1470, lat: -8.1, lon: -79.07 },
  { name: 'Viceroyalty of Peru', type: 'Colonial territory', from: 1542, to: 1700, lat: -12.05, lon: -77.04 },
  { name: 'Portuguese Brazil', type: 'Colonial territory', from: 1532, to: 1700, lat: -12.97, lon: -38.5 },
  { name: 'Haudenosaunee Confederacy', type: 'Confederation', from: 1450, to: 1700, lat: 43.0, lon: -76.0 },
  { name: 'Mississippian chiefdoms', type: 'Society', from: 1300, to: 1550, lat: 35.0, lon: -88.0 },
  { name: 'Pueblo peoples', type: 'Society', from: 1300, to: 1700, lat: 35.5, lon: -106.5 },
  { name: 'New France', type: 'Colonial territory', from: 1608, to: 1700, lat: 46.8, lon: -71.2 },
  { name: 'English colonies (Atlantic coast)', type: 'Colonial territory', from: 1607, to: 1700, lat: 39.5, lon: -76.0 },
];
