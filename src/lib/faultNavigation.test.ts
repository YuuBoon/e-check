import { describe, expect, it } from 'vitest'
import { advanceFault, backFault, restartFault } from './faultNavigation'

describe('Störungsnavigation', () => {
  it('geht vor, zurück und startet neu', () => {
    const start = restartFault('start')
    const next = advanceFault(start, 'next')
    expect(next).toEqual({ nodeId: 'next', history: ['start'] })
    expect(backFault(next)).toEqual(start)
    expect(restartFault('start')).toEqual(start)
  })

  it('geht vom Start nicht weiter zurück', () => {
    expect(backFault(restartFault('start'))).toBeNull()
  })
})
