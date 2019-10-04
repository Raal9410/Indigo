import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import AUTH_SERVICE from '../../services/auth'

class Profile extends Component {
  state = {
    user: {},
    profile: {}
  }

  componentDidMount = async () => {
    const {data: user} = await AUTH_SERVICE.getProfile(this.state.user)
   // if(!user) return this.props.history.push('/login')
    localStorage.user = JSON.stringify(user)
    this.setState({ user })
  }

  onLogout = async () => {
    await AUTH_SERVICE.logout();
    delete localStorage.user;
    this.props.history.push('/login')
  }

  render() {
    const { name, lastName } = this.state.user
    const { mainInstrument, musicInfluences, img, friends} = this.state.profile
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
               <br/>
          
              <Link to="/spotify">Search Artist</Link>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Profile