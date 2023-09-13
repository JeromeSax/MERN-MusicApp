import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import musicService from './musicService'
import musicianService from './musicianService'

const initialState = {
    musics: [],
    // musicians: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
}

// Add new music 
export const createMusic = createAsyncThunk('musics/create',
    async (musicData, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await musicService.createMusic(musicData, token);
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

// Add new musician
export const createMusician = createAsyncThunk(
    'musicians/add',
    async (musicianData, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await musicService.createMusician(musicianData, token);
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);




// Get user music
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

// Update user music
export const updateMusic = createAsyncThunk(
    'musics/update',
    async (musicData, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await musicService.updateMusic(musicData, token); // Implement the updateMusic function in musicService.js
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
)




// Delete user music
export const deleteMusic = createAsyncThunk(
    'musics/delete',
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

// Get user musicians 
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
    'musician/delete',
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

export const musicSlice = createSlice({
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
            // Add the new action to the extraReducers in your musicSlice.js file
            .addCase(updateMusic.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateMusic.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                // Update the state with the updated music data
                state.musics = state.musics.map((music) =>
                    music._id === action.payload._id ? action.payload : music
                )
            })
            .addCase(updateMusic.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
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
            .addCase(deleteMusic.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })

            // // Handle createMusician action
            // .addCase(createMusician.pending, (state) => {
            //     state.isLoading = true;
            // })
            // .addCase(createMusician.fulfilled, (state, action) => {
            //     state.isLoading = false;
            //     state.isSuccess = true;
            //     state.musicians.push(action.payload); // Add the new musician to the state
            // })
            // .addCase(createMusician.rejected, (state, action) => {
            //     state.isLoading = false;
            //     state.isError = true;
            //     state.message = action.payload;
            // })

            // .addCase(getMusicians.pending, (state) => {
            //     state.isLoading = true
            // })
            // .addCase(getMusicians.fulfilled, (state, action) => {
            //     state.isLoading = false
            //     state.isSuccess = true
            //     state.musicians = action.payload
            // })
            // .addCase(getMusicians.rejected, (state, action) => {
            //     state.isLoading = false
            //     state.isError = true
            //     state.message = action.payload
            // })
            // .addCase(deleteMusician.pending, (state) => {
            //     state.isLoading = true
            // })
            // .addCase(deleteMusician.fulfilled, (state, action) => {
            //     state.isLoading = false
            //     state.isSuccess = true
            //     state.musicians = state.musicians.filter(
            //         (music) => music._id !== action.payload.id)
            // })
            // .addCase(deleteMusician.rejected, (state, action) => {
            //     state.isLoading = false
            //     state.isError = true
            //     state.message = action.payload
            // })
    },
})

export const { reset } = musicSlice.actions
export default musicSlice.reducer