import { ICycle } from '../../pages/Home/interfaces'

export enum ActionsTypes {
  INITIATE_NEW_CYCLE = 'INITIATE_NEW_CYCLE',
  INTERRUPT_CYCLE = 'INTERRUPT_CYCLE',
  CONCLUDE_CYCLE = 'CONCLUDE_CYCLE',
}

export interface ICycleReducerState {
  cycles: ICycle[]
  activeCycle: ICycle | null
  activeCycleId: number | null
}

export interface IAction {
  type: ActionsTypes
  payload: any
}
