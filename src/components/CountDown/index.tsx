import { useContext, useEffect } from 'react'
import { CountdownContainer, Separator } from './styles'
import { differenceInSeconds } from 'date-fns'
import { CycleContext } from '../../contexts/cycleContext'

export default function CountDown() {
  const {
    activeCycle,
    setAmountSecondsPassed,
    minutesFormated,
    secondsFormated,
    concludeCycle,
  } = useContext(CycleContext)

  useEffect(() => {
    if (activeCycle) {
      setAmountSecondsPassed(getSecondDifference())
      const taskTotalSeconds = activeCycle.minutesAmount * 60
      const interval = setInterval(() => {
        const secondsDifference = getSecondDifference()
        const isTimeFinished =
          taskTotalSeconds && secondsDifference >= taskTotalSeconds
        const isTaskActive = !!activeCycle
        if (isTimeFinished) {
          clearInterval(interval)
          concludeCycle()
        } else if (!isTaskActive) {
          clearInterval(interval)
        } else {
          setAmountSecondsPassed(secondsDifference)
        }
      }, 1000)
      return () => {
        clearInterval(interval)
      }
    }
  }, [activeCycle])

  function getSecondDifference() {
    return differenceInSeconds(new Date(), activeCycle!.startDate)
  }

  const minutesLabel = minutesFormated || '00'
  const secondsLabel = secondsFormated || '00'

  return (
    <CountdownContainer>
      <span>{minutesLabel[0]}</span>
      <span>{minutesLabel[1]}</span>
      <Separator>:</Separator>
      <span>{secondsLabel[0]}</span>
      <span>{secondsLabel[1]}</span>
    </CountdownContainer>
  )
}
