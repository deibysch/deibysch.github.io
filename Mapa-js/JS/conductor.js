let Linea, Id;
let map, circle, punto, idWatchPosition
function initMap() {
    let lab=window.document.querySelector("#hh1")
    Linea=localStorage.getItem("lineaConductor")
    Id=localStorage.getItem("idconductor")
    lab.innerHTML="LINEA: "+Linea+"\nUSUARIO: "+Id

    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: -17.78443767407429, lng: -63.18189476666437 },
        zoom: 10,
    });
}
async function EnviarUbicacion(){
    if (navigator.geolocation) {
        if(idWatchPosition!=null){
            //    navigator.geolocation.clearWatch(idWatchPosition);
            map.setCenter(punto.getPosition());
        }
        else{
            var cant=0
            circle = new google.maps.Circle({
                strokeColor: "#blue",
                strokeOpacity: 0.9,
                strokeWeight: 0.2,
                fillColor: "blue",
                fillOpacity: 0.1,
                map,
            });
            punto=new google.maps.Marker({
                //position: map.getCenter(),
                icon: {
                    path: google.maps.SymbolPath.CIRCLE,
                    scale: 10,
                },
                map: map,
            });
            idWatchPosition=navigator.geolocation.watchPosition(//navigator.geolocation.getCurrentPosition(
                success=async (position) => {
                    //console.log(position);
                    cant+=1
                    var todo = {
                        "id": Id,
                        "accuracy": position.coords.accuracy,
                        "altitude": position.coords.altitude,
                        "altitudeAccuracy": position.coords.altitudeAccuracy,
                        "heading": position.coords.heading,
                        "latitude": position.coords.latitude,
                        "longitude": position.coords.longitude,
                        "speed": position.coords.speed,
                        "timestamp": new Date(position.timestamp),
                        "linea": Linea,
                        "solicitud": cant 
                    }
                    await fetch(
                        'https://632491505c1b435727ab8796.mockapi.io/deiby/ubicacion/'+todo.id 
                        ,{
                            method: 'PUT',
                            body: JSON.stringify(todo),
                            headers: {
                                'Content-type': 'application/json; charset=UTF-8'
                            }
                        }
                    )
                        .then(response => response.json())
                        .then(json => {console.log(json);})
                        .catch(err =>{console.log(err);});console.log("====")
                    console.log(
                        `Latitud: ${position.coords.latitude}
                        Longitud: ${position.coords.longitude}
                        Precision: ${position.coords.accuracy}
                        Direccion: ${position.coords.heading}
                        Altitud: ${position.coords.altitude}
                        Precision: ${position.coords.altitudeAccuracy}
                        Velocidad: ${position.coords.speed}
                        Fecha: ${new Date(position.timestamp)}
                        Linea: ${Linea}
                        Solicitudes: ${cant}
                        --------------`
                    );
                    const pos = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    };
                    circle.setCenter(pos)
                    circle.setRadius(position.coords.accuracy/2/*Math.sqrt(position.coords.accuracy) * 100*/)
                    punto.setPosition(pos)
                    map.setCenter(pos);
                    //map.setZoom(12);
                },
                error=(geoError) => {
                    alert(geoError.message);
                },
                options={
                    enableHighAccuracy: true,
                    timeout: 5000,//cuantos miliseg esperara para enviar un mensaje de error
                    maximumAge: 0//antigüedad máxima en miliseg de una posición almacenada en caché que es aceptable devolver
                }
            );
        }
    } else {
        alert('El navegador no soporta geolocalizacion');
    }
}
function DetenerUbicacion(){
 navigator.geolocation.clearWatch(idWatchPosition)
}
window.initMap = initMap;
