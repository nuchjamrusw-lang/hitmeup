import type { Source } from '@/types';

/**
 * Reference list. Where a stable canonical article URL is well known it is used
 * directly; otherwise the link opens the publisher's own search for the article
 * title so that no URL is invented. Teachers should review links before use.
 */
const brit = (id: string, title: string, path: string): Source => ({
  id,
  title,
  publisher: 'Encyclopaedia Britannica',
  url: `https://www.britannica.com/${path}`,
});
const britSearch = (id: string, title: string): Source => ({
  id,
  title,
  publisher: 'Encyclopaedia Britannica',
  url: `https://www.britannica.com/search?query=${encodeURIComponent(title)}`,
});

export const sources: Source[] = [
  brit('brit-renaissance', 'Renaissance', 'event/Renaissance'),
  brit('brit-humanism', 'Humanism', 'topic/humanism'),
  brit('brit-black-death', 'Black Death', 'event/Black-Death'),
  brit('brit-gutenberg', 'Johannes Gutenberg', 'biography/Johannes-Gutenberg'),
  brit('brit-reformation', 'Reformation', 'event/Reformation'),
  brit('brit-luther', 'Martin Luther', 'biography/Martin-Luther'),
  brit('brit-copernicus', 'Nicolaus Copernicus', 'biography/Nicolaus-Copernicus'),
  brit('brit-galileo', 'Galileo', 'biography/Galileo-Galilei'),
  brit('brit-vesalius', 'Andreas Vesalius', 'biography/Andreas-Vesalius'),
  brit('brit-leonardo', 'Leonardo da Vinci', 'biography/Leonardo-da-Vinci'),
  brit('brit-michelangelo', 'Michelangelo', 'biography/Michelangelo'),
  brit('brit-columbus', 'Christopher Columbus', 'biography/Christopher-Columbus'),
  brit('brit-zheng-he', 'Zheng He', 'biography/Zheng-He'),
  brit('brit-akbar', 'Akbar', 'biography/Akbar'),
  brit('brit-ottoman', 'Ottoman Empire', 'place/Ottoman-Empire'),
  brit('brit-inca', 'Inca', 'topic/Inca'),
  brit('brit-aztec', 'Aztec', 'topic/Aztec'),
  brit('brit-cortes', 'Hernán Cortés', 'biography/Hernan-Cortes'),
  brit('brit-pizarro', 'Francisco Pizarro', 'biography/Francisco-Pizarro'),
  brit('brit-westphalia', 'Peace of Westphalia', 'event/Peace-of-Westphalia'),
  brit('brit-scirev', 'Scientific Revolution', 'science/Scientific-Revolution'),
  brit('brit-medici', 'Medici family', 'topic/Medici-family'),
  britSearch('brit-ming', 'Ming dynasty'),
  britSearch('brit-mughal', 'Mughal dynasty'),
  britSearch('brit-safavid', 'Safavid dynasty'),
  britSearch('brit-songhai', 'Songhai empire'),
  britSearch('brit-mansa-musa', 'Musa I of Mali'),
  britSearch('brit-swahili', 'Kilwa'),
  britSearch('brit-great-zimbabwe', 'Great Zimbabwe'),
  britSearch('brit-malacca', 'Melaka sultanate'),
  britSearch('brit-ayutthaya', 'Ayutthaya kingdom'),
  britSearch('brit-majapahit', 'Majapahit empire'),
  britSearch('brit-philippines', 'Miguel López de Legazpi'),
  britSearch('brit-vijayanagar', 'Vijayanagar'),
  britSearch('brit-da-gama', 'Vasco da Gama'),
  britSearch('brit-joseon', 'Sejong'),
  britSearch('brit-tokugawa', 'Tokugawa period'),
  britSearch('brit-qing', 'Qing dynasty'),
  britSearch('brit-suleiman', 'Süleyman the Magnificent'),
  britSearch('brit-kongo', 'Afonso I of Kongo'),
  britSearch('brit-elmina', 'Elmina'),
  britSearch('brit-pachacuti', 'Pachacuti Inca Yupanqui'),
  britSearch('brit-potosi', 'Potosí'),
  britSearch('brit-iroquois', 'Iroquois Confederacy'),
  britSearch('brit-jamestown', 'Jamestown Colony'),
  britSearch('brit-pueblo-revolt', 'Pueblo Rebellion'),
  britSearch('brit-tenochtitlan', 'Tenochtitlán'),
  britSearch('brit-brunelleschi', 'Filippo Brunelleschi'),
  britSearch('brit-sistine', 'Sistine Chapel'),
  britSearch('brit-taj', 'Taj Mahal'),
  britSearch('brit-forbidden-city', 'Forbidden City'),
  britSearch('brit-isfahan', 'Isfahan'),
  britSearch('brit-hundred-years', 'Hundred Years’ War'),
  {
    id: 'met-toah',
    title: 'Heilbrunn Timeline of Art History',
    publisher: 'The Metropolitan Museum of Art',
    url: 'https://www.metmuseum.org/toah/',
  },
  {
    id: 'khan-renaissance',
    title: 'Renaissance and Reformation',
    publisher: 'Khan Academy',
    url: 'https://www.khanacademy.org/humanities/renaissance-reformation',
  },
  {
    id: 'unesco-whc',
    title: 'World Heritage List',
    publisher: 'UNESCO World Heritage Centre',
    url: 'https://whc.unesco.org/en/list/',
  },
  {
    id: 'bl-gutenberg',
    title: 'Treasures in Full: Gutenberg Bible',
    publisher: 'British Library',
    url: 'https://www.bl.uk/treasures/gutenberg/homepage.html',
  },
];

export const sourceById = Object.fromEntries(sources.map((s) => [s.id, s])) as Record<string, Source>;
