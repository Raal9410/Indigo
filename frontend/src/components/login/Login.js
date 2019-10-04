import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AUTH_SERVICE from '../../services/auth'

class Login extends Component {
  state = {
    user: {}
  }

  componentDidMount = () => {
    if (localStorage.user) return this.props.history.push('/profile')
  }

  handleInput = (e) => {
    const key = e.target.name;
    const value = e.target.value

    this.setState((prevState) => {
      const {user} = prevState;

      user[key] = value;

      return { user }
    })
  }

  onSubmit = async (e) => {
    const {data: user} = await AUTH_SERVICE.login(this.state.user)
    localStorage.user = JSON.stringify(user);
    console.log(user)
    this.props.history.push('/profile')
  }

  render() {
    return (
      <div>
        <div>
          <div>
              <h1>Welcome to Indigo</h1>
              <h4>Musicians meeting musicians by their own music taste.</h4>
            <div>
            <h2>Log in</h2>
            </div>
            {/*<form>
              <label htmlFor="username">Username</label>
              <input type="text" name="username" id="username" value={username} onChange={this.handleInput} />
              <label htmlFor="password">Password</label>
              <input type="password" name="password" id="password" value={password} onChange={this.handleInput} />
            </form> */}
          </div>
          <div>
            <div>
              <a href="http://localhost:3001/api/auth/login">
              <button>Log in with Spotify</button>
              </a>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default Login