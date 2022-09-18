function seleccion(){
    let combo=window.document.querySelector("#select");
    const seleccion=combo.options[combo.selectedIndex].value
    window.location.href = "../HTML/conductor.html";
    localStorage.setItem("lineaConductor",seleccion)
}