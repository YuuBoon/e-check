export type Status = 'ok' | 'warning' | 'danger' | 'info'

export interface LocalizedText {
  'de-CH': string
  [locale: string]: string | undefined
}

export interface ArticleImage {
  src: string
  alt: string
  caption?: string
  stepReference?: string
}

export interface ArticleStep {
  title: string
  instruction: string
  measurement?: string
  expected?: string
  warning?: string
  interpretation?: string
  nextStep?: string
  hints?: string[]
  image?: ArticleImage
}

export interface ArticleResult {
  status: Status
  condition: string
  explanation: string
}

export interface Article {
  id: string
  title: string
  category: string
  subcategory?: string
  description: string
  problem?: string
  symptoms: string[]
  keywords: string[]
  synonyms?: string[]
  manufacturers: string[]
  tools: string[]
  steps: ArticleStep[]
  results: ArticleResult[]
  safetyNotes?: string[]
  hints?: string[]
  quickCheck: string[]
  relatedArticles: string[]
  relatedContent?: ContentLink[]
  images: ArticleImage[]
  contentVersion?: string
  translations?: Record<string, ArticleTranslation | undefined>
  comingSoon?: boolean
}

export interface ArticleTranslation {
  title?: string
  category?: string
  subcategory?: string
  description?: string
  problem?: string
  symptoms?: string[]
  keywords?: string[]
  synonyms?: string[]
  tools?: string[]
  steps?: ArticleStep[]
  results?: ArticleResult[]
  safetyNotes?: string[]
  hints?: string[]
  quickCheck?: string[]
  images?: ArticleImage[]
}

export interface ContentLink {
  type: 'article' | 'document' | 'tool' | 'fault' | 'fault-code'
  id: string
  label?: LocalizedText
}

export interface DecisionOption {
  label: string
  next: string
  answer?: 'yes' | 'no' | 'unknown' | 'other'
}

export interface DecisionNode {
  id: string
  kind: 'question' | 'result'
  title: string
  help?: string
  options?: DecisionOption[]
  actions?: string[]
  relatedArticles?: string[]
  relatedContent?: ContentLink[]
  endpoint?: boolean
}

export interface DecisionTree {
  id: string
  title: string
  start: string
  nodes: Record<string, DecisionNode>
  translations?: Record<string, DecisionTreeTranslation | undefined>
}

export interface DecisionTreeTranslation {
  title?: string
  nodes?: Record<string, Partial<Omit<DecisionNode, 'id'>>>
}
