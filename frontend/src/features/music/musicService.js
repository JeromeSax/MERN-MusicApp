import axios from 'axios'

const API_URL = '/api/music/'

// Create new music
const createMusic = async (musicData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.post(API_URL, musicData, config)

    return response.data
}

// Get user music
const getMusics = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    const response = await axios.get(API_URL, config)

    return response.data
}

// Update user music
const updateMusic = async (musicId, updatedData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json' // Make sure to set Content-Type header
        },
    }

    try {
        const response = await axios.put(API_URL + musicId, updatedData, config);

        return response.data;
    } catch (error) {
        // Handle error (e.g., show a notification)
        throw error;
    }
}

// Delete user music
const deleteMusic = async (musicId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    const response = await axios.delete(API_URL + musicId,
    config)

    return response.data
}

const musicService = {
    createMusic,
    getMusics,
    updateMusic,
    deleteMusic,
} 

export default musicService 