class Tiempo{

    /*
    Se inicia el constructor del objeto tiempo, las variables son 
    por defecto 0 y el estado activo en false
    */
    constructor(){

        this.segundos = 0;
        this.activo = false; //Si el juego a comenzado, lo marco como false para asociarlo al mismo tiempo que se active el botón iniciar 
        this.ultimoTiempoRegistrado = 0; //una vez que pare de contar 
    }   


  
    /*
    Inicia el contador de tiempo desde 0
    */
    iniciar(){
        if(!this.activo){
        this.activo = true; //comienza la partida === comienza el tiempo
        this.ultimoTiempoRegistrado = Date.now(); //obtengo el tiempo actual en milisegundos
        this.bucleActualizacion(); //inicia el bucle de actualización del tiempo
        }
    }

    /*
    Segundos a 0 y comienza de nuevo el contador
    Muestra el tiempo actualizado en pantalla
    */
    reiniciar(){

        this.segundos = 0;
        this.ultimoTiempoRegistrado = Date.now();
        this.activo = true;
        this.mostrarTiempo();
    }

    /*
    Reanuda el contador de tiempo desde el momento en que se pausó sin reiniciar los segundos
    Por ejemplo, si se pausó en 45 segundos, al reanudar seguirá desde 45 segundos
    Actualiza el último tiempo registrado al tiempo actual
    */
    reanudar(){
        //Igual que iniciar(), pero sin reiniciar segundos
        if(!this.activo){
            this.activo = true;
            this.ultimoTiempoRegistrado = Date.now();

        }
    }

    /*
    Se ejecuta un bucle que actualiza el tiempo cada segundo si el contador está activo
    Se comprueba si el contador está activo, si es así, se obtiene el tiempo actual y se calcula
    los segundos transcurridos desde el último tiempo registrado. Si ha pasado al menos un segundo,
    se actualiza el contador de segundos, se actualiza el último tiempo registrado y se muestra el tiempo actualizado en pantalla.
    El intervalo de actualización es de 1000 ms (1 segundo).


    setInterval: función del navegador/window que ejecuta de forma repetitiva otra función cada cierto intervalo de tiempo
    1º parámetro: función a ejecutar
    2º parámetro: intervalo de tiempo en milisegundos
    */
    bucleActualizacion(){
        let self = this;
        let INTERVALO_MS = 1000;
        setInterval(function () {
            if (self.activo) {
                let ahora = Date.now(); //obtengo el tiempo actual en milisegundos 
                let segundosTranscurridos = Math.floor((ahora - self.ultimoTiempoRegistrado) / 1000);

                //Si ha pasado al menos un segundo, actualizo el contador
                if (segundosTranscurridos > 0) {
                    self.segundos += segundosTranscurridos; //incrementa el contador (suma los segundos transcurridos)
                    self.ultimoTiempoRegistrado = ahora; //actualiza el último tiempo registrado
                    self.mostrarTiempo(); //y lo muestro en pantalla
                }
            }
        }, INTERVALO_MS); //cada 1000 ms (1 segundo)
    }


    /*
    Actualiza el contenido del elemento HTML con id "tiempo" para mostrar el tiempo transcurrido en minutos y segundos
    */
    mostrarTiempo(){
        let tiempoRegistrado = document.getElementById("tiempo");
        tiempoRegistrado.innerText = "Tiempo: " + this.obtenerMinSeg();
    }
    /*
    Para actualizar los segundos necesito saber el tiempo actual -> let ahora = Date.now()
    y los segundos transcurridos desde el ultimo tiempo registrado, para eso resto el ultimo
    tiempo registrado con los segundos actuales y lo divido entre 1000 para convertir milisegundos a segundos,
    ya que la función Date.now() devuelve milisegundos desde el 1 de enero de 1970
    */
    actualizarSegundos(){
        if(this.activo){
            let ahora = Date.now();
            //Primero redondeo al entero mas cercano y luego divido
            let segundosTranscurridos = Math.floor((ahora - this.ultimoTiempoRegistrado) / 1000);

            /*
            Por otro lado, si los segundos transcurridos desde el ultimo tiempo registrado, son
            mayores a 0, quiere decir que solo actualizará el contador si ha pasado al menos 1 segundo positivo
            */
            if(segundosTranscurridos > 0){
                this.segundos += segundosTranscurridos; //incrementa el contador
                this.ultimoTiempoRegistrado = ahora;
                this.mostrarTiempo();

            } 
        }
    }

        /*
        Detiene el contador de tiempo y muestra el tiempo final en pantalla
        Actualiza los segundos antes de pausar el contador
        Es de forma temporal, ya que si el usuario reanuda el juego, el tiempo continuará desde donde se pausó
        */
        pausar(){
        this.actualizarSegundos();
        this.activo = false;
        this.mostrarTiempo();
    }


    obtenerMinSeg(){
        let min = Math.floor(this.segundos / 60); //obtener los minutos
        let seg = this.segundos % 60; //obtener los segundos
        return "Minutos: " + min + " Segundos: " + seg;
    }


    //Obtener segundos, después de actualizar
    getSegundos(){
        this.actualizarSegundos();
        return this.segundos;
    }
    
    //Actualizar los segundos y actualiza la variable segundos
    setSegundos(segundos){
        this.segundos = segundos;
        this.mostrarTiempo();
   }

}