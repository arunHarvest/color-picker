import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Eyedropper from './ImageCOlorPicker'
import HooksMethod from './hooks'
import RefCase from './RefCase'
import ContextCase from './ContextCase'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Eyedropper/>
    </>
  ) 
}

export default App
