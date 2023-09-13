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
const updateMusic = async ( updatedData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            // Make sure to set Content-Type header
        },
    }
    // console.log(updatedData);
    try {
        const response = await axios.put(API_URL +  updatedData.musicId, {text: updatedData.text}, config);

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
    deleteMusic,
    updateMusic
} 

export default musicService 