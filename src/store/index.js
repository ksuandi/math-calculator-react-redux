import { configureStore } from "@reduxjs/toolkit"

import calculatorReducer from "./calculator"

const store = configureStore({
  reducer: {
    calc: calculatorReducer,
  },
})

export default store
