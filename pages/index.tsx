import { useRef } from 'react'

const App = (): JSX.Element => {
  const ref = useRef()

  console.log(ref)

  return <canvas ref={ref} />
}

export default App
