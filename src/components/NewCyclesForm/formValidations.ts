import * as zod from 'zod'

export const validationsMessages = {
  task: 'Inform the task name.',
  minutesAmount: {
    min: 'You need to set a minimum of 1 minute on the task.',
    max: 'You cannot set the duration over 60 minutes.',
  },
}

export const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, validationsMessages.task),
  minutesAmount: zod
    .number()
    .min(1, validationsMessages.minutesAmount.min)
    .max(60, validationsMessages.minutesAmount.max),
})
