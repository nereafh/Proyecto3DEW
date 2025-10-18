/*
-------------OBJETO Y BOTON--------------
Creo el objeto de tipo rompecabezas
Recojo el id del botón de inicio

Creo el objeto tiempo y lo asocio al objeto rompecabezas
*/
let piezas = ["c0", "c1", "c2", "c3", "c4", "c5", "c6", "c7", "c8"];

let tiempo = new Tiempo(); //objeto que controla el tiempo de la realización del rompecabezas

let puzzle = new Rompecabezas(piezas, "c8", tiempo);

let btnInicio = document.getElementById("btnInicio");
/*
Asocio el evento click al botón creado -> cuando el usuario haga click, ejecuta la función iniciarJuego
Algunos tipos de eventos: "click", "input", "keydown" ....
*/
/*
También podría haber hecho:
boton.onclick = function(){
    puzzle.mezclar();
}

----- BTN INICIAR -----
*/
btnInicio.addEventListener("click", iniciarJuego);
function iniciarJuego(){

    //Llamo a la función de la superclase rompecabezas la cual es la que controla los atributos y métodos/acciones del objeto
    puzzle.mezclar();

}


/*
-----BOTON GUARDAR----------
*/
btnGuardar.addEventListener("click", guardarJuego);
function guardarJuego(){
    puzzle.guardarPartida();//llamo a la función de rompecabezas
}


/*
-----BOTON CARGAR----------
*/
btnCargar.addEventListener("click", cargarJuego);
function cargarJuego(){
    puzzle.cargarPartida(); //llamo a la función de rompecabezas
}

//Asigno los eventos a las celdas
for(let i = 0; i < 9; i++){
    let celda = document.getElementById("c" + i);
    celda.onclick = function(){
        puzzle.moverPieza(i); // i = posición = índice
    }
}