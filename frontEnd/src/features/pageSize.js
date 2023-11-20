import { createSlice } from '@reduxjs/toolkit'


export const pageSize = createSlice({
  name: 'pageSize',
  initialState: {
    paper: {
      width: null,
      height: null
    },
    stickerSize: null,
    limit: null
  },
  reducers: {
    a4_page: (state) => {
      state.paper.width = 29.7
      state.paper.height = 21
      state.stickerSize = 4
      state.limit = 36
    },
    a5_page: (state) => {
        state.paper.width = 21
        state.paper.height = 14.8
        state.stickerSize = 2
        state.limit = 32
    },

  },
})

// Action creators are generated for each case reducer function
export const { a5_page, a4_page } = pageSize.actions

export default pageSize.reducer