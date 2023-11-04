import { createSlice } from '@reduxjs/toolkit'


export const stickersImages = createSlice({
  name: 'stickersImages',
  initialState: {
    images : []
  },
  reducers: {
    addImage: (state, actions) => {
      state.images.push(actions.payload)
    },
    deleteImage: (state, actions) => {
        state.images = state.images.filter(image => image !== actions.payload)
    },

  },
})

// Action creators are generated for each case reducer function
export const { deleteImage, addImage } = stickersImages.actions

export default stickersImages.reducer