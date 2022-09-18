//GET
async function VerificarRegistro(){
    await fetch("https://632491505c1b435727ab8796.mockapi.io/deiby/ubicacion/1")
        .then(response => response.json())
        .then(async json => {console.log(json); await VerificarRegistro()})
        .catch(async err => {console.log(err); await VerificarRegistro()})
}
//POST
var todo = {
    "accuracy": position.coords.accuracy,
    "altitude": position.coords.altitude,
    "altitudeAccuracy": position.coords.altitudeAccuracy,
    "heading": position.coords.heading,
    "latitude": position.coords.latitude,
    "longitude": position.coords.longitude,
    "speed": position.coords.speed,
    "timestamp": new Date(position.timestamp),
    "solicitud": cant,
    "linea": 1
}
await fetch(
    'https://632491505c1b435727ab8796.mockapi.io/deiby/ubicacion' 
    ,{
        method: 'POST',
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
    Solicitudes: ${cant},
    "linea": 1
    --------------`
);

//PUT
var todo = {
    "id":1,
    "accuracy": position.coords.accuracy,
    "altitude": position.coords.altitude,
    "altitudeAccuracy": position.coords.altitudeAccuracy,
    "heading": position.coords.heading,
    "latitude": position.coords.latitude,
    "longitude": position.coords.longitude,
    "speed": position.coords.speed,
    "timestamp": new Date(position.timestamp),
    "solicitud": cant,
    "linea": 1
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
/*
https://mockapi.io/projects/632491505c1b435727ab8797
GET
    fetch("https://632491505c1b435727ab8796.mockapi.io/deiby/prueba1")
        .then(response => response.json())
        .then(json => {console.log(json)})
        .catch(err => {console.log(err);})

POST
    const todo = {"lat":5.34455,"lng":5.34455};

    fetch(
        'https://632491505c1b435727ab8796.mockapi.io/deiby/prueba1' 
        ,{
            method: 'POST',
            body: JSON.stringify(todo),
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            }
        }
    )
        .then(response => response.json())
        .then(json => {console.log(json);});
        .catch(err =>{console.log(err);})

PUT
    var todo = {"id":2, "lat":0.34455, "lng":0.34455};

    fetch(
        'https://632491505c1b435727ab8796.mockapi.io/deiby/prueba1/'+todo.id 
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
        .catch(err =>{console.log(err);})
*/