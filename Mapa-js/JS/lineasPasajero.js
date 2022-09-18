function seleccion(){
    let combo=window.document.querySelector("#select");
    const seleccion=combo.options[combo.selectedIndex].value
    window.location.href = "../HTML/pasajero.html";
    localStorage.setItem("lineaPasajero",seleccion)
}