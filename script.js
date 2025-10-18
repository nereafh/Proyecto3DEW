/*
-------------OBJETO Y BOTON--------------
Creo el objeto de tipo rompecabezas
Recojo el id del botón de inicio
*/
piezas = ["c0", "c1", "c2", "c3", "c4", "c5", "c6", "c7", "c8"];



puzzle = new Rompecabezas(piezas, "c8");

let boton = document.getElementById("btnInicio");
/*
Asocio el evento click al botón creado -> cuando el usuario haga click, ejecuta la función iniciarJuego
Algunos tipos de eventos: "click", "input", "keydown" ....
*/
/*
También podría haber hecho:
boton.onclick = function(){
    puzzle.mezclar();
}
*/
boton.addEventListener("click", iniciarJuego);
function iniciarJuego(){

    //Llamo a la función de la superclase rompecabezas la cual es la que controla los atributos y métodos/acciones del objeto
    puzzle.mezclar();

}

//Asigno los eventos a las celdas
for(let i = 0; i < 9; i++){
    let celda = document.getElementById("c" + i);
    celda.onclick = function(){
        puzzle.moverPieza(i); // i = posición = índice
    }
}