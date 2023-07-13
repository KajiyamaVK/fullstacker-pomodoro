import { HistoryContainer, HistoryList, Status } from './style'
import { useContext } from 'react'
import { CycleContext } from '../../contexts/cycleContext'
import { formatDistanceToNow } from 'date-fns'
export default function History() {
  const { cycles } = useContext(CycleContext)

  return (
    <>
      <HistoryContainer>
        <h1>My history</h1>
        <HistoryList>
          <table>
            <thead>
              <tr>
                <th>Task</th>
                <th>Duration</th>
                <th>Begin</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {cycles.map((cycle) => {
                return (
                  <tr key={cycle.id}>
                    <td>{cycle.task}</td>
                    <td>{cycle.minutesAmount}</td>
                    <td>
                      {formatDistanceToNow(cycle.startDate, {
                        addSuffix: true,
                        // locale: ptBR,
                      })}
                    </td>
                    <td>
                      {cycle.finishedDate && !cycle.interruptedDate && (
                        <Status phase="concluded" />
                      )}
                      {cycle.interruptedDate && <Status phase="interrupted" />}
                      {!cycle.finishedDate && !cycle.interruptedDate && (
                        <Status phase={'onGoing'} />
                      )}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </HistoryList>
      </HistoryContainer>
    </>
  )
}
