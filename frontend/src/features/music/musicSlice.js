import { createMusic, createAsyncThunk } from '@reduxjs/toolkit'
import musicService from './musicService'

const initialState = {
    songs: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
}

// Add new music 
export const createMusic = createAsyncThunk('musics/create',
    async (musicData, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token
            return await musicService.createMusic(musicData, token)
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    })

// Get user goals
export const getMusics = createAsyncThunk
    ('musics/getAll',
        async (_, thunkAPI) => {
            try {
                const token = thunkAPI.getState().auth.user.token
                return await musicService.getMusics(token)
            } catch (error) {
                const message =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString()
                return thunkAPI.rejectWithValue(message)
            }
        }
    )

    // Delete user goal 
export const deleteMusic = createAsyncThunk(
    'music/delete', 
async (id, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await musicService.deleteMusic(id, 
        token)
    } catch (error) {
        const message = 
        (error.response && 
            error.response.data && 
            error.response.data.message) || 
            error.message || 
            error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const musicSlice = createMusic({
    name: 'music',
    initialState,
    reducers: {
        reset: (state) => initialState
    },
    extraReducers: (builder) => {
        builder
            .addCase(createMusic.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createMusic.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.musics.push(action.payload)
            })
            .addCase(createMusic.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(getMusics.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getMusics.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.musics = action.payload
            })
            .addCase(getMusics.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(deleteMusic.pending, (state) => {
                state.isLoading = true
            })
            .addCase(deleteMusic.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.musics = state.musics.filter(
                    (music) => music._id !== action.payload.id) 
            })
            .addCase(deletemusic.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
    },
})

export const { reset } = musicSlice.actions
export default musicSlice.reducer