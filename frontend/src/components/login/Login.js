import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AUTH_SERVICE from '../../services/auth'

class Login extends Component {
  state = {
    user: {
      username: '',
      password: ''
    }
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
    const { username, password} = this.state.user
    return (
      <div>
        <div className="login">
          <div>
              <h1>Welcome to Indigo</h1>
            <div>
            <h2>Log in</h2>
            </div>
            <form>
              <label htmlFor="username">Username</label>
              <input type="text" name="username" id="username" value={username} onChange={this.handleInput} />
              <label htmlFor="password">Password</label>
              <input type="password" name="password" id="password" value={password} onChange={this.handleInput} />
            </form>
          </div>
          <div>
          <p>If you don't have an account yet, you can create one <Link to="/signup">here</Link></p>
            <div>
            <button onClick={this.onSubmit}>Log in</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default Login