import { createSlice } from "@reduxjs/toolkit"

import compile from "../parser/parser"

const calculatorSlice = createSlice({
  name: "calc",
  initialState: {
    inputs: [{ value: "x" }],
    minX: -100,
    maxX: 100,
    validExpr: "x",
    isValidExpr: true,
  },
  reducers: {
    addSymbol(state, action) {
      const { value } = action.payload
      state.inputs.push({ value })
    },
    addOperator(state, action) {
      const { value } = action.payload
      state.inputs.push({ value })
      if (value === "sqrt") {
        state.inputs.push({ value: "(" })
      }
    },
    clearLast(state) {
      state.inputs.pop()
    },
    clearAll(state) {
      state.inputs = []
    },
    setRange(state, action) {
      const { minX, maxX } = action.payload
      state.minX = minX
      state.maxX = maxX
    },
    setFuncY(state) {
      let expression = ""
      state.inputs.forEach(({ value }) => {
        expression += value
      })
      const funcY = compile(expression)
      try {
        funcY(1)
        state.validExpr = expression
        state.isValidExpr = true
      } catch (e) {
        state.isValidExpr = false
      }
    },
  },
})

export const {
  addSymbol,
  addOperator,
  clearLast,
  clearAll,
  setRange,
  setFuncY,
} = calculatorSlice.actions

export default calculatorSlice.reducer
