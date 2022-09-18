let LLinea;
let map
async function initMap() {
    let lab=window.document.querySelector("#hh1")
    LLinea=localStorage.getItem("linea")
    lab.innerHTML="LINEA "+LLinea

    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: -17.78443767407429, lng: -63.18189476666437 },
        zoom: 10,
    });

    CrearUbicaciones()
}
let grafGEO=[{'id':null, 'circle':null, 'punto':null}]
async function CrearUbicaciones(){
    await fetch("https://632491505c1b435727ab8796.mockapi.io/deiby/ubicacion")
        .then(response => response.json())
        .then(async json => {
            json.forEach(ubic => {
                if(ubic.linea==LLinea){
                    let indice = grafGEO.findIndex(element => element.id == ubic.id);
                    if(indice == -1){
                        grafGEO.push(
                            {
                                'id':ubic.id,
                                'circle':new google.maps.Circle({
                                    // center: {lat: ubic.latitude, lng: ubic.longitude},
                                    // radius: ubic.accuracy/2,
                                    strokeColor: "#blue",
                                    strokeOpacity: 0.9,
                                    strokeWeight: 0.2,
                                    fillColor: "blue",
                                    fillOpacity: 0.1,
                                    map,
                                }),
                                'punto':new google.maps.Marker({
                                    //position: {lat: ubic.latitude, lng: ubic.longitude},
                                    icon: {
                                        path: google.maps.SymbolPath.CIRCLE,
                                        scale: 10,
                                    },
                                    map: map,
                                })
                            }
                        )
                        indice=grafGEO.length-1
                    }
                    const pos = {lat:ubic.latitude, lng:ubic.longitude};
                    grafGEO[indice].circle.setCenter(pos)
                    grafGEO[indice].circle.setRadius(ubic.accuracy/2)
                    grafGEO[indice].punto.setPosition(pos)
                    //map.setCenter(pos);

                }
            });
            console.log("Solicitud "+(cant+=1)+" OK")
        })
        .catch(async err => {
            console.log(err);
            console.log("Solicitud "+(cant+=1)+" ERROR")
            CrearUbicaciones()
        }
    )
}

var cant=0
window.initMap = initMap;