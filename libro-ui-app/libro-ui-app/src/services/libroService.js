import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}/api/Libro`,
});

// Add a request interceptor to include the JWT in the Authorization header
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('jwtToken'); // Corrected the key to match the one used in auth.js
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
    const response = await axiosInstance.get('/');
    return response.data;
  },

  async createLibro(libro) {
    const response = await axiosInstance.post('/', libro);
    return response.data;
  },
};

export default libroService;