import type { DecisionTree } from '../types'
import { motorNotRunningSk } from './decisionTreeTranslations.sk'
import { withFallback } from '../lib/localize'

export const motorNotRunning: DecisionTree = {
  translations: { sk: motorNotRunningSk },
  id: 'motor-laeuft-nicht', title: 'Motor läuft nicht', start: 'has-vfd',
  nodes: {
    'has-vfd': { id: 'has-vfd', kind: 'question', title: 'Hat der Motor einen Frequenzumrichter?', help: 'Ein Frequenzumrichter hat meist ein Display und sitzt zwischen Versorgung und Motor.', options: [
      { label: 'Ja', next: 'vfd-fault' }, { label: 'Nein', next: 'motor-protection' }, { label: 'Weiß ich nicht', next: 'identify-vfd' }
    ]},
    'identify-vfd': { id: 'identify-vfd', kind: 'result', title: 'Frequenzumrichter identifizieren', actions: ['Prüfe das Elektroschema.', 'Suche nach einem Gerät mit Display zwischen Versorgung und Motor.', 'Ändere keine unbekannten Parameter.'], relatedArticles: [] },
    'vfd-fault': { id: 'vfd-fault', kind: 'question', title: 'Zeigt der Frequenzumrichter eine Störung?', options: [
      { label: 'Ja', next: 'record-vfd-fault' }, { label: 'Nein', next: 'vfd-ready' }, { label: 'Weiß ich nicht', next: 'inspect-vfd' }
    ]},
    'record-vfd-fault': { id: 'record-vfd-fault', kind: 'result', title: 'Fehlercode dokumentieren', actions: ['Notiere Fehlercode und Hersteller.', 'Prüfe die freigegebene Herstellerdokumentation.', 'Nutze die FU-Grundprüfung, sobald sie verfügbar ist.'], relatedArticles: [] },
    'inspect-vfd': { id: 'inspect-vfd', kind: 'result', title: 'Anzeige prüfen', actions: ['Prüfe Display und Status-LEDs.', 'Dokumentiere die Anzeige.', 'Verändere keine Parameter blind.'], relatedArticles: [] },
    'vfd-ready': { id: 'vfd-ready', kind: 'question', title: 'Ist der FU betriebsbereit?', options: [
      { label: 'Ja', next: 'vfd-start' }, { label: 'Nein', next: 'vfd-not-ready' }, { label: 'Weiß ich nicht', next: 'inspect-vfd' }
    ]},
    'vfd-start': { id: 'vfd-start', kind: 'question', title: 'Bekommt der FU einen Startbefehl?', options: [
      { label: 'Ja', next: 'check-motor' }, { label: 'Nein', next: 'check-control' }, { label: 'Weiß ich nicht', next: 'check-control' }
    ]},
    'vfd-not-ready': { id: 'vfd-not-ready', kind: 'result', title: 'FU-Grundbedingungen prüfen', actions: ['Prüfe Freigaben und Versorgung gemäß Schema.', 'Prüfe die freigegebene Dokumentation.', 'Keine Sicherheitsfunktionen überbrücken.'], relatedArticles: ['24-vdc-pruefen'] },
    'check-control': { id: 'check-control', kind: 'result', title: 'Steuerkreis prüfen', actions: ['Prüfe Startsignal und Freigaben gemäß Schema.', 'Prüfe SPS-Ausgang und Signalweg.', 'Keine Sicherheitskreise überbrücken.'], relatedArticles: ['24-vdc-pruefen'] },
    'motor-protection': { id: 'motor-protection', kind: 'question', title: 'Ist der Motorschutz ausgelöst?', options: [
      { label: 'Ja', next: 'protection-tripped' }, { label: 'Nein', next: 'contactor-pulls' }, { label: 'Weiß ich nicht', next: 'inspect-protection' }
    ]},
    'protection-tripped': { id: 'protection-tripped', kind: 'result', title: 'Ursache vor Reset prüfen', actions: ['Prüfe eine mechanische Blockade.', 'Prüfe Motor und Versorgung.', 'Nicht wiederholt ohne Ursachenprüfung zurücksetzen.'], relatedArticles: ['drehstrommotor-ausmessen'] },
    'inspect-protection': { id: 'inspect-protection', kind: 'result', title: 'Motorschutz identifizieren', actions: ['Prüfe Schema und Schaltschrankkennzeichnung.', 'Prüfe die sichtbare Auslöseanzeige.', 'Befolge betriebliche Vorgaben.'], relatedArticles: [] },
    'contactor-pulls': { id: 'contactor-pulls', kind: 'question', title: 'Zieht das Motorschütz an?', options: [
      { label: 'Ja', next: 'supply-after-contactor' }, { label: 'Nein', next: 'contactor-not-pulling' }, { label: 'Weiß ich nicht', next: 'contactor-not-pulling' }
    ]},
    'contactor-not-pulling': { id: 'contactor-not-pulling', kind: 'result', title: 'Schütz und Ansteuerung prüfen', actions: ['Prüfe A1 ↔ A2.', 'Prüfe den SPS-Ausgang und Steuerkreis.', 'Keine Sicherheitskreise überbrücken.'], relatedArticles: ['schuetz-pruefen','24-vdc-pruefen'] },
    'supply-after-contactor': { id: 'supply-after-contactor', kind: 'question', title: 'Ist die Versorgung hinter dem Schütz vollständig?', options: [
      { label: 'Vollständig', next: 'mechanically-free' }, { label: 'Eine Phase fehlt', next: 'phase-missing' }, { label: 'Keine Spannung', next: 'no-supply' }, { label: 'Weiß ich nicht', next: 'measure-supply' }
    ]},
    'phase-missing': { id: 'phase-missing', kind: 'result', title: 'Fehlende Phase eingrenzen', actions: ['Prüfe Schütz, Sicherung und Versorgung gemäß Schema.'], relatedArticles: ['schuetz-pruefen'] },
    'no-supply': { id: 'no-supply', kind: 'result', title: 'Versorgung vor dem Schütz prüfen', actions: ['Arbeite entlang des Schemas zurück.', 'Prüfe Schutzorgane und Einspeisung im erlaubten Arbeitsbereich.'], relatedArticles: ['schuetz-pruefen'] },
    'measure-supply': { id: 'measure-supply', kind: 'result', title: 'Versorgung fachgerecht messen', actions: ['Nutze das Schema und ein geeignetes Messgerät.', 'Führe nur Messungen im Rahmen deiner Berechtigung durch.'], relatedArticles: ['multimeter-bedienen','schuetz-pruefen'] },
    'mechanically-free': { id: 'mechanically-free', kind: 'question', title: 'Ist der Motor mechanisch frei?', options: [
      { label: 'Ja', next: 'check-motor' }, { label: 'Nein', next: 'mechanical-block' }, { label: 'Weiß ich nicht', next: 'inspect-mechanics' }
    ]},
    'mechanical-block': { id: 'mechanical-block', kind: 'result', title: 'Mechanische Blockade zuerst beheben', actions: ['Anlage sichern.', 'Mechanische Ursache gemäß betrieblicher Vorgabe beheben.', 'Motor erst danach elektrisch weiter prüfen.'], relatedArticles: [] },
    'inspect-mechanics': { id: 'inspect-mechanics', kind: 'result', title: 'Mechanik prüfen lassen', actions: ['Anlage sichern.', 'Kupplung, Getriebe und Last prüfen lassen.'], relatedArticles: [] },
    'check-motor': { id: 'check-motor', kind: 'result', title: 'Motor ausmessen', actions: ['Motor sicher freischalten.', 'Wicklungen vergleichen.', 'Versorgung und Mechanik in die Bewertung einbeziehen.'], relatedArticles: ['drehstrommotor-ausmessen'] }
  }
}

export const localizedDecisionTree = (tree: DecisionTree, locale: string): DecisionTree => {
  const translation = tree.translations?.[locale]
  if (!translation) return tree

  const nodes = Object.fromEntries(Object.entries(tree.nodes).map(([id, node]) => [
    id,
    { ...withFallback(node, translation.nodes?.[id]), id,
      options: node.options?.map((option, index) => ({
        ...option,
        label: withFallback(option.label, translation.nodes?.[id]?.options?.[index]?.label)
      }))
    }
  ]))

  return { ...tree, title: withFallback(tree.title, translation.title), nodes }
}

export function validateDecisionTree(tree: DecisionTree): string[] {
  const errors: string[] = []
  if (!tree.nodes[tree.start]) errors.push('Startknoten fehlt')
  Object.values(tree.nodes).forEach((node) => node.options?.forEach((option) => {
    if (!tree.nodes[option.next]) errors.push(`${node.id} verweist auf ${option.next}`)
  }))
  return errors
}
