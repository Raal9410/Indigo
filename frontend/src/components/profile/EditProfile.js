import React, {Component} from 'react'
import AUTH_SERVICE from '../../services/auth';

class EditProfile extends Component{
    state={
        user:{
            username: '',
            name: '',
            lastName: '',
            mainInstrument: '',
            friends: '',
            img: ''
        }
    }
    componentDidMount(){
        this.setState((prevState)=>{
            const {user} = prevState
            const userProfile = JSON.parse(localStorage.user)
            for(let key in userProfile){
                if (key!=='img'){
                    user[key] = userProfile[key]
                }
            }
            return ({user})
        })
    }

    handleInput=(e)=>{
        const key = e.target.name;
        const value = e.target.value
        this.setState(prevState => {
            const {user} = prevState;
            user[key] = value
    
          return { user }
        })}

    handleFile=(e)=>{
        this.setState({[e.target.name]: e.target.files[0]})
    }

    goBack=()=>{
        this.props.history.push('/profile')
    }

    onSubmit = async (e) => {
        e.preventDefault()
        const fd = new FormData()
        fd.append('img', this.state.img)
        for(const key in this.state.user){
            if(key!== 'musicInfluences'){
                fd.append(key, this.state.user[key])
            }
            else if(Object.keys(this.state.user.musicInfluences).length === 0 && this.state.user.musicInfluences.constructor === Object){
                fd.append(key, this.state.user[key])
            }
        }
        const {data: user} = await AUTH_SERVICE.editProfile(fd)
        localStorage.user = JSON.stringify(user)
        this.props.history.push('/profile')
    }
    render(){
        const {username, name, lastName, mainInstrument}= this.state.user
        return(
            <div className="edit">
                <div className="editForm">
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
                    <input name="img" type="file" onChange={this.handleFile}/>
                   
                    <br/>
                    {/* <img style={{width: '200px'}} src={img} alt={username}/> */}
                </form>
                <button onClick={this.onSubmit}>Update</button>
                <button onClick={this.goBack}>Go Back</button>
                </div>
            </div>
        )
    }
}

export default EditProfile