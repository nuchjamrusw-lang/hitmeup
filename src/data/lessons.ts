import type { Lesson } from '@/types';

export const lessons: Lesson[] = [
  /* ───────────────────────── Lesson 1 ───────────────────────── */
  {
    id: 'understanding-renaissance',
    number: 1,
    title: 'Understanding the Renaissance',
    subtitle: 'What changed, where it began, and why historians debate the term',
    minutes: 35,
    objectiveIds: ['obj-origins', 'obj-influence'],
    objectives: [
      'Define the Renaissance and explain where the term comes from.',
      'Explain why the Italian city-states were a favourable setting for new ideas.',
      'Describe humanism and how it changed views of human potential.',
      'Evaluate the relationship between the Middle Ages and the Renaissance.',
    ],
    introduction:
      '“Renaissance” means “rebirth”. Writers in fourteenth- and fifteenth-century Italy believed they were reviving the learning of ancient Greece and Rome after a long “middle age”. Historians today use the word for a period of cultural change in Europe from roughly 1300 to 1600 — but they also question how sudden, and how “new”, that change really was.',
    sections: [
      {
        id: 'what',
        heading: 'What was the Renaissance?',
        paragraphs: [
          'The Renaissance was a movement in art, literature and learning that began in Italy and later spread across Europe. Its supporters admired classical (ancient Greek and Roman) texts, buildings and art, and tried to imitate and surpass them.',
          'The term itself became common in the nineteenth century, especially after the Swiss historian Jacob Burckhardt’s book The Civilization of the Renaissance in Italy (1860). It is a label created later to describe a period — not a name that most people living at the time would have used.',
        ],
        keyPoints: [
          'A cultural movement, not a single event.',
          'Centred on classical learning, art and new ways of thinking about people.',
          'Dates are approximate: c. 1300 to c. 1600, varying by place.',
        ],
      },
      {
        id: 'origins',
        heading: 'Origins in the Italian city-states',
        paragraphs: [
          'Northern and central Italy was divided into many independent city-states, such as Florence, Venice, Milan and Siena. Their merchants and bankers grew rich from Mediterranean trade, textiles and finance.',
          'Rival cities and families competed for prestige by funding buildings, paintings and scholars. Italy also had visible reminders of ancient Rome — ruins, inscriptions and manuscripts — that encouraged interest in the classical past.',
        ],
        illustration: 'italian-city-states',
        caption: 'Major Italian city-states around 1450 (simplified). Borders shifted frequently; this diagram shows approximate locations, not fixed frontiers.',
        keyPoints: [
          'Wealth from trade and banking paid for culture.',
          'Competition between cities encouraged patronage.',
          'Roman heritage was physically present in Italy.',
        ],
      },
      {
        id: 'middle-ages',
        heading: 'The Middle Ages and the Renaissance',
        paragraphs: [
          'Renaissance writers described the centuries before them as a “dark age”. Modern historians reject this picture: medieval Europe had universities, Gothic cathedrals, scholarship based on Aristotle, and important technologies.',
          'Many Renaissance ideas grew directly out of medieval foundations. Classical texts had also been preserved and studied in the Byzantine Empire and the Islamic world, and some reached Italy through translations and through Greek scholars who moved west.',
        ],
        illustration: 'medieval-renaissance',
        caption: 'Continuity and change: some features continued from the medieval world, while others were new emphases of the Renaissance.',
      },
      {
        id: 'humanism',
        heading: 'Humanism and changing perspectives',
        paragraphs: [
          'Humanism was an educational and intellectual movement focused on the studia humanitatis: grammar, rhetoric, poetry, history and moral philosophy, studied through classical authors. Petrarch (1304–1374) is often called the “father of humanism”.',
          'Humanists emphasised human dignity, individual achievement and active citizenship. Most were Christians; humanism did not reject religion but encouraged people to read original sources carefully — including the Bible in Greek and Hebrew.',
        ],
        illustration: 'humanism',
        caption: 'The humanist curriculum combined classical study with practical goals: writing, speaking and acting well in public life.',
      },
    ],
    vocabulary: [
      { term: 'Renaissance', definition: 'French for “rebirth”; a period of renewed interest in classical learning and new developments in European culture, c. 1300–1600.' },
      { term: 'Classical', definition: 'Relating to ancient Greece and Rome.' },
      { term: 'City-state', definition: 'An independent city that governs itself and the surrounding territory.' },
      { term: 'Humanism', definition: 'An intellectual movement based on the study of classical texts and focused on human potential and achievement.' },
      { term: 'Patron', definition: 'A person or institution that pays for and supports the work of artists or scholars.' },
      { term: 'Periodisation', definition: 'The way historians divide the past into named periods — always a simplification.' },
    ],
    figures: [
      { name: 'Petrarch', dates: '1304–1374', description: 'Italian poet and scholar who searched for lost classical manuscripts and promoted classical Latin.' },
      { name: 'Cosimo de’ Medici', dates: '1389–1464', description: 'Florentine banker and political leader, patron of artists, architects and scholars.' },
      { name: 'Christine de Pizan', dates: '1364–c. 1430', description: 'Writer at the French court who used classical and medieval learning to defend women’s abilities in The Book of the City of Ladies (1405).' },
      { name: 'Jacob Burckhardt', dates: '1818–1897', description: 'Swiss historian whose 1860 book helped define the modern idea of “the Renaissance”.' },
    ],
    knowledgeCheck: [
      {
        id: 'l1q1',
        prompt: 'What does the word “Renaissance” mean?',
        options: ['Revolution', 'Rebirth', 'Reformation', 'Rediscovery of the Americas'],
        correctIndex: 1,
        explanation: 'Renaissance is French for “rebirth”, reflecting the idea of reviving classical learning.',
      },
      {
        id: 'l1q2',
        prompt: 'Which factor best explains why the Renaissance began in the Italian city-states?',
        options: [
          'Italy was united under a single powerful king.',
          'Wealth from trade and banking funded competing patrons.',
          'Italy had no contact with other cultures.',
          'The Black Death did not affect Italy.',
        ],
        correctIndex: 1,
        explanation: 'Rich, competing city-states such as Florence and Venice used their wealth to sponsor art and learning. Italy was not united and was hit hard by the Black Death.',
      },
      {
        id: 'l1q3',
        prompt: 'How do most modern historians view the idea that the Middle Ages were a “dark age”?',
        options: [
          'As accurate — little learning happened before 1300.',
          'As an oversimplification created partly by Renaissance writers themselves.',
          'As a term invented by medieval monks.',
          'As proven by archaeological evidence.',
        ],
        correctIndex: 1,
        explanation: 'The “dark age” idea was promoted by Renaissance humanists; historians now stress medieval achievements and continuity.',
      },
    ],
    worksheetId: 'ws-foundations',
    relatedEventIds: ['early-italian-renaissance', 'black-death', 'fall-of-constantinople'],
    sources: ['brit-renaissance', 'brit-humanism', 'brit-medici', 'khan-renaissance'],
  },

  /* ───────────────────────── Lesson 2 ───────────────────────── */
  {
    id: 'art-architecture',
    number: 2,
    title: 'Art and Architecture',
    subtitle: 'Perspective, realism and the economics of patronage',
    minutes: 40,
    objectiveIds: ['obj-developments'],
    objectives: [
      'Explain how linear perspective creates the illusion of depth.',
      'Identify features of Renaissance realism in painting and sculpture.',
      'Describe the work of key Renaissance artists and architects.',
      'Explain the role of patronage in producing art.',
    ],
    introduction:
      'Renaissance artists wanted pictures that looked like windows onto the real world. Using mathematics, close observation of the human body and the example of ancient sculpture, they changed how Europeans made and looked at images. But almost every work was paid for by someone — and that shaped what was made.',
    sections: [
      {
        id: 'perspective',
        heading: 'Perspective and realism',
        paragraphs: [
          'Linear perspective is a mathematical system for showing depth on a flat surface. Parallel lines moving away from the viewer appear to meet at a single vanishing point on the horizon. Brunelleschi is credited with demonstrating it in Florence around 1415–1420, and Leon Battista Alberti described it in his treatise On Painting (1435).',
          'Masaccio’s fresco The Holy Trinity (c. 1427) is one of the earliest surviving paintings to use the system. Artists also used chiaroscuro (strong contrasts of light and dark) and sfumato (soft blending of tones) to model forms.',
        ],
        illustration: 'linear-perspective',
        caption: 'Orthogonal lines converge on a single vanishing point on the horizon line. Use the interactive explorer below to move the vanishing point.',
      },
      {
        id: 'artists',
        heading: 'Important artists',
        paragraphs: [
          'Leonardo da Vinci (1452–1519) combined painting with scientific observation, filling notebooks with studies of anatomy, water and machines. Michelangelo (1475–1564) carved the marble David (1501–1504) and painted the Sistine Chapel ceiling (1508–1512). Raphael (1483–1520) painted The School of Athens for the papal apartments.',
          'In northern Europe, Jan van Eyck developed oil painting techniques with remarkable detail, and Albrecht Dürer spread Renaissance ideas through woodcuts and engravings. Artists such as Sofonisba Anguissola built international careers, despite women’s limited access to training.',
        ],
        keyPoints: [
          'Observation of nature and the human body.',
          'Classical subjects alongside religious ones.',
          'Prints helped spread artistic ideas widely.',
        ],
      },
      {
        id: 'architecture',
        heading: 'Architecture',
        paragraphs: [
          'Renaissance architects studied Roman ruins and the writings of the Roman architect Vitruvius. They favoured symmetry, proportion, columns, round arches and domes.',
          'Brunelleschi’s dome for Florence Cathedral (1420–1436) solved a problem that had puzzled builders for decades. Using a double shell and herringbone brickwork, it was built without a full wooden support frame.',
        ],
        illustration: 'dome',
        caption: 'Simplified section of Brunelleschi’s double-shell dome: an inner and an outer shell, linked by ribs, reduced weight.',
      },
      {
        id: 'patronage',
        heading: 'Cultural patronage',
        paragraphs: [
          'Patrons — the Church, guilds, city governments and rich families such as the Medici — commissioned most art. Contracts often specified the subject, size, materials (such as expensive ultramarine blue) and deadline.',
          'Art was a way of displaying wealth, piety and political power. Studying patronage helps historians understand who had power in Renaissance society, and whose stories were left out.',
        ],
        illustration: 'patronage',
        caption: 'The flow of a typical commission: patron, contract, workshop and public display.',
      },
    ],
    interactive: 'perspective-explorer',
    vocabulary: [
      { term: 'Linear perspective', definition: 'A system using converging lines and a vanishing point to show depth on a flat surface.' },
      { term: 'Vanishing point', definition: 'The point on the horizon where parallel lines appear to meet.' },
      { term: 'Fresco', definition: 'Painting on fresh, wet plaster so that the colours bind to the wall.' },
      { term: 'Chiaroscuro', definition: 'The use of strong contrasts between light and dark to model three-dimensional forms.' },
      { term: 'Commission', definition: 'A formal request, usually with a contract and payment, for a work of art.' },
      { term: 'Workshop', definition: 'A master artist’s studio where assistants and apprentices trained and helped produce works.' },
    ],
    figures: [
      { name: 'Filippo Brunelleschi', dates: '1377–1446', description: 'Architect of the Florence Cathedral dome; demonstrated linear perspective.' },
      { name: 'Leonardo da Vinci', dates: '1452–1519', description: 'Painter of the Mona Lisa and The Last Supper; scientific observer and engineer.' },
      { name: 'Michelangelo', dates: '1475–1564', description: 'Sculptor of David and painter of the Sistine Chapel ceiling; later architect of St Peter’s dome.' },
      { name: 'Sofonisba Anguissola', dates: 'c. 1532–1625', description: 'Italian painter who served at the Spanish royal court and was admired for her portraits.' },
    ],
    knowledgeCheck: [
      {
        id: 'l2q1',
        prompt: 'In linear perspective, parallel lines moving away from the viewer appear to…',
        options: ['Curve upwards', 'Meet at a vanishing point', 'Stay the same distance apart', 'Disappear behind the frame'],
        correctIndex: 1,
        explanation: 'Converging lines (orthogonals) meet at a vanishing point on the horizon line.',
      },
      {
        id: 'l2q2',
        prompt: 'Which statement about patronage is most accurate?',
        options: [
          'Artists usually worked only for themselves.',
          'Patrons often controlled the subject, materials and deadline of a work.',
          'Only the Church commissioned art.',
          'Patronage ended in the Renaissance.',
        ],
        correctIndex: 1,
        explanation: 'Contracts frequently specified subject, size and expensive materials; patrons included churches, guilds, cities and families.',
      },
      {
        id: 'l2q3',
        prompt: 'Brunelleschi’s dome for Florence Cathedral is notable because it…',
        options: [
          'was made entirely of wood',
          'used a double shell and was built without full wooden centring',
          'was copied from a Gothic cathedral in France',
          'was completed in 1300',
        ],
        correctIndex: 1,
        explanation: 'The double-shell design and brick patterns allowed it to be built without a full temporary wooden frame (1420–1436).',
      },
    ],
    worksheetId: 'ws-art-science',
    relatedEventIds: ['brunelleschi-dome', 'sistine-ceiling', 'isfahan', 'taj-mahal'],
    sources: ['brit-leonardo', 'brit-michelangelo', 'brit-brunelleschi', 'met-toah'],
  },

  /* ───────────────────────── Lesson 3 ───────────────────────── */
  {
    id: 'science-innovation',
    number: 3,
    title: 'Science and Innovation',
    subtitle: 'Observation, astronomy, anatomy and the printing press',
    minutes: 45,
    objectiveIds: ['obj-developments', 'obj-influence'],
    objectives: [
      'Explain how observation and evidence became more important in studying nature.',
      'Compare the geocentric and heliocentric models of the universe.',
      'Describe how Gutenberg’s printing press worked and why it mattered.',
      'Identify advances in anatomy and engineering.',
    ],
    introduction:
      'Between the fifteenth and seventeenth centuries, European scholars increasingly tested ancient authorities against careful observation. They built on Greek, Arabic and Persian scholarship — and on a new technology that could reproduce their findings in hundreds of identical copies.',
    sections: [
      {
        id: 'observation',
        heading: 'Scientific observation',
        paragraphs: [
          'Medieval natural philosophy relied heavily on Aristotle and Galen. Renaissance scholars still respected these authors, but more of them began to check claims against direct observation, measurement and, later, experiment.',
          'This shift was gradual. Historians usually call the changes of the sixteenth and seventeenth centuries the “Scientific Revolution”, while also noting that the term can exaggerate how sudden they were.',
        ],
        keyPoints: [
          'From relying on authority → to testing with evidence.',
          'Built on Islamic-world scholarship, e.g. optics and astronomy.',
          'A gradual process, not a single breakthrough.',
        ],
      },
      {
        id: 'astronomy',
        heading: 'Astronomy: from an Earth-centred to a Sun-centred universe',
        paragraphs: [
          'The dominant model, refined by Ptolemy in the second century, placed the Earth at the centre of the universe (geocentric). In 1543, Nicolaus Copernicus published De revolutionibus, arguing that the Earth and planets orbit the Sun (heliocentric).',
          'Johannes Kepler showed that planetary orbits are ellipses (1609), and Galileo’s telescope observations (1609–1610) revealed moons orbiting Jupiter. Galileo’s defence of Copernicus brought him before the Roman Inquisition in 1633.',
        ],
        illustration: 'heliocentric',
        caption: 'Left: the geocentric model. Right: the heliocentric model proposed by Copernicus. Not to scale.',
      },
      {
        id: 'printing',
        heading: 'Printing technology',
        paragraphs: [
          'Around 1450 in Mainz, Johannes Gutenberg combined several technologies: a hand mould for casting identical metal letters, an alloy of lead, tin and antimony, oil-based ink, and a screw press adapted from those used for wine and paper.',
          'Printing was not entirely new — woodblock printing and movable type had been used earlier in China and Korea. But Gutenberg’s system suited alphabets with a small number of characters, and it spread rapidly: by 1500, presses operated in more than 200 European towns.',
        ],
        illustration: 'printing-spread',
        caption: 'Simplified diagram of the spread of printing from Mainz to other European centres, c. 1460–1500.',
      },
      {
        id: 'anatomy',
        heading: 'Anatomy and engineering',
        paragraphs: [
          'In 1543 Andreas Vesalius published De humani corporis fabrica, a richly illustrated anatomy based on dissections he performed himself. It corrected several of Galen’s errors.',
          'Engineers and artists designed machines for building, war and water management. Leonardo’s notebooks contain designs for flying machines and pumps; most were never built, but they show a culture of mechanical experimentation.',
        ],
        illustration: 'anatomy',
        caption: 'Renaissance anatomy combined dissection with detailed drawing and printed illustration.',
      },
    ],
    interactive: 'printing-press',
    vocabulary: [
      { term: 'Geocentric', definition: 'A model of the universe with the Earth at the centre.' },
      { term: 'Heliocentric', definition: 'A model of the universe with the Sun at the centre.' },
      { term: 'Movable type', definition: 'Individual letters that can be arranged, printed and reused.' },
      { term: 'Empirical', definition: 'Based on observation or experience rather than theory alone.' },
      { term: 'Dissection', definition: 'Cutting apart a body to study its structure.' },
      { term: 'Scientific Revolution', definition: 'Changes in European science c. 1543–1687 emphasising observation, mathematics and experiment.' },
    ],
    figures: [
      { name: 'Johannes Gutenberg', dates: 'c. 1400–1468', description: 'Goldsmith of Mainz who developed a system of printing with movable metal type.' },
      { name: 'Nicolaus Copernicus', dates: '1473–1543', description: 'Polish astronomer who proposed a heliocentric universe.' },
      { name: 'Andreas Vesalius', dates: '1514–1564', description: 'Anatomist whose 1543 Fabrica was based on direct dissection.' },
      { name: 'Galileo Galilei', dates: '1564–1642', description: 'Used the telescope to gather evidence for the Copernican model.' },
    ],
    knowledgeCheck: [
      {
        id: 'l3q1',
        prompt: 'What did Copernicus propose in 1543?',
        options: [
          'The Earth is flat.',
          'The Earth and planets orbit the Sun.',
          'The Moon orbits Jupiter.',
          'The Sun orbits the Earth in an ellipse.',
        ],
        correctIndex: 1,
        explanation: 'De revolutionibus proposed a heliocentric model in which the Earth and planets orbit the Sun.',
      },
      {
        id: 'l3q2',
        prompt: 'Which statement about printing is accurate?',
        options: [
          'Gutenberg invented the very first form of printing.',
          'Movable type had been used earlier in East Asia; Gutenberg developed a system suited to alphabetic scripts.',
          'Printing spread slowly and had reached only three towns by 1500.',
          'Gutenberg used wooden letters carved by hand for every page.',
        ],
        correctIndex: 1,
        explanation: 'Movable type existed earlier in China and Korea. Gutenberg’s metal-type system spread to more than 200 European towns by 1500.',
      },
      {
        id: 'l3q3',
        prompt: 'Vesalius’s anatomy was important mainly because it…',
        options: [
          'repeated Galen without change',
          'was based on dissections he performed and corrected earlier errors',
          'was written in Chinese',
          'contained no illustrations',
        ],
        correctIndex: 1,
        explanation: 'Vesalius relied on direct observation through dissection and challenged some of Galen’s claims.',
      },
    ],
    worksheetId: 'ws-art-science',
    relatedEventIds: ['gutenberg-press', 'copernicus', 'galileo-telescope', 'hangul'],
    sources: ['brit-gutenberg', 'brit-copernicus', 'brit-vesalius', 'brit-galileo', 'brit-scirev', 'bl-gutenberg'],
  },

  /* ───────────────────────── Lesson 4 ───────────────────────── */
  {
    id: 'exploration-connections',
    number: 4,
    title: 'Exploration and Global Connections',
    subtitle: 'Oceans, trade networks and the meeting of worlds',
    minutes: 45,
    objectiveIds: ['obj-compare', 'obj-influence'],
    objectives: [
      'Describe existing trade networks in Asia, Africa and the Indian Ocean before 1500.',
      'Explain the motives and methods of European maritime expansion.',
      'Compare Zheng He’s voyages with those of Portuguese and Spanish explorers.',
      'Evaluate the consequences of contact for people in Africa, Asia and the Americas.',
    ],
    introduction:
      'Europeans did not “discover” a world without connections. Long before 1492, merchants linked East Africa, the Middle East, India, Southeast Asia and China across the Indian Ocean. What changed after 1490 was that sea routes joined all inhabited continents into a single, unequal web of exchange.',
    sections: [
      {
        id: 'networks',
        heading: 'Trade networks before 1500',
        paragraphs: [
          'Monsoon winds allowed ships to cross the Indian Ocean in predictable seasons. Ports such as Kilwa, Calicut, Melaka and Quanzhou traded gold, ivory, cotton textiles, pepper, spices, silk and porcelain.',
          'Overland, the Silk Roads and trans-Saharan caravan routes carried goods and ideas. Between 1405 and 1433, the Ming admiral Zheng He led seven great fleets as far as East Africa.',
        ],
        illustration: 'trade-routes',
        caption: 'Major trade routes c. 1400–1500 (simplified): Indian Ocean sea lanes, the Silk Roads and trans-Saharan routes.',
      },
      {
        id: 'expansion',
        heading: 'European maritime expansion',
        paragraphs: [
          'Portugal, followed by Castile (Spain), sought direct access to Asian spices and African gold, as well as religious and political goals. New ship designs such as the caravel, the magnetic compass and the astrolabe helped sailors on long ocean voyages.',
          'Bartolomeu Dias rounded the Cape of Good Hope in 1488. Columbus crossed the Atlantic in 1492, and Vasco da Gama reached Calicut in 1498. Ferdinand Magellan’s expedition (1519–1522) completed the first circumnavigation, although Magellan himself was killed in the Philippines.',
        ],
        keyPoints: [
          'Motives: trade, wealth, religion, rivalry and prestige.',
          'Technology: caravels, compass, astrolabe, maps.',
          'Methods often included armed force.',
        ],
      },
      {
        id: 'exchange',
        heading: 'The Columbian Exchange',
        paragraphs: [
          'Contact between the Americas and the rest of the world led to a transfer of plants, animals, people and diseases that historian Alfred Crosby called the “Columbian Exchange”. Maize, potatoes and tomatoes travelled east; horses, wheat and cattle travelled west.',
          'Diseases such as smallpox, to which Indigenous Americans had no immunity, killed a very large proportion of the population. Estimates vary widely, but the losses were catastrophic.',
        ],
        illustration: 'columbian-exchange',
        caption: 'Examples of the Columbian Exchange between the Americas and Afro-Eurasia.',
      },
      {
        id: 'connections',
        heading: 'Connecting four continents',
        paragraphs: [
          'Silver mined at Potosí with forced Indigenous labour flowed to Europe and, via the Manila galleons (from 1565), to Ming China. The transatlantic slave trade forcibly transported millions of Africans to work on plantations in the Americas.',
          'Global connections created great wealth for some and enormous suffering for others. Historians try to tell this story from many perspectives, not only from the point of view of European explorers.',
        ],
      },
    ],
    vocabulary: [
      { term: 'Monsoon', definition: 'Seasonal winds that reverse direction, used by sailors to cross the Indian Ocean.' },
      { term: 'Caravel', definition: 'A small, manoeuvrable sailing ship developed by the Portuguese.' },
      { term: 'Astrolabe', definition: 'An instrument for measuring the angle of the Sun or stars to find latitude.' },
      { term: 'Columbian Exchange', definition: 'The transfer of plants, animals, people and diseases between the Americas and Afro-Eurasia after 1492.' },
      { term: 'Tributary system', definition: 'Relations in which other rulers sent gifts to the Chinese emperor in return for recognition and trade.' },
      { term: 'Colonisation', definition: 'Taking control of land and people in another territory and settling it.' },
    ],
    figures: [
      { name: 'Zheng He', dates: '1371–1433', description: 'Ming admiral who led seven voyages across the Indian Ocean (1405–1433).' },
      { name: 'Vasco da Gama', dates: 'c. 1460–1524', description: 'Portuguese navigator who reached India by sailing around Africa (1498).' },
      { name: 'Christopher Columbus', dates: '1451–1506', description: 'Genoese navigator sponsored by Castile; crossed the Atlantic in 1492.' },
      { name: 'Malintzin (La Malinche)', dates: 'c. 1500–c. 1529', description: 'Nahua woman who served as interpreter for Cortés; her role is interpreted very differently by historians.' },
    ],
    knowledgeCheck: [
      {
        id: 'l4q1',
        prompt: 'What allowed sailors to cross the Indian Ocean in predictable seasons?',
        options: ['Trade winds of the Atlantic', 'Monsoon winds', 'Ocean currents from the Arctic', 'Steam engines'],
        correctIndex: 1,
        explanation: 'The seasonal reversal of the monsoon winds made Indian Ocean crossings predictable long before 1500.',
      },
      {
        id: 'l4q2',
        prompt: 'Which voyages came first?',
        options: ['Columbus’s first voyage', 'Vasco da Gama’s voyage to Calicut', 'Zheng He’s expeditions', 'Magellan’s circumnavigation'],
        correctIndex: 2,
        explanation: 'Zheng He’s voyages (1405–1433) took place decades before Columbus (1492), da Gama (1498) and Magellan’s expedition (1519–1522).',
      },
      {
        id: 'l4q3',
        prompt: 'Which was a major cause of Indigenous population decline in the Americas after 1492?',
        options: ['Volcanic eruptions', 'Epidemic diseases such as smallpox', 'A shortage of maize', 'Migration to Europe'],
        correctIndex: 1,
        explanation: 'Diseases to which Indigenous Americans had no prior exposure, combined with war and forced labour, caused catastrophic losses.',
      },
    ],
    worksheetId: 'ws-global',
    relatedEventIds: ['zheng-he', 'da-gama-calicut', 'columbus-voyage', 'european-contact', 'malacca-conquest', 'potosi', 'spanish-philippines'],
    sources: ['brit-zheng-he', 'brit-da-gama', 'brit-columbus', 'brit-potosi'],
  },

  /* ───────────────────────── Lesson 5 ───────────────────────── */
  {
    id: 'political-religious-change',
    number: 5,
    title: 'Political and Religious Change',
    subtitle: 'The Reformation, the press and the reshaping of power',
    minutes: 40,
    objectiveIds: ['obj-developments', 'obj-influence'],
    objectives: [
      'Explain the causes and beginning of the Protestant Reformation.',
      'Analyse the role of the printing press in spreading new ideas.',
      'Describe changes in political power in Europe and beyond.',
      'Evaluate the social and religious consequences of these changes.',
    ],
    introduction:
      'In 1517 a German monk challenged the practices of the most powerful institution in Western Europe. Within a few years his ideas — carried by printed pamphlets — had divided churches, families and states. At the same time, large empires and centralised monarchies were changing who held power across the world.',
    sections: [
      {
        id: 'reformation',
        heading: 'The Reformation',
        paragraphs: [
          'Martin Luther objected to the sale of indulgences — documents believed to reduce punishment for sins — and argued that salvation came through faith, with the Bible as the highest authority. His Ninety-five Theses (1517) were quickly printed and widely read.',
          'Other reformers, including Huldrych Zwingli in Zürich and John Calvin in Geneva, developed different Protestant traditions. In England, Henry VIII broke with the papacy in the 1530s for political as well as religious reasons.',
        ],
        quote: {
          text: 'Why does not the pope, whose wealth today is greater than the wealth of the richest Crassus, build this one basilica of St. Peter with his own money rather than with the money of poor believers?',
          attribution: 'Martin Luther, Ninety-five Theses, Thesis 86 (1517), English translation',
        },
        illustration: 'reformation-map',
        caption: 'Simplified pattern of religious majorities in Europe around 1600. In reality, many areas were mixed and boundaries changed.',
      },
      {
        id: 'press',
        heading: 'The printing press and the spread of ideas',
        paragraphs: [
          'Printing made Luther one of the most widely published authors of his age. Short pamphlets in German, illustrated woodcuts and vernacular Bibles reached people who could not read Latin — and were read aloud to those who could not read at all.',
          'The Catholic Church also used print, and from 1559 issued an Index of Prohibited Books. Print made it harder for any authority to control ideas completely.',
        ],
        keyPoints: [
          'Vernacular (everyday-language) texts reached wider audiences.',
          'Images spread messages to non-readers.',
          'Both reformers and their opponents used print.',
        ],
      },
      {
        id: 'power',
        heading: 'Changes in political power',
        paragraphs: [
          'In Europe, monarchs in Spain, France and England strengthened royal government, taxation and armies. Religious disputes fuelled wars, ending in compromises such as the Peace of Augsburg (1555) and the Peace of Westphalia (1648).',
          'Elsewhere, large empires such as the Ottoman, Safavid, Mughal and Ming states organised vast, diverse populations. Comparing them shows that strong, centralised states were a global — not only European — development.',
        ],
        illustration: 'power-shift',
        caption: 'Major land-based empires around 1600 (labels show approximate centres, not borders).',
      },
      {
        id: 'society',
        heading: 'Religious and social transformation',
        paragraphs: [
          'The Catholic Reformation (sometimes called the Counter-Reformation) included the Council of Trent (1545–1563) and new religious orders such as the Jesuits, who founded schools and sent missionaries to Asia, Africa and the Americas.',
          'Religious change affected marriage, education, literacy and charity. It also brought persecution, wars and the expulsion of religious minorities, showing that this period of change had serious human costs.',
        ],
      },
    ],
    vocabulary: [
      { term: 'Indulgence', definition: 'A grant from the Church believed to reduce punishment in the afterlife for sins.' },
      { term: 'Protestant', definition: 'A member of the Christian churches that separated from the Roman Catholic Church during the Reformation.' },
      { term: 'Vernacular', definition: 'The everyday language spoken by ordinary people, rather than Latin.' },
      { term: 'Pamphlet', definition: 'A short, cheap printed booklet.' },
      { term: 'Catholic Reformation', definition: 'Reform and renewal within the Catholic Church in response to Protestantism.' },
      { term: 'Sovereignty', definition: 'Supreme authority of a ruler or state over its territory.' },
    ],
    figures: [
      { name: 'Martin Luther', dates: '1483–1546', description: 'German theologian whose Ninety-five Theses began the Reformation.' },
      { name: 'John Calvin', dates: '1509–1564', description: 'French reformer based in Geneva; his ideas spread to Scotland, the Netherlands and beyond.' },
      { name: 'Ignatius of Loyola', dates: '1491–1556', description: 'Founder of the Society of Jesus (Jesuits).' },
      { name: 'Akbar', dates: 'r. 1556–1605', description: 'Mughal emperor who encouraged debate among religious scholars — a useful comparison with Europe.' },
    ],
    knowledgeCheck: [
      {
        id: 'l5q1',
        prompt: 'What practice did Luther criticise in his Ninety-five Theses?',
        options: ['The use of printing', 'The sale of indulgences', 'The study of Greek', 'The building of universities'],
        correctIndex: 1,
        explanation: 'Luther’s Theses challenged the sale of indulgences and the authority behind them.',
      },
      {
        id: 'l5q2',
        prompt: 'Why was printing important to the Reformation?',
        options: [
          'It allowed ideas to be copied and circulated quickly, including in vernacular languages.',
          'It was only used by the Catholic Church.',
          'It made all books illegal.',
          'It replaced preaching entirely.',
        ],
        correctIndex: 0,
        explanation: 'Printed pamphlets and Bibles in German and other vernaculars spread Reformation ideas rapidly.',
      },
      {
        id: 'l5q3',
        prompt: 'Which treaty (1648) ended the Thirty Years’ War?',
        options: ['Treaty of Tordesillas', 'Peace of Augsburg', 'Peace of Westphalia', 'Treaty of Versailles'],
        correctIndex: 2,
        explanation: 'The Peace of Westphalia (1648) ended the Thirty Years’ War.',
      },
    ],
    worksheetId: 'ws-change',
    relatedEventIds: ['reformation', 'westphalia', 'safavid-founding', 'akbar', 'suleiman'],
    sources: ['brit-reformation', 'brit-luther', 'brit-westphalia', 'brit-akbar'],
  },
];

export const lessonById = Object.fromEntries(lessons.map((l) => [l.id, l])) as Record<string, Lesson>;
