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
        <div className="signup">
          <div className="signupCard">
            <h2>Sign Up</h2>
            <form  className="signupForm">
              <div className="usernameSign">
              <label htmlFor="username">  Username</label>
              <input className="usernameInput" type="text" name="username" id="username" value={username} onChange={this.handleInput} placeholder="Username" required/>
              </div>
              <div className="passwordSign">
              <label htmlFor="password">Password</label>
              <input type="password" name="password" id="password" value={password} onChange={this.handleInput}  placeholder="Password" required/>
              </div>
              <div className="nameSign">
              <label htmlFor="name">Name</label>
              <input type="text" name="name" id="name" value={name} onChange={this.handleInput}  placeholder="Name" required/>                 
              </div>
              <div className="lastnameSign">
              <label htmlFor="name">Last Name</label>
              <input type="text" name="lastName" id="lastName" value={lastName} onChange={this.handleInput}  placeholder="Last name" required/>                 
              </div>
            </form>
            <div>
              <button className="signUpbutton" onClick={this.onSubmit} value="Submit">Signup</button>
            </div>
            </div>
          </div>
        
    )
  }
}
export default Signup 