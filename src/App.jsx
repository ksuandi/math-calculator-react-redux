import React from 'react'

import './styles/App.scss'
import Calculator from './components/Calculator.jsx'
import Canvas from './components/Canvas.jsx'
import CanvasControl from './components/CanvasControl.jsx'

function App() {
  return (
    <div className="calc-wrapper">
      <Calculator />
      <CanvasControl />
      <Canvas />
    </div>
  )
}

export default App
