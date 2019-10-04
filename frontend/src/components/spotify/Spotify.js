import React, { Component } from 'react'
import Spotify from 'spotify-web-api-js'
import axios from 'axios'

const spotifyWebApi =  new Spotify()

class SpotifyLib extends Component {
    constructor(){
        super()
    const params = this.getHashParams()
    this.state ={
        loggedIn: params.access_token ? true : false,
        artist:{
            name:''
        }
    }
    if(params.access_token){
        spotifyWebApi.setAccessToken(params.access_token)
    }
}

componentDidMount= async()=>{
const {data: tokenCallback} = await axios.get('http://localhost:3001/api/auth/spotify')
this.setAccessToken({tokenCallback})
console.log(tokenCallback)
}

getHashParams() {
    var hashParams = {};
    var e, r = /([^&;=]+)=?([^&;]*)/g,
    q = window.location.hash.substring(1);
    while( e === r.exec(q)) {
        hashParams[e[1]] = decodeURIComponent(e[2]);
    }
    return hashParams;
}

getAnArtist(input){
    spotifyWebApi.searchArtists(input)
    .then(function(data) {
        console.log('Search by "Love"', data);
    }, function(err) {
        console.error(err);
    });
}
render() {
    console.log(this.props.match)
    return (
            <div>
                     <a href='http://localhost:8888'>
        <button>Log into Spotify</button>
      </a>
                <div>
                    <p>Searched Artist: {this.state.artist.name}</p>
                </div>
                <input type='search' name='search' placeholder='Search' onChange={this.getAnArtist} />
                <button type="submit" value="Submit" onClick={this.getAnArtist}>Artist</button>
            </div>
        )
    }
}

export default SpotifyLib