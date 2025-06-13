import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}/api/Libro`,
});

// Cache for preventing duplicate requests
const requestCache = new Map();
const CACHE_DURATION = 30000; // 30 seconds

// Add a request interceptor to include the JWT in the Authorization header
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('jwtToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const libroService = {
  async getLibros() {
    const cacheKey = 'getLibros';
    const now = Date.now();
    
    // Check cache first
    if (requestCache.has(cacheKey)) {
      const { data, timestamp } = requestCache.get(cacheKey);
      if (now - timestamp < CACHE_DURATION) {
        return data;
      }
    }
    
    const response = await axiosInstance.get('/');
    
    // Cache the response
    requestCache.set(cacheKey, {
      data: response.data,
      timestamp: now
    });
    
    return response.data;
  },

  async createLibro(libro) {
    const response = await axiosInstance.post('/', libro);
    
    // Clear cache after creating a new libro
    requestCache.delete('getLibros');
    
    return response.data;
  },

  // Method to clear cache manually
  clearCache() {
    requestCache.clear();
  }
};

export default libroService;