import type { DecisionTreeTranslation } from '../types'

const yesNoUnknown = (yes: string, no: string, unknown: string) => [
  { label: 'Áno', next: yes, answer: 'yes' as const },
  { label: 'Nie', next: no, answer: 'no' as const },
  { label: 'Neviem', next: unknown, answer: 'unknown' as const }
]

export const motorNotRunningSk: DecisionTreeTranslation = {
  title: 'Motor nebeží',
  nodes: {
    'has-vfd': { title: 'Má motor frekvenčný menič?', help: 'Frekvenčný menič má často displej a je zapojený medzi napájaním a motorom.', options: yesNoUnknown('vfd-fault','motor-protection','identify-vfd') },
    'identify-vfd': { title: 'Identifikuj frekvenčný menič', actions: ['Skontroluj elektrickú schému.', 'Hľadaj zariadenie s displejom medzi napájaním a motorom.', 'Nemeň neznáme parametre.'] },
    'vfd-fault': { title: 'Zobrazuje menič poruchu?', options: yesNoUnknown('record-vfd-fault','vfd-ready','inspect-vfd') },
    'record-vfd-fault': { title: 'Zapíš chybový kód', actions: ['Zapíš kód a výrobcu.', 'Použi schválenú dokumentáciu výrobcu.', 'Nemeň neznáme parametre.'] },
    'inspect-vfd': { title: 'Skontroluj indikáciu', actions: ['Pozri displej a stavové LED.', 'Zdokumentuj zobrazenie.', 'Nemeň parametre naslepo.'] },
    'vfd-ready': { title: 'Je menič pripravený na prevádzku?', options: yesNoUnknown('vfd-start','vfd-not-ready','inspect-vfd') },
    'vfd-start': { title: 'Dostáva menič povel Štart?', options: yesNoUnknown('check-motor','check-control','check-control') },
    'vfd-not-ready': { title: 'Skontroluj základné podmienky meniča', actions: ['Podľa schémy skontroluj povolenia a napájanie.', 'Použi schválenú dokumentáciu.', 'Nepremosťuj Safety funkcie.'] },
    'check-control': { title: 'Skontroluj riadiaci obvod', actions: ['Podľa schémy skontroluj povel Štart a povolenia.', 'Skontroluj výstup PLC a signálnu cestu.', 'Nepremosťuj Safety obvody.'] },
    'motor-protection': { title: 'Vypla ochrana motora?', options: yesNoUnknown('protection-tripped','contactor-pulls','inspect-protection') },
    'protection-tripped': { title: 'Pred resetom nájdi príčinu', actions: ['Skontroluj mechanické blokovanie.', 'Skontroluj motor a napájanie.', 'Ochranu opakovane neresetuj bez zistenia príčiny.'] },
    'inspect-protection': { title: 'Identifikuj ochranu motora', actions: ['Skontroluj schému a označenie v rozvádzači.', 'Pozri signalizáciu vypnutia.', 'Dodrž prevádzkové pokyny.'] },
    'contactor-pulls': { title: 'Zopne stýkač?', options: yesNoUnknown('supply-after-contactor','contactor-not-pulling','contactor-not-pulling') },
    'contactor-not-pulling': { title: 'Skontroluj stýkač a ovládanie', actions: ['Skontroluj A1 ↔ A2.', 'Skontroluj výstup PLC a riadiaci obvod.', 'Nepremosťuj Safety obvody.'] },
    'supply-after-contactor': { title: 'Je napájanie za stýkačom úplné?', options: [
      { label: 'Úplné', next: 'mechanically-free', answer: 'yes' },
      { label: 'Chýba jedna fáza', next: 'phase-missing', answer: 'no' },
      { label: 'Bez napätia', next: 'no-supply', answer: 'no' },
      { label: 'Neviem', next: 'measure-supply', answer: 'unknown' }
    ] },
    'phase-missing': { title: 'Urči chýbajúcu fázu', actions: ['Podľa schémy skontroluj stýkač, poistku a napájanie.'] },
    'no-supply': { title: 'Skontroluj napájanie pred stýkačom', actions: ['Postupuj späť podľa schémy.', 'V povolenom rozsahu skontroluj ochranu a prívod.'] },
    'measure-supply': { title: 'Odborne zmeraj napájanie', actions: ['Použi schému a vhodný merací prístroj.', 'Meraj iba v rámci svojho oprávnenia.'] },
    'mechanically-free': { title: 'Je motor mechanicky voľný?', options: yesNoUnknown('check-motor','mechanical-block','inspect-mechanics') },
    'mechanical-block': { title: 'Najprv odstráň mechanické blokovanie', actions: ['Zaisti zariadenie.', 'Odstráň mechanickú príčinu podľa prevádzkového postupu.', 'Až potom pokračuj elektrickou kontrolou.'] },
    'inspect-mechanics': { title: 'Nechaj skontrolovať mechaniku', actions: ['Zaisti zariadenie.', 'Nechaj skontrolovať spojku, prevodovku a záťaž.'] },
    'check-motor': { title: 'Zmeraj motor', actions: ['Motor bezpečne odpoj.', 'Porovnaj vinutia.', 'Pri hodnotení zohľadni napájanie a mechaniku.'] }
  }
}
