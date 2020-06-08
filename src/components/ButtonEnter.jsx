import React from "react"
import { useDispatch } from "react-redux"

import { setFuncY } from "../store/calculator"

const ButtonEnter = ({ label }) => {
  const dispatch = useDispatch()

  return (
    <button
      className="calc-button is-enter"
      onClick={() => dispatch(setFuncY())}
    >
      {label}
    </button>
  )
}

export default ButtonEnter
