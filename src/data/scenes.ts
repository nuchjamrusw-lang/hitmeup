import type { RegionId } from '@/types';
import type { MotifId } from '@/components/scenes/motifs';

/**
 * Period scenes: one illustration per region and era.
 * Each scene is composed from dated motifs, and its caption says exactly what is
 * shown and when, so that a picture never implies something that did not yet exist.
 */
export type Backdrop = 'hills' | 'mountains' | 'mesa' | 'desert' | 'forest' | 'plain';

export interface SceneItem {
  m: MotifId;
  x: number;
  s?: number;
  /** Place on the water band instead of land. */
  water?: boolean;
}

export interface SceneDef {
  id: string;
  region: RegionId;
  from: number;
  to: number;
  title: string;
  caption: string;
  backdrop: Backdrop;
  /** x-position where the water begins (to the right edge). */
  waterFrom?: number;
  items: SceneItem[];
}

export const scenes: SceneDef[] = [
  /* Europe */
  {
    id: 'eu-1a', region: 'europe', from: 1300, to: 1419, backdrop: 'hills',
    title: 'Florence before the dome',
    caption: 'Florence’s town hall tower (Palazzo Vecchio, built from 1299) and the unfinished cathedral, whose great octagon stood open, waiting for a dome, until the 1420s.',
    items: [{ m: 'cityTower', x: 120 }, { m: 'florenceCathedral', x: 270, s: 1.25 }],
  },
  {
    id: 'eu-1b', region: 'europe', from: 1420, to: 1449, backdrop: 'hills',
    title: 'Florence, a merchant city-state',
    caption: 'The tower of the Palazzo Vecchio and Brunelleschi’s cathedral dome (built 1420–1436) rise above Florence, a wealthy centre of trade, banking and new art.',
    items: [{ m: 'cityTower', x: 120 }, { m: 'florenceDome', x: 270, s: 1.25 }],
  },
  {
    id: 'eu-2', region: 'europe', from: 1450, to: 1549, backdrop: 'hills', waterFrom: 250,
    title: 'Print and the open ocean',
    caption: 'A printing press like those that spread from Mainz after c. 1450, and a caravel — the kind of ship used on Portuguese and Castilian ocean voyages.',
    items: [{ m: 'printingPress', x: 120, s: 1.3 }, { m: 'caravel', x: 360, s: 1.3, water: true }],
  },
  {
    id: 'eu-3a', region: 'europe', from: 1550, to: 1608, backdrop: 'hills', waterFrom: 250,
    title: 'Printed books and Atlantic galleons',
    caption: 'Printing presses across Europe turned out Bibles, pamphlets and maps, while galleons carried Atlantic trade and fought wars such as the Spanish Armada (1588).',
    items: [{ m: 'printingPress', x: 120, s: 1.3 }, { m: 'galleon', x: 380, s: 1.05, water: true }],
  },
  {
    id: 'eu-3b', region: 'europe', from: 1609, to: 1700, backdrop: 'hills', waterFrom: 330,
    title: 'Domes, telescopes and galleons',
    caption: 'The dome of St Peter’s, Rome (completed 1590), a telescope of the kind used from 1609, and an ocean-going galleon of the Atlantic empires.',
    items: [{ m: 'stPeters', x: 140 }, { m: 'telescope', x: 270, s: 1.2 }, { m: 'galleon', x: 410, s: 0.95, water: true }],
  },
  /* Middle East */
  {
    id: 'me-1', region: 'middle-east', from: 1300, to: 1452, backdrop: 'desert',
    title: 'Mamluk Cairo and the caravan trade',
    caption: 'Ribbed stone domes and tiered minarets of Mamluk Cairo, a great centre of trade and learning, linked by camel caravans to Arabia, Syria and North Africa.',
    items: [{ m: 'mamlukCairo', x: 170, s: 1.25 }, { m: 'camel', x: 320 }, { m: 'camel', x: 360 }, { m: 'camel', x: 400 }],
  },
  {
    id: 'me-2', region: 'middle-east', from: 1453, to: 1549, backdrop: 'hills',
    title: 'Istanbul, the new Ottoman capital',
    caption: 'After 1453, imperial mosques with a great central dome and slender “pencil” minarets became symbols of Ottoman power in Istanbul.',
    items: [{ m: 'ottomanMosque', x: 240, s: 1.35 }],
  },
  {
    id: 'me-3a', region: 'middle-east', from: 1550, to: 1597, backdrop: 'hills',
    title: 'Sinan’s Istanbul',
    caption: 'The Süleymaniye Mosque (1550–1557), designed by the architect Mimar Sinan for Sultan Süleyman, at the height of Ottoman power.',
    items: [{ m: 'ottomanMosque', x: 240, s: 1.45 }],
  },
  {
    id: 'me-3b', region: 'middle-east', from: 1598, to: 1700, backdrop: 'desert',
    title: 'Safavid Isfahan',
    caption: 'Isfahan, Safavid capital from 1598 under Shah Abbas I: a tiled portal (iwan) and turquoise dome, with caravans carrying silk and other trade goods.',
    items: [{ m: 'persianIwan', x: 180, s: 1.25 }, { m: 'camel', x: 340 }, { m: 'camel', x: 380 }],
  },
  /* East Asia */
  {
    id: 'ea-1a', region: 'east-asia', from: 1300, to: 1367, backdrop: 'hills', waterFrom: 260,
    title: 'Ports of Yuan China',
    caption: 'Under the Mongol-led Yuan dynasty, Chinese ports such as Quanzhou traded across Asia; large junks carried porcelain and silk.',
    items: [{ m: 'chineseGate', x: 135, s: 1.05 }, { m: 'junk', x: 330, s: 1.0, water: true }, { m: 'junk', x: 425, s: 0.75, water: true }],
  },
  {
    id: 'ea-1b', region: 'east-asia', from: 1368, to: 1449, backdrop: 'hills', waterFrom: 260,
    title: 'Ming cities and treasure fleets',
    caption: 'A Ming city gate and a large ocean-going junk, of the kind sailed in Zheng He’s expeditions across the Indian Ocean (1405–1433).',
    items: [{ m: 'chineseGate', x: 135, s: 1.05 }, { m: 'junk', x: 370, s: 1.3, water: true }],
  },
  {
    id: 'ea-2', region: 'east-asia', from: 1450, to: 1549, backdrop: 'mountains',
    title: 'The Ming northern frontier',
    caption: 'The Ming dynasty rebuilt and extended the Great Wall in brick and stone along its northern frontier, especially during the 1500s.',
    items: [{ m: 'greatWall', x: 240, s: 2.2 }],
  },
  {
    id: 'ea-3', region: 'east-asia', from: 1550, to: 1700, backdrop: 'hills', waterFrom: 280,
    title: 'Castles and new visitors in Japan',
    caption: 'A Japanese castle keep of the kind built around 1600 (such as Himeji), and a European ship — Portuguese traders first reached Japan in 1543.',
    items: [{ m: 'japaneseCastle', x: 150, s: 1.35 }, { m: 'galleon', x: 390, s: 0.95, water: true }],
  },
  /* South Asia */
  {
    id: 'sa-1', region: 'south-asia', from: 1300, to: 1449, backdrop: 'hills',
    title: 'Temples of southern India',
    caption: 'A temple gateway tower (gopuram) in the style of southern India, where the Vijayanagara kingdom was founded c. 1336.',
    items: [{ m: 'gopuram', x: 190, s: 1.35 }, { m: 'palm', x: 310 }, { m: 'palm', x: 350, s: 0.85 }],
  },
  {
    id: 'sa-2', region: 'south-asia', from: 1450, to: 1549, backdrop: 'plain', waterFrom: 150,
    title: 'The Malabar spice coast',
    caption: 'Indian Ocean dhows off the Malabar coast and, from 1498, Portuguese ships seeking pepper and spices at Calicut.',
    items: [{ m: 'palm', x: 50 }, { m: 'palm', x: 95, s: 0.85 }, { m: 'dhow', x: 230, s: 1.2, water: true }, { m: 'caravel', x: 380, s: 1.2, water: true }],
  },
  {
    id: 'sa-3a', region: 'south-asia', from: 1550, to: 1631, backdrop: 'plain',
    title: 'Akbar’s Fatehpur Sikri',
    caption: 'The Buland Darwaza (“Gate of Magnificence”) at Fatehpur Sikri, the red sandstone city built by the Mughal emperor Akbar in the 1570s.',
    items: [{ m: 'bulandDarwaza', x: 240, s: 1.45 }],
  },
  {
    id: 'sa-3b', region: 'south-asia', from: 1632, to: 1700, backdrop: 'plain',
    title: 'Mughal Agra',
    caption: 'The Taj Mahal at Agra (c. 1632–1653), built by Emperor Shah Jahan — a high point of Mughal architecture.',
    items: [{ m: 'tajMahal', x: 240, s: 1.45 }],
  },
  /* Southeast Asia */
  {
    id: 'sea-1', region: 'southeast-asia', from: 1300, to: 1449, backdrop: 'hills',
    title: 'Majapahit Java',
    caption: 'A brick split gateway (candi bentar), typical of East Java in the time of the Majapahit kingdom.',
    items: [{ m: 'candiBentar', x: 200, s: 1.3 }, { m: 'palm', x: 330 }, { m: 'palm', x: 370, s: 0.8 }],
  },
  {
    id: 'sea-2', region: 'southeast-asia', from: 1450, to: 1549, backdrop: 'plain', waterFrom: 210,
    title: 'Melaka, port of the strait',
    caption: 'Melaka before 1511: a mosque with a tiered roof, and ships from China and the Indian Ocean meeting in the strait.',
    items: [{ m: 'malayMosque', x: 100, s: 1.2 }, { m: 'palm', x: 180 }, { m: 'junk', x: 300, s: 0.95, water: true }, { m: 'dhow', x: 420, s: 0.95, water: true }],
  },
  {
    id: 'sea-3', region: 'southeast-asia', from: 1550, to: 1700, backdrop: 'plain', waterFrom: 290,
    title: 'Ayutthaya and the Pacific route',
    caption: 'Temple towers (prang and chedi) of Ayutthaya, and a Spanish galleon of the Manila–Acapulco route, which began in 1565.',
    items: [{ m: 'chedi', x: 70 }, { m: 'prang', x: 140, s: 1.1 }, { m: 'prang', x: 215, s: 0.85 }, { m: 'galleon', x: 395, s: 0.95, water: true }],
  },
  /* Africa */
  {
    id: 'af-1', region: 'africa', from: 1300, to: 1449, backdrop: 'desert',
    title: 'Timbuktu and the Sahara trade',
    caption: 'Mud-brick mosques of Timbuktu, such as the Djinguereber (begun c. 1327 under Mansa Musa), and camel caravans crossing the Sahara.',
    items: [{ m: 'sahelMosque', x: 170, s: 1.3 }, { m: 'camel', x: 330 }, { m: 'camel', x: 370 }, { m: 'camel', x: 410 }],
  },
  {
    id: 'af-2a', region: 'africa', from: 1450, to: 1481, backdrop: 'plain', waterFrom: 230,
    title: 'Kilwa and the Swahili coast',
    caption: 'Coral-stone towns of the Swahili coast, such as Kilwa, traded gold and ivory across the Indian Ocean in dhows sailing with the monsoon winds.',
    items: [{ m: 'swahiliTown', x: 110, s: 1.3 }, { m: 'palm', x: 200, s: 0.9 }, { m: 'dhow', x: 320, s: 1.15, water: true }, { m: 'dhow', x: 425, s: 0.85, water: true }],
  },
  {
    id: 'af-2b', region: 'africa', from: 1482, to: 1549, backdrop: 'plain', waterFrom: 280,
    title: 'The Gold Coast',
    caption: 'São Jorge da Mina (Elmina), built by the Portuguese on the Gold Coast in 1482 with the agreement of a local ruler, and a caravel offshore.',
    items: [{ m: 'fort', x: 150, s: 1.3 }, { m: 'palm', x: 245, s: 0.9 }, { m: 'caravel', x: 390, s: 1.15, water: true }],
  },
  {
    id: 'af-3a', region: 'africa', from: 1550, to: 1635, backdrop: 'plain', waterFrom: 260,
    title: 'Forts of the Atlantic trade',
    caption: 'European forts on the West African coast, such as Elmina, increasingly became centres of the Atlantic slave trade during the 1500s and 1600s.',
    items: [{ m: 'fort', x: 140, s: 1.3 }, { m: 'galleon', x: 390, s: 0.95, water: true }],
  },
  {
    id: 'af-3b', region: 'africa', from: 1636, to: 1700, backdrop: 'mountains',
    title: 'Royal Gondar, Ethiopia',
    caption: 'Castles of the royal enclosure at Gondar in the Ethiopian highlands, founded as a capital by Emperor Fasilides in the 1630s.',
    items: [{ m: 'gondar', x: 220, s: 1.4 }],
  },
  /* North America */
  {
    id: 'na-1', region: 'north-america', from: 1300, to: 1449, backdrop: 'mesa',
    title: 'Pueblo villages of the Southwest',
    caption: 'A multi-storey Pueblo village of adobe, reached by ladders, surrounded by fields of maize.',
    items: [{ m: 'pueblo', x: 190, s: 1.25 }, { m: 'maize', x: 330 }, { m: 'maize', x: 352 }, { m: 'maize', x: 374 }, { m: 'maize', x: 396 }],
  },
  {
    id: 'na-2', region: 'north-america', from: 1450, to: 1549, backdrop: 'forest',
    title: 'Haudenosaunee longhouses',
    caption: 'A Haudenosaunee (Iroquois) village of bark-covered longhouses, often protected by a wooden palisade.',
    items: [{ m: 'maize', x: 60 }, { m: 'maize', x: 80 }, { m: 'longhouse', x: 190, s: 1.3 }, { m: 'palisade', x: 360, s: 0.9 }],
  },
  {
    id: 'na-3a', region: 'north-america', from: 1550, to: 1606, backdrop: 'forest', waterFrom: 290,
    title: 'European ships off the coast',
    caption: 'Haudenosaunee and other Indigenous nations still controlled the continent; Spain founded St Augustine in Florida in 1565 and European ships traded and raided along the Atlantic coast.',
    items: [{ m: 'longhouse', x: 110, s: 1.1 }, { m: 'palisade', x: 230, s: 0.6 }, { m: 'galleon', x: 400, s: 0.9, water: true }],
  },
  {
    id: 'na-3b', region: 'north-america', from: 1607, to: 1700, backdrop: 'forest', waterFrom: 300,
    title: 'Colonies on Indigenous lands',
    caption: 'An English fort like Jamestown (1607), built on the lands of the Powhatan peoples, whose towns had bark-covered houses; ships crossed the Atlantic to supply it.',
    items: [{ m: 'longhouse', x: 80, s: 0.8 }, { m: 'fort', x: 210, s: 1.05 }, { m: 'galleon', x: 405, s: 0.9, water: true }],
  },
  /* Central America & Caribbean */
  {
    id: 'ca-1', region: 'central-america', from: 1300, to: 1491, backdrop: 'mountains', waterFrom: 300,
    title: 'Tenochtitlan on Lake Texcoco',
    caption: 'Tenochtitlan (founded c. 1325): the Templo Mayor with its twin shrines to Huitzilopochtli and Tlaloc, and canoes on the lake.',
    items: [{ m: 'templo', x: 180, s: 1.3 }, { m: 'canoe', x: 360, s: 1.3, water: true }, { m: 'canoe', x: 425, s: 1.1, water: true }],
  },
  {
    id: 'ca-2', region: 'central-america', from: 1492, to: 1549, backdrop: 'mountains', waterFrom: 270,
    title: 'Ships from across the Atlantic',
    caption: 'From 1492 Spanish ships reached the Caribbean, and in 1519 the Gulf coast of Mexico. With Indigenous allies, the Spanish captured Tenochtitlan in 1521.',
    items: [{ m: 'templo', x: 140, s: 1.1 }, { m: 'caravel', x: 380, s: 1.2, water: true }],
  },
  {
    id: 'ca-3', region: 'central-america', from: 1550, to: 1700, backdrop: 'hills', waterFrom: 280,
    title: 'New Spain and the Pacific',
    caption: 'A colonial church in New Spain, and a Manila galleon — from 1565 Acapulco linked the Americas to Asia across the Pacific.',
    items: [{ m: 'colonialChurch', x: 150, s: 1.3 }, { m: 'galleon', x: 390, s: 0.95, water: true }],
  },
  /* South America */
  {
    id: 'sam-1', region: 'south-america', from: 1300, to: 1449, backdrop: 'desert',
    title: 'Chan Chan, Chimú capital',
    caption: 'Chan Chan, capital of the Chimú kingdom on the coast of Peru: vast adobe walls decorated with relief patterns. The Inca conquered the Chimú around 1470.',
    items: [{ m: 'chanChan', x: 240, s: 1.6 }],
  },
  {
    id: 'sam-2', region: 'south-america', from: 1450, to: 1549, backdrop: 'mountains',
    title: 'The Inca Andes',
    caption: 'Machu Picchu (built c. 1450, probably as an estate for the ruler Pachacuti) with its farming terraces, and llamas, which carried goods along Inca roads.',
    items: [{ m: 'machuPicchu', x: 210, s: 1.25 }, { m: 'llama', x: 370, s: 1.3 }, { m: 'llama', x: 410, s: 1.1 }],
  },
  {
    id: 'sam-3', region: 'south-america', from: 1550, to: 1700, backdrop: 'mountains',
    title: 'The silver mountain of Potosí',
    caption: 'Cerro Rico (“rich hill”) at Potosí, where silver was discovered in 1545 and mined with forced Indigenous labour, and a church of the colonial mining city.',
    items: [{ m: 'llama', x: 60, s: 1.2 }, { m: 'cerroRico', x: 220, s: 1.15 }, { m: 'colonialChurch', x: 390, s: 0.9 }],
  },
];

export function sceneFor(region: RegionId, year: number): SceneDef {
  const list = scenes.filter((s) => s.region === region);
  return list.find((s) => year >= s.from && year <= s.to) ?? list[list.length - 1];
}
