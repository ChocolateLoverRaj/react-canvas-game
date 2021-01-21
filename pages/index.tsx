import Game from '../lib/game'
import { useRef } from 'react'

const App = (): JSX.Element => {
  const x = useRef(0)
  return (
    <Game
      render={canvas => {
        const ctx = canvas.getContext('2d')
        ctx.clearRect(0, 0, 350, 200)
        ctx.fillRect(x.current, 0, 100, 100)
      }}
      tick={() => {
        x.current += 1
      }}
      tickInterval={50}
    />
  )
}

export default App
