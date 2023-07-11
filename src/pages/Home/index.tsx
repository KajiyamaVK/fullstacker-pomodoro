import { differenceInSeconds } from 'date-fns'
import { HandPalm, Play } from 'phosphor-react'
import {
  HomeContainer,
  StartCountDownButton,
  StopCountDownButton,
} from './styles'
import { useEffect, useState } from 'react'
import { ICycle } from './interfaces'
import { showError } from './functions'
import NewCyclesForm from '../../components/NewCyclesForm'
import CountDown from '../../components/CountDown'

export default function Home() {
  const [cycles, setCycles] = useState<ICycle[]>([])
  const [activeCycleId, setActiveCycleId] = useState<number>(0)

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0
  const taskInput = watch('task')
  const minutesInput = watch('minutesAmount')
  const isSubmitDisabled = !(taskInput && minutesInput)
  const minutesAmount: number = Math.floor(currentSeconds / 60)
  const secondsAmount: number = currentSeconds % 60
  const minutes = String(minutesAmount).padStart(2, '0')
  const seconds = String(secondsAmount).padStart(2, '0')

  function saveFormData(data: formType) {
    const newCycle: ICycle = {
      id: new Date().getTime(),
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    }
    setCycles([...cycles, newCycle])
    setActiveCycleId(newCycle.id)
    setAmountSecondsPassed(0)
  }

  useEffect(() => {
    if (activeCycle) {
      document.title = `${minutes}:${seconds}`
    }
  }, [minutes, seconds])

  function handleInterruptCycle() {
    if (activeCycle) {
      setCycles((state) =>
        state.map((cycle) => {
          if (cycle.id === activeCycle.id) {
            const now = new Date()

            return { ...cycle, interruptedDate: now }
          } else {
            return cycle
          }
        }),
      )
    }
    setActiveCycleId(0)
    reset()
  }

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(saveFormData)}>
        <NewCyclesForm activeCycle={activeCycle} />
        <CountDown />
        {activeCycle ? (
          <StopCountDownButton type="button" onClick={handleInterruptCycle}>
            <HandPalm size={24} />
            Stop
          </StopCountDownButton>
        ) : (
          <StartCountDownButton
            type="submit"
            onClick={() => showError(formState.errors)}
            disabled={isSubmitDisabled}
          >
            <Play size={24} />
            Begin
          </StartCountDownButton>
        )}
      </form>
    </HomeContainer>
  )
}
