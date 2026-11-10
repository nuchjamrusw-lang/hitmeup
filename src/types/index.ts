/**
 * Core domain types for ATLAS.
 * Content (historical data, lessons, worksheets) lives in /src/data and is
 * kept strictly separate from presentation components so it can later be
 * served from a backend / CMS without changing the UI.
 */

export type RegionId =
  | 'europe'
  | 'east-asia'
  | 'south-asia'
  | 'southeast-asia'
  | 'middle-east'
  | 'africa'
  | 'north-america'
  | 'central-america'
  | 'south-america';

/** Broad groups used on the timeline page. */
export type RegionGroup = 'Europe' | 'Asia' | 'Middle East' | 'Africa' | 'Americas';

export type EventCategory =
  | 'Politics & Empire'
  | 'Religion'
  | 'Science & Technology'
  | 'Art & Ideas'
  | 'Trade & Exploration'
  | 'Society & Health';

/** How a political unit should be labelled. Avoids implying modern nation-states. */
export type PolityType =
  | 'Empire'
  | 'Kingdom'
  | 'Dynasty'
  | 'City-state'
  | 'Republic'
  | 'Sultanate'
  | 'Confederation'
  | 'Colonial territory'
  | 'Trading network'
  | 'Church state'
  | 'Society';

export interface GeoPoint {
  lat: number;
  lon: number;
}

export interface EventLocation extends GeoPoint {
  /** Historical place name, e.g. "Constantinople". */
  name: string;
  /** Modern geographic reference, for orientation only. */
  modernReference: string;
}

export interface HistoricalEvent {
  id: string;
  title: string;
  /** Start year (used for filtering). */
  year: number;
  /** End year for events spanning a period. */
  endYear?: number;
  /** True when the date is approximate (c. / decade / century). */
  approximate: boolean;
  /** Human-readable date as it should be displayed, e.g. "c. 1450" or "1347–1351". */
  dateLabel: string;
  region: RegionId;
  location: EventLocation;
  category: EventCategory;
  summary: string;
  historicalSignificance: string;
  relatedPeople: string[];
  relatedPolities: string[];
  /** Ids into the references list (data/sources.ts). */
  sources: string[];
}

export interface Polity {
  name: string;
  type: PolityType;
  from: number;
  to: number;
  note: string;
}

export interface HistoricalPerson {
  name: string;
  /** Display-ready life or reign dates. */
  dates: string;
  /** Years used to decide whether the person is relevant to the selected year. */
  activeFrom: number;
  activeTo: number;
  role: string;
}

export type DevelopmentDomain = 'Art' | 'Science' | 'Trade' | 'Culture';

export interface Development {
  domain: DevelopmentDomain;
  from: number;
  to: number;
  text: string;
}

export interface RegionEra {
  from: number;
  to: number;
  overview: string;
}

export interface Region {
  id: RegionId;
  name: string;
  group: RegionGroup;
  center: GeoPoint;
  /** Modern places this region roughly covers – navigation aid only. */
  modernScope: string;
  eras: RegionEra[];
  polities: Polity[];
  people: HistoricalPerson[];
  developments: Development[];
}

export interface Source {
  id: string;
  title: string;
  publisher: string;
  url: string;
}

export interface PeriodMarker {
  year: number;
  label: string;
}

/* ---------------- Lessons ---------------- */

export type IllustrationId =
  | 'medieval-renaissance'
  | 'italian-city-states'
  | 'humanism'
  | 'linear-perspective'
  | 'patronage'
  | 'dome'
  | 'heliocentric'
  | 'printing-spread'
  | 'anatomy'
  | 'trade-routes'
  | 'columbian-exchange'
  | 'reformation-map'
  | 'power-shift';

export interface LessonSection {
  id: string;
  heading: string;
  paragraphs: string[];
  keyPoints?: string[];
  illustration?: IllustrationId;
  caption?: string;
  /** A short primary-source extract. Only well-attested quotations are used. */
  quote?: { text: string; attribution: string };
}

export interface VocabularyTerm {
  term: string;
  definition: string;
}

export interface KeyFigure {
  name: string;
  dates: string;
  description: string;
}

export interface McQuestion {
  id: string;
  prompt: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export type InteractiveModule = 'printing-press' | 'perspective-explorer';

export interface Lesson {
  id: string;
  number: number;
  title: string;
  subtitle: string;
  minutes: number;
  /** Ids of unit objectives (data/objectives.ts) this lesson contributes to. */
  objectiveIds: string[];
  objectives: string[];
  introduction: string;
  sections: LessonSection[];
  interactive?: InteractiveModule;
  vocabulary: VocabularyTerm[];
  figures: KeyFigure[];
  knowledgeCheck: McQuestion[];
  worksheetId?: string;
  relatedEventIds: string[];
  sources: string[];
}

export interface UnitObjective {
  id: string;
  title: string;
  description: string;
}

/* ---------------- Worksheets ---------------- */

interface QuestionBase {
  id: string;
  prompt: string;
  instructions?: string;
  explanation: string;
  points: number;
}

export interface MultipleChoiceQ extends QuestionBase {
  type: 'multiple-choice';
  options: string[];
  correctIndex: number;
}

export interface MultiSelectQ extends QuestionBase {
  type: 'multi-select';
  options: string[];
  correctIndices: number[];
  /** Optional written explanation box shown under the selection. */
  followUp?: string;
}

export interface TrueFalseQ extends QuestionBase {
  type: 'true-false';
  answer: boolean;
}

export interface MatchingQ extends QuestionBase {
  type: 'matching';
  pairs: { left: string; right: string }[];
}

export interface DragDropQ extends QuestionBase {
  type: 'drag-drop';
  categories: string[];
  items: { label: string; category: string }[];
}

export interface OrderingQ extends QuestionBase {
  type: 'ordering';
  /** Items in the CORRECT order; the UI shuffles them. */
  items: { label: string; detail: string }[];
}

export interface ShortAnswerQ extends QuestionBase {
  type: 'short-answer';
  guidance: string;
  minWords?: number;
}

export interface SourceAnalysisQ extends QuestionBase {
  type: 'source-analysis';
  source: { illustration: 'printing-shop' | 'copernicus-diagram'; title: string; caption: string; credit: string };
  parts: { id: string; label: string; guidance: string }[];
}

export interface MapQ extends QuestionBase {
  type: 'map';
  /** The region the student must locate. */
  correctRegion: RegionId;
}

export type WorksheetQuestion =
  | MultipleChoiceQ
  | MultiSelectQ
  | TrueFalseQ
  | MatchingQ
  | DragDropQ
  | OrderingQ
  | ShortAnswerQ
  | SourceAnalysisQ
  | MapQ;

export interface Worksheet {
  id: string;
  title: string;
  description: string;
  lessonId?: string;
  minutes: number;
  questions: WorksheetQuestion[];
}

/* ---------------- Progress ---------------- */

/** Answer payloads per question type. Kept loose so the store can serialise them. */
export type AnswerValue =
  | number // multiple choice index
  | number[] // multi-select indices
  | boolean // true/false
  | Record<string, string> // matching (left->right), drag-drop (item->category), source parts
  | string[] // ordering
  | string // short answer, map region id
  | { selected: number[]; text: string }; // multi-select with follow-up

export interface WorksheetAttempt {
  worksheetId: string;
  answers: Record<string, AnswerValue>;
  submitted: boolean;
  submittedAt?: string;
  /** Score for auto-graded questions only. */
  score?: number;
  maxScore?: number;
  /** Per-question correctness (auto-graded only; undefined = teacher-reviewed). */
  results?: Record<string, boolean | null>;
}

export type ActivityKind =
  | 'lesson-started'
  | 'lesson-completed'
  | 'check-completed'
  | 'worksheet-submitted'
  | 'region-explored'
  | 'model-explored';

export interface ActivityEntry {
  id: string;
  kind: ActivityKind;
  label: string;
  at: string;
  detail?: string;
}

export interface LessonProgress {
  started: boolean;
  completed: boolean;
  sectionsRead: string[];
  checkAnswers?: Record<string, number>;
  checkScore?: number;
  completedAt?: string;
}

export interface StudentProgress {
  version: 1;
  studentName: string;
  lessons: Record<string, LessonProgress>;
  worksheets: Record<string, WorksheetAttempt>;
  regionsExplored: RegionId[];
  pressStepsViewed: number[];
  activity: ActivityEntry[];
  lastLessonId?: string;
}
