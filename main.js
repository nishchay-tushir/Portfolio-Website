
const clientId = '6bb1c52209d7479e86d6ea935467f56c';
const clientSecret = '870ddcbda212405d89590be8ba5ef57d';
const refreshToken = 'AQDxCnUcPydR9Ihg21WMFBp3W9hzkQHY_YYyA__Tw9xfBk4Uj5bLiAmgTFDus6PBmNFoyciTErHW1hdwEoGpyX7IkZvVcSbo6YuZ5fq-x1oO6IX6hFRLGJScGiTrFUSef3Y';


const getAccessToken = async () => {
  try {
    const authString = `${clientId}:${clientSecret}`;
    const base64AuthString = btoa(authString);

    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${base64AuthString}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `grant_type=refresh_token&refresh_token=${refreshToken}`,
    });

    const data = await response.json();
    const accessToken = data.access_token;
    return accessToken;
    
  } catch (error) {
    console.error('Error getting access token:', error.message);
  }
};
var accessToken;

let userToken = getAccessToken();
userToken.then(function(result) {
   console.log(' Access:',result)
   getCurrentlyPlayingTrack(result);   
  })


function getCurrentlyPlayingTrack(accessToken) {
    $.ajax({
      type: "GET",
      url: "https://api.spotify.com/v1/me/player/currently-playing?market=ES",
      headers: {
        'Authorization': 'Bearer ' + accessToken
      },
      success: function (data) {
        
        console.log(data);
        console.log(data.item.name);
        console.log(data.item.artists[0].name);

        var artwork = data.item.album.images[1].url;
        var trackName = data.item.name;
        var artistName = data.item.artists[0].name;
        var dName = data.item.popularity;

        var artworkID = document.getElementById('trackArtwork');
        var track = document.getElementById('trackName');
        var artist = document.getElementById('artist');
        var device = document.getElementById('device');

        artworkID.innerHTML = '<img src=' + artwork + '>';
        track.textContent = trackName;
        artist.textContent = 'By ' + artistName;
        device.textContent = dName;
      },
      dataType: "json"
    });
  }