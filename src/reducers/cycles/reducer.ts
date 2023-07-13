import { ICycle } from '../../pages/Home/interfaces'
import { IAction, ICycleReducerState, ActionsTypes } from './interfaces'

export default function CyclesReducer(
  state: ICycleReducerState,
  action: IAction,
) {
  if (action.type === ActionsTypes.INITIATE_NEW_CYCLE) {
    const sortedTaskList = state.cycles.sort((a, b) => {
      return a.id < b.id ? 1 : -1
    })

    const newCycle = action.payload.newCycle
    return {
      ...state,
      cycles: [newCycle, ...sortedTaskList],
      activeCycle: newCycle,
      activeCycleId: newCycle.id,
    }
  }

  if (action.type === ActionsTypes.INTERRUPT_CYCLE) {
    const now = new Date()

    const updatedCycle = {
      ...state.activeCycle,
      interruptedDate: now,
    }

    const returnValue: ICycle[] = state.cycles.map((cycle: ICycle) => {
      return cycle.id === state.activeCycle!.id
        ? (updatedCycle as ICycle)
        : cycle
    })

    const response = {
      ...state,
      cycles: returnValue,
      activeCycle: null,
      activeCycleId: null,
    }
    return response
  }

  if (action.type === ActionsTypes.CONCLUDE_CYCLE) {
    const returnValue = state.cycles.map((cycle) => {
      if (cycle.id === state.activeCycle!.id) {
        const now = new Date()
        return { ...cycle, finishedDate: now }
      } else {
        return cycle
      }
    })
    return {
      ...state,
      cycles: returnValue,
      activeCycle: null,
      activeCycleId: null,
      taskTotalSeconds: null,
    }
  }

  return state
}
