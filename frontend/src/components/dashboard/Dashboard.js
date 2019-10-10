import React, { Component } from 'react'
import AUTH_SERVICE from '../../services/auth'
import { Link } from 'react-router-dom'
class Dashboard extends Component {
    state={
        user: {},
        users: [],
        filteredUsers: [],
        post:{},
        posts: [],
         track:[]
        
    }

    componentDidMount=async()=>{
    const {data: users} = await AUTH_SERVICE.allUsers(this.state.users)
    localStorage.users = JSON.stringify(users)
    this.setState({ users: JSON.parse(localStorage.users) })
    const {data: user} = await AUTH_SERVICE.getProfile(this.state.user)
    if(!user) return this.props.history.push('/login')
    localStorage.user = JSON.stringify(user)
    this.setState({ user: JSON.parse(localStorage.user) })
    const {data: posts} = await AUTH_SERVICE.userPost(this.state.posts)
    localStorage.posts = JSON.stringify(posts)
    this.setState({posts})
    const {data: track} = await AUTH_SERVICE.getPlaylist(this.state.track)
    localStorage.track = JSON.stringify(track)
    this.setState({track})
    }

    handlePostInput= (e)=>{
        const { post } = this.state
        const key = e.target.name
        post[key] = e.target.value
        this.setState({post })
    }

    delete = async (id)=>{
        await AUTH_SERVICE.deleteTrack(id)
        const {data: track} = await AUTH_SERVICE.getPlaylist(this.state.track)
        localStorage.track = JSON.stringify(track)
        this.setState({track})
      }


    createPost = async()=>{
        const {data: post} = await AUTH_SERVICE.createPost(this.state.post)
        localStorage.posts = JSON.parse(localStorage.posts).push(post)
        this.setState((prevState)=>{
            const {posts} = prevState
            posts.push(post)
            return({posts})
        })
    }

    deleteAPost = async(id)=>{
        await AUTH_SERVICE.deletePost(id)
        const {data: posts} = await AUTH_SERVICE.userPost(this.state.posts)
        localStorage.posts = JSON.stringify(posts)
        this.setState({posts})
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
        this.setState({ filteredUsers })
      }
      onLogout = async () => {
        await AUTH_SERVICE.logout();
        localStorage.clear()
        this.props.history.push('/login')
      }

    render() {
        const {filteredUsers, posts} = this.state
        const {track} = this.state
        const {username} = this.state.user
        return (
            <div className="dashboard">
                <nav className="profileNavbar">
            <h2>Dashboard</h2>
            <h1>Welcome {username}</h1>
            <div className="logoutButton">
            <button><Link to="/profile" >Profile</Link></button>
            <button onClick={this.onLogout}>Logout</button>
            </div>
            </nav>
            <div className="dashboardElements">
                <div className="searchProfile">
                 <input className='input' type='search' name='search' placeholder='Search' onChange={this.search} />
                 </div>
                {filteredUsers.map((user, i) => (
                    <div className="filteredUsers">
                    <h4 key={i}>{user.name} {user.lastName}</h4>
                    <p key={i}>Main Instrument {user.mainInstrument}</p>
                    <p key={i}>Favorite artist: {user.musicInfluences[0].name}</p>
                    </div>
                    
                    ))}
                <div>
                    <Link to="/playlist">Add track</Link>
                    <h2>Playlist</h2>
                <ul>
                {track.length===0? 'Loading...': track[0].tracks.map((track, i)=>{
                  return <li key={i}>{track.name} By {track.artists[0].name}<button id={track.id} onClick={()=>this.delete(track.id)}>Delete</button></li>
                    
                })} 
              </ul>
              </div>
                <div>
                <textarea name="content" id="post" cols="60" rows="5" onChange={this.handlePostInput} placeholder="Create a post"></textarea>
                <button onClick={this.createPost}>Submit</button>
                </div>
                 <div>
                    <h2>Posts</h2>
                    <ul>
                    {posts.map((post, i)=>{
                        return <li key={i}>{post.content}<button id={post._id} onClick={()=>this.deleteAPost(post._id)}>Delete</button></li>
                })}
                    </ul>
                </div>
                </div>  
            </div>
        )
    }
}

export default Dashboard
