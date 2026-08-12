export type Status = 'ok' | 'warning' | 'danger' | 'info'

export interface ArticleStep {
  title: string
  instruction: string
  measurement?: string
  expected?: string
  warning?: string
  image?: string
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
  description: string
  symptoms: string[]
  keywords: string[]
  manufacturers: string[]
  tools: string[]
  steps: ArticleStep[]
  results: ArticleResult[]
  quickCheck: string[]
  relatedArticles: string[]
  images: string[]
  comingSoon?: boolean
}

export interface DecisionOption {
  label: string
  next: string
}

export interface DecisionNode {
  id: string
  kind: 'question' | 'result'
  title: string
  help?: string
  options?: DecisionOption[]
  actions?: string[]
  relatedArticles?: string[]
}

export interface DecisionTree {
  id: string
  title: string
  start: string
  nodes: Record<string, DecisionNode>
}
