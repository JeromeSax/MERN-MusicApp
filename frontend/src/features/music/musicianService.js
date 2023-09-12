import axios from 'axios';

const API_URL = '/api/musician/'

// Create new Musician
const createMusician = async (musicianData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.post(API_URL, musicianData, config)

    return response.data
}

// Get user musician
const getMusicians = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    const response = await axios.get(API_URL, config)

    return response.data
}

// Delete user music
const deleteMusician = async (musicianId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    const response = await axios.delete(API_URL + musicianId,
    config)

    return response.data
}

const musicianService = {
    createMusician,
    getMusicians,
    deleteMusician,
} 

export default musicianService 