const BASE_URL = 'https://tender-celina-dev-anonymous-b670cee7.koyeb.app/api/v1';

export const api = {
  register: (userData) => 
    fetch(`${BASE_URL}/register`, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    }).then(res => res.json()),

  login: (credentials) => 
    fetch(`${BASE_URL}/login`, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials)
    }).then(res => res.json()),

  logout: () => 
    fetch(`${BASE_URL}/logout`, {
      method: 'POST',
      credentials: 'include'
    }).then(res => res.json()),

  createPost: (content) => 
    fetch(`${BASE_URL}/createPost`, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content })
    }).then(res => res.json()),

  getPosts: () => 
    fetch(`${BASE_URL}/post`, {
      credentials: 'include'
    }).then(res => res.json()),

  likePost: (postId) => 
    fetch(`${BASE_URL}/like`, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ postId })
    }).then(res => res.json()),

  commentOnPost: (postId, content) => 
    fetch(`${BASE_URL}/comment`, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ postId, content })
    }).then(res => res.json()),

  regenerateAccessToken: () => 
    fetch(`${BASE_URL}/generatetoken`, {
      method: 'POST',
      credentials: 'include'
    }).then(res => res.json())
};

