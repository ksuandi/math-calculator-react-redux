import React, {useRef, useEffect} from "react"
import { useSelector } from "react-redux"

import Plot from '../plot'
let plot = null;

const Canvas = () => {
  const canvasRef = useRef(null);
  const { minX, maxX, validExpr } = useSelector((state) => state.calc)

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;

      plot = new Plot(canvas)

      return function cleanup() {
        plot.destroy()
      };
    }
  }, []) // only onMount & onUnmount

  useEffect(() => {
    if (plot) {
      plot.setData(minX, maxX, validExpr)
    }
  }, [minX, maxX, validExpr])

  return (
    <div className="canvas">
      <canvas ref={canvasRef}/>
    </div>
  )
}

export default Canvas
