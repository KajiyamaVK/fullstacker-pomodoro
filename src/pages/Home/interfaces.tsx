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
