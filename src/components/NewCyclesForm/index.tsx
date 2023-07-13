import { FormContainer, TaskInput, MinutesAmountInput } from './styles'
import { ICycle } from '../../pages/Home/interfaces'
import { useFormContext } from 'react-hook-form'

interface INewCyclesForm {
  activeCycle: ICycle | null
}

export default function NewCyclesForm({ activeCycle }: INewCyclesForm) {
  const { register } = useFormContext()

  return (
    <FormContainer>
      <label htmlFor="task">Going to work with</label>
      <TaskInput
        type="text"
        id="task"
        placeholder="Give a name for the task"
        list="task-suggestions"
        {...register('task')}
        disabled={!!activeCycle}
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
        step={1}
        required
        disabled={!!activeCycle}
        {...register('minutesAmount', { valueAsNumber: true })}
      />
      <span>minutes</span>
    </FormContainer>
  )
}
