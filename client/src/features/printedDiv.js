import { createSlice } from '@reduxjs/toolkit'


export const printedDiv = createSlice({
  name: 'printedDiv',
  initialState: {
    imageRef : null,
    extention: null
  },
  reducers: {
    setImageRef: (state, actions) => {
      state.imageRef = actions.payload
    },
    setExtention: (state, actions) => {
      state.extention = actions.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { setImageRef, setExtention } = printedDiv.actions

export default printedDiv.reducer