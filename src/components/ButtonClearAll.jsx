import React from "react"
import { useDispatch } from "react-redux"

import { clearAll } from "../store/calculator"

const ButtonClearAll = () => {
  const dispatch = useDispatch()

  return (
    <button className="calc-button is-clear" onClick={() => dispatch(clearAll())}>
      C
    </button>
  )
}

export default ButtonClearAll
