import React from "react"

import "../styles/Calculator.scss"
import ButtonClearAll from './ButtonClearAll'
import ButtonClearLast from './ButtonClearLast'
import ButtonSymbol from './ButtonSymbol'
import ButtonOperator from './ButtonOperator'
import Display from './Display'
import ButtonEnter from './ButtonEnter'

export default function Calculator() {

  return (
    <div className="calculator">
      <Display />

      <div className="calculator-buttons">
        <ButtonSymbol label="(" />
        <ButtonSymbol label=")" />
        <ButtonClearAll />
        <ButtonClearLast />

        <ButtonSymbol label="x" />
        <ButtonOperator label="pow" value="^" />
        <ButtonOperator label="sqrt" />
        <ButtonOperator label="÷" value="/" />

        <ButtonSymbol label="7" />
        <ButtonSymbol label="8" />
        <ButtonSymbol label="9" />
        <ButtonOperator label="×" value="*" />

        <ButtonSymbol label="4" />
        <ButtonSymbol label="5" />
        <ButtonSymbol label="6" />
        <ButtonOperator label="-" />

        <ButtonSymbol label="1" />
        <ButtonSymbol label="2" />
        <ButtonSymbol label="3" />
        <ButtonOperator label="+" />

        <ButtonSymbol label="+/-" value="-" />
        <ButtonSymbol label="0" />
        <ButtonSymbol label="." />
        <ButtonEnter label="=" />
      </div>
    </div>
  )
}
