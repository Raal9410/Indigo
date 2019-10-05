import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import AUTH_SERVICE from '../../services/auth'
import SpotifyWebApi from 'spotify-web-api-js'
const spotifyWebApi =  new SpotifyWebApi()

class Profile extends Component {
  constructor(){
    super();
    const params = this.getHashParams();
    let token = params.refresh_token
    if (token) {
      if(!localStorage.token) localStorage.setItem('token', JSON.stringify(token))
      spotifyWebApi.setAccessToken(token);
    }
    this.state = {
      loggedIn: token ? true : false,
      user:{ }
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

  render() {
    const { name, lastName, mainInstrument, musicInfluences, img, friends, username } = this.state.user
    return (
      <div>
        <div>
          <div>
            <h2>Profile</h2>
            <div>
              <img style={{width: '200px'}}src={img} alt='sadsada'/>
            </div>
            <div>
            </div>
            <div>
              <h2>username</h2>
              <p>{username}</p>
            </div>
            <div>
              <h2>Name</h2>
              <p>{name}</p>
            </div>
            <div>
              <h2>Last Name</h2>
              <p>{lastName}</p>
            </div>
            <div>
              <h2>Main Instrument</h2>
              <p>{mainInstrument}</p>
            </div>
            <div>
              <h2>Music Influences</h2>
              <Link to="/spotify">Search Artist</Link>
                {/*<ul>
                <li>{musicInfluences.map((musicInf, i)=>{
                  return <li>{musicInf}</li>
                })}</li>
              </ul>*/}
            </div>
            <div>
              <h2>Friends</h2>
              <p>{friends}</p>
            </div>
            <button onClick={this.onLogout}>Logout</button>
          </div>
          <div className="right-side">
            <div>
              <Link to="/profile/editProfile">Edit Profile</Link>
               <br/>

              <br/>
              <a href="http://localhost:8888">
                <button>Connect your Spotify account</button>
              </a>
              <br/> 
              <br/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Profile