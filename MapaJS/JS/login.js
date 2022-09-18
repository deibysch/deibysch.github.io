function IniciarSesion(){
    let user=window.document.querySelector("#user").value;
    let pass=window.document.querySelector("#pass").value;
    console.log(user, pass);
    VerificarRegistro(user, pass)
}

async function VerificarRegistro(user, pass){
    await fetch("https://632491505c1b435727ab8796.mockapi.io/deiby/usuarios")
        .then(response => response.json())
        .then(json => {
            let indice = json.findIndex(element => element.user == user && element.password==pass);
            console.log(indice,json)
            if(indice!=-1){
                localStorage.setItem("idconductor",json[indice].id)
                window.location.href = "../HTML/lineasConductor.html";
            }
            else
                alert("DATOS INCORRECTOS")
        })
        .catch(async err => {
            console.log(err); 
            await VerificarRegistro(user, pass)
        })
}

function Registrar(){
    let user=window.document.querySelector("#user").value;
    let pass=window.document.querySelector("#pass").value;
    console.log(user, pass);
    SubirUsuarioNuevo(user, pass)
}
async function SubirUsuarioNuevo(user, pass){
    var usuario = {
        "user": user,
        "password": pass
    }
    await fetch(
        'https://632491505c1b435727ab8796.mockapi.io/deiby/usuarios' 
        ,{
            method: 'POST',
            body: JSON.stringify(usuario),
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            }
        }
    )
        .then(response => response.json())
        .then(json => {
            console.log("idusuario: "+json.id);
            localStorage.setItem("idconductor",json.id)
            SubirUbicacion()
        })
        .catch(err =>{
            console.log(err);
            SubirUsuarioNuevo(user, pass)
        });
}
async function SubirUbicacion(){
    var todo = {
        "accuracy": null,
        "altitude": null,
        "altitudeAccuracy": null,
        "heading": null,
        "latitude": null,
        "longitude": null,
        "speed": null,
        "timestamp": null,
        "solicitud": null,
        "linea": null
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
        .then(json => {
            console.log("idubicacion: "+json.id);
            window.location.href = "../HTML/lineasConductor.html";
        })
        .catch(err =>{
            console.log(err);
            SubirUbicacion()
        });
}