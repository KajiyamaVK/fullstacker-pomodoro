import React, { useState } from 'react'
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

export default function Home() {
  const [inputTaskValue, setInputTaskValue] = useState('')

  const handleInputTaskChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputTaskValue(e.target.value)
  }

  return (
    <HomeContainer>
      <form action="">
        <FormContainer>
          <label htmlFor="task">Going to work with</label>
          <TaskInput
            type="text"
            id="task"
            placeholder="Give a name for the task"
            list="task-suggestions"
            onChange={handleInputTaskChange}
            value={inputTaskValue}
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
            min={5}
          />

          <span>minutes</span>
        </FormContainer>
        <CountdownContainer>
          <span>0</span>
          <span>0</span>
          <Separator>:</Separator>
          <span>0</span>
          <span>0</span>
        </CountdownContainer>

        <StartCountDownButton type="submit" disabled={!inputTaskValue}>
          <Play size={24} />
          Begin
        </StartCountDownButton>
      </form>
    </HomeContainer>
  )
}
