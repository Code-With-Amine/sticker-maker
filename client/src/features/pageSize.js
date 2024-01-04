import { createSlice } from '@reduxjs/toolkit'


export const pageSize = createSlice({
  name: 'pageSize',
  initialState: {
    paper: {
      width: null,
      height: null,
      bgColor: 'gray',
    },
    stickerWidth: 4,
    stickerHeight: 5
  },
  reducers: {
    a4_page: (state) => {
      state.paper.width = 29.7
      state.paper.height = 21
      state.stickerWidth = 4
      state.stickerHeight = 3
    },
    a5_page: (state) => {
        state.paper.width = 21
        state.paper.height = 14.8
        state.stickerWidth = 2
        state.stickerHeight = 2
    },
    customised: (state, actions) => {
      state.paper.width = actions.payload.width
      state.paper.height = actions.payload.height
    },
    changeImage: (state, actions) => {
      state.paper.bgColor = actions.payload
    },
    changeWidth: (state, actions) => {
      state.stickerWidth = actions.payload
    },
    changeHeight: (state, actions) => {
      state.stickerHeight = actions.payload
    }

  },
})

// Action creators are generated for each case reducer function
export const { a5_page, a4_page, changeImage, changeHeight, changeWidth, customised } = pageSize.actions

export default pageSize.reducer