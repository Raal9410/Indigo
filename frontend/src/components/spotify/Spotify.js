import React, { Component } from 'react'
import SpotifyWebApi from 'spotify-web-api-js'
import AUTH_SERVICE from '../../services/auth';

const spotifyWebApi =  new SpotifyWebApi()

class SpotifyLib extends Component {
    constructor(){
        super();
        const token = localStorage.token;
        if (token) {
          spotifyWebApi.setAccessToken(token);
        }
        this.state = {
          loggedIn: token ? true : false,
          query: '',
          isModalActive: false,
          artists: [],
          artistInfo: {
              name:'',
              id: '',
              images: []
          }
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
    this.setState({isModalActive: true})
    const {name, genres, id, images } = artist
    AUTH_SERVICE.editProfile({musicInfluences: {name, genres, id, images}})
    this.setState({
        artistInfo : {name, genres, id, images}
    })
    

}
    
    handleInput=(e)=>{
        this.setState({
            query: e.target.value
        })
    }
    render() {
       const{isModalActive} = this.state
    return (
            <div className="spotifySearch">
                <div>
                    <h1>Search Artist</h1>
                </div>
                <div>
                <input type='search' name='search' value={this.state.query} onChange={this.handleInput} placeholder='Search'/>
                <button type="submit" value="Submit"  onClick={this.getArtist}>Find</button>
                <br/>
                <button type="submit" value="Go back" onClick={this.goBack}>Go Back To Profile</button>
                </div>
                    <p>Searched Artists:</p>
                                        
                    {isModalActive? 
                    <div className="bg-container">
                <div className="back-container" onClick={()=>{
                    this.setState({isModalActive: false})
                }}></div>
                <div className="modal-container">
                    <div className="modalSpotify">
                        Artist added
                    </div>
                    </div>
                    </div>
                    :undefined
                    }
                <div className="searchedArtist">
                    <br/>
                    <br/>

                    <ul style={{listStyleType: "none"}}>
                        {this.state.artists.map((artist, i)=>{
                            return <li key={i}>{artist.name}<img style={{width:'100px'}} alt={artist.name}src={artist.images.length>0 ? artist.images[0].url: '' }/>
                            <button onClick={() => this.addArtist(artist)}>Add</button></li>
                        })}
                    </ul>
                    </div>
            </div>
        )
    }
}

export default SpotifyLib