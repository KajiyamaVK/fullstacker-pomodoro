import {
  useState,
  createContext,
  Dispatch,
  SetStateAction,
  ReactNode,
} from 'react'
import { ICycle, formType } from '../pages/Home/interfaces'

import { newCycleFormValidationSchema } from '../components/NewCyclesForm/formValidations'

interface ICycleContext {
  activeCycle: ICycle | undefined
  setActiveCycle: Dispatch<SetStateAction<ICycle | undefined>>
  cycles: ICycle[]
  setCycles: Dispatch<SetStateAction<ICycle[]>>
  totalSeconds: number
  amountSecondsPassed: number
  setAmountSecondsPassed: Dispatch<SetStateAction<number>>
  activeCycleId: number
  setActiveCycleId: Dispatch<SetStateAction<number>>
  seconds: string
  minutes: string
}

export const CycleContext = createContext({
  activeCycle: undefined,
  setActiveCycle: () => {},
  cycles: [],
  setCycles: () => {},
  totalSeconds: 0,
  amountSecondsPassed: 0,
  setAmountSecondsPassed: () => {},
  activeCycleId: 0,
  setActiveCycleId: () => {},
  seconds: '00',
  minutes: '00',
} as ICycleContext)

export function CycleContextProvider({ children }: { children: ReactNode }) {
  const [activeCycle, setActiveCycle] = useState<ICycle>()
  const [cycles, setCycles] = useState<ICycle[]>([])
  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0
  const [amountSecondsPassed, setAmountSecondsPassed] = useState<number>(0)
  const [activeCycleId, setActiveCycleId] = useState<number>(0)

  const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0
  const minutesAmount: number = Math.floor(currentSeconds / 60)
  const minutes = String(minutesAmount).padStart(2, '0')
  const secondsAmount: number = currentSeconds % 60
  const seconds = String(secondsAmount).padStart(2, '0')

  return (
    <CycleContext.Provider
      value={{
        activeCycle,
        setActiveCycle,
        cycles,
        setCycles,
        totalSeconds,
        amountSecondsPassed,
        setAmountSecondsPassed,
        activeCycleId,
        setActiveCycleId,
        minutes,
        seconds,
      }}
    >
      {children}
    </CycleContext.Provider>
  )
}
