import { zodResolver } from '@hookform/resolvers/zod'
import { Play } from 'phosphor-react'
import {
  CountdownContainer,
  FormContainer,
  HomeContainer,
  MinutesAmountInput,
  Separator,
  StartCountDownButton,
  TaskInput,
} from './styles'
import { useForm } from 'react-hook-form'
import * as zod from 'zod'
import { useState } from 'react'
import { ICycle } from './interfaces'
import { newCycleFormValidationSchema } from './formValidations'
import { showError } from './functions'

type formType = zod.infer<typeof newCycleFormValidationSchema>

export default function Home() {
  const teste: formType = {
    minutesAmount: 1,
    task: 'asd',
  }
  console.log(teste)
  const [cycles, setCycles] = useState<ICycle[]>([])
  const [activeCycleId, setActiveCycleId] = useState<number>(0)
  const [amountSecondsPassed, setAmountSecondsPassed] = useState<number>(0)
  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)
  const { register, handleSubmit, formState, reset } = useForm<formType>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      minutesAmount: 0,
      task: '',
    },
  })
  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0
  const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0
  const minutesAmount: number = Math.floor(currentSeconds / 60)
  const secondsAmount: number = currentSeconds % 60
  const minutes = String(minutesAmount).padStart(2, '0')
  const seconds = String(secondsAmount).padStart(2, '0')
  function saveFormData(data: formType) {
    const newCycle: ICycle = {
      id: new Date().getTime(),
      task: data.task,
      minutesAmount: data.minutesAmount,
    }
    setCycles([...cycles, newCycle])
    setActiveCycleId(newCycle.id)
    reset()
  }

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(saveFormData)}>
        <FormContainer>
          <label htmlFor="task">Going to work with</label>
          <TaskInput
            type="text"
            id="task"
            placeholder="Give a name for the task"
            list="task-suggestions"
            {...register('task')}
          />
          <datalist id="task-suggestions">
            <option value="Projeto 1" />
            <option value="Projeto 2" />
            <option value="Projeto 3" />
            <option value="Projeto 4" />
          </datalist>
          <label htmlFor="minutesAmount">for</label>
          <MinutesAmountInput
            type="number"
            id="minutesAmount"
            placeholder="00"
            step={5}
            required
            {...register('minutesAmount', { valueAsNumber: true })}
          />
          <span>minutes</span>
        </FormContainer>
        <CountdownContainer>
          <span>{minutes[0]}</span>
          <span>{minutes[1]}</span>
          <Separator>:</Separator>
          <span>{seconds[0]}</span>
          <span>{seconds[1]}</span>
        </CountdownContainer>
        <StartCountDownButton
          type="submit"
          onClick={() => showError(formState.errors)}
        >
          <Play size={24} />
          Begin
        </StartCountDownButton>
      </form>
    </HomeContainer>
  )
}
