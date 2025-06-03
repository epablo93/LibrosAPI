// Update the API URL to use an environment variable
const API_URL = process.env.REACT_APP_API_URL;

export function getToken() {
  return localStorage.getItem('jwtToken');
}

export async function authenticate(username, password) {
  const response = await fetch(`${API_URL}/api/Auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username, password })
  });

  if (!response.ok) {
    throw new Error('Authentication failed');
  }

  const data = await response.json();
  localStorage.setItem('jwtToken', data.token);
}