/*
-------------OBJETO Y BOTON--------------
Creo el objeto de tipo rompecabezas
Recojo el id del botón de inicio
*/
piezas = ["c0", "c1", "c2", "c3", "c4", "c5", "c6", "c7", "c8"];



puzzle = new Rompecabezas(piezas, "c8");
boton = document.getElementById("btnInicio");

/*
Asocio el evento click al botón creado -> cuando el usuario haga click, ejecuta la función iniciarJuego
Algunos tipos de eventos: "click", "input", "keydown" ....
*/
boton.addEventListener("click", iniciarJuego);
function iniciarJuego(){

    //Llamo a la función de la superclase rompecabezas la cual es la que controla los atributos y métodos/acciones del objeto
    puzzle.mezclar();


}