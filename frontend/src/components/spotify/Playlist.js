import React, { Component } from 'react'
import SpotifyWebApi from 'spotify-web-api-js'
import AUTH_SERVICE from '../../services/auth';

const spotifyWebApi =  new SpotifyWebApi()

class Playlist extends Component {
    constructor(){
        super();
        const token = localStorage.token;
        if (token) {
          spotifyWebApi.setAccessToken(token);
        }
        this.state = {
          loggedIn: token ? true : false,
          query: '',
          modalActive: false,
          playlist: {},
          tracks: [],
          trackInfo: {
              name:'',
              id: '',
              artists: []
          }
        }
      }

getTracks=()=>{
    spotifyWebApi.searchTracks(this.state.query)
    .then(data => {
      console.log("The received data from the API: ", data);
      this.setState({
          tracks:data.tracks.items

              })
    })
    .catch(err => {
      console.log("The error while searching artists occurred: ", err);
    })
}

goBack=()=>{
    this.props.history.push('/dashboard')
}

addTracks= async(track)=>{
    this.setState({isModalActive: true })
    const {name, id, artists } = track
    await AUTH_SERVICE.addTrack({tracks: {name, id, artists}})
    this.setState({
        trackInfo : {name, artists, id}
    })

    

}
    
    handleInput=(e)=>{
        this.setState({
            query: e.target.value
        })
    }


    render() {
       const {isModalActive} = this.state
    return (
            <div className="searchTrack">
                <div>
                    <h1>Search Tracks</h1>
                </div>
                <input type='search' name='search' value={this.state.query} onChange={this.handleInput} placeholder='Search'/>
                <button type="submit" value="Submit"  onClick={this.getTracks}>Find</button>
                
                <button type="submit" value="Go back" onClick={this.goBack}>Go Back To Dashboard</button>
                <p>Searched Tracks:</p>
                {isModalActive? 
                    <div className="bg-container">
                <div className="back-container" onClick={()=>{
                    this.setState({isModalActive: false})
                }}></div>
                <div className="modal-container">
                    <div className="modalSpotify">
                        Track added
                    </div>
                    </div>
                    </div>
                    :undefined
                    }
                    <div className="searchedTrack">
                    <ul>
                        {this.state.tracks.map((track, i)=>{
                            return <li key={i}>{track.name} By {track.artists[0].name}<button onClick={() => this.addTracks(track)}>Add</button></li>
                        })}
                    </ul>
                    </div>
            </div>
        )
    }
}

export default Playlist