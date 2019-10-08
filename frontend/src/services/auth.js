import axios from 'axios';

//process.env.NODE_ENV === 'production'
  //? (const baseURL = 'here should be your production endpoint')
  //: (const baseURL = 'http://localhost:3000');

const SERVICE = axios.create({ baseURL: 'http://localhost:3001/api/auth', withCredentials: true });

const AUTH_SERVICE = {
  signup: (user) => SERVICE.post('/signup', user),
  login: (user) => SERVICE.post('/login', user),
  logout: () => SERVICE.get('/logout'),
  getProfile: (user)=>SERVICE.post('/profile', user),
  editProfile:(update) => SERVICE.post('/editProfile', update),
  getUser: () => SERVICE.get('/loggedin'),
  deleteMI: (id)=>SERVICE.delete('/deleteMI/', {id})
};

export default AUTH_SERVICE;
