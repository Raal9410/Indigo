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
        playlist: []
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
    const {data: playlist} = await AUTH_SERVICE.getPlaylist(this.state.playlist)
    localStorage.playlist = JSON.stringify(playlist)
    this.setState({playlist})
    }

    handlePostInput= (e)=>{
        const { post } = this.state
        const key = e.target.name
        post[key] = e.target.value
        this.setState({post })
    }

    delete = async (id)=>{
        
        await AUTH_SERVICE.deleteTrack(id)
        const {data: playlist} = await AUTH_SERVICE.getPlaylist(this.state.playlist)
        localStorage.playlist = JSON.stringify(playlist)
        this.setState({ playlist })
      }


    createPost = async()=>{
        console.log(this.state.post)
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
        console.log('filtered',filteredUsers)
        this.setState({ filteredUsers })
      }

    render() {
        const {filteredUsers, posts, playlist} = this.state
        const {username} = this.state.user
        return (
            <div>
                <button><Link to="/profile" >Go to profile</Link></button>
                <Link to="/playlist">Create Playlist</Link>
                <h1>Welcome {username}</h1>
                 <input className='input' type='search' name='search' placeholder='Search' onChange={this.search} />
                {filteredUsers.map((user, i) => (
                  <p key={i}>{user.name} {user.lastName}</p>
                    
                ))}
                <div>
                    <h2>Playlist</h2>
                <ul>
                {playlist.map((track, i)=>{
                  return <li key={i}>{track.name}<button id={track.id} onClick={()=>this.delete(track.id)}>Delete</button></li>
                })}
              </ul></div>
                <div>
                <textarea name="content" id="post" cols="60" rows="5" onChange={this.handlePostInput}></textarea>
                <button onClick={this.createPost}>Submit</button>
                <button>Edit</button>
                </div>
                 <div>
                    <ul>
                    {posts.map((post, i)=>{
                        return <li key={i}>{post.content}<button id={post._id} onClick={()=>this.deleteAPost(post._id)}>Delete</button></li>
                })}
                    </ul>
                </div>  
            </div>
        )
    }
}

export default Dashboard
