class Rompecabezas{

    constructor(piezas, piezaVacia){
        this.piezas = piezas;
        this.piezaVacia = piezaVacia;

        this.orden = [
            piezas[0], piezas[1], piezas[2],
            piezas[3], piezas[4], piezas[5],
            piezas[6], piezas[7], piezas[8]
        ];
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

        //Actualizo el puzzle
        this.actualizar();

   }

   /*
   
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

   }

}