import React, { Component } from 'react'
import AUTH_SERVICE from '../../services/auth'
class Dashboard extends Component {
    state={
        user: {},
        users: [],
        filteredUsers: []
    }

    componentDidMount=async()=>{
    const {data: users} = await AUTH_SERVICE.allUsers(this.state.users)
    localStorage.users = JSON.stringify(users)
    this.setState({ users: JSON.parse(localStorage.users) })
    const {data: user} = await AUTH_SERVICE.getProfile(this.state.user)
    if(!user) return this.props.history.push('/login')
    localStorage.user = JSON.stringify(user)
    this.setState({ user: JSON.parse(localStorage.user) })
    }

    search = e => {
        const { value } = e.target
        const { users } = this.state
        const query = value.toLowerCase()
        const filteredUsers = users.filter((user) =>{
            for(let i=0; i<user.musicInfluences.length; i++){
                if(user.musicInfluences[i].genres.includes(query)){
                    return true
                }       
            }
            return false
                })
        console.log('filtered',filteredUsers)
        this.setState({ filteredUsers })
      }

    render() {
        const {filteredUsers} = this.state
        const {username} = this.state.user
        return (
            <div>
                <h1>Welcome {username}</h1>
                 <input className='input' type='search' name='search' placeholder='Search' onChange={this.search} />
                {filteredUsers.map((user, i) => (
                  <p key={i}>{user.name}</p>
                ))}
            </div>
        )
    }
}

export default Dashboard
