import * as zod from 'zod'
import { newCycleFormValidationSchema } from '../../components/NewCyclesForm/formValidations'

export interface IForm {
  task: string
  minutesAmount: number
}

export interface ICycle {
  id: number
  task: string
  minutesAmount: number
  startDate: Date
  finishedDate?: Date
  interruptedCycle?: Date
}

export type formType = zod.infer<typeof newCycleFormValidationSchema>
