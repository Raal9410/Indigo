import React, {Component} from 'react'
import AUTH_SERVICE from '../../services/auth';

class EditProfile extends Component{
    state={
        profile:{
            username: '',
            name: '',
            lastName: '',
            mainInstrument: '',
            musicInfluences: '',
            profileImg: '',
            friends: ''
        }
    }
    componentDidMount(){
        this.setState((prevState)=>{
            const {profile} = prevState
            const userProfile = JSON.parse(localStorage.profile)
            const user = JSON.parse(localStorage.user)
            console.log(profile)
            console.log(userProfile)
            for(let key in userProfile){
                profile[key] = userProfile[key]
            }
            for(let key in user){
                profile[key] = user[key]
            }
            return ({profile})
        })
    }

    handleInput=(e)=>{
        const key = e.target.name;
        const value = e.target.value
    
        this.setState(prevState => {
          const {profile} = prevState;
    
          profile[key] = value
    
          return { profile }
        })}

    onSubmit = async (e) => {
        e.preventDefault()
        const {data: {user, profile}} = await AUTH_SERVICE.editProfile(this.state.user)
        localStorage.user = JSON.stringify(user)
        localStorage.profile = JSON.stringify(profile)
        this.props.history.push('/profile')
    }
    render(){
        const {username, name, lastName, mainInstrument, profileImg}= this.state.profile
        return(
            <div>
                <h1>Update Profile</h1>
                <form>

                    <label htmlFor="username">Username</label>
                    <input type="text" name="username" id="username" placeholder="Username" value={username} onChange = {this.handleInput}/>
                    <br/>
                    <label htmlFor="name">Name</label>
                    <input type="text" name="name" id="name" placeholder="Name" value={name} onChange={this.handleInput}/>
                    <br/>
                    <label htmlFor="lastName">Last Name</label>
                    <input type="text" name="lastName" id="lastName" placeholder="Last Name" value={lastName} onChange={this.handleInput}/>
                    <br/>
                    <label htmlFor="mainInstrument">Main Instrument</label>
                    <input type="text" name="mainInstrument" id="mainInstrument" placeholder="Main Instrument" value={mainInstrument} onChange={this.handleInput}/>
                    <br/>
                    <label htmlFor="profileImg">Profile Image</label>
                    <br/>
                    <img style={{width: '200px'}}src={profileImg} alt={username}/>
                </form>
                <button onClick={this.onSubmit}>Update</button>
            </div>
        )
    }
}

export default EditProfile