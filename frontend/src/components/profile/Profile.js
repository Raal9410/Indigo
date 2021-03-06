import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import AUTH_SERVICE from '../../services/auth'
import SpotifyWebApi from 'spotify-web-api-js'
const spotifyWebApi =  new SpotifyWebApi()

class Profile extends Component {
  constructor(){
    super();
    const params = this.getHashParams();
    let token = params.access_token
    if (token) {
      if(!localStorage.token) localStorage.setItem('token', JSON.stringify(token))
      spotifyWebApi.setAccessToken(token);
    }
    this.state = {
      loggedIn: token ? true : false,
      user:{
        musicInfluences:[]
      }
      
    }
  }

  getHashParams() {
    var hashParams = {};
    var e, r = /([^&;=]+)=?([^&;]*)/g,
        q = window.location.hash.substring(1);
    e = r.exec(q)
    while (e) {
       hashParams[e[1]] = decodeURIComponent(e[2]);
       e = r.exec(q);
       localStorage.token = hashParams.access_token
    }
    return hashParams;
  }

  componentDidMount = async () => {
    const {data: user} = await AUTH_SERVICE.getProfile(this.state.user)
    if(!user) return this.props.history.push('/login')
    localStorage.user = JSON.stringify(user)
    this.setState({ user: JSON.parse(localStorage.user) })
  }

  onLogout = async () => {
    await AUTH_SERVICE.logout();
    localStorage.clear()
    this.props.history.push('/login')
  }


  delete = async (id)=>{
    await AUTH_SERVICE.deleteMI(id)
    const {data: user} = await AUTH_SERVICE.getProfile(this.state.user)
    if(!user) return this.props.history.push('/profile')
    localStorage.user = JSON.stringify(user)
    this.setState({ user: JSON.parse(localStorage.user) })
  }

  render() {
    const { name, lastName, mainInstrument, img, username, musicInfluences } = this.state.user
    return (
      <div className="profile">
            <nav className="profileNavbar">
            <h2>Profile</h2>
            <div className="logoutButton">
            <button onClick={this.onLogout}>Logout</button>
            </div>
            </nav>
            <div className="profileElements">
            <div className="profileImg">
              <img src={img} alt={username}/>
            </div>
            <div className="profileInfo">
            <div className="profileUsername">
              <h2>Username</h2>
              <p>{username}</p>
            </div>
            <div className="profileName">
              <h2>Name</h2>
              <p>{name}</p>
            </div>
            <div className="profileLastName">
              <h2>Last Name</h2>
              <p>{lastName}</p>
            </div>
            <div  className="profileMainInstrument">
              <h2>Main Instrument</h2>
              <p>{mainInstrument}</p>
            </div>
            </div>
            <div className="profileMusicInfluences">
              <h2>Music Influences</h2>
                  <Link to="/spotify">Add artist</Link>
                <ul>
                {musicInfluences.map((musicInf, i)=>{
                  return <li key={i}><img alt={musicInf.name}src={musicInf.images.length>0 ? musicInf.images[0].url: '' }/><p>{musicInf.name}</p><button className="musicInfbutton" id={musicInf.id} onClick={()=>this.delete(musicInf.id)}>Delete</button></li>
                })}
              </ul>
            </div>
          <div className="profileRight">
              <Link to="/profile/editProfile">Edit Profile</Link>
               

              
              <a href="https://auth-spotify.herokuapp.com/">
                <button>Connect your Spotify account</button>
              </a>
               
              
              <Link to="/dashboard" >Go to dashboard</Link>
          </div>
          </div>
          </div>
    )
  }
}

export default Profile
