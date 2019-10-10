import axios from 'axios';

const baseURL = process.env.NODE_ENV === 'production' ? 'https://indigo-gozing.herokuapp.com/api/auth' : 'http://localhost:3001/api/auth'
const SERVICE = axios.create({ baseURL, withCredentials: true });

const AUTH_SERVICE = {
  allUsers: (users)=>SERVICE.get('/allUsers', users),
  signup: (user) => SERVICE.post('/signup', user),
  login: (user) => SERVICE.post('/login', user),
  logout: () => SERVICE.get('/logout'),
  getProfile: (user)=>SERVICE.post('/profile', user),
  editProfile:(update) => SERVICE.post('/editProfile', update),
  getUser: () => SERVICE.get('/loggedin'),
  deleteMI: (id)=>SERVICE.delete(`/deleteMI/${id}`),
  createPost: (post)=>SERVICE.post('/createPost', post),
  userPost: (post)=>SERVICE.get('/userPost', post),
  editPost: (update, id)=>SERVICE.post(`/editPost/${id}`, update),
  deletePost: (id)=>SERVICE.delete(`/deletePost/${id}`),
  addTrack: (update)=>SERVICE.post('/addTrack', update),
  deleteTrack: (id)=>SERVICE.delete(`/deleteTrack/${id}`),
  getPlaylist: (tracks)=>SERVICE.get('/getPlaylist', tracks)
};

export default AUTH_SERVICE;
