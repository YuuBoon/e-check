export interface FaultState {
  nodeId: string
  history: string[]
}

export const advanceFault = (state: FaultState, next: string): FaultState => ({
  nodeId: next,
  history: [...state.history, state.nodeId]
})

export const backFault = (state: FaultState): FaultState | null => state.history.length ? ({
  nodeId: state.history.at(-1)!,
  history: state.history.slice(0, -1)
}) : null

export const restartFault = (start: string): FaultState => ({ nodeId: start, history: [] })
