import { ICycle } from '../../pages/Home/interfaces'
import { ActionsTypes } from './interfaces'

export function initiateNewCycleAction(newCycle: ICycle) {
  return {
    type: ActionsTypes.INITIATE_NEW_CYCLE,
    payload: {
      newCycle,
    },
  }
}

export function interruptActiveCycleAction() {
  return {
    type: ActionsTypes.INTERRUPT_CYCLE,
    payload: {},
  }
}

export function concludeCycleAction() {
  return {
    type: ActionsTypes.CONCLUDE_CYCLE,
    payload: {},
  }
}
