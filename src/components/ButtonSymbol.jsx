import React from "react"
import { useDispatch } from "react-redux"

import { addSymbol } from "../store/calculator"

const ButtonSymbol = ({ label, value }) => {
  const dispatch = useDispatch()

  return (
    <button
      className="calc-button"
      onClick={() => dispatch(addSymbol({ value: value || label }))}
    >
      {label}
    </button>
  )
}

export default ButtonSymbol
