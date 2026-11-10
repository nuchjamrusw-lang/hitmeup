/**
 * Content for the interactive Gutenberg-style printing press.
 * The 3D model is a simplified reconstruction of a 15th–16th-century
 * wooden hand press, based on general descriptions; Gutenberg's own press
 * does not survive.
 */
export type PressPartId = 'frame' | 'screw' | 'bar' | 'platen' | 'forme' | 'tympan' | 'carriage' | 'inkballs' | 'typecase';

export interface PressPart {
  id: PressPartId;
  name: string;
  short: string;
  detail: string;
  /** Hotspot position in scene units. */
  anchor: [number, number, number];
}

export const pressParts: PressPart[] = [
  {
    id: 'frame',
    name: 'Frame (cheeks and head)',
    short: 'The heavy wooden structure',
    detail:
      'Two upright timbers, called cheeks, were joined by a cross-beam known as the head. The frame had to resist the force of every pull, so presses were often braced against the ceiling of the workshop.',
    anchor: [-0.6, 1.75, 0.12],
  },
  {
    id: 'screw',
    name: 'Screw',
    short: 'Turns rotation into pressure',
    detail:
      'A large screw passing through the head converted the turning of the bar into strong downward pressure. The idea was adapted from screw presses already used for pressing grapes, olives and paper.',
    anchor: [0.12, 1.62, 0.1],
  },
  {
    id: 'bar',
    name: 'Bar (handle)',
    short: 'Pulled by the pressman',
    detail:
      'The pressman pulled the bar towards himself, turning the screw a short distance. It was physically demanding work repeated hundreds of times a day.',
    anchor: [0.75, 1.42, 0.35],
  },
  {
    id: 'platen',
    name: 'Platen',
    short: 'Presses the paper onto the type',
    detail:
      'A flat block hanging beneath the screw. When lowered, it pressed the paper evenly onto the inked type. On many early hand presses the platen covered only half the forme, so each side of a sheet needed two pulls.',
    anchor: [0.38, 1.2, 0.0],
  },
  {
    id: 'forme',
    name: 'Forme (type in a chase)',
    short: 'The page of metal letters',
    detail:
      'Individual metal letters, cast in a hand mould from an alloy of lead, tin and antimony, were arranged into pages and locked tightly into an iron frame called a chase. The letters are mirror images of the printed text.',
    anchor: [-0.25, 0.98, 0.95],
  },
  {
    id: 'tympan',
    name: 'Tympan and frisket',
    short: 'Hinged frames that hold the paper',
    detail:
      'A sheet of dampened paper was fixed to the parchment-covered tympan. The frisket, a second frame folded over it, masked the margins so that only the type printed. Both then folded down onto the forme.',
    anchor: [0.3, 1.35, 1.38],
  },
  {
    id: 'carriage',
    name: 'Carriage, rails and rounce',
    short: 'Moves the forme in and out',
    detail:
      'The forme sat on a bed that slid along rails. Turning a handle called the rounce wound the bed under the platen for printing and out again to remove the sheet.',
    anchor: [0.58, 0.86, 0.75],
  },
  {
    id: 'inkballs',
    name: 'Ink balls',
    short: 'Used to ink the type',
    detail:
      'Leather pads stuffed with wool or horsehair, mounted on wooden handles. A worker dabbed thick, oil-based ink evenly onto the type before every impression. Oil-based ink stuck to metal type better than the water-based inks used for woodblocks.',
    anchor: [1.25, 1.12, 0.6],
  },
  {
    id: 'typecase',
    name: 'Type case and composing stick',
    short: 'Where the text was assembled',
    detail:
      'The compositor picked letters one by one from compartments in the type case and set them line by line in a hand-held composing stick. After printing, the type was cleaned and returned to the case for reuse.',
    anchor: [-1.3, 1.25, 0.55],
  },
];

export interface PressStep {
  title: string;
  text: string;
  focus: PressPartId[];
  /** Animation targets. */
  pose: { carriage: number; tympan: number; platen: number; bar: number; ink: number; sheet: number };
}

const OUT = 0.85;
export const pressSteps: PressStep[] = [
  {
    title: 'Set the type',
    text: 'The compositor reads the manuscript and picks metal letters from the type case, placing them line by line — backwards, as a mirror image — in a composing stick.',
    focus: ['typecase'],
    pose: { carriage: OUT, tympan: 1.9, platen: 0, bar: 0, ink: 0, sheet: 0 },
  },
  {
    title: 'Lock up the forme',
    text: 'Finished lines are arranged into pages and locked tightly into an iron chase. The forme is placed on the bed of the press.',
    focus: ['forme', 'carriage'],
    pose: { carriage: OUT, tympan: 1.9, platen: 0, bar: 0, ink: 0, sheet: 0 },
  },
  {
    title: 'Ink the type',
    text: 'Using two ink balls, a worker dabs sticky, oil-based ink evenly across the surface of the type.',
    focus: ['inkballs', 'forme'],
    pose: { carriage: OUT, tympan: 1.9, platen: 0, bar: 0, ink: 1, sheet: 0 },
  },
  {
    title: 'Load the paper',
    text: 'A sheet of dampened paper is fixed to the tympan. The frisket folds over it to protect the margins, and both fold down onto the inked type.',
    focus: ['tympan'],
    pose: { carriage: OUT, tympan: 0, platen: 0, bar: 0, ink: 0, sheet: 1 },
  },
  {
    title: 'Roll in and pull',
    text: 'The rounce winds the bed under the platen. The pressman pulls the bar, turning the screw so that the platen presses paper firmly onto the type.',
    focus: ['carriage', 'bar', 'screw', 'platen'],
    pose: { carriage: 0, tympan: 0, platen: 1, bar: 1, ink: 0, sheet: 1 },
  },
  {
    title: 'Release and dry',
    text: 'The bar is released, the bed rolled out and the tympan lifted. The printed sheet is hung up to dry — and the cycle repeats for every copy.',
    focus: ['tympan', 'frame'],
    pose: { carriage: OUT, tympan: 1.9, platen: 0, bar: 0, ink: 0, sheet: 2 },
  },
];
