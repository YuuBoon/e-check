import { describe, expect, it } from 'vitest'
import { motorNotRunning, validateDecisionTree } from './decisionTrees'

describe('Entscheidungsbaum', () => {
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
})
