import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import AUTH_SERVICE from '../../services/auth'

class Profile extends Component {
  state = {
    user: {
    },
    profile: {}
  }

  componentDidMount = () => {
    if(!localStorage.user) return this.props.history.push('/login')
    this.setState({ user: JSON.parse(localStorage.user), profile: JSON.parse(localStorage.profile)})
  }

  onLogout = async () => {
    await AUTH_SERVICE.logout();
    delete localStorage.user;
    this.props.history.push('/login')
  }

  render() {
    const { username, name, lastName } = this.state.user
    const { mainInstrument, musicInfluences, profileImg, friends} = this.state.profile
    return (
      <div>
        <div>
          <div>
            <h2>Profile</h2>
            <div>
              <img style={{width: '200px'}}src={profileImg} alt={username}/>
            </div>
            <div>
              <h2>Username</h2>
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
              <p>{musicInfluences}</p>
            </div>
            <div>
              <h2>Friends</h2>
              <p>{friends}</p>
            </div>
            <button onClick={this.onLogout}>Logout</button>
          </div>
          <div className="right-side">
            <div>
              <Link to="/profile/editProfile">Edit</Link>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Profile