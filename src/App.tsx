import { useEffect, useMemo, useState } from 'react'
import {
  ArrowLeft, BookOpenText, CaretRight, CheckCircle, Circuitry, Gauge, House,
  Info, MagnifyingGlass, Plugs, ShieldWarning, Sparkle, Warning, Wrench, X
} from '@phosphor-icons/react'
import { articles, articleById } from './data/articles'
import { motorNotRunning } from './data/decisionTrees'
import { APP_VERSION, BASICS, CATEGORIES, SAFETY_NOTICE } from './data/meta'
import { search } from './lib/search'
import type { Article, DecisionNode, Status } from './types'

type Tab = 'home' | 'topics' | 'fault' | 'basics'
type View = { type: 'tab'; tab: Tab } | { type: 'article'; id: string } | { type: 'fault'; nodeId: string; history: string[] }

const navItems: { id: Tab; label: string; icon: typeof House }[] = [
  { id: 'home', label: 'Home', icon: House }, { id: 'topics', label: 'Themen', icon: BookOpenText },
  { id: 'fault', label: 'Störung', icon: Wrench }, { id: 'basics', label: 'Grundlagen', icon: Circuitry }
]

const quickIds = ['multimeter-bedienen','24-vdc-pruefen','drehstrommotor-ausmessen','induktiven-sensor-pruefen','schuetz-pruefen']
const categoryIcons = [Gauge, Plugs, Sparkle, Circuitry, CheckCircle, Warning, BookOpenText, Wrench]

export function App() {
  const [view, setView] = useState<View>({ type: 'tab', tab: 'home' })
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState<string | null>(null)
  const [showSafety, setShowSafety] = useState(() => localStorage.getItem('echeck-safety-seen') !== '1')
  const results = useMemo(() => search(query), [query])
  const activeTab: Tab = view.type === 'tab' ? view.tab : view.type === 'fault' ? 'fault' : 'topics'

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [view])

  const openArticle = (id: string) => { setQuery(''); setView({ type: 'article', id }) }
  const startFault = () => setView({ type: 'fault', nodeId: motorNotRunning.start, history: [] })
  const navigateTab = (tab: Tab) => { setQuery(''); setCategory(null); setView({ type: 'tab', tab }) }
  const closeSafety = () => { localStorage.setItem('echeck-safety-seen', '1'); setShowSafety(false) }

  return (
    <div className="app-shell">
      <a className="skip-link" href="#main">Zum Inhalt</a>
      <main id="main" className="main-content">
        {view.type === 'tab' && view.tab === 'home' && <Home query={query} setQuery={setQuery} results={results} openArticle={openArticle} startFault={startFault} />}
        {view.type === 'tab' && view.tab === 'topics' && <Topics category={category} setCategory={setCategory} openArticle={openArticle} />}
        {view.type === 'tab' && view.tab === 'fault' && <FaultOverview startFault={startFault} />}
        {view.type === 'tab' && view.tab === 'basics' && <Basics openArticle={openArticle} />}
        {view.type === 'article' && <ArticleView article={articleById(view.id)} onBack={() => navigateTab('topics')} openArticle={openArticle} />}
        {view.type === 'fault' && <FaultFlow view={view} setView={setView} openArticle={openArticle} />}
      </main>
      <nav className="bottom-nav" aria-label="Hauptnavigation">
        {navItems.map(({ id, label, icon: Icon }) => <button key={id} className={activeTab === id ? 'active' : ''} onClick={() => navigateTab(id)} aria-current={activeTab === id ? 'page' : undefined}><Icon size={23} weight={activeTab === id ? 'fill' : 'regular'} /><span>{label}</span></button>)}
      </nav>
      {showSafety && <SafetyDialog onClose={closeSafety} />}
    </div>
  )
}

function Header({ eyebrow, title, back }: { eyebrow?: string; title: string; back?: () => void }) {
  return <header className="page-header">{back && <button className="icon-button" onClick={back} aria-label="Zurück"><ArrowLeft size={22} /></button>}<div>{eyebrow && <span className="eyebrow">{eyebrow}</span>}<h1>{title}</h1></div></header>
}

function Home({ query, setQuery, results, openArticle, startFault }: { query: string; setQuery: (v: string) => void; results: ReturnType<typeof search>; openArticle: (id: string) => void; startFault: () => void }) {
  return <div className="page home-page">
    <div className="brand-row"><div className="brand-icon">E<span>+</span></div><div><span className="eyebrow">Instandhaltung · Offline bereit</span><h1>E-Check</h1></div><span className="version-pill">0.1</span></div>
    <section className="search-panel"><label htmlFor="search">Was möchtest du prüfen?</label><div className="search-input"><MagnifyingGlass size={22}/><input id="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Motor, Sensor, 24 V, Schütz …" autoComplete="off" />{query && <button onClick={() => setQuery('')} aria-label="Suche leeren"><X size={18}/></button>}</div>
      {query && <div className="search-results" aria-live="polite">{results.length ? results.map((result) => <button key={`${result.type}-${result.id}`} onClick={() => result.type === 'fault' ? startFault() : openArticle(result.id)}><span className="result-icon">{result.type === 'fault' ? <Wrench size={20}/> : <BookOpenText size={20}/>}</span><span><strong>{result.title}</strong><small>{result.category}</small></span><CaretRight size={18}/></button>) : <div className="empty-state"><MagnifyingGlass size={24}/><strong>Nichts gefunden</strong><span>Versuche einen Bauteilnamen, ein Symptom oder eine Klemmenbezeichnung.</span></div>}</div>}
    </section>
    {!query && <>
      <SectionTitle title="Häufig gebraucht" subtitle="Direkt zum Prüfschritt" />
      <div className="quick-grid">{quickIds.map((id, index) => { const article = articleById(id)!; const Icon = categoryIcons[index]; return <button key={id} className="quick-card" onClick={() => openArticle(id)}><span className="quick-icon"><Icon size={24}/></span><strong>{article.title.replace('Drehstrommotor ausmessen','Motor prüfen').replace('Induktiven Sensor prüfen','Sensor prüfen')}</strong><CaretRight size={18}/></button> })}<button className="quick-card muted-card" disabled><span className="quick-icon"><BookOpenText size={24}/></span><strong>Schema lesen</strong><small>folgt</small></button></div>
      <SectionTitle title="Störung?" subtitle="Schritt für Schritt eingrenzen" />
      <div className="fault-list"><button className="fault-card featured" onClick={startFault}><span><Wrench size={24}/></span><div><strong>Motor läuft nicht</strong><small>Geführte Fehlersuche</small></div><CaretRight size={20}/></button>{['Sensor schaltet nicht','Schütz zieht nicht an','SPS bekommt kein Signal'].map((label) => <button className="fault-card" disabled key={label}><span><Circuitry size={22}/></span><div><strong>{label}</strong><small>folgt</small></div></button>)}</div>
      <About />
    </>}
  </div>
}

function SectionTitle({ title, subtitle }: { title: string; subtitle: string }) { return <div className="section-title"><div><h2>{title}</h2><p>{subtitle}</p></div></div> }

function Topics({ category, setCategory, openArticle }: { category: string | null; setCategory: (v: string | null) => void; openArticle: (id: string) => void }) {
  const matching = articles.filter((article) => article.category === category)
  return <div className="page"><Header title={category ?? 'Themen'} eyebrow="Wissensbibliothek" back={category ? () => setCategory(null) : undefined}/>{!category ? <div className="category-grid">{CATEGORIES.map((item, index) => { const Icon = categoryIcons[index]; const count = articles.filter((article) => article.category === item).length; return <button key={item} className="category-card" onClick={() => setCategory(item)}><span><Icon size={26}/></span><div><strong>{item}</strong><small>{count ? `${count} ${count === 1 ? 'Artikel' : 'Artikel'}` : 'Vorbereitet'}</small></div><CaretRight size={19}/></button> })}</div> : matching.length ? <div className="article-list">{matching.map((article) => <ArticleListItem key={article.id} article={article} open={() => openArticle(article.id)}/>)}</div> : <div className="empty-state surface"><BookOpenText size={30}/><strong>Kategorie ist vorbereitet</strong><span>Inhalte folgen mit einer neuen Appversion.</span></div>}</div>
}

function ArticleListItem({ article, open }: { article: Article; open: () => void }) { return <button className="article-list-item" onClick={open}><span className="result-icon"><BookOpenText size={21}/></span><span><strong>{article.title}</strong><small>{article.description}</small></span><CaretRight size={19}/></button> }

function FaultOverview({ startFault }: { startFault: () => void }) { return <div className="page"><Header title="Störung" eyebrow="Geführte Fehlersuche"/><div className="intro-card"><span className="hero-symbol"><Wrench size={33}/></span><span className="eyebrow">Version 0.1</span><h2>Motor läuft nicht</h2><p>Eine Frage pro Schritt. Du kannst jederzeit zurückgehen oder neu starten.</p><button className="primary-button" onClick={startFault}>Fehlersuche starten <CaretRight size={20}/></button></div><div className="notice info"><Info size={21}/><p>Weitere Störungsbäume für Sensoren, Schütze und SPS-Signale folgen.</p></div></div> }

function Basics({ openArticle }: { openArticle: (id: string) => void }) { return <div className="page"><Header title="Grundlagen" eyebrow="Schnell nachschlagen"/><div className="basics-grid">{BASICS.map((item) => { const linked = item === 'Multimeter' ? 'multimeter-bedienen' : item === '24 VDC' ? '24-vdc-pruefen' : item === 'Schütz' ? 'schuetz-pruefen' : null; return <button key={item} disabled={!linked} onClick={() => linked && openArticle(linked)}><strong>{item}</strong><small>{linked ? 'Artikel öffnen' : 'folgt'}</small>{linked && <CaretRight size={17}/>}</button> })}</div><About/></div> }

function ArticleView({ article, onBack, openArticle }: { article?: Article; onBack: () => void; openArticle: (id: string) => void }) {
  if (!article) return <div className="page"><Header title="Artikel nicht gefunden" back={onBack}/></div>
  return <article className="page article-page"><Header title={article.title} eyebrow={article.category} back={onBack}/><section className="problem-card"><span>Problem</span><p>{article.description}</p></section><section><h2>Du brauchst</h2><div className="chip-row">{article.tools.map((tool) => <span className="chip" key={tool}><Wrench size={16}/>{tool}</span>)}</div></section><section><h2>Prüfen</h2><div className="steps">{article.steps.map((step, index) => <div className="step" key={`${step.title}-${index}`}><div className="step-number">{index + 1}</div><div><h3>{step.title}</h3><p>{step.instruction}</p>{step.measurement && <div className="measurement"><span>Messung</span><strong>{step.measurement}</strong></div>}{step.expected && <div className="expectation"><span>Erwartung</span><strong>{step.expected}</strong></div>}{step.warning && <div className="inline-warning"><ShieldWarning size={20}/><span>{step.warning}</span></div>}</div></div>)}</div></section><section><h2>Ergebnis</h2><div className="result-cards">{article.results.map((result) => <StatusCard key={result.condition} {...result}/>)}</div></section>{article.relatedArticles.length > 0 && <section><h2>Danach prüfen</h2><div className="related-list">{article.relatedArticles.map((id) => { const related = articleById(id); return related && <button key={id} onClick={() => openArticle(id)}><span>{related.title}</span><CaretRight size={18}/></button> })}</div></section>}</article>
}

function StatusCard({ status, condition, explanation }: { status: Status; condition: string; explanation: string }) { const Icon = status === 'ok' ? CheckCircle : status === 'danger' ? ShieldWarning : Warning; return <div className={`status-card ${status}`}><Icon size={22} weight="fill"/><div><strong>{condition}</strong><p>{explanation}</p></div></div> }

function FaultFlow({ view, setView, openArticle }: { view: Extract<View,{type:'fault'}>; setView: (v: View) => void; openArticle: (id: string) => void }) {
  const node: DecisionNode = motorNotRunning.nodes[view.nodeId]
  const select = (next: string) => setView({ type: 'fault', nodeId: next, history: [...view.history, view.nodeId] })
  const back = () => view.history.length ? setView({ type: 'fault', nodeId: view.history.at(-1)!, history: view.history.slice(0,-1) }) : setView({ type: 'tab', tab: 'fault' })
  return <div className="page fault-flow"><Header title="Motor läuft nicht" eyebrow={`Schritt ${view.history.length + 1}`} back={back}/><div className="progress"><span style={{ width: `${Math.min(100, 18 + view.history.length * 14)}%` }}/></div><section className="decision-card"><span className="decision-type">{node.kind === 'question' ? 'Prüffrage' : 'Nächster sinnvoller Schritt'}</span><h2>{node.title}</h2>{node.help && <div className="notice info"><Info size={20}/><p>{node.help}</p></div>}{node.actions && <ol>{node.actions.map((action) => <li key={action}>{action}</li>)}</ol>}{node.options && <div className="decision-options">{node.options.map((option) => <button key={option.label} onClick={() => select(option.next)}>{option.label}<CaretRight size={19}/></button>)}</div>}{node.relatedArticles && node.relatedArticles.length > 0 && <div className="decision-related"><span>Passende Artikel</span>{node.relatedArticles.map((id) => <button key={id} onClick={() => openArticle(id)}><BookOpenText size={19}/>{articleById(id)?.title}<CaretRight size={18}/></button>)}</div>}</section><div className="flow-actions"><button onClick={back}><ArrowLeft size={18}/> Zurück</button><button onClick={() => setView({ type:'fault', nodeId:motorNotRunning.start, history:[] })}>Neu starten</button></div></div>
}

function About() { return <section className="about"><div className="brand-icon small">E<span>+</span></div><div><strong>E-Check</strong><span>Version {APP_VERSION}</span></div></section> }

function SafetyDialog({ onClose }: { onClose: () => void }) { return <div className="dialog-backdrop" role="presentation"><section className="safety-dialog" role="dialog" aria-modal="true" aria-labelledby="safety-title"><span className="safety-icon"><ShieldWarning size={30}/></span><span className="eyebrow">Vor dem Start</span><h2 id="safety-title">Sicher arbeiten</h2><p>{SAFETY_NOTICE}</p><button className="primary-button" onClick={onClose} autoFocus>Verstanden</button></section></div> }
