import { HandPalm, Play } from 'phosphor-react'
import {
  HomeContainer,
  StartCountDownButton,
  StopCountDownButton,
} from './styles'
import { useContext } from 'react'
import { IForm } from './interfaces'
import { showError } from './functions'
import NewCyclesForm from '../../components/NewCyclesForm'
import CountDown from '../../components/CountDown'
import { CycleContext } from '../../contexts/cycleContext'
import { useForm, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { newCycleFormValidationSchema } from '../../components/NewCyclesForm/formValidations'

export default function Home() {
  const newCycleForm = useForm<IForm>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      minutesAmount: 0,
      task: '',
    },
  })

  const { handleSubmit, formState, watch, reset } = newCycleForm

  const {
    activeCycle,
    secondsFormatted,
    minutesFormatted,
    initiateNewCycle,
    interruptActiveCycle,
  } = useContext(CycleContext)

  const taskInput = watch('task')
  const minutesInput = watch('minutesAmount')
  const isSubmitDisabled = !(taskInput && minutesInput)

  if (typeof activeCycle?.id !== 'undefined') {
    document.title = `${minutesFormatted}:${secondsFormatted}`
  } else {
    document.title = 'Fullstacker Pomodoro'
  }

  function handleStartNewCycle(data: IForm) {
    initiateNewCycle(data)
  }

  function handleInterruptCycle() {
    interruptActiveCycle()
    reset()
  }

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleStartNewCycle)}>
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
