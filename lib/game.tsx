import { useRef, useEffect } from 'react'

interface GameProps {
  render: (canvas: HTMLCanvasElement) => void
  tick: () => void
  tickInterval?: number
}
const Game = (props: GameProps) => {
  const canvasRef = useRef()
  const lastTick = useRef()

  const tickInterval = props.tickInterval ?? 50

  // Render
  useEffect(() => {
    const render = (): number => {
      const canvas = canvasRef.current
      props.render(canvas)
      return requestAnimationFrame(render)
    }
    let renderId = render()
    return () => {
      cancelAnimationFrame(renderId)
    }
  }, [])

  // Reset lastTick
  useEffect(() => {
    lastTick.current = Date.now()
  })

  // Tick
  useEffect(() => {
    let timer: number
    const tick = () => {
      const now = Date.now()
      const ticks = Math.floor((now - lastTick.current) / tickInterval)
      for(let i = 0; i < ticks; i++){
        props.tick()
      }
      console.log(ticks)
      lastTick.current = now
      timer = setTimeout(tick, tickInterval - (Date.now() - now))
    }
    tick()
    return () => {
      clearTimeout(timer)
    }
  }, [])

  return <canvas ref={canvasRef} />
}

export default Game
