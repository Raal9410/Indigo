import React, { Component } from 'react'
import SpotifyWebApi from 'spotify-web-api-js'

const spotifyWebApi =  new SpotifyWebApi()

class SpotifyLib extends Component {
    constructor(){
        super();
        const token = localStorage.token;
        //console.log(token)
        if (token) {
          spotifyWebApi.setAccessToken(token);
        }
        this.state = {
          loggedIn: token ? true : false,
          query: '',
          artists: [],
          artistInfo: {}
        }
      }

getArtist=()=>{
    spotifyWebApi.searchArtists(this.state.query)
    .then(data => {
      console.log("The received data from the API: ", data);
      this.setState({
          artists:data.artists.items

              })
    })
    .catch(err => {
      console.log("The error while searching artists occurred: ", err);
    })
}

goBack=()=>{
    this.props.history.push('/profile')
}

addArtist= (artist)=>{
    //console.log(artist)
    const {name, genres, id, images } = artist
    this.setState({
        artistInfo : {name, genres, id, images}
    })
    
}

// componentDidUpdate(prevState){
//     const {artistInfo} = this.state
//     if(this.state.artistInfo !== prevState.artistInfo){
//         this.setState({artistInfo})
//     }
    
//     }
    
    handleInput=(e)=>{
        this.setState({
            query: e.target.value
        })
    }
    render() {
        
        console.log(this.state.artistInfo)
    return (
            <div>
                <div>
                    <h1>Search Artist</h1>
                </div>
                <input type='search' name='search' value={this.state.query} onChange={this.handleInput} placeholder='Search'/>
                <button type="submit" value="Submit"  onClick={this.getArtist}>Find</button>
                <br/>
                <button type="submit" value="Go back" onClick={this.goBack}>Go Back To Profile</button>
                    <p>Searched Artists:</p>
                    <ul>
                        {this.state.artists.map((artist, i)=>{
                            return <li key={i}>{artist.name}<img style={{width:'100px'}} alt={artist.name}src={artist.images.length>0 ? artist.images[0].url: '' }/>
                            <button onClick={() => this.addArtist(artist)}>Add</button></li>
                        })}
                    </ul>
                    
            </div>
        )
    }
}

export default SpotifyLib