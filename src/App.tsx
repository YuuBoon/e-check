import { useEffect, useMemo, useState } from 'react'
import { useRegisterSW } from 'virtual:pwa-register/react'
import {
  ArrowLeft, BookOpenText, CaretRight, CheckCircle, Circuitry, Gauge, House,
  Info, MagnifyingGlass, Plugs, ShieldWarning, Sparkle, Translate, Warning, Wrench, X
} from '@phosphor-icons/react'
import { articleById, localizedArticles } from './data/articles'
import { localizedDecisionTree, motorNotRunning } from './data/decisionTrees'
import { APP_VERSION, BASICS, CATEGORIES, CONTENT_VERSION } from './data/meta'
import { search } from './lib/search'
import { readPreference, writePreference } from './lib/storage'
import { advanceFault, backFault, restartFault } from './lib/faultNavigation'
import { SUPPORTED_LOCALES, useI18n, type MessageKey } from './i18n'
import type { Article, ArticleImage, DecisionNode, DecisionTree, Status } from './types'

type Tab = 'home' | 'topics' | 'fault' | 'basics'
type View = { type: 'tab'; tab: Tab } | { type: 'article'; id: string } | { type: 'fault'; nodeId: string; history: string[] }

const navItems: { id: Tab; label: MessageKey; icon: typeof House }[] = [
  { id: 'home', label: 'home', icon: House }, { id: 'topics', label: 'topics', icon: BookOpenText },
  { id: 'fault', label: 'fault', icon: Wrench }, { id: 'basics', label: 'basics', icon: Circuitry }
]

const quickIds = ['multimeter-bedienen','24-vdc-pruefen','drehstrommotor-ausmessen','induktiven-sensor-pruefen','schuetz-pruefen']
const categoryIcons = [Gauge, Plugs, Sparkle, Circuitry, CheckCircle, Warning, BookOpenText, Wrench]

export function App() {
  const { locale, t } = useI18n()
  const [view, setView] = useState<View>({ type: 'tab', tab: 'home' })
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState<string | null>(null)
  const [showSafety, setShowSafety] = useState(() => readPreference('safety-seen', 'echeck-safety-seen') !== '1')
  const currentArticles = useMemo(() => localizedArticles(locale), [locale])
  const currentTree = useMemo(() => localizedDecisionTree(motorNotRunning, locale), [locale])
  const results = useMemo(() => search(query, currentArticles, locale), [currentArticles, locale, query])
  const activeTab: Tab = view.type === 'tab' ? view.tab : view.type === 'fault' ? 'fault' : 'topics'
  const { needRefresh: [needRefresh, setNeedRefresh], updateServiceWorker } = useRegisterSW({ immediate: true })

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [view])

  const openArticle = (id: string) => { setQuery(''); setView({ type: 'article', id }) }
  const startFault = () => setView({ type: 'fault', ...restartFault(motorNotRunning.start) })
  const navigateTab = (tab: Tab) => { setQuery(''); setCategory(null); setView({ type: 'tab', tab }) }
  const closeSafety = () => { writePreference('safety-seen', '1', 'echeck-safety-seen'); setShowSafety(false) }

  return (
    <div className="app-shell">
      <a className="skip-link" href="#main">{t('skipToContent')}</a>
      <main id="main" className="main-content">
        {view.type === 'tab' && view.tab === 'home' && <Home query={query} setQuery={setQuery} results={results} openArticle={openArticle} startFault={startFault} />}
        {view.type === 'tab' && view.tab === 'topics' && <Topics category={category} setCategory={setCategory} openArticle={openArticle} />}
        {view.type === 'tab' && view.tab === 'fault' && <FaultOverview tree={currentTree} startFault={startFault} />}
        {view.type === 'tab' && view.tab === 'basics' && <Basics openArticle={openArticle} />}
        {view.type === 'article' && <ArticleView article={articleById(view.id, locale)} onBack={() => navigateTab('topics')} openArticle={openArticle} />}
        {view.type === 'fault' && <FaultFlow tree={currentTree} view={view} setView={setView} openArticle={openArticle} />}
      </main>
      <nav className="bottom-nav" aria-label={t('mainNavigation')}>
        {navItems.map(({ id, label, icon: Icon }) => <button key={id} className={activeTab === id ? 'active' : ''} onClick={() => navigateTab(id)} aria-current={activeTab === id ? 'page' : undefined}><Icon size={23} weight={activeTab === id ? 'fill' : 'regular'} /><span>{t(label)}</span></button>)}
      </nav>
      {needRefresh && <UpdateNotice onUpdate={() => updateServiceWorker(true)} onLater={() => setNeedRefresh(false)} />}
      {showSafety && <SafetyDialog onClose={closeSafety} />}
    </div>
  )
}

function Header({ eyebrow, title, back }: { eyebrow?: string; title: string; back?: () => void }) {
  const { t } = useI18n()
  return <header className="page-header">{back && <button className="icon-button" onClick={back} aria-label={t('back')}><ArrowLeft size={22} /></button>}<div>{eyebrow && <span className="eyebrow">{eyebrow}</span>}<h1>{title}</h1></div></header>
}

function Home({ query, setQuery, results, openArticle, startFault }: { query: string; setQuery: (v: string) => void; results: ReturnType<typeof search>; openArticle: (id: string) => void; startFault: () => void }) {
  const { locale, setLocale, t, categoryLabel } = useI18n()
  return <div className="page home-page">
    <div className="brand-row"><div className="brand-icon">E<span>+</span></div><div><span className="eyebrow">{t('maintenanceOffline')}</span><h1>E-Check</h1></div><div className="brand-actions"><span className="version-pill">{APP_VERSION}</span><div className="language-switch" role="group" aria-label={t('language')}><Translate size={15}/>{SUPPORTED_LOCALES.map((option) => <button key={option.id} className={locale === option.id ? 'active' : ''} onClick={() => setLocale(option.id)} aria-pressed={locale === option.id} title={option.name}>{option.shortLabel}</button>)}</div></div></div>
    <section className="search-panel"><label htmlFor="search">{t('searchQuestion')}</label><div className="search-input"><MagnifyingGlass size={22}/><input id="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder={t('searchPlaceholder')} autoComplete="off" />{query && <button onClick={() => setQuery('')} aria-label={t('clearSearch')}><X size={18}/></button>}</div>
      {query && <div className="search-results" aria-live="polite">{results.length ? results.map((result) => <button key={`${result.type}-${result.id}`} onClick={() => result.type === 'fault' ? startFault() : openArticle(result.id)}><span className="result-icon">{result.type === 'fault' ? <Wrench size={20}/> : <BookOpenText size={20}/>}</span><span><strong>{result.title}</strong><small>{categoryLabel(result.category)}</small></span><CaretRight size={18}/></button>) : <div className="empty-state"><MagnifyingGlass size={24}/><strong>{t('nothingFound')}</strong><span>{t('searchHint')}</span></div>}</div>}
    </section>
    {!query && <>
      <SectionTitle title={t('frequentlyUsed')} subtitle={t('directToCheck')} />
      <div className="quick-grid">{quickIds.map((id, index) => { const article = articleById(id, locale)!; const Icon = categoryIcons[index]; return <button key={id} className="quick-card" onClick={() => openArticle(id)}><span className="quick-icon"><Icon size={24}/></span><strong>{article.title}</strong><CaretRight size={18}/></button> })}<button className="quick-card muted-card" disabled><span className="quick-icon"><BookOpenText size={24}/></span><strong>{t('schema')}</strong><small>{t('comingSoon')}</small></button></div>
      <SectionTitle title={t('faultQuestion')} subtitle={t('narrowDownStepwise')} />
      <div className="fault-list"><button className="fault-card featured" onClick={startFault}><span><Wrench size={24}/></span><div><strong>{t('motorNotRunning')}</strong><small>{t('guidedTroubleshooting')}</small></div><CaretRight size={20}/></button>{(['sensorNotSwitching','contactorNotPulling','plcNoSignal'] as MessageKey[]).map((key) => <button className="fault-card" disabled key={key}><span><Circuitry size={22}/></span><div><strong>{t(key)}</strong><small>{t('comingSoon')}</small></div></button>)}</div>
      <About />
    </>}
  </div>
}

function SectionTitle({ title, subtitle }: { title: string; subtitle: string }) { return <div className="section-title"><div><h2>{title}</h2><p>{subtitle}</p></div></div> }

function Topics({ category, setCategory, openArticle }: { category: string | null; setCategory: (v: string | null) => void; openArticle: (id: string) => void }) {
  const { locale, t, categoryLabel, articleCountLabel } = useI18n()
  const currentArticles = useMemo(() => localizedArticles(locale), [locale])
  const matching = currentArticles.filter((article) => article.category === category)
  return <div className="page"><Header title={category ? categoryLabel(category) : t('topics')} eyebrow={t('knowledgeLibrary')} back={category ? () => setCategory(null) : undefined}/>{!category ? <div className="category-grid">{CATEGORIES.map((item, index) => { const Icon = categoryIcons[index]; const count = currentArticles.filter((article) => article.category === item).length; return <button key={item} className="category-card" onClick={() => setCategory(item)}><span><Icon size={26}/></span><div><strong>{categoryLabel(item)}</strong><small>{count ? articleCountLabel(count) : t('prepared')}</small></div><CaretRight size={19}/></button> })}</div> : matching.length ? <div className="article-list">{matching.map((article) => <ArticleListItem key={article.id} article={article} open={() => openArticle(article.id)}/>)}</div> : <div className="empty-state surface"><BookOpenText size={30}/><strong>{t('categoryPrepared')}</strong><span>{t('contentNextVersion')}</span></div>}</div>
}

function ArticleListItem({ article, open }: { article: Article; open: () => void }) { return <button className="article-list-item" onClick={open}><span className="result-icon"><BookOpenText size={21}/></span><span><strong>{article.title}</strong><small>{article.description}</small></span><CaretRight size={19}/></button> }

function FaultOverview({ tree, startFault }: { tree: DecisionTree; startFault: () => void }) { const { t } = useI18n(); return <div className="page"><Header title={t('fault')} eyebrow={t('guidedTroubleshooting')}/><div className="intro-card"><span className="hero-symbol"><Wrench size={33}/></span><span className="eyebrow">{t('appVersion')} {APP_VERSION}</span><h2>{tree.title}</h2><p>{t('oneQuestionPerStep')}</p><button className="primary-button" onClick={startFault}>{t('startTroubleshooting')} <CaretRight size={20}/></button></div><div className="notice info"><Info size={21}/><p>{t('moreTreesComing')}</p></div></div> }

function Basics({ openArticle }: { openArticle: (id: string) => void }) { const { t, basicLabel } = useI18n(); return <div className="page"><Header title={t('basics')} eyebrow={t('quickReference')}/><div className="basics-grid">{BASICS.map((item) => { const linked = item === 'Multimeter' ? 'multimeter-bedienen' : item === '24 VDC' ? '24-vdc-pruefen' : item === 'Schütz' ? 'schuetz-pruefen' : null; return <button key={item} disabled={!linked} onClick={() => linked && openArticle(linked)}><strong>{basicLabel(item)}</strong><small>{linked ? t('openArticle') : t('comingSoon')}</small>{linked && <CaretRight size={17}/>}</button> })}</div><About/></div> }

function ArticleView({ article, onBack, openArticle }: { article?: Article; onBack: () => void; openArticle: (id: string) => void }) {
  const { locale, t, categoryLabel } = useI18n()
  const [activeImage, setActiveImage] = useState<ArticleImage | null>(null)
  if (!article) return <div className="page"><Header title={t('articleNotFound')} back={onBack}/></div>
  return <><article className="page article-page"><Header title={article.title} eyebrow={categoryLabel(article.category)} back={onBack}/><section className="problem-card"><span>{t('problem')}</span><p>{article.description}</p></section>{(article.safetyNotes?.length ?? 0) > 0 && <section><h2>{t('safetyNotes')}</h2>{article.safetyNotes?.map((note) => <div className="notice warning" key={note}><ShieldWarning size={21}/><p>{note}</p></div>)}</section>}{article.images.length > 0 && <section className="article-images" aria-label={t('images')}><div className="image-grid">{article.images.map((image) => <ArticleImageCard key={image.src} image={image} onOpen={() => setActiveImage(image)} />)}</div></section>}<section><h2>{t('youNeed')}</h2><div className="chip-row">{article.tools.map((tool) => <span className="chip" key={tool}><Wrench size={16}/>{tool}</span>)}</div></section><section><h2>{t('check')}</h2><div className="steps">{article.steps.map((step, index) => <div className="step" key={`${step.title}-${index}`}><div className="step-number">{index + 1}</div><div><h3>{step.title}</h3><p>{step.instruction}</p>{step.image && <ArticleImageCard image={step.image} onOpen={() => setActiveImage(step.image!)} />}{step.measurement && <div className="measurement"><span>{t('measurement')}</span><strong>{step.measurement}</strong></div>}{step.expected && <div className="expectation"><span>{t('expectation')}</span><strong>{step.expected}</strong></div>}{step.interpretation && <div className="interpretation"><span>{t('interpretation')}</span><strong>{step.interpretation}</strong></div>}{step.nextStep && <div className="next-step"><span>{t('nextStep')}</span><strong>{step.nextStep}</strong></div>}{(step.hints?.length ?? 0) > 0 && <div className="notice info"><Info size={20}/><p>{step.hints?.join(' · ')}</p></div>}{step.warning && <div className="inline-warning"><ShieldWarning size={20}/><span>{step.warning}</span></div>}</div></div>)}</div></section><section><h2>{t('result')}</h2><div className="result-cards">{article.results.map((result) => <StatusCard key={result.condition} {...result}/>)}</div></section>{article.relatedArticles.length > 0 && <section><h2>{t('checkNext')}</h2><div className="related-list">{article.relatedArticles.map((id) => { const related = articleById(id, locale); return related && <button key={id} onClick={() => openArticle(id)}><span>{related.title}</span><CaretRight size={18}/></button> })}</div></section>}</article>{activeImage && <ImageLightbox image={activeImage} onClose={() => setActiveImage(null)} />}</>
}

function ArticleImageCard({ image, onOpen }: { image: ArticleImage; onOpen: () => void }) { return <figure className="article-image"><button onClick={onOpen} aria-label={`${image.alt} – ${image.caption ?? ''}`}><img src={image.src} alt={image.alt} loading="lazy" /></button>{image.caption && <figcaption>{image.caption}</figcaption>}</figure> }

function ImageLightbox({ image, onClose }: { image: ArticleImage; onClose: () => void }) { const { t } = useI18n(); return <div className="image-lightbox" role="presentation" onClick={onClose}><section role="dialog" aria-modal="true" aria-label={image.caption ?? image.alt} onClick={(event) => event.stopPropagation()}><button className="lightbox-close" onClick={onClose} aria-label={t('closeImage')}><X size={22}/></button><img src={image.src} alt={image.alt}/>{image.caption && <p>{image.caption}</p>}</section></div> }

function StatusCard({ status, condition, explanation }: { status: Status; condition: string; explanation: string }) { const Icon = status === 'ok' ? CheckCircle : status === 'danger' ? ShieldWarning : Warning; return <div className={`status-card ${status}`}><Icon size={22} weight="fill"/><div><strong>{condition}</strong><p>{explanation}</p></div></div> }

function FaultFlow({ tree, view, setView, openArticle }: { tree: DecisionTree; view: Extract<View,{type:'fault'}>; setView: (v: View) => void; openArticle: (id: string) => void }) {
  const { locale, t } = useI18n()
  const node: DecisionNode | undefined = tree.nodes[view.nodeId]
  const select = (next: string) => setView({ type: 'fault', ...advanceFault(view, next) })
  const back = () => { const previous = backFault(view); setView(previous ? { type: 'fault', ...previous } : { type: 'tab', tab: 'fault' }) }
  if (!node) return <div className="page fault-flow"><Header title={tree.title} back={() => setView({ type: 'tab', tab: 'fault' })}/><div className="notice info"><Info size={21}/><p>{t('invalidFaultStep')}</p></div><button className="primary-button" onClick={() => setView({ type:'fault', ...restartFault(tree.start) })}>{t('restart')}</button></div>
  return <div className="page fault-flow"><Header title={tree.title} eyebrow={`${t('step')} ${view.history.length + 1}`} back={back}/><div className="progress"><span style={{ width: `${Math.min(100, 18 + view.history.length * 14)}%` }}/></div><section className="decision-card"><span className="decision-type">{node.kind === 'question' ? t('checkQuestion') : t('nextUsefulStep')}</span><h2>{node.title}</h2>{node.help && <div className="notice info"><Info size={20}/><p>{node.help}</p></div>}{node.actions && <ol>{node.actions.map((action) => <li key={action}>{action}</li>)}</ol>}{node.options && <div className="decision-options">{node.options.map((option) => <button key={option.label} onClick={() => select(option.next)}>{option.label}<CaretRight size={19}/></button>)}</div>}{node.relatedArticles && node.relatedArticles.length > 0 && <div className="decision-related"><span>{t('matchingArticles')}</span>{node.relatedArticles.map((id) => <button key={id} onClick={() => openArticle(id)}><BookOpenText size={19}/>{articleById(id, locale)?.title}<CaretRight size={18}/></button>)}</div>}</section><div className="flow-actions"><button onClick={back}><ArrowLeft size={18}/> {t('back')}</button><button onClick={() => setView({ type:'fault', ...restartFault(tree.start) })}>{t('restart')}</button></div></div>
}

function About() { const { t } = useI18n(); return <section className="about"><div className="brand-icon small">E<span>+</span></div><div><strong>E-Check</strong><span>{t('appVersion')} {APP_VERSION} · {t('contentVersion')} {CONTENT_VERSION}</span></div></section> }

function SafetyDialog({ onClose }: { onClose: () => void }) { const { t } = useI18n(); return <div className="dialog-backdrop" role="presentation"><section className="safety-dialog" role="dialog" aria-modal="true" aria-labelledby="safety-title"><span className="safety-icon"><ShieldWarning size={30}/></span><span className="eyebrow">{t('beforeStart')}</span><h2 id="safety-title">{t('workSafely')}</h2><p>{t('safetyNotice')}</p><button className="primary-button" onClick={onClose} autoFocus>{t('understood')}</button></section></div> }

function UpdateNotice({ onUpdate, onLater }: { onUpdate: () => void; onLater: () => void }) { const { t } = useI18n(); return <aside className="update-notice" aria-live="polite"><div><strong>{t('updateAvailable')}</strong><span>{t('updateDescription')}</span></div><div><button onClick={onLater}>{t('later')}</button><button className="update-action" onClick={onUpdate}>{t('updateNow')}</button></div></aside> }
