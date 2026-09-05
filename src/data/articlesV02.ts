import type { Article } from '../types'
import { CONTENT_VERSION } from './meta'

const base = (article: Omit<Article, 'contentVersion' | 'images'> & { images?: Article['images'] }): Article => ({
  ...article,
  contentVersion: CONTENT_VERSION,
  images: article.images ?? []
})

export const articlesV02: Article[] = [
  base({
    id: '230-vac-pruefen', title: '230 V AC prüfen', category: 'Messen & Grundlagen',
    description: 'Eine 230-V-AC-Versorgung entlang des Stromwegs systematisch eingrenzen.',
    problem: 'Ein einphasiger Verbraucher erhält keine oder eine unplausible Versorgung.',
    symptoms: ['230 V fehlt', 'Verbraucher ohne Funktion', 'Sicherung ausgelöst'],
    keywords: ['230v','230 vac','wechselspannung','phase','neutralleiter','l n','versorgung'],
    synonyms: ['netzspannung','wechselstrom prüfen'], manufacturers: [], tools: ['Geeignetes Multimeter', 'Elektroschema'],
    quickCheck: ['Messart VAC wählen', 'Erwarteten Messpunkt im Schema bestimmen', 'Versorgung abschnittsweise verfolgen'],
    safetyNotes: ['Messungen an Netzspannung nur im Rahmen der betrieblichen Berechtigung durchführen.'],
    steps: [
      { title: 'Messung vorbereiten', instruction: 'Prüfe Messgerät, Messleitungen, Messkategorie und erwartete Spannung. Wähle V AC.', measurement: 'V AC', interpretation: 'Messart und Ausrüstung müssen zur Anlage passen.' },
      { title: 'Versorgung verfolgen', instruction: 'Verfolge den Stromweg gemäß Schema von der Einspeisung über Schutz, Klemmen und Schaltgerät zum Verbraucher.', measurement: 'V AC an freigegebenen Messpunkten', expected: 'Plausibler Wert gemäß Schema', interpretation: 'Die erste Abweichung grenzt den betroffenen Abschnitt ein.' },
      { title: 'Unter Last vergleichen', instruction: 'Vergleiche die Versorgung am Verbraucher im erwarteten Betriebszustand.', warning: 'Keine Schutz- oder Safety-Funktion überbrücken.', nextStep: 'Bei Abweichung den davorliegenden Abschnitt prüfen.' }
    ],
    results: [
      { status: 'ok', condition: 'Versorgung plausibel', explanation: 'Verbraucher und Ansteuerung weiter prüfen.' },
      { status: 'warning', condition: 'Spannung fehlt', explanation: 'Stromweg bis zur letzten plausiblen Messstelle zurückverfolgen.' }
    ], relatedArticles: ['multimeter-bedienen','sicherung-leitungsschutz-pruefen','elektroschema-stoerung-suchen']
  }),
  base({
    id: '400-v-drehstrom-pruefen', title: '400 V Drehstrom prüfen', category: 'Messen & Grundlagen',
    description: 'Drei Aussenleiterspannungen vergleichen und einen möglichen Phasenausfall eingrenzen.',
    symptoms: ['Motor startet nicht', 'Motor brummt', 'Eine Phase fehlt', 'Motorschutz löst aus'],
    keywords: ['400v','400 vac','drehstrom','l1 l2','l2 l3','l1 l3','phase','phasenausfall'],
    synonyms: ['dreiphasenversorgung','kraftstrom'], manufacturers: [], tools: ['Geeignetes Multimeter', 'Elektroschema'],
    quickCheck: ['V AC wählen', 'L1-L2, L2-L3 und L1-L3 messen', 'Werte vergleichen'],
    safetyNotes: ['Messungen an Drehstrom nur im Rahmen der betrieblichen Berechtigung durchführen.'],
    steps: [
      { title: 'Messpunkte festlegen', instruction: 'Identifiziere L1, L2 und L3 anhand von Schema und Kennzeichnung.', warning: 'Nicht nur anhand von Kabelfarben entscheiden.' },
      { title: 'Aussenleiterspannungen messen', instruction: 'Miss L1-L2, L2-L3 und L1-L3 mit V AC.', measurement: 'L1-L2 · L2-L3 · L1-L3', expected: 'Drei zueinander plausible Werte gemäß Anlage', interpretation: 'Eine deutliche Abweichung kann auf einen Phasenausfall oder Kontaktfehler hinweisen.' },
      { title: 'Stromweg eingrenzen', instruction: 'Vergleiche die drei Messungen vor und nach Schutz- und Schaltgeräten.', warning: 'Die Drehrichtung lässt sich aus dieser Spannungsmessung nicht ableiten.', nextStep: 'Auffälligen Abschnitt gemäß Schema prüfen.' }
    ],
    results: [
      { status: 'ok', condition: 'Drei plausible Werte', explanation: 'Versorgung wirkt vollständig; Motor, Last und Ansteuerung weiter prüfen.' },
      { status: 'warning', condition: 'Ein Wertepaar weicht ab', explanation: 'Möglichen Phasenausfall entlang des Stromwegs eingrenzen.' }
    ], relatedArticles: ['multimeter-bedienen','drehstrommotor-ausmessen','motorschutz-pruefen']
  }),
  base({
    id: 'motorschutz-pruefen', title: 'Motorschutz prüfen', category: 'Schaltgeräte',
    description: 'Auslösung erkennen, Ursache suchen und Motordaten korrekt zuordnen.',
    symptoms: ['Motorschutz ausgelöst', 'Motor startet nicht', 'Motorschutz löst erneut aus'],
    keywords: ['motorschutz','überlastrelais','ausgelöst','reset','motorstrom','einstellwert'],
    synonyms: ['motorschutzschalter','motor protection'], manufacturers: [], tools: ['Elektroschema', 'Motordaten'],
    quickCheck: ['Auslöseanzeige prüfen', 'Ursache vor Reset suchen', 'Einstellung nur mit gültigen Motordaten beurteilen'],
    safetyNotes: ['Nicht wiederholt ohne Ursachenprüfung zurückstellen.'],
    steps: [
      { title: 'Auslösung feststellen', instruction: 'Prüfe Anzeige, Schaltstellung und Kennzeichnung des Motorschutzes.' },
      { title: 'Ursache eingrenzen', instruction: 'Prüfe mechanische Blockierung, Phasenausfall, Motor und Leitung gemäß Schema.', interpretation: 'Die Auslösung ist ein Symptom; zuerst die Ursache bestimmen.' },
      { title: 'Einstellung beurteilen', instruction: 'Vergleiche den eingestellten Strom nur mit gültigen Motordaten, Schaltung und Schema.', warning: 'Keine Einstellwerte raten oder eigenmächtig erhöhen.', nextStep: 'Erst nach freigegebener Ursachenbehebung zurückstellen.' }
    ],
    results: [
      { status: 'warning', condition: 'Ausgelöst', explanation: 'Ursache dokumentieren und vor dem Rückstellen beheben.' },
      { status: 'danger', condition: 'Wiederholte Auslösung', explanation: 'Nicht weiter zurückstellen; Fachprüfung veranlassen.' }
    ], relatedArticles: ['400-v-drehstrom-pruefen','drehstrommotor-ausmessen']
  }),
  base({
    id: 'relais-pruefen', title: 'Relais prüfen', category: 'Schaltgeräte',
    description: 'Spule, A1/A2 sowie Öffner- und Schliesserkontakte systematisch prüfen.',
    symptoms: ['Relais zieht nicht', 'Kontakt schaltet nicht', 'Signal kommt nicht weiter'],
    keywords: ['relais','a1 a2','spule','öffner','schliesser','kontakt','steuerkreis'],
    synonyms: ['hilfsrelais','koppelrelais','relay'], manufacturers: [], tools: ['Multimeter', 'Elektroschema'],
    quickCheck: ['Spulenspannung lesen', 'A1/A2 prüfen', 'Kontakte spannungsfrei prüfen'],
    steps: [
      { title: 'Relais identifizieren', instruction: 'Prüfe Spulenspannung, A1/A2 und Kontaktbezeichnungen anhand von Gerät und Schema.' },
      { title: 'Ansteuerung prüfen', instruction: 'Miss die passende Spannung an A1/A2, wenn das Relais anziehen soll.', measurement: 'A1 ↔ A2', expected: 'Nennspannung gemäß Beschriftung oder Schema', interpretation: 'Spannung vorhanden, aber kein Schalten: Spule oder Mechanik prüfen.' },
      { title: 'Kontakte prüfen', instruction: 'Prüfe Öffner und Schliesser im spannungsfreien Zustand und vergleiche betätigt/unbetätigt.', warning: 'Durchgang und Widerstand nur spannungsfrei messen. Kein universeller Spulenwiderstand.', nextStep: 'Signalweg vor oder nach dem Relais weiterverfolgen.' }
    ],
    results: [
      { status: 'ok', condition: 'Relais und Kontakte schalten', explanation: 'Nachfolgenden Signalweg prüfen.' },
      { status: 'warning', condition: 'Spannung vorhanden, Relais schaltet nicht', explanation: 'Spule, Sockel und Mechanik prüfen.' }
    ], relatedArticles: ['24-vdc-pruefen','230-vac-pruefen','schuetz-pruefen']
  }),
  base({
    id: 'kapazitiven-sensor-pruefen', title: 'Kapazitiven Sensor prüfen', category: 'Sensorik',
    description: 'Versorgung, Erfassung, Einbausituation und Signalweg eines kapazitiven Sensors prüfen.',
    symptoms: ['Sensor schaltet nicht', 'Sensor schaltet unzuverlässig', 'SPS erkennt Signal nicht'],
    keywords: ['kapazitiver sensor','sensor','medium','abstand','verschmutzung','led','sps signal'],
    synonyms: ['kapazitiver näherungsschalter','capacitive sensor'], manufacturers: ['SICK','IFM','Baumer'], tools: ['Multimeter', 'Passendes Prüfobjekt oder Medium'],
    quickCheck: ['Versorgung prüfen', 'LED mit realem Objekt vergleichen', 'Abstand und Verschmutzung prüfen'],
    steps: [
      { title: 'Einbau ansehen', instruction: 'Prüfe Sensorfläche, Kabel, Stecker, Abstand, Verschmutzung und Einbausituation.' },
      { title: 'Versorgung prüfen', instruction: 'Prüfe die Versorgung gemäß Schema und Typenschild.', measurement: 'Versorgung am Sensor', expected: 'Plausibel gemäß Beschriftung oder Schema' },
      { title: 'Erfassung vergleichen', instruction: 'Beobachte LED und Ausgang mit und ohne vorgesehenes Objekt oder Medium.', interpretation: 'LED schaltet, SPS nicht: Leitung, Klemme und SPS-Eingang prüfen.', warning: 'Bestehende Einstellung nicht blind verändern.', nextStep: 'Signalweg bis zum SPS-Eingang verfolgen.' }
    ],
    results: [
      { status: 'ok', condition: 'LED und SPS-Signal reagieren', explanation: 'Sensor und Signalweg funktionieren grundsätzlich.' },
      { status: 'warning', condition: 'Reaktion instabil', explanation: 'Abstand, Medium, Verschmutzung und Einbau prüfen.' }
    ], relatedArticles: ['24-vdc-pruefen','sps-eingang-pruefen','sensor-oeffner-schliesser']
  }),
  base({
    id: 'lichtschranke-pruefen', title: 'Lichtschranke prüfen', category: 'Sensorik',
    description: 'Versorgung, Optik, Ausrichtung und Ausgang einer Lichtschranke eingrenzen.',
    symptoms: ['Lichtschranke schaltet nicht', 'Strahl unterbrochen', 'SPS erkennt Signal nicht'],
    keywords: ['lichtschranke','einweg','reflex','taster','reflektor','ausrichtung','optik','sps eingang'],
    synonyms: ['lichttaster','photoelektrischer sensor'], manufacturers: ['SICK','IFM','Baumer'], tools: ['Multimeter', 'Reinigung nach Betriebsvorgabe'],
    quickCheck: ['Bauart erkennen', 'Optik reinigen und ausrichten', 'LED und SPS-Signal vergleichen'],
    steps: [
      { title: 'Bauart erkennen', instruction: 'Unterscheide Einweg-Lichtschranke, Reflex-Lichtschranke und Lichttaster anhand von Aufbau und Beschriftung.' },
      { title: 'Optischen Weg prüfen', instruction: 'Prüfe Verschmutzung, Ausrichtung, Reflektor und freie Sichtstrecke.' },
      { title: 'Elektrischen Signalweg prüfen', instruction: 'Prüfe Versorgung, Anzeige, Ausgang, Kabel, Klemme und SPS-Eingang.', interpretation: 'Anzeige reagiert, SPS nicht: Signalweg nach dem Sensor prüfen.', nextStep: 'Passenden Abschnitt eingrenzen.' }
    ],
    results: [
      { status: 'ok', condition: 'Anzeige und SPS reagieren', explanation: 'Erfassung funktioniert grundsätzlich.' },
      { status: 'warning', condition: 'Anzeige reagiert nicht', explanation: 'Versorgung, Optik, Ausrichtung und Bauart prüfen.' }
    ], relatedArticles: ['24-vdc-pruefen','sps-eingang-pruefen']
  }),
  base({
    id: 'sensor-oeffner-schliesser', title: 'Sensor – Öffner / Schliesser verstehen', category: 'Sensorik',
    description: 'Einfach vergleichen, wie sich Sensorausgang, LED und SPS-Eingang bei Betätigung verhalten.',
    symptoms: ['Signal wirkt invertiert', 'Sensor reagiert anders als erwartet', 'Öffner oder Schliesser unklar'],
    keywords: ['sensor','öffner','schliesser','no','nc','betätigt','unbetätigt','sps'],
    synonyms: ['normally open','normally closed','no nc'], manufacturers: [], tools: ['Elektroschema', 'Ggf. Multimeter'],
    quickCheck: ['Ausgangsart im Schema lesen', 'Zustände vergleichen', 'LED und SPS gemeinsam beobachten'],
    steps: [
      { title: 'Ausgangsart feststellen', instruction: 'Prüfe im Schema oder Datenblatt, ob der Ausgang als Öffner oder Schliesser verwendet wird.' },
      { title: 'Zustände vergleichen', instruction: 'Beobachte LED, Ausgang und SPS-Eingang einmal unbetätigt und einmal betätigt.', expected: 'Der Zustandswechsel entspricht Schema und Anwendung.', interpretation: 'Entscheidend ist der Wechsel zwischen beiden Zuständen.' },
      { title: 'Signalweg prüfen', instruction: 'Bei Abweichung prüfe Sensor, Kabel, Klemme und SPS-Eingang.', hints: ['PNP/NPN ist ergänzende Information und ersetzt den Zustandsvergleich nicht.'], nextStep: 'SPS-Eingang prüfen.' }
    ],
    results: [
      { status: 'ok', condition: 'Zustandswechsel plausibel', explanation: 'Öffner-/Schliesser-Verhalten entspricht der Anwendung.' },
      { status: 'warning', condition: 'LED und SPS widersprechen sich', explanation: 'Leitung, Klemme und Eingang prüfen.' }
    ], relatedArticles: ['induktiven-sensor-pruefen','sps-eingang-pruefen']
  }),
  base({
    id: 'sps-eingang-pruefen', title: 'SPS-Eingang prüfen', category: 'SPS & Steuerung',
    description: 'Den Signalweg vom Sensor bis zum SPS-Eingang abschnittsweise prüfen.',
    symptoms: ['SPS erkennt Signal nicht', 'Eingangs-LED bleibt aus', 'Sensor schaltet'],
    keywords: ['sps eingang','plc input','eingangsmodul','sensor signal','klemme','24v'],
    synonyms: ['digital input','di','input module'], manufacturers: ['Siemens'], tools: ['Elektroschema', 'Multimeter'],
    quickCheck: ['Sensor beobachten', 'Kabel und Klemme prüfen', 'Eingangs-LED vergleichen'],
    steps: [
      { title: 'Signal am Sensor prüfen', instruction: 'Prüfe Versorgung, LED und Ausgang des Sensors.' },
      { title: 'Signalweg verfolgen', instruction: 'Verfolge Sensor → Kabel → Klemme → SPS-Eingang gemäß Schema.', measurement: 'Signal gegen vorgesehenen Bezug', expected: 'Zustandswechsel an jedem Abschnitt', interpretation: 'Die erste Stelle ohne Wechsel grenzt den Fehler ein.' },
      { title: 'Eingang beurteilen', instruction: 'Vergleiche Messsignal, Eingangsklemme und Eingangs-LED.', warning: 'Keine Safety-Funktion überbrücken.', nextStep: 'Bei korrektem elektrischem Signal Diagnose und Parametrierung nach Freigabe prüfen.' }
    ],
    results: [
      { status: 'ok', condition: 'Signal und Eingangs-LED wechseln', explanation: 'Hardware-Signalweg funktioniert grundsätzlich.' },
      { status: 'warning', condition: 'Signal endet unterwegs', explanation: 'Betroffenen Leitungs- oder Klemmenabschnitt prüfen.' }
    ], relatedArticles: ['24-vdc-pruefen','induktiven-sensor-pruefen','sensor-oeffner-schliesser']
  }),
  base({
    id: 'sps-ausgang-pruefen', title: 'SPS-Ausgang prüfen', category: 'SPS & Steuerung',
    description: 'Den Signalweg vom SPS-Ausgang bis zum Verbraucher systematisch eingrenzen.',
    symptoms: ['Ausgang schaltet nicht', 'Ventil oder Schütz reagiert nicht', 'Ausgangs-LED aktiv'],
    keywords: ['sps ausgang','plc output','ausgangsmodul','relais','schütz','ventil','klemme'],
    synonyms: ['digital output','do','output module'], manufacturers: ['Siemens'], tools: ['Elektroschema', 'Multimeter'],
    quickCheck: ['Ausgangs-LED prüfen', 'Signalweg verfolgen', 'Versorgung des Ausgangskreises prüfen'],
    steps: [
      { title: 'Freigaben prüfen', instruction: 'Prüfe Betriebszustand, Diagnose und freigegebene Voraussetzungen der Steuerung.' },
      { title: 'Signalweg verfolgen', instruction: 'Verfolge SPS → Ausgang → Klemme → Relais/Schütz/Ventil → Verbraucher.', measurement: 'Passende Spannung an freigegebenen Messpunkten', expected: 'Signal folgt dem vorgesehenen Schaltzustand' },
      { title: 'Abweichung eingrenzen', instruction: 'Vergleiche Ausgangs-LED, Klemme und Verbraucheranschluss.', warning: 'Ausgänge nicht ohne freigegebenes Verfahren erzwingen und keine Safety-Funktion überbrücken.', nextStep: 'Ersten abweichenden Abschnitt prüfen.' }
    ],
    results: [
      { status: 'ok', condition: 'Signal erreicht den Verbraucher', explanation: 'Verbraucher und Rückmeldung weiter prüfen.' },
      { status: 'warning', condition: 'Ausgangs-LED aktiv, Signal fehlt', explanation: 'Ausgangskreis, Klemme und Versorgung prüfen.' }
    ], relatedArticles: ['24-vdc-pruefen','relais-pruefen','schuetz-pruefen','magnetventil-spule-pruefen']
  }),
  base({
    id: 'magnetventil-spule-pruefen', title: 'Magnetventil / Spule prüfen', category: 'Schaltgeräte',
    description: 'Elektrische und pneumatische Ursache bei einem Magnetventil unterscheiden.',
    symptoms: ['Ventil schaltet nicht', 'Spule zieht nicht', 'Keine Bewegung'],
    keywords: ['magnetventil','spule','ventil','druckluft','stecker','handbetätigung','24v'],
    synonyms: ['solenoid valve','ventilspule'], manufacturers: ['Festo'], tools: ['Multimeter', 'Elektroschema', 'Pneumatikplan falls vorhanden'],
    quickCheck: ['Elektrisch oder pneumatisch unterscheiden', 'Spannung an der Spule prüfen', 'Druckluft und Mechanik prüfen'],
    steps: [
      { title: 'Fehlerart unterscheiden', instruction: 'Prüfe Anzeige, Geräusch und Bewegung: kommt der elektrische Befehl an, fehlt aber die pneumatische Wirkung?' },
      { title: 'Spule und Stecker prüfen', instruction: 'Prüfe Stecker, Leitung und passende Spannung an der Spule.', measurement: 'Spannung gemäß Spulenbeschriftung', expected: 'Nennspannung im Schaltmoment', interpretation: 'Spannung vorhanden, keine Reaktion: Spule, Stecker oder Mechanik prüfen.' },
      { title: 'Pneumatik prüfen', instruction: 'Prüfe Druckluft, Ventilzustand und mechanische Blockierung.', warning: 'Handbetätigung nur, wenn betrieblich zulässig.', nextStep: 'Elektrische oder pneumatische Fachprüfung veranlassen.' }
    ],
    results: [
      { status: 'warning', condition: 'Keine Spannung an der Spule', explanation: 'Ansteuerung und Ausgangskreis prüfen.' },
      { status: 'warning', condition: 'Spannung vorhanden, keine Bewegung', explanation: 'Spule, Ventil und Pneumatik prüfen.' }
    ], relatedArticles: ['24-vdc-pruefen','sps-ausgang-pruefen','relais-pruefen']
  }),
  base({
    id: 'temperatursensor-pruefen', title: 'Temperatursensor prüfen', category: 'Sensorik',
    description: 'Sensortyp, Leitung und Eingang prüfen, ohne jeden Sensor als PT100 zu behandeln.',
    symptoms: ['Temperaturwert unplausibel', 'Fühlerbruch', 'Kurzschlussmeldung'],
    keywords: ['temperatursensor','pt100','fühler','widerstand','unterbruch','kurzschluss','eingangskarte'],
    synonyms: ['temperaturfühler','rtd'], manufacturers: [], tools: ['Multimeter', 'Elektroschema', 'Sensordokumentation'],
    quickCheck: ['Sensortyp identifizieren', 'Leitung und Klemmen prüfen', 'Eingang und Parametrierung berücksichtigen'],
    steps: [
      { title: 'Sensortyp identifizieren', instruction: 'Prüfe Typenschild, Schema und Anschlussart. Behandle den Sensor nicht automatisch als PT100.' },
      { title: 'Leitung prüfen', instruction: 'Prüfe Kabel, Stecker und Klemmen auf Unterbruch, Kurzschluss und lose Verbindung.', warning: 'Widerstand nur spannungsfrei und vom Messkreis getrennt beurteilen.' },
      { title: 'Wert plausibilisieren', instruction: 'Vergleiche den Messwert mit der freigegebenen Dokumentation des tatsächlichen Sensortyps.', interpretation: 'Auch Eingangskarte und Parametrierung können die Ursache sein.', nextStep: 'Eingangskanal und Konfiguration nach Freigabe prüfen.' }
    ],
    results: [
      { status: 'ok', condition: 'Sensor und Leitung plausibel', explanation: 'Eingangskarte und Parametrierung weiter prüfen.' },
      { status: 'warning', condition: 'Unterbruch oder Kurzschluss', explanation: 'Leitung, Klemmen und Sensor eingrenzen.' }
    ], relatedArticles: ['multimeter-bedienen','elektroschema-stoerung-suchen']
  }),
  base({
    id: 'heizung-ausmessen', title: 'Heizung ausmessen', category: 'Motoren & Verbraucher',
    description: 'Eine einfache ohmsche Heizung prüfen und von komplexeren Heizschaltungen unterscheiden.',
    symptoms: ['Heizung bleibt kalt', 'Sicherung löst aus', 'Heizleistung fehlt'],
    keywords: ['heizung','heizelement','widerstand','leistung','strom','i p u','r u2 p'],
    synonyms: ['heizregister','heizstab'], manufacturers: [], tools: ['Multimeter', 'Typenschild', 'Elektroschema'],
    quickCheck: ['Schaltungsart erkennen', 'Spannungsfrei trennen', 'Widerstand mit Typendaten plausibilisieren'],
    steps: [
      { title: 'Schaltung erkennen', instruction: 'Prüfe, ob es sich um eine einfache einphasige ohmsche Last oder eine mehrphasige, mehrstufige, Stern- oder Dreieckschaltung handelt.' },
      { title: 'Heizelement prüfen', instruction: 'Schalte sicher frei, trenne Parallelpfade und miss den Widerstand.', measurement: 'Ω', warning: 'Widerstand nur spannungsfrei messen.' },
      { title: 'Plausibilität berechnen', instruction: 'Für eine einfache ohmsche Last gelten I = P / U und R = U² / P.', expected: 'Plausibel zu Nennspannung und Nennleistung', warning: 'Mehrphasige oder verschaltete Heizungen nicht wie eine einfache einphasige Last behandeln.', nextStep: 'Bei komplexer Schaltung Herstellerunterlagen und Schema verwenden.' }
    ],
    results: [
      { status: 'ok', condition: 'Widerstand plausibel', explanation: 'Versorgung, Schaltgerät und Regelung weiter prüfen.' },
      { status: 'warning', condition: 'Unterbruch oder starke Abweichung', explanation: 'Heizelement, Verbindung und Schaltungsart prüfen.' }
    ], relatedArticles: ['multimeter-bedienen','230-vac-pruefen','400-v-drehstrom-pruefen']
  }),
  base({
    id: 'elektroschema-stoerung-suchen', title: 'Elektroschema lesen – Störung suchen', category: 'Elektroschema',
    description: 'Während einer Störung den Strom- oder Signalweg im Schema finden.',
    symptoms: ['Messpunkt unklar', 'Signalweg suchen', 'Bauteil im Schema finden'],
    keywords: ['elektroschema','schaltplan','stromweg','signalweg','klemme','versorgung','störung suchen'],
    synonyms: ['schema lesen','schaltbild'], manufacturers: [], tools: ['Aktuelles freigegebenes Elektroschema'],
    quickCheck: ['Verbraucher finden', 'Stromweg rückwärts verfolgen', 'Vor jeder Messung Erwartung formulieren'],
    steps: [
      { title: 'Ziel festlegen', instruction: 'Bestimme den Verbraucher oder das Signal, das nicht wie erwartet funktioniert.' },
      { title: 'Stromweg verfolgen', instruction: 'Verfolge Verbraucher → Schaltgerät → Schutz → Klemmen → Steuerung → Versorgung.' },
      { title: 'Messpunkte planen', instruction: 'Formuliere vor jeder Messung: Was erwarte ich hier?', interpretation: 'Die erste Abweichung zwischen Erwartung und Messung grenzt den Fehler ein.', warning: 'Nur freigegebene Messungen durchführen.', nextStep: 'Passenden Bauteilartikel öffnen.' }
    ],
    results: [
      { status: 'ok', condition: 'Abweichender Abschnitt gefunden', explanation: 'Bauteil, Leitung oder Ansteuerung gezielt prüfen.' },
      { status: 'info', condition: 'Stromweg unklar', explanation: 'Kennzeichnungen und Querverweise im freigegebenen Schema prüfen.' }
    ], relatedArticles: ['komponenten-schaltschrank-erkennen','sicherung-leitungsschutz-pruefen']
  }),
  base({
    id: 'komponenten-schaltschrank-erkennen', title: 'Komponenten im Schaltschrank erkennen', category: 'Elektroschema',
    description: 'Häufige Komponenten, ihre kurze Funktion und passende Prüfhilfen zuordnen.',
    symptoms: ['Bauteil unbekannt', 'Komponente im Schaltschrank suchen', 'Kennzeichnung unklar'],
    keywords: ['schaltschrank','sicherung','leitungsschutz','netzteil','schütz','motorschutz','relais','sicherheitsrelais','sps','fu','klemme'],
    synonyms: ['schrankkomponenten','bauteile erkennen'], manufacturers: [], tools: ['Elektroschema', 'Bauteilkennzeichnung'],
    quickCheck: ['Kennzeichnung lesen', 'Symbol im Schema suchen', 'Passenden Artikel öffnen'],
    steps: [
      { title: 'Kennzeichnung erfassen', instruction: 'Lies Betriebsmittelkennzeichen, Typenschild und Klemmenbezeichnungen, ohne Einstellungen zu verändern.' },
      { title: 'Funktion zuordnen', instruction: 'Ordne Schutz, Versorgung, Schalten, Steuerung oder Anschluss zu.', hints: ['Typische Gruppen: Sicherung/Leitungsschutz, Netzteil, Schütz, Motorschutz, Relais, Sicherheitsrelais, SPS, Ein-/Ausgangsmodul, FU und Klemmen.'] },
      { title: 'Prüfhilfe wählen', instruction: 'Öffne den passenden Artikel und arbeite entlang des Schemas.', warning: 'Unbekannte Parameter nicht verändern.', nextStep: 'Bei fehlender eindeutiger Zuordnung Fachunterlagen verwenden.' }
    ],
    results: [
      { status: 'ok', condition: 'Komponente zugeordnet', explanation: 'Passenden Prüfartikel verwenden.' },
      { status: 'info', condition: 'Komponente unklar', explanation: 'Typenschild, Schema und freigegebene Dokumentation abgleichen.' }
    ], relatedArticles: ['sicherung-leitungsschutz-pruefen','relais-pruefen','schuetz-pruefen','motorschutz-pruefen','sps-eingang-pruefen','sps-ausgang-pruefen']
  }),
  base({
    id: 'sicherung-leitungsschutz-pruefen', title: 'Sicherung / Leitungsschutz prüfen', category: 'Schaltgeräte',
    description: 'Auslösung erkennen, spannungsfrei prüfen und die Ursache berücksichtigen.',
    symptoms: ['Sicherung ausgelöst', 'Leitungsschutz ausgeschaltet', 'Versorgung fehlt'],
    keywords: ['sicherung','leitungsschutz','ls schalter','durchgang','ausgelöst','nennwert','versorgung'],
    synonyms: ['automat','schutzschalter','leitungsschutzschalter','fuse','circuit breaker'], manufacturers: [], tools: ['Multimeter', 'Elektroschema'],
    quickCheck: ['Anzeige und Schaltstellung prüfen', 'Durchgang nur spannungsfrei', 'Ursache vor Ersatz oder Reset suchen'],
    safetyNotes: ['Keinen grösseren Nennwert einsetzen und nicht wiederholt ohne Ursachenprüfung zurückstellen.'],
    steps: [
      { title: 'Zustand prüfen', instruction: 'Prüfe sichtbare Anzeige, Schaltstellung, Kennzeichnung und zugeordneten Stromkreis.', interpretation: 'Eine reine Sichtprüfung beweist nicht immer die elektrische Funktion.' },
      { title: 'Spannungsfrei prüfen', instruction: 'Schalte nach Vorgabe frei und prüfe Durchgang oder Widerstand, wenn dies für das Bauteil zulässig ist.', measurement: 'Durchgang / Ω', warning: 'Nur spannungsfrei messen.' },
      { title: 'Ursache suchen', instruction: 'Prüfe Last, Leitung und nachgeschaltete Bauteile gemäß Schema.', warning: 'Keinen höheren Nennwert einsetzen; keine wiederholten Rückstellversuche ohne Ursachenprüfung.', nextStep: 'Fehlerursache beheben oder Fachprüfung veranlassen.' }
    ],
    results: [
      { status: 'ok', condition: 'Schutzorgan elektrisch plausibel', explanation: 'Versorgung und nachfolgenden Stromweg prüfen.' },
      { status: 'danger', condition: 'Erneute Auslösung', explanation: 'Nicht weiter zurückstellen; Ursache fachlich klären.' }
    ], relatedArticles: ['230-vac-pruefen','400-v-drehstrom-pruefen','elektroschema-stoerung-suchen']
  })
]
