import React, {useEffect} from "react"
import { useSelector, useDispatch } from "react-redux"

import { addSymbol, addOperator, clearLast, clearAll } from "../store/calculator"

const Display = () => {
  const { inputs } = useSelector((state) => state.calc)
  const dispatch = useDispatch()

  const handleKeyDown = (evt) => {
    if (evt.target.nodeName === 'INPUT' && evt.target.name !== 'calc-display') {
      return;
    }

    const { keyCode, shiftKey } = evt
    //console.log(keyCode, shiftKey)
    if (keyCode >= 48 && keyCode <= 57 && !shiftKey) {
      dispatch(addSymbol({value: '' + (keyCode - 48)}))
    } else if ((keyCode >= 96 && keyCode <= 105)) {
      dispatch(addSymbol({value: '' + (keyCode - 96)}))
    } else if (keyCode === 107 || (keyCode === 187 && shiftKey)) {
      dispatch(addOperator({value: '+'}))
    } else if (keyCode === 109 || keyCode === 189) {
      dispatch(addOperator({value: '-'}))
    } else if (keyCode === 106 || (keyCode === 56 && shiftKey)) {
      dispatch(addOperator({value: '*'}))
    } else if (keyCode === 111 || keyCode === 191) {
      dispatch(addOperator({value: '/'}))
    } else if (keyCode === 80 || (keyCode === 54 && shiftKey)) {
      dispatch(addOperator({value: '^'}))
    } else if (keyCode === 188 || keyCode === 190) {
      dispatch(addSymbol({value: '.'}))
    } else if (keyCode === 219 || (keyCode === 57 && shiftKey)) {
      dispatch(addSymbol({value: '('}))
    } else if (keyCode === 221 || (keyCode === 48 && shiftKey)) {
      dispatch(addSymbol({value: ')'}))
    } else if (keyCode === 8 || keyCode === 46) {
      dispatch(clearLast())
    } else if (keyCode === 13 || (keyCode === 187 && !shiftKey)) {
      //onEqualButtonClick()
    } else if (keyCode === 27) {
      dispatch(clearAll())
    } else if (keyCode === 78) {
      //onChangeSignButtonClick()
    } else if (keyCode === 88) {
      dispatch(addSymbol({value: 'x'}))
    } else if (keyCode === 83) {
      dispatch(addOperator({value: 'sqrt'}))
    }
  }

  useEffect(() => {
    document.body.addEventListener('keyup', handleKeyDown)
    return () => document.body.removeEventListener('keyup', handleKeyDown)
  })

  let label = ''
  inputs.forEach(({value}) => {
    label += value
  })

  return (
    <input value={label} name="calc-display" readOnly></input>
  )
}

export default Display
