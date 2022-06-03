function iniciarMap(){
    var coord = {lat:-17.783847435697183, lng: -63.18045008255558};
    //console.log(map.maps)
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition((loc)=>{
        coord.lat=loc.coords.latitude
        coord.lng=loc.coords.longitude
        console.log("pasaaaaaaaaaaa")
        var map = new google.maps.Map(document.getElementById('map'),{zoom: 12, center: coord});
        var marker = new google.maps.Marker(position=coord, map=map);
      })
    }
}
