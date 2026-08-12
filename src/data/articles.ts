import type { Article } from '../types'

export const articles: Article[] = [
  {
    id: 'multimeter-bedienen', title: 'Multimeter bedienen', category: 'Messen & Grundlagen',
    description: 'Spannung, Widerstand und Durchgang sicher mit dem Multimeter prüfen.',
    symptoms: ['Unsicher bei Multimeter-Einstellung', 'Messwert OL', 'Kein Piepton'],
    keywords: ['multimeter','messen','messgerät','tester','voltmeter','ohmmeter','piepser','durchgangsprüfer','spannung messen','widerstand messen','durchgang messen','com','v ohm','vdc','vac','ac dc','ol','unendlich','ohm','durchgang','piepton','messspitze','messleitung','polarität','gleichspannung','wechselspannung'],
    manufacturers: [], tools: ['Multimeter', 'Passende Messleitungen'], images: [],
    quickCheck: ['Schwarz in COM', 'Rot in V / Ω', 'Messart vor dem Ansetzen wählen'],
    steps: [
      { title: 'Messleitungen anschließen', instruction: 'Stecke Schwarz in COM und Rot in V / Ω.', warning: 'Verwende für Spannungsmessungen nie die A- oder mA-Buchse.' },
      { title: 'Gleichspannung messen', instruction: 'Stelle auf V ⎓ / V DC. Miss Schwarz an 0 V / Minus und Rot am Messpunkt.', measurement: 'V ⎓ / V DC', expected: '24.1 V: Spannung vorhanden. −24.1 V: Polarität vertauscht, Spannung vorhanden.' },
      { title: 'Wechselspannung messen', instruction: 'Stelle auf V ~ / V AC. Nutze diese Einstellung für 230 VAC, 400 VAC und AC-Steuerspannungen.', measurement: 'V ~ / V AC' },
      { title: 'Widerstand messen', instruction: 'Stelle auf Ω. Der richtige Wert hängt vom Bauteil ab.', measurement: 'Ω', expected: 'Kleiner Wert: geringe elektrische Verbindung. OL / ∞: offen.', warning: 'Widerstand nur spannungsfrei messen.' },
      { title: 'Durchgang prüfen', instruction: 'Stelle auf Durchgang / Summer. Prüfe Kabel, Sicherungen, Kontakte oder Schalter.', measurement: 'Durchgang / Summer', warning: 'Nur spannungsfrei durchführen.' }
    ],
    results: [
      { status: 'ok', condition: 'Plausibler Messwert', explanation: 'Messart und Anschluss passen zur Aufgabe.' },
      { status: 'warning', condition: 'Negativer DC-Wert', explanation: 'Spannung ist vorhanden, die Messpolarität ist vertauscht.' },
      { status: 'danger', condition: 'Falsche Buchse', explanation: 'Messung abbrechen und Leitungen korrekt anschließen.' }
    ], relatedArticles: ['24-vdc-pruefen']
  },
  {
    id: '24-vdc-pruefen', title: '24 VDC prüfen', category: 'Messen & Grundlagen',
    description: 'Fehlende oder einbrechende 24-V-Steuerspannung systematisch eingrenzen.',
    symptoms: ['Sensor bekommt keinen Strom', 'Ventil geht nicht', 'Relais zieht nicht', '24 V bricht ein'],
    keywords: ['24v','24 v','24vdc','24 vdc','24 volt','gleichspannung','steuerspannung','steuerstrom','keine 24v','24v fehlt','spannung fehlt','0v','0 volt','minus','m','netzteil','sicherung','steuerkreis'],
    manufacturers: [], tools: ['Multimeter'], images: [],
    quickCheck: ['V ⎓ wählen', '+24 V und 0 V im Schema finden', 'Am Netzteil und Verbraucher messen'],
    steps: [
      { title: 'Multimeter einstellen', instruction: 'Stelle das Multimeter auf V ⎓ / V DC.', measurement: 'V ⎓ / V DC' },
      { title: 'Bezugspunkte finden', instruction: 'Finde +24 V und 0 V / M gemäß Schema.', warning: 'Verlasse dich nicht ausschließlich auf Kabelfarben.' },
      { title: 'Versorgung messen', instruction: 'Miss zwischen +24 V und 0 V.', measurement: '+24 V ↔ 0 V', expected: 'Ungefähr 24 VDC' },
      { title: 'Am Verbraucher vergleichen', instruction: 'Ist am Netzteil Spannung vorhanden, miss direkt am Verbraucher.', expected: 'Ähnlicher Messwert wie am Netzteil' }
    ],
    results: [
      { status: 'ok', condition: 'Ca. 24 V vorhanden', explanation: 'Versorgung ist grundsätzlich vorhanden.' },
      { status: 'warning', condition: 'Deutlich unter 24 V', explanation: 'Versorgung oder Belastung weiter prüfen.' },
      { status: 'danger', condition: '0 V', explanation: 'Versorgung fehlt oder der Bezugspunkt ist falsch.' }
    ], relatedArticles: ['multimeter-bedienen','induktiven-sensor-pruefen']
  },
  {
    id: 'drehstrommotor-ausmessen', title: 'Drehstrommotor ausmessen', category: 'Motoren & Verbraucher',
    description: 'Wicklungen eines Drehstrommotors vergleichen und Auffälligkeiten erkennen.',
    symptoms: ['Motor läuft nicht', 'Motor brummt', 'Motor wird heiß', 'Motorschutz löst aus'],
    keywords: ['motor','drehstrommotor','motor ausmessen','motor messen','motor prüfen','motor durchmessen','motor ohmen','motor widerstand','wicklung','wicklungen','motor kaputt','motor defekt','motor läuft nicht','motor brummt','motor wird heiss','motorschutz löst aus','zwei phasen','erdschluss motor','motor gegen pe','u1','u2','v1','v2','w1','w2','stern','dreieck','pe','isolationsfehler'],
    manufacturers: [], tools: ['Multimeter', 'Ggf. geeignetes Isolationsmessgerät'], images: [],
    quickCheck: ['Sicher freischalten', 'Verdrahtung dokumentieren', 'Drei Wicklungswerte vergleichen'],
    steps: [
      { title: 'Sicher freischalten', instruction: 'Motor sicher freischalten und Spannungsfreiheit feststellen.', warning: 'Widerstand nur spannungsfrei messen.' },
      { title: 'Motor trennen', instruction: 'Trenne den Motor so vom Stromkreis, dass keine Parallelpfade das Ergebnis verfälschen.', warning: 'Dokumentiere vorher die Verdrahtung.' },
      { title: 'Anschlüsse identifizieren', instruction: 'Prüfe die tatsächliche Beschriftung. Typisch sind U1/U2, V1/V2 und W1/W2.' },
      { title: 'Wicklungen messen', instruction: 'Stelle auf Ω. Miss U1 ↔ U2, V1 ↔ V2 und W1 ↔ W2.', measurement: 'Ω', expected: 'Alle drei Werte liegen nahe beieinander.' },
      { title: 'Gegen Gehäuse prüfen', instruction: 'Prüfe gegen PE / Motorgehäuse.', expected: 'Keine niederohmige Verbindung sichtbar.', warning: 'Ein Multimeter ersetzt keine fachgerechte Isolationsmessung.' }
    ],
    results: [
      { status: 'ok', condition: 'Drei ähnliche Werte', explanation: 'Die Wicklungen wirken untereinander plausibel.' },
      { status: 'warning', condition: 'Eine Wicklung weicht deutlich ab', explanation: 'Wicklung und Anschlüsse weiter prüfen.' },
      { status: 'danger', condition: 'OL / ∞ an einer Wicklung', explanation: 'Eine Unterbrechung ist möglich.' }
    ], relatedArticles: ['schuetz-pruefen']
  },
  {
    id: 'induktiven-sensor-pruefen', title: 'Induktiven Sensor prüfen', category: 'Sensorik',
    description: 'Versorgung, LED und Ausgang eines induktiven Sensors schrittweise prüfen.',
    symptoms: ['Sensor schaltet nicht', 'SPS erkennt Signal nicht', 'Kein Signal'],
    keywords: ['sensor','induktiver sensor','induktiv','initiator','näherungsschalter','näherungssensor','proximity sensor','prox','sensor prüfen','sensor testen','sensor kaputt','sensor defekt','sensor schaltet nicht','sensor led','sps sieht sensor nicht','kein signal','sensor bekommt keine 24v','pnp','npn','braun blau schwarz','3 draht','24v sensor','sick','ifm','baumer','telemecanique','euchner'],
    manufacturers: ['SICK','IFM','Baumer','Telemecanique','Euchner'], tools: ['Multimeter', 'Geeignetes metallisches Ziel'], images: [],
    quickCheck: ['Sensor und Kabel ansehen', 'Typ und Versorgung prüfen', 'LED mit Metallziel beobachten'],
    steps: [
      { title: 'Sichtprüfung', instruction: 'Prüfe Sensorfläche, Kabel, Stecker, Beschädigung, Abstand und LED.' },
      { title: 'Sensorart prüfen', instruction: 'Prüfe PNP/NPN, Öffner/Schließer und Versorgungsspannung.' },
      { title: 'Belegung prüfen', instruction: 'Bei 3-Draht-DC ist häufig Braun +, Blau 0 V, Schwarz Ausgang.', warning: 'Belegung nie blind voraussetzen. Prüfe Schema oder Datenblatt.' },
      { title: 'Versorgung messen', instruction: 'Miss Braun ↔ Blau.', measurement: 'V ⎓ / V DC', expected: 'Bei einer 24-V-Anlage ungefähr 24 VDC.' },
      { title: 'Erkennung testen', instruction: 'Bringe Metall in den Erfassungsbereich und beobachte die LED.' },
      { title: 'Signalweg prüfen', instruction: 'Schaltet der Sensor, die SPS aber nicht: Ausgang, Leitung, Klemme und SPS-Eingangs-LED prüfen.' }
    ],
    results: [
      { status: 'ok', condition: 'LED schaltet', explanation: 'Der Sensor erkennt das Ziel grundsätzlich.' },
      { status: 'warning', condition: 'LED schaltet, SPS nicht', explanation: 'Signalweg und SPS-Eingang prüfen.' },
      { status: 'danger', condition: 'Keine Versorgung', explanation: 'Versorgung und Verdrahtung zuerst prüfen.' }
    ], relatedArticles: ['24-vdc-pruefen']
  },
  {
    id: 'schuetz-pruefen', title: 'Schütz prüfen', category: 'Schaltgeräte',
    description: 'Steuerspannung, Spule und Hauptkontakte eines Schützes eingrenzen.',
    symptoms: ['Schütz zieht nicht', 'Schütz klackert', 'Schütz brummt', 'Eine Phase fehlt'],
    keywords: ['schütz','kontaktor','schütz prüfen','schütz messen','schützspule','k1','k2','k-schütz','schütz zieht nicht','schütz klackert','schütz rattert','schütz brummt','schütz kaputt','schütz fällt ab','motor bekommt keine spannung','eine phase fehlt','spule defekt','a1','a2','a1 a2','hauptkontakt','hilfskontakt','steuerkreis','leistungskontakt','24v spule','230v spule','siemens','telemecanique','schneider'],
    manufacturers: ['Siemens','Telemecanique'], tools: ['Multimeter'], images: [],
    quickCheck: ['Sicht- und Geräuschprüfung', 'Spulenspannung A1 ↔ A2 messen', 'Ein- und Ausgang vergleichen'],
    steps: [
      { title: 'Sichtprüfung', instruction: 'Prüfe verbrannte Stellen, lose Leitungen, Klemmen und ungewöhnliche Geräusche.' },
      { title: 'Spule identifizieren', instruction: 'Prüfe die tatsächliche Bezeichnung und Spulenspannung. Typisch ist A1 ↔ A2.' },
      { title: 'Steuerspannung messen', instruction: 'Wähle VDC oder VAC passend zur Spule. Miss A1 ↔ A2, während das Schütz anziehen soll.', measurement: 'A1 ↔ A2', expected: 'Nennspannung gemäß Beschriftung / Schema.' },
      { title: 'Leistungspfad prüfen', instruction: 'Wenn betrieblich zulässig, prüfe Versorgung vor und nach dem Schütz gemäß Schema.' },
      { title: 'Spule spannungsfrei prüfen', instruction: 'Stelle auf Ω und miss A1 ↔ A2.', measurement: 'Ω', expected: 'Messbarer Widerstand: Spule zumindest nicht offen.', warning: 'Nur spannungsfrei messen. Kein universeller Sollwert.' }
    ],
    results: [
      { status: 'ok', condition: 'Steuerspannung vorhanden, Schütz zieht an', explanation: 'Schütz schaltet grundsätzlich.' },
      { status: 'warning', condition: 'Steuerspannung vorhanden, Schütz zieht nicht', explanation: 'Spule oder Mechanik prüfen.' },
      { status: 'danger', condition: 'Keine Steuerspannung', explanation: 'Steuerkreis vor dem Schütz prüfen.' }
    ], relatedArticles: ['drehstrommotor-ausmessen','24-vdc-pruefen']
  }
]

export const articleById = (id: string) => articles.find((article) => article.id === id)
