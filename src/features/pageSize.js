import { createSlice } from '@reduxjs/toolkit'


export const pageSize = createSlice({
  name: 'pageSize',
  initialState: {
    width: null,
    height: null
  },
  reducers: {
    a4_page: (state) => {
      state.width = 29.7
      state.height = 21
    },
    a5_page: (state) => {
        state.width = 21
        state.height = 14.8
    },

  },
})

// Action creators are generated for each case reducer function
export const { a5_page, a4_page } = pageSize.actions

export default pageSize.reducer