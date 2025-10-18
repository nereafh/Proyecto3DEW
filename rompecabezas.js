/*
    Para manipular contenido dentro de un HTML:
    --------------innerText---------------------
    Obtiene o cambia el texto visible dentro de un elemento 
    
    Ejemplo de obtención: 
    <div id="contador" class="contador">Movimientos: </div> -> en HTML

    let contador = document.getElementById("contador");
    console.log(innerText);


   Ejemplo de cambio:
   <div id="contador" class="contador">Movimientos: </div> -> en HTML

   let contador = document.getElementById("contador");
   console.log(div.innerText);
   contador.innerText = "Cambio Texto"; -> en js //Cambia el contenido visible

  -------------------innerHTML----------------------
   Obtiene o cambia todo el contenido HTML dentro del elemento incluyendo todo

    Ejemplo de obtención: 
    <div id="contador" class="contador"><h1>Movimientos:</h1> </div> -> en HTML

    let contador = document.getElementById("contador");
    console.log(contador.innerHTML); -> js 

    Ejemplo de cambio:
    <div id="contador" class="contador"><h1>Movimientos:</h1> </div> -> en HTML

    let contador = document.getElementById("contador");
    console.log(div.innerText);
    contador.innerText = "Cambio <h2>Texto</h2>"; -> en js //Cambia el contenido visible
    */


class Rompecabezas{

    constructor(piezas, piezaVacia, tiempoObj){
        this.piezas = piezas;
        this.piezaVacia = piezaVacia;

        this.orden = [
            piezas[0], piezas[1], piezas[2],
            piezas[3], piezas[4], piezas[5],
            piezas[6], piezas[7], piezas[8]
        ];

        this.movimientos = 0; //Añado un atributo movimientos que hará de contador por ello lo inicializo a 0

        this.tiempoObj = tiempoObj;
    }

    /*
    Mezclo las piezas, excepto la vacía
    Recorro todas las piezas

    */
    mezclar(){
        for(let i = 0; i < this.orden.length; i++){

            /*
            En cada iteración, se elije otra posición -> indiceAleatorio
            y se intercambian los valores de indiceAleatorio y de i 
            Math.floor() -> redondea hacia abajo para quitar los decimales del Math.random()
            Math.random() -> número decimal aleatorio entre 0 y 1
            Math.random() * (i + 1) -> multiplica el aleatorio por i + 1
            */
            let j = Math.floor(Math.random() * (i + 1));

            //Intercambio de piezas
            /*
            Ejemplo: 
            this.orden = ["c0", "c1", "c2", "c3"];
            i = 2;
            j = 0;

            temp = this.orden[2] = "c2"
            this.orden[2] = this.orden[0] = "c0" → el array queda ["c0","c1","c0","c3"] (temporalmente repetido)
            this.orden[0] = temp = "c2" → el array final es ["c2","c1","c0","c3"]
            */
            let intercambioPiezas = this.orden[i]; //posición inicial que está en i
            this.orden[i] = this.orden[j]; //posición i el valor que estaba en la posición j 
            this.orden[j] = intercambioPiezas; //coloco en la posición j el valor original de la posición i
        }

        /*
        Actualizo el puzzle
        Actualizo el tiempo 
        Actualizo los movimientos
        Actualizo el contador
        */
        this.actualizar();
        this.tiempoObj.reiniciar();
        this.movimientos = 0;
        this.actualizarContador();


        

   }

   

    /*
    Actualizo las imágenes y el contador de movimientos
    */
   actualizar(){
    //Recorro todos los id de cada celda
    for(let i = 0; i<this.orden.length; i++){
        let celda = document.getElementById("c" + i); 
        /*
        getElementsByTagName -> busca todos los img que estén dentro de los id de las celdas, 
        como iteramos recorre todas

        Cojo las celdas, me dirijo a cada una de las imagenes que contenga cada celda, comienzo desde la primera posición, la 0, a medida que va iterando
        va cambiando su posición hasta pasar por todas las img de cada una de las celdas
        Aunque solo tenga una imagen por celda necesito especificar que coja la primera de cada una (la 0) ya que
        getElementsByTagName siempre devuelve una colección de varios elementos
        */
        let img = celda.getElementsByTagName("img")[0];

        /*
        Si no es la pieza vacía muestra la imagen de la celda que corresponda
        */
        if(this.orden[i] !== this.piezaVacia){
            img.src = "imagenes/" + this.orden[i] + ".png";
        } else {
            img.src = "imagenes/c8Vacio.png"; 
        }
    }

    /*
    Actualizo el tiempo
    Actualizo el contador
    */
   this.tiempoObj.actualizarSegundos();
   this.actualizarContador();

   
   }

         /*
    ------------- CONTADOR MOVIMIENTOS ----------------
        */
   actualizarContador(){
    let contador  = document.getElementById("contador");
    contador.innerText = "Movimientos: " + this.movimientos; //los movimientos
    
   }

   /*
   ------------MOVER PIEZA, LOCALIZO POSICIÓN-------------
   El usuario hace clic en una celda i, ese i se pasa a esta función para saber qué
   pieza se está intentando mover y se comprube si se puede o no mover, es decir
   si está o no al lado de la pieza vacía 

   Entonces si puedo mover la pieza a la otra celda quiere decir que se trata del 
   hueco vacío 
   */
   moverPieza(posicion){
    let hueco;
    
    for(let i = 0; i < this.orden.length; i++){
        if(this.orden[i] === this.piezaVacia){
            hueco = i;
            break;
        }


    }

    /*
    Compruebo si la pieza que quiero mover, está junto al hueco, arriba, abajo, izquierda, derecha
    Para ello declaro una variable booleana inicializada a false que iré cambiando a true
    en función de si puede o no moverse 
    */
    let puedoMover = false;
    /*
    Izquierda: -1
    Los índices de la primera columna siempre son múltiplos de 3 (0, 3, 6)
    éstos no se podrán mover a la izquierda, ya que no hay nada, así que todos
    los que no sean múltiplos de 3 (es decir la primera columna) sí podrán moverse a la 
    izquierda en el caso de que ahí esté el hueco
    De esta forma localizo cual es el índice de la pieza que se encuentra en la misma fila 
    que la pieza vacía a su izquierda
    */
    if(posicion === hueco - 1 && hueco % 3 !== 0){
        puedoMover = true;

    }
    /*
    Derecha: +1
    La última columna contiene los índices: 2, 5, 8, si les sumo 1 y luego hago % 3
    todos dan 0, si esto lo pusiera a true indicaría que podría moverse a la derecha cuando
    no puede, por eso pongo diferente de 0 -> !== 0
    De esta forma localizo cual es el índice de la pieza que se encuentra en la misma fila 
    que la pieza vacía a su derecha
    */
    if(posicion === hueco + 1 && (hueco + 1 ) % 3 !== 0){
        puedoMover = true;

    }

    /*
    Arriba - 3
    Para localizar la pieza que se encuentre arriba me doy cuenta que siempre va a estar
    en la misma columna que la pieza vacía, al ser una tabla 3x3, resto 3 al hueco vacío
    para obtener el número del índice de la pieza que está arriba 
    */
   if(posicion === hueco - 3){
        puedoMover = true;
   }

    /*
    Abajo + 3
    Para localizar la pieza que se encuentre abajo me doy cuenta que siempre va a estar
    en la misma columna que la pieza vacía, al ser una tabla 3x3, sumo 3 al hueco vacío
    para obtener el número del índice de la pieza que está abajo 
    */
   if(posicion === hueco + 3){
        puedoMover = true;
   }

   if(puedoMover){

        this.tiempoObj.actualizarSegundos();

        //Intercambio de pieza con el hueco
        let intercambioPiezas = this.orden[posicion]; //posición inicial que está en la variable posicion que es el indice i
        this.orden[posicion] = this.orden[hueco]; //posicion el valor que estaba en hueco
        this.orden[hueco] = intercambioPiezas; //coloco hueco el valor original de posición 
        
        this.movimientos ++; //incremento el contador
        this.actualizar(); //actualizo tabla 


        //Compruebo si el puzzle está o no completo
        if(this.estaCompleto()){
            this.tiempoObj.pausar();
            
            this.mostrarMensaje("¡Felicidades! Completado en " +
                 this.movimientos + " movimientos y "
                  + this.tiempoObj.obtenerMinSeg())

            this.actualizarRanking();

            
        }


        


   }


   }


   /*
   Si las piezas no corresponden con cada uno de sus índices quiere decir que no está completo -> false, 
   sino sí lo está -> true 
   */
   estaCompleto(){
    for(let i = 0; i < this.orden.length; i++){
        if(this.orden[i] !== this.piezas[i]){
            return false;
        } 
    }
    return true;
   }

   /*
   ------------LOCALSTORAGE--------------------
   */
   actualizarRanking(){
    let ranking = document.getElementById("ranking");
    let mejorRanking = localStorage.getItem("mejorTiempo");
    let actualRanking = this.tiempoObj.getSegundos(); 

    if(!mejorRanking || actualRanking < Number(mejorRanking)){

        localStorage.setItem("mejorTiempo", actualRanking);
        mejorRanking = actualRanking;

        this.mostrarMensaje("¡Has conseguido un nuevo récord personal!")

    }   else {
        
        
        ranking.innerText = "Mejor tiempo: " + this.obtenerMinSeg();
    }

    
   }

   
    obtenerMinSeg(segundos){
        let min = Math.floor(segundos / 60); //obtener los minutos
        let seg = segundos % 60; //obtener los segundos
        return "Minutos: " + min + " Segundos: " + seg;
    }

    guardarPartida(){
        localStorage.setItem("orden", this.orden.toString());
        localStorage.setItem("movimientos", this.movimientos);
        localStorage.setItem("tiempo", this.tiempoObj.getSegundos());
        this.tiempoObj.pausar();
        this.mostrarMensaje("Partida guardada correctamente.");
    }

    cargarPartida(){

        let ordenGuardado = localStorage.getItem("orden");
        let movimientosGuardado = localStorage.getItem("movimientos");
        let tiempoGuardado = localStorage.getItem("tiempo");

       if (!ordenGuardado || !movimientosGuardado || !tiempoGuardado) {
        this.mostrarMensaje("No hay partida guardada.");
        return;
    }


    //Restauro valores
    this.orden = ordenGuardado.split(","); // texto -> array
    this.movimientos = parseInt(movimientosGuardado);
    this.tiempoObj.setSegundos(parseInt(tiempoGuardado));


    //Actualizo la interfaz 
    this.actualizar();
    document.getElementById("contador").innerText = "Movimientos: " + this.movimientos;
    document.getElementById("tiempo").innerText = "Tiempo: " + this.tiempoObj.obtenerMinSeg();

    //Reanudo sin reinciiar el tiempo, cojo la función de la clase tiempo mediante el objeto tiempoObj
    this.tiempoObj.reanudar();

    this.mostrarMensaje("Partida cargada correctamente");
    }

    mostrarMensaje(texto){

        let mensaje = document.getElementById("mensajes");
        mensaje.innerText = texto;
        mensaje.style.display = "block";
    }


}