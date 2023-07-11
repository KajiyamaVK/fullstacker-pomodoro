import { HandPalm, Play } from 'phosphor-react'
import {
  HomeContainer,
  StartCountDownButton,
  StopCountDownButton,
} from './styles'
import { useContext, useEffect } from 'react'
import { ICycle, formType } from './interfaces'
import { showError } from './functions'
import NewCyclesForm from '../../components/NewCyclesForm'
import CountDown from '../../components/CountDown'
import { CycleContext } from '../../contexts/cycleContext'
import { useForm, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { newCycleFormValidationSchema } from '../../components/NewCyclesForm/formValidations'

export default function Home() {
  const newCycleForm = useForm<formType>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      minutesAmount: undefined,
      task: '',
    },
  })

  const { handleSubmit, formState, reset, watch } = newCycleForm

  const {
    activeCycle,
    setActiveCycle,
    cycles,
    setCycles,
    setAmountSecondsPassed,
    setActiveCycleId,
    activeCycleId,
    seconds,
    minutes,
  } = useContext(CycleContext)

  if (activeCycleId || activeCycleId === 0) {
    const newActiveCycle: ICycle | undefined = cycles.find(
      (cycle) => cycle.id === activeCycleId,
    )

    setActiveCycle(newActiveCycle)
  }

  const taskInput = watch('task')
  const minutesInput = watch('minutesAmount')
  const isSubmitDisabled = !(taskInput && minutesInput)

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

  if (activeCycleId) {
    document.title = `${minutes}:${seconds}`
  } else {
    document.title = 'Fullstacker Pomodoro'
  }

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
        <FormProvider {...newCycleForm}>
          <NewCyclesForm activeCycle={activeCycle} />
        </FormProvider>
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
