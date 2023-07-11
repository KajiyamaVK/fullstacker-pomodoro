import { FormContainer, TaskInput, MinutesAmountInput } from './styles'
import { useForm } from 'react-hook-form'
import { ICycle } from '../../pages/Home/interfaces'
import * as zod from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { newCycleFormValidationSchema } from './formValidations'

interface INewCyclesForm {
  activeCycle: ICycle | undefined
}

type formType = zod.infer<typeof newCycleFormValidationSchema>

export default function NewCyclesForm({ activeCycle }: INewCyclesForm) {
  const { register, handleSubmit, formState, reset, watch } = useForm<formType>(
    {
      resolver: zodResolver(newCycleFormValidationSchema),
      defaultValues: {
        minutesAmount: 0,
        task: '',
      },
    },
  )
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
