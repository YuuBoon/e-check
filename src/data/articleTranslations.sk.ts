import type { ArticleTranslation } from '../types'

const t = (value: ArticleTranslation) => value

export const slovakArticleTranslations: Record<string, ArticleTranslation> = {
  'multimeter-bedienen': t({
    title: 'Používanie multimetra', description: 'Bezpečná kontrola napätia, odporu a spojitosti pomocou multimetra.',
    symptoms: ['Nejasné nastavenie multimetra', 'Hodnota OL', 'Bez zvukového signálu'], keywords: ['multimeter','meranie','napätie','odpor','spojitosť','vdc','vac','ol'],
    tools: ['Multimeter', 'Vhodné meracie vodiče'], quickCheck: ['Čierny vodič do COM', 'Červený vodič do V / Ω', 'Pred meraním zvoliť správny režim'],
    steps: [
      { title: 'Pripoj meracie vodiče', instruction: 'Čierny vodič pripoj do COM a červený do V / Ω.', warning: 'Pri meraní napätia nikdy nepouži vstup A alebo mA.' },
      { title: 'Zmeraj napätie', instruction: 'Pre DC zvoľ V ⎓, pre AC zvoľ V ~. Meraj iba na povolených bodoch.', measurement: 'V DC / V AC', interpretation: 'Záporná hodnota DC znamená opačnú polaritu, napätie je však prítomné.' },
      { title: 'Zmeraj odpor alebo spojitosť', instruction: 'Zvoľ Ω alebo zvukovú skúšku podľa úlohy.', measurement: 'Ω / spojitosť', warning: 'Odpor a spojitosť meraj iba bez napätia.' }
    ], results: [
      { status: 'ok', condition: 'Hodnota je vierohodná', explanation: 'Režim a pripojenie zodpovedajú úlohe.' },
      { status: 'danger', condition: 'Nesprávny vstup', explanation: 'Meranie zastav a vodiče správne pripoj.' }
    ]
  }),
  '24-vdc-pruefen': t({
    title: 'Kontrola 24 V DC', description: 'Systematické hľadanie chýbajúceho alebo klesajúceho riadiaceho napätia 24 V.',
    symptoms: ['Snímač nemá napájanie', 'Ventil nereaguje', 'Relé nezopne'], keywords: ['24v','24 v dc','riadiace napätie','0v','napájací zdroj','poistka'],
    tools: ['Multimeter'], quickCheck: ['Zvoliť V ⎓', 'Nájsť +24 V a 0 V v schéme', 'Porovnať zdroj a spotrebič'],
    steps: [
      { title: 'Nastav multimeter', instruction: 'Zvoľ V ⎓ / V DC.', measurement: 'V DC' },
      { title: 'Nájdi referenčné body', instruction: 'Podľa schémy nájdi +24 V a 0 V / M.', warning: 'Nespoliehaj sa iba na farby vodičov.' },
      { title: 'Porovnaj napätie', instruction: 'Meraj na zdroji a priamo pri spotrebiči.', expected: 'Približne 24 V DC v 24-V obvode', interpretation: 'Rozdiel pomáha určiť chybný úsek.' }
    ], results: [
      { status: 'ok', condition: 'Približne 24 V je prítomných', explanation: 'Napájanie je v zásade dostupné.' },
      { status: 'warning', condition: 'Napätie chýba alebo výrazne klesá', explanation: 'Skontroluj napájanie, vedenie a zaťaženie.' }
    ]
  }),
  'drehstrommotor-ausmessen': t({
    title: 'Meranie trojfázového motora', description: 'Porovnanie vinutí trojfázového motora a rozpoznanie odchýlok.',
    symptoms: ['Motor nebeží', 'Motor hučí', 'Motor sa prehrieva', 'Vypína ochrana motora'], keywords: ['motor','trojfázový motor','vinutie','odpor','u1 u2','v1 v2','w1 w2'],
    tools: ['Multimeter', 'Prípadne vhodný merač izolácie'], quickCheck: ['Bezpečne odpojiť', 'Zdokumentovať zapojenie', 'Porovnať tri vinutia'],
    steps: [
      { title: 'Bezpečne odpoj motor', instruction: 'Odpoj motor, over beznapäťový stav a zdokumentuj zapojenie.', warning: 'Odpor meraj iba bez napätia.' },
      { title: 'Zmeraj vinutia', instruction: 'Zmeraj U1-U2, V1-V2 a W1-W2.', measurement: 'Ω', expected: 'Tri navzájom podobné hodnoty', interpretation: 'Výrazná odchýlka môže znamenať chybu vinutia alebo spoja.' },
      { title: 'Skontroluj voči kostre', instruction: 'Skontroluj spojenie s PE alebo kostrou motora.', warning: 'Multimeter nenahrádza odborné meranie izolácie.' }
    ], results: [
      { status: 'ok', condition: 'Tri podobné hodnoty', explanation: 'Vinutia pôsobia navzájom vierohodne.' },
      { status: 'danger', condition: 'OL na jednom vinutí', explanation: 'Môže ísť o prerušenie.' }
    ]
  }),
  'induktiven-sensor-pruefen': t({
    title: 'Kontrola indukčného snímača', description: 'Kontrola napájania, LED a výstupu indukčného snímača.',
    symptoms: ['Snímač nespína', 'PLC nerozpozná signál', 'Chýba signál'], keywords: ['indukčný snímač','snímač','proximity','napájanie','led','plc vstup'],
    tools: ['Multimeter', 'Vhodný kovový cieľ'], quickCheck: ['Pozrieť snímač a kábel', 'Skontrolovať typ a napájanie', 'Sledovať LED s kovovým cieľom'],
    steps: [
      { title: 'Vizuálna kontrola', instruction: 'Skontroluj plochu snímača, kábel, konektor, poškodenie, vzdialenosť a LED.' },
      { title: 'Skontroluj napájanie', instruction: 'Over napájanie a zapojenie podľa schémy alebo údajov snímača.', measurement: 'Napájanie snímača', warning: 'Zapojenie nepredpokladaj iba podľa farby vodičov.' },
      { title: 'Porovnaj signál', instruction: 'Prilož kovový cieľ a porovnaj LED, výstup a vstup PLC.', interpretation: 'LED reaguje, PLC nie: skontroluj vodič, svorku a vstup PLC.' }
    ], results: [
      { status: 'ok', condition: 'LED sa prepína', explanation: 'Snímač cieľ v zásade rozpoznáva.' },
      { status: 'warning', condition: 'LED reaguje, PLC nie', explanation: 'Skontroluj signálnu cestu a vstup PLC.' }
    ]
  }),
  'schuetz-pruefen': t({
    title: 'Kontrola stýkača', description: 'Kontrola riadiaceho napätia, cievky a hlavných kontaktov stýkača.',
    symptoms: ['Stýkač nezopne', 'Stýkač cvaká alebo hučí', 'Chýba fáza'], keywords: ['stýkač','kontaktor','a1 a2','cievka','hlavný kontakt','riadiaci obvod'],
    tools: ['Multimeter'], quickCheck: ['Vizuálna a zvuková kontrola', 'Zmerať A1-A2', 'Porovnať vstup a výstup'],
    steps: [
      { title: 'Identifikuj cievku', instruction: 'Over označenie A1/A2 a menovité napätie cievky.' },
      { title: 'Zmeraj riadiace napätie', instruction: 'Zvoľ V DC alebo V AC podľa cievky a meraj A1-A2 pri požiadavke na zopnutie.', measurement: 'A1 ↔ A2', expected: 'Menovité napätie podľa označenia alebo schémy' },
      { title: 'Skontroluj výkonovú cestu', instruction: 'Ak je to povolené, porovnaj napájanie pred a za stýkačom.', warning: 'Odpor cievky meraj iba bez napätia. Neexistuje univerzálna hodnota.' }
    ], results: [
      { status: 'ok', condition: 'Stýkač zopne', explanation: 'Spínanie v zásade funguje.' },
      { status: 'warning', condition: 'Napätie je prítomné, stýkač nezopne', explanation: 'Skontroluj cievku a mechaniku.' }
    ]
  }),
  '230-vac-pruefen': t({
    title: 'Kontrola 230 V AC', description: 'Systematické sledovanie napájania 230 V AC po prúdovej ceste.', symptoms: ['Chýba 230 V', 'Spotrebič nefunguje', 'Vypína ochrana'],
    keywords: ['230v','230 v ac','striedavé napätie','fáza','nulový vodič','l n'], tools: ['Vhodný multimeter', 'Elektrická schéma'], safetyNotes: ['Merania sieťového napätia vykonávaj iba v rozsahu prevádzkového oprávnenia.'], quickCheck: ['Zvoliť V AC', 'Určiť očakávaný merací bod', 'Postupovať po prúdovej ceste'],
    steps: [
      { title: 'Priprav meranie', instruction: 'Skontroluj prístroj, vodiče, kategóriu merania a očakávané napätie. Zvoľ V AC.' },
      { title: 'Sleduj napájanie', instruction: 'Podľa schémy postupuj cez ochranu, svorky a spínací prvok až k spotrebiču.', measurement: 'V AC na povolených bodoch', expected: 'Hodnota zodpovedá schéme', interpretation: 'Prvá odchýlka určí chybný úsek.' },
      { title: 'Porovnaj pri prevádzke', instruction: 'Porovnaj napájanie na spotrebiči v očakávanom stave.', warning: 'Nepremosťuj ochranné ani Safety funkcie.' }
    ], results: [{ status: 'ok', condition: 'Napájanie je vierohodné', explanation: 'Pokračuj kontrolou spotrebiča a riadenia.' }, { status: 'warning', condition: 'Napätie chýba', explanation: 'Postupuj späť k poslednému správnemu bodu.' }]
  }),
  '400-v-drehstrom-pruefen': t({
    title: 'Kontrola 400 V trojfázovej siete', description: 'Porovnanie troch medzifázových napätí a hľadanie možného výpadku fázy.', symptoms: ['Motor neštartuje', 'Motor hučí', 'Chýba fáza'],
    keywords: ['400v','trojfázové napätie','l1 l2','l2 l3','l1 l3','výpadok fázy'], tools: ['Vhodný multimeter', 'Elektrická schéma'], safetyNotes: ['Merania trojfázovej siete vykonávaj iba v rozsahu prevádzkového oprávnenia.'], quickCheck: ['Zvoliť V AC', 'Zmerať tri páry fáz', 'Porovnať hodnoty'],
    steps: [
      { title: 'Urči fázy', instruction: 'Podľa schémy a označenia nájdi L1, L2 a L3.', warning: 'Nespoliehaj sa iba na farby vodičov.' },
      { title: 'Zmeraj tri napätia', instruction: 'Zmeraj L1-L2, L2-L3 a L1-L3.', measurement: 'V AC', expected: 'Tri navzájom vierohodné hodnoty', interpretation: 'Odchýlka môže znamenať výpadok fázy alebo chybný kontakt.' },
      { title: 'Urči chybný úsek', instruction: 'Porovnaj hodnoty pred a za ochranou a spínacími prvkami.', warning: 'Smer otáčania nemožno určiť jednoduchým meraním napätia.' }
    ], results: [{ status: 'ok', condition: 'Tri hodnoty sú vierohodné', explanation: 'Pokračuj kontrolou motora, záťaže a riadenia.' }, { status: 'warning', condition: 'Jeden pár sa líši', explanation: 'Hľadaj možný výpadok fázy.' }]
  }),
  'motorschutz-pruefen': t({
    title: 'Kontrola ochrany motora', description: 'Rozpoznanie vypnutia, hľadanie príčiny a správne priradenie údajov motora.', symptoms: ['Ochrana motora vypla', 'Motor neštartuje', 'Ochrana vypína opakovane'],
    keywords: ['ochrana motora','nadprúdové relé','vypnuté','reset','prúd motora'], tools: ['Elektrická schéma', 'Údaje motora'], safetyNotes: ['Ochranu opakovane neresetuj bez zistenia príčiny.'], quickCheck: ['Skontrolovať signalizáciu', 'Nájsť príčinu pred resetom', 'Použiť platné údaje motora'],
    steps: [
      { title: 'Over vypnutie', instruction: 'Skontroluj signalizáciu, polohu a označenie ochrany.' },
      { title: 'Hľadaj príčinu', instruction: 'Skontroluj mechanické blokovanie, výpadok fázy, motor a vedenie.' },
      { title: 'Posúď nastavenie', instruction: 'Porovnaj prúd iba s platnými údajmi motora, zapojením a schémou.', warning: 'Nehádaj ani svojvoľne nezvyšuj nastavenie. Ochranu opakovane neresetuj bez zistenia príčiny.' }
    ], results: [{ status: 'warning', condition: 'Ochrana vypla', explanation: 'Pred resetom nájdi a odstráň príčinu.' }, { status: 'danger', condition: 'Opakované vypnutie', explanation: 'Ďalej neresetuj; zabezpeč odbornú kontrolu.' }]
  }),
  'relais-pruefen': t({
    title: 'Kontrola relé', description: 'Kontrola cievky, A1/A2 a rozpínacích aj spínacích kontaktov.', symptoms: ['Relé nezopne', 'Kontakt neprepína', 'Signál nepokračuje'],
    keywords: ['relé','a1 a2','cievka','rozpínací kontakt','spínací kontakt'], tools: ['Multimeter', 'Elektrická schéma'], quickCheck: ['Overiť napätie cievky', 'Skontrolovať A1/A2', 'Kontakty merať bez napätia'],
    steps: [
      { title: 'Identifikuj relé', instruction: 'Podľa schémy over napätie cievky, A1/A2 a označenie kontaktov.' },
      { title: 'Skontroluj ovládanie', instruction: 'Pri požiadavke na zopnutie zmeraj správne napätie na A1/A2.', measurement: 'A1 ↔ A2', expected: 'Menovité napätie podľa označenia' },
      { title: 'Skontroluj kontakty', instruction: 'Porovnaj rozpínací a spínací kontakt v pokoji a po zopnutí.', warning: 'Odpor a spojitosť meraj iba bez napätia. Cievka nemá univerzálny odpor.' }
    ], results: [{ status: 'ok', condition: 'Relé prepína', explanation: 'Skontroluj nasledujúcu časť signálnej cesty.' }, { status: 'warning', condition: 'Napätie je prítomné, relé neprepína', explanation: 'Skontroluj cievku, päticu a mechaniku.' }]
  }),
  'kapazitiven-sensor-pruefen': t({
    title: 'Kontrola kapacitného snímača', description: 'Kontrola napájania, detekcie, montáže a signálnej cesty.', symptoms: ['Snímač nespína', 'Snímač spína nespoľahlivo', 'PLC nevidí signál'],
    keywords: ['kapacitný snímač','médium','vzdialenosť','znečistenie','led','plc'], tools: ['Multimeter', 'Vhodný objekt alebo médium'], quickCheck: ['Skontrolovať napájanie', 'Porovnať LED s objektom', 'Skontrolovať vzdialenosť a znečistenie'],
    steps: [
      { title: 'Skontroluj montáž', instruction: 'Pozri plochu snímača, kábel, konektor, vzdialenosť, znečistenie a okolie.' },
      { title: 'Skontroluj napájanie', instruction: 'Over napájanie podľa schémy a údajov snímača.' },
      { title: 'Porovnaj detekciu', instruction: 'Sleduj LED, výstup a vstup PLC s objektom aj bez neho.', warning: 'Existujúce nastavenie nemeň naslepo.' }
    ], results: [{ status: 'ok', condition: 'LED a PLC reagujú', explanation: 'Snímač a signálna cesta fungujú v zásade správne.' }, { status: 'warning', condition: 'Reakcia je nestabilná', explanation: 'Skontroluj médium, vzdialenosť, znečistenie a montáž.' }]
  }),
  'lichtschranke-pruefen': t({
    title: 'Kontrola optického snímača', description: 'Kontrola napájania, optiky, nastavenia a výstupu svetelnej závory.', symptoms: ['Snímač nespína', 'Lúč je prerušený', 'PLC nevidí signál'],
    keywords: ['svetelná závora','reflexný snímač','difúzny snímač','reflektor','nastavenie','optika'], tools: ['Multimeter', 'Čistenie podľa prevádzkových pokynov'], quickCheck: ['Určiť typ', 'Vyčistiť a nastaviť optiku', 'Porovnať LED a PLC'],
    steps: [
      { title: 'Urči typ', instruction: 'Rozlíš vysielač/prijímač, reflexné vyhotovenie a difúzny snímač.' },
      { title: 'Skontroluj optickú cestu', instruction: 'Skontroluj znečistenie, smerovanie, reflektor a voľný priechod.' },
      { title: 'Skontroluj signál', instruction: 'Over napájanie, LED, výstup, kábel, svorku a vstup PLC.' }
    ], results: [{ status: 'ok', condition: 'LED a PLC reagujú', explanation: 'Detekcia funguje v zásade správne.' }, { status: 'warning', condition: 'LED nereaguje', explanation: 'Skontroluj napájanie, optiku, smerovanie a typ.' }]
  }),
  'sensor-oeffner-schliesser': t({
    title: 'Snímač – rozpínací alebo spínací kontakt', description: 'Jednoduché porovnanie výstupu, LED a vstupu PLC pri aktivácii snímača.', symptoms: ['Signál je opačný', 'Správanie snímača je nejasné'],
    keywords: ['snímač','rozpínací','spínací','no','nc','aktivovaný','plc'], tools: ['Elektrická schéma', 'Prípadne multimeter'], quickCheck: ['Prečítať typ výstupu', 'Porovnať dva stavy', 'Sledovať LED a PLC'],
    steps: [
      { title: 'Urči funkciu výstupu', instruction: 'V schéme alebo údajoch over, či sa používa spínací alebo rozpínací výstup.' },
      { title: 'Porovnaj stavy', instruction: 'Sleduj LED, výstup a PLC bez aktivácie a po aktivácii.', interpretation: 'Dôležitá je zmena medzi oboma stavmi.' },
      { title: 'Sleduj signálnu cestu', instruction: 'Pri odchýlke skontroluj snímač, kábel, svorku a vstup PLC.', hints: ['PNP/NPN je doplnková informácia, nie hlavná kontrola.'] }
    ], results: [{ status: 'ok', condition: 'Zmena stavu je správna', explanation: 'Správanie zodpovedá schéme.' }, { status: 'warning', condition: 'LED a PLC si odporujú', explanation: 'Skontroluj vedenie, svorku a vstup.' }]
  }),
  'sps-eingang-pruefen': t({
    title: 'Kontrola vstupu PLC', description: 'Kontrola signálnej cesty od snímača po vstup PLC.', symptoms: ['PLC nevidí signál', 'LED vstupu nesvieti'], keywords: ['plc vstup','vstupný modul','snímač','svorka','24v'],
    tools: ['Elektrická schéma', 'Multimeter'], quickCheck: ['Sledovať snímač', 'Skontrolovať kábel a svorku', 'Porovnať LED vstupu'],
    steps: [
      { title: 'Skontroluj snímač', instruction: 'Over napájanie, LED a výstup snímača.' },
      { title: 'Sleduj cestu', instruction: 'Postupuj snímač → kábel → svorka → vstup PLC.', expected: 'Zmena signálu v každom úseku', interpretation: 'Prvé miesto bez zmeny určí chybný úsek.' },
      { title: 'Posúď vstup', instruction: 'Porovnaj elektrický signál, svorku a LED vstupu.', warning: 'Nepremosťuj Safety funkcie.' }
    ], results: [{ status: 'ok', condition: 'Signál aj LED sa menia', explanation: 'Hardvérová cesta funguje v zásade správne.' }, { status: 'warning', condition: 'Signál sa po ceste stratí', explanation: 'Skontroluj príslušný vodič alebo svorku.' }]
  }),
  'sps-ausgang-pruefen': t({
    title: 'Kontrola výstupu PLC', description: 'Kontrola signálnej cesty od výstupu PLC po spotrebič.', symptoms: ['Výstup nespína', 'Ventil alebo stýkač nereaguje'], keywords: ['plc výstup','výstupný modul','relé','stýkač','ventil'],
    tools: ['Elektrická schéma', 'Multimeter'], quickCheck: ['Skontrolovať LED výstupu', 'Sledovať signálnu cestu', 'Overiť napájanie výstupného obvodu'],
    steps: [
      { title: 'Over podmienky', instruction: 'Skontroluj prevádzkový stav, diagnostiku a povolené podmienky riadenia.' },
      { title: 'Sleduj cestu', instruction: 'Postupuj PLC → výstup → svorka → relé/stýkač/ventil → spotrebič.' },
      { title: 'Urči odchýlku', instruction: 'Porovnaj LED výstupu, svorku a pripojenie spotrebiča.', warning: 'Výstup nevynucuj bez schváleného postupu a nepremosťuj Safety funkcie.' }
    ], results: [{ status: 'ok', condition: 'Signál dosiahne spotrebič', explanation: 'Skontroluj spotrebič a spätnú väzbu.' }, { status: 'warning', condition: 'LED svieti, signál chýba', explanation: 'Skontroluj výstupný obvod, svorku a napájanie.' }]
  }),
  'magnetventil-spule-pruefen': t({
    title: 'Kontrola elektromagnetického ventilu / cievky', description: 'Rozlíšenie elektrickej a pneumatickej príčiny poruchy ventilu.', symptoms: ['Ventil neprepína', 'Cievka nereaguje', 'Chýba pohyb'], keywords: ['elektromagnetický ventil','cievka','ventil','stlačený vzduch','konektor'],
    tools: ['Multimeter', 'Elektrická schéma', 'Pneumatická schéma, ak je dostupná'], quickCheck: ['Rozlíšiť elektrickú a pneumatickú časť', 'Zmerať napätie cievky', 'Skontrolovať vzduch a mechaniku'],
    steps: [
      { title: 'Rozlíš príčinu', instruction: 'Skontroluj indikáciu, zvuk a pohyb: prichádza elektrický povel?' },
      { title: 'Skontroluj cievku', instruction: 'Over konektor, vedenie a správne napätie na cievke.', expected: 'Menovité napätie podľa označenia pri zopnutí' },
      { title: 'Skontroluj pneumatiku', instruction: 'Over tlak vzduchu, stav ventilu a mechanické blokovanie.', warning: 'Ručné ovládanie použi iba vtedy, keď je prevádzkovo povolené.' }
    ], results: [{ status: 'warning', condition: 'Na cievke nie je napätie', explanation: 'Skontroluj riadenie a výstupný obvod.' }, { status: 'warning', condition: 'Napätie je prítomné, pohyb chýba', explanation: 'Skontroluj cievku, ventil a pneumatiku.' }]
  }),
  'temperatursensor-pruefen': t({
    title: 'Kontrola teplotného snímača', description: 'Kontrola typu snímača, vedenia a vstupu bez automatického predpokladu PT100.', symptoms: ['Teplota je nevierohodná', 'Prerušenie snímača', 'Skrat'],
    keywords: ['teplotný snímač','pt100','odpor','prerušenie','skrat','vstupná karta'], tools: ['Multimeter', 'Elektrická schéma', 'Dokumentácia snímača'], quickCheck: ['Určiť typ snímača', 'Skontrolovať vedenie a svorky', 'Zohľadniť vstup a nastavenie'],
    steps: [
      { title: 'Urči typ snímača', instruction: 'Skontroluj typový štítok, schému a zapojenie. Nepovažuj každý snímač automaticky za PT100.' },
      { title: 'Skontroluj vedenie', instruction: 'Hľadaj prerušenie, skrat a uvoľnené svorky.', warning: 'Odpor posudzuj iba bez napätia a po oddelení od meracieho obvodu.' },
      { title: 'Posúď hodnotu', instruction: 'Porovnaj ju so schválenou dokumentáciou skutočného typu.', interpretation: 'Príčinou môže byť aj vstupná karta alebo parametrizácia.' }
    ], results: [{ status: 'ok', condition: 'Snímač a vedenie sú vierohodné', explanation: 'Skontroluj vstupnú kartu a parametrizáciu.' }, { status: 'warning', condition: 'Prerušenie alebo skrat', explanation: 'Urči chybu snímača, vedenia alebo svorky.' }]
  }),
  'heizung-ausmessen': t({
    title: 'Meranie ohrievača', description: 'Kontrola jednoduchej odporovej záťaže a rozlíšenie zložitejšieho zapojenia.', symptoms: ['Ohrievač nehreje', 'Vypína ochrana', 'Chýba výkon'], keywords: ['ohrievač','vykurovacie teleso','odpor','výkon','prúd','i p u','r u2 p'],
    tools: ['Multimeter', 'Typový štítok', 'Elektrická schéma'], quickCheck: ['Určiť zapojenie', 'Bezpečne odpojiť', 'Porovnať odpor s údajmi'],
    steps: [
      { title: 'Urči zapojenie', instruction: 'Rozlíš jednoduchú jednofázovú záťaž a viacfázové, stupňové, hviezdicové alebo trojuholníkové zapojenie.' },
      { title: 'Zmeraj odpor', instruction: 'Bezpečne odpoj a odstráň paralelné cesty.', measurement: 'Ω', warning: 'Odpor meraj iba bez napätia.' },
      { title: 'Over vierohodnosť', instruction: 'Pre jednoduchú odporovú záťaž platí I = P / U a R = U² / P.', warning: 'Zložité viacfázové ohrievače neposudzuj ako jednoduchú jednofázovú záťaž.' }
    ], results: [{ status: 'ok', condition: 'Odpor je vierohodný', explanation: 'Skontroluj napájanie, spínanie a reguláciu.' }, { status: 'warning', condition: 'Prerušenie alebo veľká odchýlka', explanation: 'Skontroluj teleso, spoj a typ zapojenia.' }]
  }),
  'elektroschema-stoerung-suchen': t({
    title: 'Čítanie schémy – hľadanie poruchy', description: 'Nájdenie prúdovej alebo signálnej cesty počas poruchy.', symptoms: ['Nejasný merací bod', 'Hľadanie signálnej cesty'], keywords: ['elektrická schéma','prúdová cesta','signálna cesta','svorka','napájanie'],
    tools: ['Aktuálna schválená elektrická schéma'], quickCheck: ['Nájsť spotrebič', 'Postupovať späť', 'Pred meraním určiť očakávanie'],
    steps: [
      { title: 'Urči cieľ', instruction: 'Nájdi spotrebič alebo signál, ktorý nefunguje podľa očakávania.' },
      { title: 'Sleduj cestu', instruction: 'Postupuj spotrebič → spínací prvok → ochrana → svorky → riadenie → napájanie.' },
      { title: 'Naplánuj merania', instruction: 'Pred každým meraním si povedz: Čo tu očakávam?', interpretation: 'Prvá odchýlka medzi očakávaním a meraním určí chybný úsek.' }
    ], results: [{ status: 'ok', condition: 'Chybný úsek je určený', explanation: 'Cielene skontroluj prvok, vedenie alebo riadenie.' }, { status: 'info', condition: 'Cesta je nejasná', explanation: 'Skontroluj označenia a odkazy v schválenej schéme.' }]
  }),
  'komponenten-schaltschrank-erkennen': t({
    title: 'Rozpoznanie prvkov v rozvádzači', description: 'Priradenie bežných prvkov, ich stručnej funkcie a vhodného kontrolného článku.', symptoms: ['Neznámy prvok', 'Hľadanie prvku v rozvádzači'], keywords: ['rozvádzač','poistka','istič','zdroj','stýkač','ochrana motora','relé','plc','menič','svorka'],
    tools: ['Elektrická schéma', 'Označenie prvku'], quickCheck: ['Prečítať označenie', 'Nájsť symbol v schéme', 'Otvoriť vhodný článok'],
    steps: [
      { title: 'Prečítaj označenie', instruction: 'Skontroluj označenie zariadenia, typový štítok a svorky bez zmeny nastavení.' },
      { title: 'Priraď funkciu', instruction: 'Urči, či ide o ochranu, napájanie, spínanie, riadenie alebo pripojenie.', hints: ['Bežné skupiny: poistka/istič, zdroj, stýkač, ochrana motora, relé, bezpečnostné relé, PLC, I/O modul, frekvenčný menič a svorky.'] },
      { title: 'Vyber kontrolu', instruction: 'Otvor vhodný článok a postupuj podľa schémy.', warning: 'Neznáme parametre nemeň.' }
    ], results: [{ status: 'ok', condition: 'Prvok je priradený', explanation: 'Použi vhodný kontrolný článok.' }, { status: 'info', condition: 'Prvok je nejasný', explanation: 'Porovnaj štítok, schému a schválenú dokumentáciu.' }]
  }),
  'sicherung-leitungsschutz-pruefen': t({
    title: 'Kontrola poistky / ističa', description: 'Rozpoznanie vypnutia, kontrola bez napätia a zohľadnenie príčiny.', symptoms: ['Poistka vypnutá', 'Istič vypol', 'Chýba napájanie'], keywords: ['poistka','istič','spojitosť','vypnuté','menovitá hodnota'],
    tools: ['Multimeter', 'Elektrická schéma'], safetyNotes: ['Nevkladaj vyššiu menovitú hodnotu a ochranu opakovane neresetuj bez zistenia príčiny.'], quickCheck: ['Skontrolovať polohu', 'Spojitosť iba bez napätia', 'Nájsť príčinu pred resetom'],
    steps: [
      { title: 'Skontroluj stav', instruction: 'Pozri signalizáciu, polohu, označenie a priradený obvod.', interpretation: 'Vizuálna kontrola nemusí potvrdiť elektrickú funkciu.' },
      { title: 'Skontroluj bez napätia', instruction: 'Po bezpečnom odpojení zmeraj spojitosť alebo odpor, ak je to pre prvok dovolené.', warning: 'Spojitosť a odpor meraj iba bez napätia.' },
      { title: 'Hľadaj príčinu', instruction: 'Skontroluj záťaž, vedenie a nasledujúce prvky.', warning: 'Nevkladaj vyššiu menovitú hodnotu a neopakuj reset bez zistenia príčiny.' }
    ], results: [{ status: 'ok', condition: 'Ochranný prvok je vierohodný', explanation: 'Skontroluj napájanie a nasledujúcu prúdovú cestu.' }, { status: 'danger', condition: 'Opakované vypnutie', explanation: 'Ďalej neresetuj; príčinu odborne over.' }]
  })
}
