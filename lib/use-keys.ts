// Use list of keys pressed
import { useRef, useEffect, KeyboardEvent } from 'react'

const keysPressed: Set<string> = new Set()

const keydownListener = (e: KeyboardEvent): void => {
  keysPressed.add(e.key)
}
const keyupListener = (e: KeyboardEvent): void => {
  keysPressed.delete(e.key)
}

const effects: Set<symbol> = new Set()

const add = (effect: symbol): void => {
  if(effects.size === 0){
    window.addEventListener('keydown', keydownListener)
    window.addEventListener('keyup', keyupListener)
  }
  effects.add(effect)
}

const remove = (effect: symbol): void => {
  effects.delete(effect)
  if(effects.size === 0){
    window.removeEventListener('keydown', keydownListener)
    window.removeEventListener('keyup', keyupListener)
  }
}

const useKeys = (): Set<string> => {
  const effect = useRef(Symbol('useKeys'))
  useEffect(() => {
    add(effect.current)
    return () => {
      remove(effect.current)
    }
  })
  return keysPressed
}

export default useKeys
