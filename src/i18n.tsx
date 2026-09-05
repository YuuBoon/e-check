import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { readPreference, writePreference } from './lib/storage'

export const SUPPORTED_LOCALES = [
  { id: 'de-CH', shortLabel: 'DE', name: 'Deutsch (Schweiz)' },
  { id: 'sk', shortLabel: 'SK', name: 'Slovenčina' }
] as const

export type Locale = typeof SUPPORTED_LOCALES[number]['id']

type Messages = typeof deCH
export type MessageKey = keyof Messages

const deCH = {
  skipToContent: 'Zum Inhalt',
  mainNavigation: 'Hauptnavigation',
  back: 'Zurück',
  home: 'Home',
  topics: 'Themen',
  fault: 'Störung',
  basics: 'Grundlagen',
  maintenanceOffline: 'Instandhaltung · Offline bereit',
  searchQuestion: 'Was möchtest du prüfen?',
  searchPlaceholder: 'Motor, Sensor, 24 V, Schütz …',
  clearSearch: 'Suche leeren',
  nothingFound: 'Nichts gefunden',
  searchHint: 'Versuche einen Bauteilnamen, ein Symptom oder eine Klemmenbezeichnung.',
  frequentlyUsed: 'Häufig gebraucht',
  directToCheck: 'Direkt zum Prüfschritt',
  faultQuestion: 'Störung?',
  narrowDownStepwise: 'Schritt für Schritt eingrenzen',
  guidedTroubleshooting: 'Geführte Fehlersuche',
  comingSoon: 'folgt',
  knowledgeLibrary: 'Wissensbibliothek',
  article: 'Artikel',
  prepared: 'Vorbereitet',
  categoryPrepared: 'Kategorie ist vorbereitet',
  contentNextVersion: 'Inhalte folgen mit einer neuen Appversion.',
  quickReference: 'Schnell nachschlagen',
  openArticle: 'Artikel öffnen',
  oneQuestionPerStep: 'Eine Frage pro Schritt. Du kannst jederzeit zurückgehen oder neu starten.',
  startTroubleshooting: 'Fehlersuche starten',
  moreTreesComing: 'Weitere Störungsbäume für Sensoren, Schütze und SPS-Signale folgen.',
  problem: 'Problem',
  youNeed: 'Du brauchst',
  check: 'Prüfen',
  measurement: 'Messung',
  expectation: 'Erwartung',
  interpretation: 'Interpretation',
  nextStep: 'Nächster Schritt',
  images: 'Bilder',
  closeImage: 'Bild schliessen',
  result: 'Ergebnis',
  checkNext: 'Danach prüfen',
  articleNotFound: 'Artikel nicht gefunden',
  step: 'Schritt',
  checkQuestion: 'Prüffrage',
  nextUsefulStep: 'Nächster sinnvoller Schritt',
  matchingArticles: 'Passende Artikel',
  restart: 'Neu starten',
  invalidFaultStep: 'Dieser Schritt ist nicht verfügbar. Starte die Störungssuche neu.',
  updateAvailable: 'Neue E-Check-Version verfügbar',
  updateDescription: 'Aktualisiere, sobald es für deinen Einsatz passt.',
  later: 'Später',
  updateNow: 'Aktualisieren',
  beforeStart: 'Vor dem Start',
  workSafely: 'Sicher arbeiten',
  understood: 'Verstanden',
  language: 'Sprache',
  motorNotRunning: 'Motor läuft nicht',
  sensorNotSwitching: 'Sensor schaltet nicht',
  contactorNotPulling: 'Schütz zieht nicht an',
  plcNoSignal: 'SPS bekommt kein Signal',
  schema: 'Schema',
  safetyNotes: 'Sicherheitshinweise',
  hints: 'Hinweise',
  appVersion: 'App-Version',
  contentVersion: 'Inhaltsstand',
  safetyNotice: 'E-Check ist eine Arbeitshilfe. Führe nur Arbeiten und Messungen durch, für die du betrieblich berechtigt und qualifiziert bist. Geltende Sicherheits- und Arbeitsanweisungen haben immer Vorrang.'
} as const

const sk: Record<MessageKey, string> = {
  skipToContent: 'Prejsť na obsah',
  mainNavigation: 'Hlavná navigácia',
  back: 'Späť',
  home: 'Domov',
  topics: 'Témy',
  fault: 'Porucha',
  basics: 'Základy',
  maintenanceOffline: 'Údržba · Pripravené offline',
  searchQuestion: 'Čo chceš skontrolovať?',
  searchPlaceholder: 'Motor, snímač, 24 V, stýkač …',
  clearSearch: 'Vymazať vyhľadávanie',
  nothingFound: 'Nič sa nenašlo',
  searchHint: 'Skús názov komponentu, príznak alebo označenie svorky.',
  frequentlyUsed: 'Často používané',
  directToCheck: 'Priamo ku kontrolnému kroku',
  faultQuestion: 'Porucha?',
  narrowDownStepwise: 'Postupné zúženie príčiny',
  guidedTroubleshooting: 'Riadené hľadanie poruchy',
  comingSoon: 'pripravuje sa',
  knowledgeLibrary: 'Knižnica znalostí',
  article: 'Článok',
  prepared: 'Pripravené',
  categoryPrepared: 'Kategória je pripravená',
  contentNextVersion: 'Obsah pribudne v ďalšej verzii aplikácie.',
  quickReference: 'Rýchly prehľad',
  openArticle: 'Otvoriť článok',
  oneQuestionPerStep: 'Jedna otázka v každom kroku. Kedykoľvek sa môžeš vrátiť alebo začať odznova.',
  startTroubleshooting: 'Spustiť hľadanie poruchy',
  moreTreesComing: 'Ďalšie postupy pre snímače, stýkače a signály PLC sa pripravujú.',
  problem: 'Problém',
  youNeed: 'Potrebuješ',
  check: 'Kontrola',
  measurement: 'Meranie',
  expectation: 'Očakávanie',
  interpretation: 'Vyhodnotenie',
  nextStep: 'Ďalší krok',
  images: 'Obrázky',
  closeImage: 'Zavrieť obrázok',
  result: 'Výsledok',
  checkNext: 'Ďalej skontroluj',
  articleNotFound: 'Článok sa nenašiel',
  step: 'Krok',
  checkQuestion: 'Kontrolná otázka',
  nextUsefulStep: 'Ďalší vhodný krok',
  matchingArticles: 'Súvisiace články',
  restart: 'Začať odznova',
  invalidFaultStep: 'Tento krok nie je dostupný. Spusti hľadanie poruchy odznova.',
  updateAvailable: 'Je dostupná nová verzia E-Check',
  updateDescription: 'Aktualizuj, keď je to vhodné pre tvoju prácu.',
  later: 'Neskôr',
  updateNow: 'Aktualizovať',
  beforeStart: 'Pred začiatkom',
  workSafely: 'Pracuj bezpečne',
  understood: 'Rozumiem',
  language: 'Jazyk',
  motorNotRunning: 'Motor nebeží',
  sensorNotSwitching: 'Snímač nespína',
  contactorNotPulling: 'Stýkač nezopne',
  plcNoSignal: 'PLC neprijíma signál',
  schema: 'Schéma',
  safetyNotes: 'Bezpečnostné upozornenia',
  hints: 'Pokyny',
  appVersion: 'Verzia aplikácie',
  contentVersion: 'Verzia obsahu',
  safetyNotice: 'E-Check je pracovná pomôcka. Vykonávaj iba práce a merania, na ktoré máš kvalifikáciu a prevádzkové oprávnenie. Platné bezpečnostné a pracovné pokyny majú vždy prednosť.'
}

const messages: Record<Locale, Record<MessageKey, string>> = { 'de-CH': deCH, sk }

const categoryLabels: Record<Locale, Record<string, string>> = {
  'de-CH': {},
  sk: {
    'Messen & Grundlagen': 'Meranie a základy',
    'Motoren & Verbraucher': 'Motory a spotrebiče',
    Sensorik: 'Snímače',
    Schaltgeräte: 'Spínacie prístroje',
    'SPS & Steuerung': 'PLC a riadenie',
    Frequenzumrichter: 'Frekvenčné meniče',
    Elektroschema: 'Elektrická schéma',
    Anlagenspezifisch: 'Špecifické pre zariadenie'
  }
}

export const getMessage = (locale: string, key: MessageKey) => messages[locale as Locale]?.[key] ?? deCH[key]
export const getCategoryLabel = (locale: string, category: string) => categoryLabels[locale as Locale]?.[category] ?? category

const basicLabels: Record<Locale, Record<string, string>> = {
  'de-CH': {},
  sk: {
    Spannung: 'Napätie', Widerstand: 'Odpor', Durchgang: 'Priechodnosť',
    Multimeter: 'Multimeter', Schütz: 'Stýkač', Relais: 'Relé', Sicherung: 'Poistka',
    Motorschutz: 'Ochrana motora', 'SPS-Eingang': 'Vstup PLC', 'SPS-Ausgang': 'Výstup PLC'
  }
}

export const getBasicLabel = (locale: string, basic: string) => basicLabels[locale as Locale]?.[basic] ?? basic
export const getArticleCountLabel = (locale: string, count: number) => {
  if (locale !== 'sk') return `${count} Artikel`
  if (count === 1) return '1 článok'
  if (count >= 2 && count <= 4) return `${count} články`
  return `${count} článkov`
}

interface I18nValue {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: (key: MessageKey) => string
  categoryLabel: (category: string) => string
  basicLabel: (basic: string) => string
  articleCountLabel: (count: number) => string
}

const I18nContext = createContext<I18nValue | null>(null)

const isSupportedLocale = (value: string | null): value is Locale => SUPPORTED_LOCALES.some((locale) => locale.id === value)
const getInitialLocale = (): Locale => {
  const stored = readPreference('locale', 'echeck-locale')
  return isSupportedLocale(stored) ? stored : 'de-CH'
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>(getInitialLocale)

  useEffect(() => {
    writePreference('locale', locale, 'echeck-locale')
    document.documentElement.lang = locale
  }, [locale])

  const value = useMemo<I18nValue>(() => ({
    locale,
    setLocale,
    t: (key) => getMessage(locale, key),
    categoryLabel: (category) => getCategoryLabel(locale, category),
    basicLabel: (basic) => getBasicLabel(locale, basic),
    articleCountLabel: (count) => getArticleCountLabel(locale, count)
  }), [locale])

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n() {
  const value = useContext(I18nContext)
  if (!value) throw new Error('useI18n must be used inside I18nProvider')
  return value
}
