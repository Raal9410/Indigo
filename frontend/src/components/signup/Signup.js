import React, { Component } from 'react'
import AUTH_SERVICE from '../../services/auth'

class Signup extends Component {
  state = {
    user: {
      username: '',
      password: '',
      name: '',
      lastName: ''
    }
  }

  componentDidMount = () => {
    if(this.props.match.path === '/signup' && localStorage.user) this.props.history.push('/profile')
  }

  handleInput = (e) => {
    const {user} = this.state
    const key = e.target.name;
    user[key] = e.target.value

    this.setState({user})
  }

  onSubmit = async (e) => {
    await AUTH_SERVICE.signup(this.state.user)
    this.props.history.push('/login')
  }

  render() {
    const { username, password, name, lastName } = this.state.user
    return (
      <div>
        <div>
          <div>
            <h2>Sign Up</h2>
            <form>
              <label htmlFor="username">Username</label>
              <input type="text" name="username" id="username" value={username} onChange={this.handleInput} />
              <label htmlFor="password">Password</label>
              <input type="password" name="password" id="password" value={password} onChange={this.handleInput} />
              <br/>
              <br/>
              <label htmlFor="name">Name</label>
              <input type="text" name="name" id="name" value={name} onChange={this.handleInput}/>                 
              <label htmlFor="name">Last Name</label>
              <input type="text" name="lastName" id="lastName" value={lastName} onChange={this.handleInput}/>                 
            </form>
          </div>
          <div>
            <h4>Welcome to Indigo</h4>
            </div>
            <div>
              <button onClick={this.onSubmit} value="Submit">Signup</button>
            </div>
          </div>
        </div>
    )
  }
}
export default Signup 