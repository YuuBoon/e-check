import { describe, expect, it } from 'vitest'
import { localizedDecisionTree, motorNotRunning, validateDecisionTree } from './decisionTrees'

describe('Entscheidungsbaum', () => {
  it('verwendet Motorübersetzungen nicht für andere Bäume', () => {
    const other = { id: 'other', title: 'Anderer Baum', start: 'start', nodes: {
      start: { id: 'start', kind: 'result' as const, title: 'Fertig' }
    } }
    expect(localizedDecisionTree(other, 'sk')).toEqual(other)
  })

  it('lässt Übersetzungen keine Entscheidungsziele ändern', () => {
    const tree = structuredClone(motorNotRunning)
    tree.translations!.sk!.nodes!['has-vfd'].options![0].next = 'missing'
    expect(validateDecisionTree(localizedDecisionTree(tree, 'sk'))).toEqual([])
  })
  it('hat einen gültigen Start und keine losen Verweise', () => {
    expect(validateDecisionTree(motorNotRunning)).toEqual([])
  })

  it('bietet in Fragen Antwortmöglichkeiten', () => {
    Object.values(motorNotRunning.nodes)
      .filter((node) => node.kind === 'question')
      .forEach((node) => expect(node.options?.length).toBeGreaterThanOrEqual(3))
  })

  it('enthält keine Anweisung zum Überbrücken', () => {
    const content = JSON.stringify(motorNotRunning).toLocaleLowerCase('de')
    expect(content).not.toContain('sicherheitskreis überbrücken')
    expect(content).toContain('keine sicherheitskreise überbrücken')
  })

  it('lokalisiert Titel, Fragen und Antworten vollständig auf Slowakisch', () => {
    const tree = localizedDecisionTree(motorNotRunning, 'sk')
    expect(tree.title).toBe('Motor nebeží')
    expect(tree.nodes['has-vfd'].title).toContain('frekvenčný menič')
    expect(tree.nodes['has-vfd'].options?.[0].label).toBe('Áno')
    expect(validateDecisionTree(tree)).toEqual([])
  })

  it('meldet ungültige Zielknoten', () => {
    const broken = structuredClone(motorNotRunning)
    broken.nodes['has-vfd'].options![0].next = 'fehlt'
    expect(validateDecisionTree(broken)).toContain('has-vfd verweist auf fehlt')
  })
})
