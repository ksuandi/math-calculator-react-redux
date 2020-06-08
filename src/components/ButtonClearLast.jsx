import React from "react"
import { useDispatch } from "react-redux"

import { clearLast } from "../store/calculator"

const ButtonClearLast = () => {
  const dispatch = useDispatch()

  return (
    <button className="calc-button is-clear" onClick={() => dispatch(clearLast())}>
      &larr;
    </button>
  )
}

export default ButtonClearLast
