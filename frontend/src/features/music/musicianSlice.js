import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import musicianService from './musicianService';

const initialState = {
    musicians: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
}

// Create new musician 
export const createMusician = createAsyncThunk('musicians/create',
    async (musicianData, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token
            return await musicianService.createMusician(musicianData, token)
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

// Get user musician
export const getMusicians = createAsyncThunk
    ('musicians/getAll',
        async (_, thunkAPI) => {
            try {
                const token = thunkAPI.getState().auth.user.token
                return await musicianService.getMusicians(token)
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

    // Delete user musician 
export const deleteMusician = createAsyncThunk(
    'musicians/delete', 
async (id, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await musicianService.deleteMusician(id, 
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

export const musicianSlice = createSlice({
    name: 'musician',
    initialState,
    reducers: {
        reset: (state) => initialState
    },
    extraReducers: (builder) => {
        builder
            .addCase(createMusician.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createMusician.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.musicians.push(action.payload)
            })
            .addCase(createMusician.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(getMusicians.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getMusicians.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.musicians = action.payload
            })
            .addCase(getMusicians.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(deleteMusician.pending, (state) => {
                state.isLoading = true
            })
            .addCase(deleteMusician.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.musicians = state.musicians.filter(
                    (musician) => musician._id !== action.payload.id) 
            })
            .addCase(deleteMusician.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
    },
})

export const { reset } = musicianSlice.actions
export default musicianSlice.reducer