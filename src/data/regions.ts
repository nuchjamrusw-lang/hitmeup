import type { Region, RegionGroup, RegionId, PeriodMarker } from '@/types';

/**
 * Regions are modern geographic areas used ONLY for navigation. The political
 * units inside them are historical and carry their own type labels so students
 * do not read modern borders back into the past.
 */
export const regions: Region[] = [
  {
    id: 'europe',
    name: 'Europe',
    group: 'Europe',
    center: { lat: 48, lon: 12 },
    modernScope: 'From Iberia and the British Isles to the Balkans and Eastern Europe',
    eras: [
      {
        from: 1300,
        to: 1449,
        overview:
          'Europe was a patchwork of kingdoms, church territories, free cities and the loosely organised Holy Roman Empire. The Black Death (1347–1351) killed a large share of the population. In northern and central Italy, wealthy city-states such as Florence and Venice became centres of commerce, banking and new cultural ideas that historians call the early Renaissance.',
      },
      {
        from: 1450,
        to: 1549,
        overview:
          'Printing with movable type spread from Mainz across the continent. Italian Renaissance art reached its “High Renaissance” with Leonardo, Michelangelo and Raphael. Portugal and Castile sponsored ocean voyages, and from 1517 the Reformation divided Western Christianity.',
      },
      {
        from: 1550,
        to: 1700,
        overview:
          'Religious wars, including the Thirty Years’ War (1618–1648), reshaped political power. Scientists such as Galileo and Newton developed new methods of observation and mathematics, often called the Scientific Revolution. Atlantic empires and trading companies expanded overseas.',
      },
    ],
    polities: [
      { name: 'Republic of Florence', type: 'City-state', from: 1300, to: 1532, note: 'Merchant republic; dominated by the Medici family from 1434.' },
      { name: 'Republic of Venice', type: 'City-state', from: 1300, to: 1700, note: 'Maritime trading power in the eastern Mediterranean.' },
      { name: 'Papal States', type: 'Church state', from: 1300, to: 1700, note: 'Central Italian lands ruled by the pope.' },
      { name: 'Holy Roman Empire', type: 'Empire', from: 1300, to: 1700, note: 'A union of hundreds of semi-independent territories under an elected emperor.' },
      { name: 'Kingdom of France', type: 'Kingdom', from: 1300, to: 1700, note: 'One of the most populous kingdoms in Europe.' },
      { name: 'Kingdom of England', type: 'Kingdom', from: 1300, to: 1700, note: 'United with Scotland under one monarch from 1603.' },
      { name: 'Crowns of Castile and Aragon', type: 'Kingdom', from: 1300, to: 1700, note: 'Joined by the marriage of Isabella and Ferdinand (1469); the core of the Spanish monarchy.' },
      { name: 'Kingdom of Portugal', type: 'Kingdom', from: 1300, to: 1700, note: 'Pioneer of Atlantic and Indian Ocean voyages.' },
      { name: 'Byzantine Empire', type: 'Empire', from: 1300, to: 1453, note: 'Eastern Roman Empire; capital Constantinople, conquered in 1453.' },
      { name: 'Grand Duchy of Muscovy / Tsardom of Russia', type: 'Kingdom', from: 1400, to: 1700, note: 'Expanded rapidly; Ivan IV took the title of tsar in 1547.' },
      { name: 'Dutch Republic', type: 'Republic', from: 1581, to: 1700, note: 'Broke from Habsburg rule; a leading commercial power in the 1600s.' },
    ],
    people: [
      { name: 'Francesco Petrarca (Petrarch)', dates: '1304–1374', activeFrom: 1320, activeTo: 1374, role: 'Poet and early humanist scholar' },
      { name: 'Filippo Brunelleschi', dates: '1377–1446', activeFrom: 1400, activeTo: 1446, role: 'Architect and engineer' },
      { name: 'Johannes Gutenberg', dates: 'c. 1400–1468', activeFrom: 1430, activeTo: 1468, role: 'Developer of movable-type printing' },
      { name: 'Lorenzo de’ Medici', dates: '1449–1492', activeFrom: 1469, activeTo: 1492, role: 'Florentine statesman and patron' },
      { name: 'Leonardo da Vinci', dates: '1452–1519', activeFrom: 1470, activeTo: 1519, role: 'Artist, engineer and scientific observer' },
      { name: 'Michelangelo Buonarroti', dates: '1475–1564', activeFrom: 1490, activeTo: 1564, role: 'Sculptor, painter and architect' },
      { name: 'Desiderius Erasmus', dates: 'c. 1466–1536', activeFrom: 1490, activeTo: 1536, role: 'Humanist scholar' },
      { name: 'Martin Luther', dates: '1483–1546', activeFrom: 1510, activeTo: 1546, role: 'Religious reformer' },
      { name: 'Nicolaus Copernicus', dates: '1473–1543', activeFrom: 1500, activeTo: 1543, role: 'Astronomer' },
      { name: 'Elizabeth I of England', dates: 'r. 1558–1603', activeFrom: 1558, activeTo: 1603, role: 'Queen of England and Ireland' },
      { name: 'William Shakespeare', dates: '1564–1616', activeFrom: 1590, activeTo: 1616, role: 'Playwright and poet' },
      { name: 'Galileo Galilei', dates: '1564–1642', activeFrom: 1589, activeTo: 1642, role: 'Astronomer and physicist' },
      { name: 'Isaac Newton', dates: '1643–1727', activeFrom: 1665, activeTo: 1700, role: 'Mathematician and physicist' },
    ],
    developments: [
      { domain: 'Art', from: 1300, to: 1450, text: 'Giotto, Masaccio and Donatello develop more naturalistic figures; linear perspective is demonstrated in Florence.' },
      { domain: 'Art', from: 1450, to: 1550, text: 'High Renaissance painting and sculpture in Florence, Rome and Venice; Northern artists such as Albrecht Dürer spread new techniques through prints.' },
      { domain: 'Art', from: 1550, to: 1700, text: 'Mannerism and then Baroque art in Rome, Spain and the Low Countries (Caravaggio, Rubens, Rembrandt).' },
      { domain: 'Science', from: 1450, to: 1550, text: 'Printing standardises texts; Copernicus and Vesalius publish major works in 1543.' },
      { domain: 'Science', from: 1550, to: 1700, text: 'Telescopic astronomy, experimental physics and scientific societies such as the Royal Society (1660).' },
      { domain: 'Trade', from: 1300, to: 1450, text: 'Italian banking houses and Mediterranean trade with the Byzantine, Mamluk and Ottoman worlds.' },
      { domain: 'Trade', from: 1450, to: 1700, text: 'Atlantic trade routes, overseas colonies and joint-stock companies (English East India Company 1600; Dutch VOC 1602).' },
      { domain: 'Culture', from: 1300, to: 1550, text: 'Humanist education based on classical Latin and Greek texts spreads from Italy.' },
      { domain: 'Culture', from: 1517, to: 1700, text: 'Protestant and Catholic reformations transform worship, education and politics.' },
    ],
  },
  {
    id: 'middle-east',
    name: 'Middle East',
    group: 'Middle East',
    center: { lat: 33, lon: 44 },
    modernScope: 'Anatolia, the Levant, Mesopotamia, the Arabian Peninsula, Egypt and the Iranian plateau',
    eras: [
      {
        from: 1300,
        to: 1449,
        overview:
          'After Mongol rule fragmented, new powers emerged: the Mamluk Sultanate ruled Egypt and Syria from Cairo, while a small Ottoman principality expanded in Anatolia and the Balkans. Timur’s campaigns (late 1300s) devastated many cities but also sponsored art and architecture in Samarkand.',
      },
      {
        from: 1450,
        to: 1549,
        overview:
          'The Ottomans captured Constantinople (1453) and conquered the Mamluk lands (1516–1517). In Iran, the Safavid dynasty (from 1501) made Twelver Shi‘ism the official religion, creating a long rivalry with the Sunni Ottomans.',
      },
      {
        from: 1550,
        to: 1700,
        overview:
          'Ottoman and Safavid empires were at their height, with major architectural projects in Istanbul and Isfahan. Their wars, diplomacy and trade linked Europe, Central Asia and the Indian Ocean.',
      },
    ],
    polities: [
      { name: 'Mamluk Sultanate', type: 'Sultanate', from: 1300, to: 1517, note: 'Ruled Egypt, Syria and the Hejaz from Cairo.' },
      { name: 'Ottoman Empire', type: 'Empire', from: 1300, to: 1700, note: 'Began as a frontier principality (beylik) c. 1300; capital Istanbul from 1453.' },
      { name: 'Ilkhanate', type: 'Empire', from: 1300, to: 1335, note: 'Mongol state in Iran that fragmented after 1335.' },
      { name: 'Timurid Empire', type: 'Empire', from: 1370, to: 1507, note: 'Founded by Timur; capital at Samarkand, later Herat.' },
      { name: 'Safavid dynasty', type: 'Dynasty', from: 1501, to: 1700, note: 'Ruled Iran; capital moved to Isfahan in 1598.' },
    ],
    people: [
      { name: 'Ibn Khaldun', dates: '1332–1406', activeFrom: 1350, activeTo: 1406, role: 'Historian and social thinker (worked in North Africa and Cairo)' },
      { name: 'Timur (Tamerlane)', dates: '1336–1405', activeFrom: 1370, activeTo: 1405, role: 'Founder of the Timurid Empire' },
      { name: 'Mehmed II', dates: 'r. 1444–46, 1451–81', activeFrom: 1444, activeTo: 1481, role: 'Ottoman sultan; conquered Constantinople' },
      { name: 'Shah Ismail I', dates: 'r. 1501–1524', activeFrom: 1501, activeTo: 1524, role: 'Founder of the Safavid state' },
      { name: 'Süleyman I', dates: 'r. 1520–1566', activeFrom: 1520, activeTo: 1566, role: 'Ottoman sultan, “the Lawgiver”' },
      { name: 'Mimar Sinan', dates: 'c. 1490–1588', activeFrom: 1538, activeTo: 1588, role: 'Ottoman chief architect' },
      { name: 'Shah Abbas I', dates: 'r. 1588–1629', activeFrom: 1588, activeTo: 1629, role: 'Safavid ruler; rebuilt Isfahan' },
    ],
    developments: [
      { domain: 'Art', from: 1370, to: 1510, text: 'Timurid architecture and manuscript painting in Samarkand and Herat.' },
      { domain: 'Art', from: 1520, to: 1700, text: 'Ottoman mosque architecture (Sinan) and Iznik ceramics; Safavid carpets, tilework and Persian miniature painting.' },
      { domain: 'Science', from: 1420, to: 1450, text: 'Ulugh Beg’s observatory at Samarkand produces precise star tables.' },
      { domain: 'Science', from: 1570, to: 1580, text: 'Taqi al-Din builds an observatory in Istanbul (1577), later demolished.' },
      { domain: 'Trade', from: 1300, to: 1700, text: 'Caravan and sea routes link the Mediterranean, the Red Sea, the Persian Gulf and the Silk Roads; silk and spices pass through Aleppo, Cairo and Tabriz.' },
      { domain: 'Culture', from: 1300, to: 1700, text: 'Persian and Arabic literature, Islamic law and Sufi brotherhoods shape cultural life across the region.' },
    ],
  },
  {
    id: 'east-asia',
    name: 'East Asia',
    group: 'Asia',
    center: { lat: 35, lon: 115 },
    modernScope: 'China, Mongolia, Korea and Japan',
    eras: [
      {
        from: 1300,
        to: 1449,
        overview:
          'The Mongol-led Yuan dynasty gave way to the Ming dynasty (1368). Early Ming emperors moved the capital to Beijing and sent Zheng He’s fleets across the Indian Ocean. In Korea, the Joseon dynasty (from 1392) promoted Neo-Confucianism and created the Hangul alphabet.',
      },
      {
        from: 1450,
        to: 1549,
        overview:
          'The Ming state focused on its northern frontier and rebuilt sections of the Great Wall. Japan entered a long period of civil war, the Sengoku (“Warring States”) era. Portuguese traders reached southern China in the 1510s and Japan in 1543.',
      },
      {
        from: 1550,
        to: 1700,
        overview:
          'Silver from Japan and the Americas fuelled a commercial boom in Ming China. Japan was reunified and governed by the Tokugawa shogunate from 1603. In 1644 the Ming fell and the Manchu Qing dynasty took power.',
      },
    ],
    polities: [
      { name: 'Yuan dynasty', type: 'Dynasty', from: 1300, to: 1368, note: 'Mongol-led dynasty founded by Kublai Khan.' },
      { name: 'Ming dynasty', type: 'Dynasty', from: 1368, to: 1644, note: 'Capital Nanjing, then Beijing from 1421.' },
      { name: 'Qing dynasty', type: 'Dynasty', from: 1644, to: 1700, note: 'Manchu-led dynasty; ruled China until 1912.' },
      { name: 'Goryeo', type: 'Kingdom', from: 1300, to: 1392, note: 'Korean kingdom, replaced by Joseon.' },
      { name: 'Joseon dynasty', type: 'Dynasty', from: 1392, to: 1700, note: 'Korean dynasty, capital Hanseong (Seoul).' },
      { name: 'Ashikaga shogunate', type: 'Dynasty', from: 1338, to: 1573, note: 'Military government in Japan; power fragmented in the Sengoku period.' },
      { name: 'Tokugawa shogunate', type: 'Dynasty', from: 1603, to: 1700, note: 'Military government ruling Japan from Edo.' },
    ],
    people: [
      { name: 'Hongwu Emperor (Zhu Yuanzhang)', dates: 'r. 1368–1398', activeFrom: 1368, activeTo: 1398, role: 'Founder of the Ming dynasty' },
      { name: 'Yongle Emperor', dates: 'r. 1402–1424', activeFrom: 1402, activeTo: 1424, role: 'Ming emperor; moved capital to Beijing' },
      { name: 'Zheng He', dates: '1371–1433', activeFrom: 1405, activeTo: 1433, role: 'Admiral and diplomat' },
      { name: 'King Sejong', dates: 'r. 1418–1450', activeFrom: 1418, activeTo: 1450, role: 'Joseon king; created Hangul' },
      { name: 'Wang Yangming', dates: '1472–1529', activeFrom: 1500, activeTo: 1529, role: 'Neo-Confucian philosopher' },
      { name: 'Matteo Ricci', dates: '1552–1610', activeFrom: 1582, activeTo: 1610, role: 'Jesuit missionary and scholar in Ming China' },
      { name: 'Toyotomi Hideyoshi', dates: '1537–1598', activeFrom: 1582, activeTo: 1598, role: 'Unifier of Japan' },
      { name: 'Tokugawa Ieyasu', dates: '1543–1616', activeFrom: 1600, activeTo: 1616, role: 'Founder of the Tokugawa shogunate' },
      { name: 'Kangxi Emperor', dates: 'r. 1661–1722', activeFrom: 1661, activeTo: 1700, role: 'Qing emperor' },
    ],
    developments: [
      { domain: 'Art', from: 1368, to: 1644, text: 'Blue-and-white porcelain from Jingdezhen is exported across Asia, Africa and Europe.' },
      { domain: 'Art', from: 1400, to: 1550, text: 'Ink painting and Zen-influenced arts in Japan; the tea ceremony develops.' },
      { domain: 'Science', from: 1300, to: 1700, text: 'Woodblock printing is widely used; Korean metal movable type is employed by the Joseon court. Li Shizhen’s pharmacological encyclopedia appears in 1578.' },
      { domain: 'Trade', from: 1405, to: 1433, text: 'Ming treasure fleets extend tributary relations across the Indian Ocean.' },
      { domain: 'Trade', from: 1550, to: 1700, text: 'Silver imports from Japan and Spanish America through Macau and Manila.' },
      { domain: 'Culture', from: 1300, to: 1700, text: 'Neo-Confucian learning and civil-service examinations shape government in China and Korea.' },
    ],
  },
  {
    id: 'south-asia',
    name: 'South Asia',
    group: 'Asia',
    center: { lat: 22, lon: 79 },
    modernScope: 'India, Pakistan, Bangladesh, Sri Lanka and Nepal',
    eras: [
      {
        from: 1300,
        to: 1449,
        overview:
          'The Delhi Sultanate dominated northern India, while in the south the Vijayanagara kingdom (from c. 1336) and the Bahmani Sultanate competed for the Deccan. Timur sacked Delhi in 1398. Ports on the Malabar and Gujarat coasts were key nodes of Indian Ocean trade.',
      },
      {
        from: 1450,
        to: 1549,
        overview:
          'Guru Nanak founded the Sikh tradition in Punjab. Portuguese ships reached Calicut (1498) and seized Goa (1510). In 1526 Babur founded the Mughal Empire after the First Battle of Panipat.',
      },
      {
        from: 1550,
        to: 1700,
        overview:
          'Under Akbar, Jahangir, Shah Jahan and Aurangzeb, the Mughal Empire became one of the richest states in the world, renowned for its administration, architecture and textiles. European trading companies established coastal factories.',
      },
    ],
    polities: [
      { name: 'Delhi Sultanate', type: 'Sultanate', from: 1300, to: 1526, note: 'Series of dynasties ruling from Delhi; the Lodi were the last.' },
      { name: 'Vijayanagara Empire', type: 'Empire', from: 1336, to: 1646, note: 'South Indian Hindu kingdom; capital sacked after 1565.' },
      { name: 'Bahmani Sultanate', type: 'Sultanate', from: 1347, to: 1527, note: 'Deccan sultanate that split into five successor states.' },
      { name: 'Kingdom of Calicut', type: 'Kingdom', from: 1300, to: 1700, note: 'Port kingdom on the Malabar coast ruled by the Zamorin.' },
      { name: 'Mughal Empire', type: 'Empire', from: 1526, to: 1700, note: 'Founded by Babur; capitals included Agra, Fatehpur Sikri and Delhi.' },
      { name: 'Portuguese Estado da Índia', type: 'Colonial territory', from: 1505, to: 1700, note: 'Network of forts and ports centred on Goa.' },
    ],
    people: [
      { name: 'Krishnadevaraya', dates: 'r. 1509–1529', activeFrom: 1509, activeTo: 1529, role: 'Vijayanagara emperor and patron of literature' },
      { name: 'Guru Nanak', dates: '1469–1539', activeFrom: 1499, activeTo: 1539, role: 'Founder of Sikhism' },
      { name: 'Kabir', dates: '15th century', activeFrom: 1440, activeTo: 1518, role: 'Poet and mystic' },
      { name: 'Babur', dates: '1483–1530', activeFrom: 1526, activeTo: 1530, role: 'Founder of the Mughal Empire' },
      { name: 'Akbar', dates: 'r. 1556–1605', activeFrom: 1556, activeTo: 1605, role: 'Mughal emperor' },
      { name: 'Nur Jahan', dates: '1577–1645', activeFrom: 1611, activeTo: 1627, role: 'Mughal empress with significant political influence' },
      { name: 'Shah Jahan', dates: 'r. 1628–1658', activeFrom: 1628, activeTo: 1658, role: 'Mughal emperor; built the Taj Mahal' },
      { name: 'Aurangzeb', dates: 'r. 1658–1707', activeFrom: 1658, activeTo: 1700, role: 'Mughal emperor' },
    ],
    developments: [
      { domain: 'Art', from: 1336, to: 1565, text: 'Temple architecture and sculpture at Vijayanagara (Hampi).' },
      { domain: 'Art', from: 1556, to: 1700, text: 'Mughal miniature painting and monumental architecture blending Persian and Indian traditions.' },
      { domain: 'Science', from: 1300, to: 1550, text: 'The Kerala school of mathematics develops infinite series methods (Madhava and successors).' },
      { domain: 'Trade', from: 1300, to: 1700, text: 'Indian cotton textiles are traded across the Indian Ocean to Africa, the Middle East and Southeast Asia.' },
      { domain: 'Culture', from: 1400, to: 1700, text: 'Bhakti devotional poetry and the Sikh tradition; Persian becomes the language of Mughal administration.' },
    ],
  },
  {
    id: 'southeast-asia',
    name: 'Southeast Asia',
    group: 'Asia',
    center: { lat: 6, lon: 108 },
    modernScope: 'Mainland Southeast Asia, the Malay Peninsula, Indonesia and the Philippines',
    eras: [
      {
        from: 1300,
        to: 1449,
        overview:
          'Majapahit in Java was the leading power of the archipelago, while on the mainland the Thai kingdom of Ayutthaya (founded 1351) rose as Angkor declined. Melaka, founded around 1400, became a great port as its rulers converted to Islam.',
      },
      {
        from: 1450,
        to: 1549,
        overview:
          'Melaka dominated the strait trade in spices, textiles and porcelain until the Portuguese captured it in 1511. Islam spread through trading ports in Sumatra, Java and the Moluccas (the Spice Islands).',
      },
      {
        from: 1550,
        to: 1700,
        overview:
          'Spanish rule began in the Philippines (1565), and the Dutch East India Company founded Batavia (1619) in Java. Local states such as Aceh, Mataram and Ayutthaya remained powerful trading and political centres.',
      },
    ],
    polities: [
      { name: 'Majapahit', type: 'Kingdom', from: 1300, to: 1527, note: 'Hindu-Buddhist kingdom based in East Java.' },
      { name: 'Khmer Empire (Angkor)', type: 'Empire', from: 1300, to: 1431, note: 'Declined; Angkor was largely abandoned as a royal capital in the 1400s.' },
      { name: 'Ayutthaya kingdom', type: 'Kingdom', from: 1351, to: 1700, note: 'Siamese kingdom; major regional trading power.' },
      { name: 'Đại Việt', type: 'Kingdom', from: 1300, to: 1700, note: 'Vietnamese kingdom under the Trần and then Lê dynasties.' },
      { name: 'Melaka Sultanate', type: 'Sultanate', from: 1400, to: 1511, note: 'Port state controlling the Strait of Melaka.' },
      { name: 'Aceh Sultanate', type: 'Sultanate', from: 1496, to: 1700, note: 'Sumatran power and rival of Portuguese Melaka.' },
      { name: 'Portuguese Melaka', type: 'Colonial territory', from: 1511, to: 1641, note: 'Captured by the Dutch in 1641.' },
      { name: 'Spanish Philippines', type: 'Colonial territory', from: 1565, to: 1700, note: 'Governed from Manila after 1571.' },
      { name: 'Dutch East India Company (VOC)', type: 'Trading network', from: 1602, to: 1700, note: 'Chartered company with its Asian headquarters at Batavia.' },
    ],
    people: [
      { name: 'Gajah Mada', dates: 'd. c. 1364', activeFrom: 1329, activeTo: 1364, role: 'Majapahit chief minister' },
      { name: 'Hayam Wuruk', dates: 'r. 1350–1389', activeFrom: 1350, activeTo: 1389, role: 'Majapahit king' },
      { name: 'Parameswara', dates: 'd. c. 1414', activeFrom: 1400, activeTo: 1414, role: 'Founder of Melaka' },
      { name: 'Afonso de Albuquerque', dates: 'c. 1453–1515', activeFrom: 1506, activeTo: 1515, role: 'Portuguese commander' },
      { name: 'Lapulapu', dates: 'fl. 1521', activeFrom: 1521, activeTo: 1521, role: 'Mactan leader who defeated Magellan’s men (1521)' },
      { name: 'Naresuan', dates: 'r. 1590–1605', activeFrom: 1584, activeTo: 1605, role: 'King of Ayutthaya' },
      { name: 'Sultan Iskandar Muda', dates: 'r. 1607–1636', activeFrom: 1607, activeTo: 1636, role: 'Ruler of Aceh at its height' },
    ],
    developments: [
      { domain: 'Art', from: 1300, to: 1500, text: 'Temple complexes and court literature in Java; Ayutthaya Buddhist architecture.' },
      { domain: 'Trade', from: 1400, to: 1700, text: 'Cloves, nutmeg and mace from the Moluccas reach markets from China to Europe.' },
      { domain: 'Trade', from: 1565, to: 1700, text: 'Manila galleons connect Asia to Acapulco across the Pacific.' },
      { domain: 'Culture', from: 1400, to: 1700, text: 'Islam spreads through port cities; Malay becomes a regional trade language.' },
      { domain: 'Science', from: 1300, to: 1700, text: 'Advanced navigation using monsoon winds and regional shipbuilding traditions.' },
    ],
  },
  {
    id: 'africa',
    name: 'Africa',
    group: 'Africa',
    center: { lat: 4, lon: 20 },
    modernScope: 'North Africa, West Africa, Central, Eastern and Southern Africa',
    eras: [
      {
        from: 1300,
        to: 1449,
        overview:
          'The Mali Empire controlled gold-rich West African trade routes across the Sahara; Mansa Musa’s pilgrimage (1324) made it famous. Swahili city-states such as Kilwa prospered from Indian Ocean commerce, and Great Zimbabwe was a major political centre in the south.',
      },
      {
        from: 1450,
        to: 1549,
        overview:
          'Songhai replaced Mali as the dominant power along the Niger River. Portuguese ships explored the Atlantic coast, built a fort at Elmina (1482) and established relations with the Kingdom of Kongo. In Ethiopia, the Solomonic kingdom fought the Adal Sultanate.',
      },
      {
        from: 1550,
        to: 1700,
        overview:
          'Morocco defeated Songhai (1591). The Atlantic slave trade grew rapidly, especially from West-Central Africa, causing violence and disruption. Powerful states such as Benin, Oyo and Ndongo (under Queen Njinga) responded to these changes in different ways.',
      },
    ],
    polities: [
      { name: 'Mali Empire', type: 'Empire', from: 1300, to: 1600, note: 'West African empire; declined after c. 1450.' },
      { name: 'Songhai Empire', type: 'Empire', from: 1464, to: 1591, note: 'Capital Gao; centres of learning at Timbuktu and Djenné.' },
      { name: 'Kilwa and the Swahili city-states', type: 'City-state', from: 1300, to: 1700, note: 'Independent Muslim trading cities on the East African coast.' },
      { name: 'Kingdom of Zimbabwe', type: 'Kingdom', from: 1300, to: 1450, note: 'Centred on Great Zimbabwe.' },
      { name: 'Ethiopian (Solomonic) kingdom', type: 'Kingdom', from: 1300, to: 1700, note: 'Christian kingdom in the Horn of Africa.' },
      { name: 'Kingdom of Benin', type: 'Kingdom', from: 1300, to: 1700, note: 'Forest kingdom famous for its bronze and brass works.' },
      { name: 'Kingdom of Kongo', type: 'Kingdom', from: 1390, to: 1700, note: 'Central African kingdom; adopted Christianity under Afonso I.' },
      { name: 'Saadi Sultanate (Morocco)', type: 'Sultanate', from: 1549, to: 1659, note: 'Moroccan dynasty that invaded Songhai in 1591.' },
    ],
    people: [
      { name: 'Mansa Musa', dates: 'r. c. 1312–1337', activeFrom: 1312, activeTo: 1337, role: 'Ruler of the Mali Empire' },
      { name: 'Ibn Battuta', dates: '1304–c. 1369', activeFrom: 1325, activeTo: 1369, role: 'Moroccan traveller and writer' },
      { name: 'Sunni Ali', dates: 'r. 1464–1492', activeFrom: 1464, activeTo: 1492, role: 'Songhai ruler' },
      { name: 'Askia Muhammad I', dates: 'r. 1493–1528', activeFrom: 1493, activeTo: 1528, role: 'Songhai ruler and reformer' },
      { name: 'Oba Ewuare', dates: 'r. c. 1440–1473', activeFrom: 1440, activeTo: 1473, role: 'Ruler of Benin who expanded the kingdom' },
      { name: 'Afonso I of Kongo', dates: 'r. c. 1509–1542', activeFrom: 1509, activeTo: 1542, role: 'Kongo king' },
      { name: 'Queen Njinga', dates: 'c. 1583–1663', activeFrom: 1624, activeTo: 1663, role: 'Ruler of Ndongo and Matamba' },
    ],
    developments: [
      { domain: 'Art', from: 1400, to: 1700, text: 'Benin brass plaques and sculptures; Ethiopian manuscript painting.' },
      { domain: 'Science', from: 1300, to: 1600, text: 'Manuscript libraries at Timbuktu preserve works on law, astronomy and medicine.' },
      { domain: 'Trade', from: 1300, to: 1600, text: 'Trans-Saharan caravans carry gold and salt; Swahili ports trade gold and ivory across the Indian Ocean.' },
      { domain: 'Trade', from: 1480, to: 1700, text: 'Atlantic trade with Europeans, including the expanding and devastating slave trade.' },
      { domain: 'Culture', from: 1300, to: 1700, text: 'Islam in the Sahel and Swahili Coast; Christianity in Ethiopia and Kongo; diverse local religious traditions.' },
    ],
  },
  {
    id: 'north-america',
    name: 'North America',
    group: 'Americas',
    center: { lat: 42, lon: -97 },
    modernScope: 'Canada, the United States and northern Mexico',
    eras: [
      {
        from: 1300,
        to: 1449,
        overview:
          'Many Indigenous nations lived across the continent, from farming peoples of the Mississippi valley to Ancestral Puebloan communities in the Southwest. The great Mississippian city of Cahokia had declined by around 1350.',
      },
      {
        from: 1450,
        to: 1549,
        overview:
          'The Haudenosaunee Confederacy united five nations in the north-east (its founding date is debated). Spanish expeditions such as those of Hernando de Soto (1539–1542) and Coronado (1540–1542) brought violence and disease.',
      },
      {
        from: 1550,
        to: 1700,
        overview:
          'European colonies were founded: St. Augustine (Spanish, 1565), Jamestown (English, 1607), Québec (French, 1608) and New Amsterdam (Dutch, 1620s). Indigenous nations negotiated, traded and fought; the Pueblo Revolt (1680) expelled the Spanish from New Mexico.',
      },
    ],
    polities: [
      { name: 'Mississippian chiefdoms', type: 'Society', from: 1300, to: 1550, note: 'Mound-building farming societies of the Southeast and Mississippi valley.' },
      { name: 'Haudenosaunee Confederacy', type: 'Confederation', from: 1450, to: 1700, note: 'Five (later six) nations; founding date uncertain.' },
      { name: 'Powhatan paramount chiefdom', type: 'Confederation', from: 1570, to: 1646, note: 'Alliance of Algonquian-speaking peoples in Virginia.' },
      { name: 'Pueblo peoples', type: 'Society', from: 1300, to: 1700, note: 'Farming communities of the Southwest.' },
      { name: 'New France', type: 'Colonial territory', from: 1608, to: 1700, note: 'French colony centred on the St. Lawrence.' },
      { name: 'English colonies', type: 'Colonial territory', from: 1607, to: 1700, note: 'Along the Atlantic seaboard.' },
    ],
    people: [
      { name: 'Hiawatha', dates: 'traditional', activeFrom: 1450, activeTo: 1600, role: 'Co-founder of the Haudenosaunee Confederacy in oral tradition' },
      { name: 'Wahunsenacah (Powhatan)', dates: 'd. 1618', activeFrom: 1580, activeTo: 1618, role: 'Paramount chief in Virginia' },
      { name: 'Samuel de Champlain', dates: 'c. 1567–1635', activeFrom: 1603, activeTo: 1635, role: 'Founder of Québec' },
      { name: 'Metacom (King Philip)', dates: 'd. 1676', activeFrom: 1662, activeTo: 1676, role: 'Wampanoag leader' },
      { name: 'Po’pay', dates: 'd. c. 1688', activeFrom: 1675, activeTo: 1688, role: 'Leader of the Pueblo Revolt' },
    ],
    developments: [
      { domain: 'Culture', from: 1300, to: 1700, text: 'Diverse languages, governments and spiritual traditions; extensive oral history.' },
      { domain: 'Trade', from: 1300, to: 1700, text: 'Long-distance exchange networks in copper, shell and stone; from the 1500s, the fur trade with Europeans.' },
      { domain: 'Science', from: 1300, to: 1700, text: 'Sophisticated agriculture based on maize, beans and squash (“Three Sisters”).' },
      { domain: 'Art', from: 1300, to: 1700, text: 'Pottery, beadwork, wampum and carved objects with political and spiritual meaning.' },
    ],
  },
  {
    id: 'central-america',
    name: 'Central America & Caribbean',
    group: 'Americas',
    center: { lat: 17, lon: -88 },
    modernScope: 'Mexico, Central America and the Caribbean islands',
    eras: [
      {
        from: 1300,
        to: 1449,
        overview:
          'The Mexica founded Tenochtitlan around 1325 and in 1428 formed the Triple Alliance, the core of the Aztec Empire. Maya city-states continued in the Yucatán, and Taíno chiefdoms lived across the Caribbean islands.',
      },
      {
        from: 1450,
        to: 1549,
        overview:
          'The Aztec Empire collected tribute across central Mexico. After 1492, Spanish colonisation of the Caribbean devastated the Taíno. Between 1519 and 1521 Spanish forces and Indigenous allies conquered Tenochtitlan.',
      },
      {
        from: 1550,
        to: 1700,
        overview:
          'New Spain became a major colony with a mixed Indigenous, Spanish and African population. Epidemics caused catastrophic population loss. Caribbean islands became contested by Spain, England, France and the Netherlands, with plantation economies built on enslaved labour.',
      },
    ],
    polities: [
      { name: 'Mexica (Aztec) Triple Alliance', type: 'Empire', from: 1428, to: 1521, note: 'Alliance of Tenochtitlan, Texcoco and Tlacopan.' },
      { name: 'Maya city-states', type: 'City-state', from: 1300, to: 1697, note: 'Including Mayapán; the last independent Maya city, Nojpetén, fell in 1697.' },
      { name: 'Tlaxcala', type: 'Confederation', from: 1300, to: 1521, note: 'Independent confederation, enemy of the Mexica and ally of the Spanish.' },
      { name: 'Taíno chiefdoms', type: 'Society', from: 1300, to: 1520, note: 'Caribbean societies led by caciques.' },
      { name: 'Viceroyalty of New Spain', type: 'Colonial territory', from: 1535, to: 1700, note: 'Spanish colonial government in Mexico City.' },
    ],
    people: [
      { name: 'Itzcoatl', dates: 'r. 1427–1440', activeFrom: 1427, activeTo: 1440, role: 'Mexica ruler; formed the Triple Alliance' },
      { name: 'Nezahualcoyotl', dates: '1402–1472', activeFrom: 1431, activeTo: 1472, role: 'Ruler and poet of Texcoco' },
      { name: 'Moctezuma II', dates: 'r. 1502–1520', activeFrom: 1502, activeTo: 1520, role: 'Mexica ruler' },
      { name: 'Malintzin (La Malinche)', dates: 'c. 1500–c. 1529', activeFrom: 1519, activeTo: 1529, role: 'Nahua interpreter for Cortés' },
      { name: 'Hernán Cortés', dates: '1485–1547', activeFrom: 1519, activeTo: 1547, role: 'Spanish conquistador' },
      { name: 'Bartolomé de las Casas', dates: '1484–1566', activeFrom: 1514, activeTo: 1566, role: 'Friar who criticised Spanish treatment of Indigenous peoples' },
      { name: 'Sor Juana Inés de la Cruz', dates: '1648–1695', activeFrom: 1665, activeTo: 1695, role: 'Writer and scholar in New Spain' },
    ],
    developments: [
      { domain: 'Science', from: 1300, to: 1521, text: 'Chinampa raised-field agriculture and sophisticated calendrical systems.' },
      { domain: 'Art', from: 1300, to: 1700, text: 'Aztec stone sculpture and featherwork; later, colonial art combining Indigenous and European traditions.' },
      { domain: 'Trade', from: 1300, to: 1521, text: 'Pochteca long-distance merchants and great markets such as Tlatelolco.' },
      { domain: 'Trade', from: 1565, to: 1700, text: 'Acapulco receives Manila galleons; silver flows to Europe and Asia.' },
      { domain: 'Culture', from: 1300, to: 1700, text: 'Nahuatl and Maya written traditions; after 1521, Christian missions and cultural blending.' },
    ],
  },
  {
    id: 'south-america',
    name: 'South America',
    group: 'Americas',
    center: { lat: -14, lon: -62 },
    modernScope: 'The Andes, the Amazon basin and the Atlantic coast of South America',
    eras: [
      {
        from: 1300,
        to: 1449,
        overview:
          'Many societies flourished, including the Chimú kingdom on the north coast of Peru and numerous Amazonian peoples. In the highlands, the Inca of Cusco began to expand under Pachacuti from around 1438.',
      },
      {
        from: 1450,
        to: 1549,
        overview:
          'The Inca Empire (Tawantinsuyu) stretched along the Andes, connected by roads and administered with knotted-cord records (khipu). Weakened by civil war and epidemics, it was conquered by Spanish forces from 1532. Portugal began colonising Brazil.',
      },
      {
        from: 1550,
        to: 1700,
        overview:
          'Silver from Potosí, mined with forced Indigenous labour, transformed world trade. Sugar plantations in Portuguese Brazil depended on enslaved Africans. Indigenous communities resisted, adapted and negotiated within colonial societies.',
      },
    ],
    polities: [
      { name: 'Chimú kingdom', type: 'Kingdom', from: 1300, to: 1470, note: 'Coastal kingdom with its capital at Chan Chan; conquered by the Inca.' },
      { name: 'Inca Empire (Tawantinsuyu)', type: 'Empire', from: 1438, to: 1572, note: 'Largest state in the pre-Columbian Americas.' },
      { name: 'Viceroyalty of Peru', type: 'Colonial territory', from: 1542, to: 1700, note: 'Spanish colonial government in Lima.' },
      { name: 'Portuguese Brazil', type: 'Colonial territory', from: 1500, to: 1700, note: 'Coastal colony based on sugar production.' },
      { name: 'Muisca confederations', type: 'Confederation', from: 1300, to: 1540, note: 'Highland societies in present-day Colombia.' },
    ],
    people: [
      { name: 'Pachacuti Inca Yupanqui', dates: 'r. c. 1438–1471', activeFrom: 1438, activeTo: 1471, role: 'Inca ruler' },
      { name: 'Huayna Capac', dates: 'r. c. 1493–1527', activeFrom: 1493, activeTo: 1527, role: 'Inca ruler' },
      { name: 'Atahualpa', dates: 'd. 1533', activeFrom: 1527, activeTo: 1533, role: 'Last independent Inca ruler' },
      { name: 'Francisco Pizarro', dates: 'c. 1478–1541', activeFrom: 1524, activeTo: 1541, role: 'Spanish conquistador' },
      { name: 'Túpac Amaru', dates: 'd. 1572', activeFrom: 1571, activeTo: 1572, role: 'Last Inca ruler at Vilcabamba' },
      { name: 'Felipe Guaman Poma de Ayala', dates: 'c. 1535–c. 1616', activeFrom: 1580, activeTo: 1616, role: 'Andean author and illustrator' },
    ],
    developments: [
      { domain: 'Science', from: 1438, to: 1572, text: 'Terrace farming, freeze-dried food storage and the Inca road system (Qhapaq Ñan).' },
      { domain: 'Art', from: 1300, to: 1700, text: 'Andean textiles and metalwork; later, the Cusco school of painting.' },
      { domain: 'Trade', from: 1545, to: 1700, text: 'Potosí silver enters global trade; Brazilian sugar is shipped to Europe.' },
      { domain: 'Culture', from: 1300, to: 1700, text: 'Quechua becomes widespread; khipu record-keeping; colonial Christian and Andean religious blending.' },
    ],
  },
];

export const regionById = Object.fromEntries(regions.map((r) => [r.id, r])) as Record<RegionId, Region>;

export const regionGroups: RegionGroup[] = ['Europe', 'Asia', 'Middle East', 'Africa', 'Americas'];

export const periodMarkers: PeriodMarker[] = [
  { year: 1347, label: 'Black Death' },
  { year: 1453, label: 'Fall of Constantinople' },
  { year: 1492, label: 'Atlantic crossings' },
  { year: 1517, label: 'Reformation' },
  { year: 1543, label: 'Copernicus' },
  { year: 1648, label: 'Westphalia' },
];

export const YEAR_MIN = 1300;
export const YEAR_MAX = 1700;
export const DEFAULT_YEAR = 1500;
