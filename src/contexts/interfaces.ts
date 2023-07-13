import { Dispatch, SetStateAction } from 'react'
import { ICycle, IForm } from '../pages/Home/interfaces'

export interface ICycleContext {
  activeCycle: ICycle | null
  cycles: ICycle[]
  amountSecondsPassed: number | null
  setAmountSecondsPassed: Dispatch<SetStateAction<number>>
  secondsFormatted: string | null
  minutesFormatted: string | null
  initiateNewCycle: (data: IForm) => void
  interruptActiveCycle: () => void
  concludeCycle: () => void
}
