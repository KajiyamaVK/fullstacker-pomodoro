import { useState, createContext, ReactNode, useReducer } from 'react'
import { ICycle, IForm } from '../pages/Home/interfaces'
import mockData from '../../public/mockData'
import CyclesReducer from '../reducers/cycles/reducer'
import { ICycleContext } from './interfaces'
import {
  concludeCycleAction,
  initiateNewCycleAction,
  interruptActiveCycleAction,
} from '../reducers/cycles/actions'

export const CycleContext = createContext({
  activeCycle: null,
  cycles: [],
  amountSecondsPassed: 0,
  setAmountSecondsPassed: () => {},
  secondsFormatted: '00',
  minutesFormatted: '00',
  initiateNewCycle: () => {},
  interruptActiveCycle: () => {},
  concludeCycle: () => {},
} as ICycleContext)

export function CycleContextProvider({ children }: { children: ReactNode }) {
  const [amountSecondsPassed, setAmountSecondsPassed] = useState<number>(0)

  const [cyclesReducerState, dispatch] = useReducer(CyclesReducer, {
    cycles: mockData,
    activeCycle: null,
    activeCycleId: 0,
  })

  const { cycles, activeCycle } = cyclesReducerState

  const remainingSeconds = activeCycle
    ? activeCycle.minutesAmount * 60 - amountSecondsPassed
    : 0
  const remainingMinutes: number = Math.floor(remainingSeconds / 60)

  const remainingSecondsFormatted: number = remainingSeconds % 60
  const minutesFormatted = String(remainingMinutes).padStart(2, '0')
  const secondsFormatted = String(remainingSecondsFormatted).padStart(2, '0')

  function initiateNewCycle(data: IForm) {
    console.log(
      '🚀 ~ file: cycleContext.tsx:131 ~ initiateNewCycle ~ initiateNewCycle:',
    )
    const newCycle: ICycle = {
      id: new Date().getTime(),
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    }

    dispatch(initiateNewCycleAction(newCycle))
  }

  function interruptActiveCycle() {
    dispatch(interruptActiveCycleAction())
  }

  function concludeCycle() {
    dispatch(concludeCycleAction())
  }

  return (
    <CycleContext.Provider
      value={{
        activeCycle,
        cycles,
        amountSecondsPassed,
        setAmountSecondsPassed,
        minutesFormatted,
        secondsFormatted,
        initiateNewCycle,
        interruptActiveCycle,
        concludeCycle,
      }}
    >
      {children}
    </CycleContext.Provider>
  )
}
