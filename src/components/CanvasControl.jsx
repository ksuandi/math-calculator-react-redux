import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"

import "../styles/CanvasControl.scss"
import { setRange } from "../store/calculator"

const CanvasControl = () => {
  const {minX: startMinX, maxX: startMaxX} = useSelector((state) => state.calc)
  const [minX, setMinX] = useState(startMinX);
  const [maxX, setMaxX] = useState(startMaxX);
  const dispatch = useDispatch()

  const handleSubmit = (evt) => {
      evt.preventDefault();
      dispatch(setRange({ minX: +minX, maxX: +maxX}))
  }

  return (
    <div className="canvas-control">
      <form onSubmit={handleSubmit}>
        <label>Xmin:</label>
        <input type="number" value={minX} onChange={e => setMinX(e.target.value)} />
        <label>Xmax:</label>
        <input type="number" value={maxX} onChange={e => setMaxX(e.target.value)} />
        <button type="submit" className="submit" onClick={handleSubmit}>Set range</button>
      </form>
    </div>
  )
}

export default CanvasControl
