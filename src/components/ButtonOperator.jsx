import React from "react"
import { useDispatch } from "react-redux"

import { addOperator } from "../store/calculator"

const ButtonOperator = ({ label, value }) => {
  const dispatch = useDispatch()

  return (
    <button
      className="calc-button is-oper"
      onClick={() => dispatch(addOperator({ value: value || label }))}
    >
      {label}
    </button>
  )
}

export default ButtonOperator
