import axios from 'axios';

// Create axios instance with base configuration
// In development, use relative URLs to leverage the proxy in package.json
// In production, use REACT_APP_API_URL environment variable
const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL || '',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add request interceptor to include auth token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// API endpoints
export const auth = {
    login: (email, password) => api.post('/api/auth/login', { email, password }),
    register: (name, email, password) => api.post('/api/auth/register', { name, email, password }),
    logout: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    },
};

export const workouts = {
    getPlans: () => api.get('/api/plans'),
    getPlanById: (id) => api.get(`/api/plans/${id}`),
    getUserWorkouts: (userId) => api.get(`/api/user-workouts/${userId}`),
    createUserWorkout: (workoutData) => api.post('/api/user-workouts', workoutData),
    deleteUserWorkout: (workoutId) => api.delete(`/api/user-workouts/${workoutId}`),
    markWorkoutComplete: (workoutId, dayIndex) => api.patch(`/api/user-workouts/${workoutId}/complete`, { dayIndex }),
};

export const community = {
    getMembers: (planId) => api.get(`/api/community/${planId}`),
    getBuddyProfile: (userId) => api.get(`/api/users/${userId}`),
};

export default api;
