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
            friends: ''
        }, 
        img: ''
    }
    componentDidMount(){
        this.setState((prevState)=>{
            const {profile} = prevState
            const userProfile = JSON.parse(localStorage.profile)
            const user = JSON.parse(localStorage.user)
            console.log(profile)
            console.log(userProfile)
            for(let key in userProfile){
                if (key!=='img'){
                    profile[key] = userProfile[key]
                }
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

    handleFile=(e)=>{
        this.setState({[e.target.name]: e.target.files[0]})
    }

    onSubmit = async (e) => {
        e.preventDefault()
        const fd = new FormData()
        fd.append('img', this.state.img)
        for(const key in this.state.profile){
            fd.append(key, this.state.profile[key])
        }
        console.log(fd.get('img'))
        const {data: {user, profile}} = await AUTH_SERVICE.editProfile(fd)
        localStorage.user = JSON.stringify(user)
        localStorage.profile = JSON.stringify(profile)
        this.props.history.push('/profile')
    }
    render(){
        const {username, name, lastName, mainInstrument}= this.state.profile
        return(
            <div>
                <h1>Update Profile</h1>
                <form encType="multipart/form-data">

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
                    <label htmlFor="img">Profile Image</label>
                    <input name="img" type="file"  onChange={this.handleFile}/>
                   
                    <br/>
                    <img style={{width: '200px'}} src={this.state.img} alt={username}/>
                </form>
                <button onClick={this.onSubmit}>Update</button>
            </div>
        )
    }
}

export default EditProfile