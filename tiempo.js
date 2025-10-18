class Tiempo{

    constructor(){

        this.segundos = 0;
        this.activo = false; //Si el juego a comenzado, lo marco como false para asociarlo al mismo tiempo que se active el botón iniciar 
        this.ultimoTiempoRegistrado = 0; //una vez que pare de contar 
    }   


  
    iniciar(){
        if(!this.activo){
        this.activo = true; //comienza la partida === comienza el tiempo
        this.ultimoTiempoRegistrado = Date.now();
        this.bucleActualizacion();
        }
    }

    reiniciar(){

        this.segundos = 0;
        this.ultimoTiempoRegistrado = Date.now();
        this.activo = true;
        this.mostrarTiempo();
    }

    reanudar(){
        //Igual que iniciar(), pero sin reiniciar segundos
        if(!this.activo){
            this.activo = true;
            this.ultimoTiempoRegistrado = Date.now();

        }
    }

    bucleActualizacion(){
        let self = this;
        let INTERVALO_MS = 1000;
        setInterval(function () {
            if (self.activo) {
                let ahora = Date.now();
                let segundosTranscurridos = Math.floor((ahora - self.ultimoTiempoRegistrado) / 1000);
                if (segundosTranscurridos > 0) {
                    self.segundos += segundosTranscurridos;
                    self.ultimoTiempoRegistrado = ahora;
                    self.mostrarTiempo();
                }
            }
        }, INTERVALO_MS);
    }


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


    //Obtener segundos
    getSegundos(){
        this.actualizarSegundos();
        return this.segundos;
    }
    
    //Mostrar/Actualizar segundos
    setSegundos(segundos){
        this.segundos = segundos;
        this.mostrarTiempo();
   }

}