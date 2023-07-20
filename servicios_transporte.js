/*  Contenedor de las tarjetas Variables y el Fetch para acceder a la informacion
    Situada en el Json datos_tarjetas_areas
*/
const indexDatos = document.querySelector(".contenedor_tarjetas_distritos");
const contenedorTF = document.querySelector(".container_Flotante");
const tagTarjetaFlotante = document.getElementById("evento_tarjeta_Flotante");
const url = "datos_tarjetas_areas.json";

contenedorTF.style.visibility = "hidden";   /*--[ ■ Fondo Transparente ]--*/

fetch(url)
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
    data.sort(function (a, b) {
      return a.orden - b.orden;
    });
    data.forEach((data) => createTarjeta(data));
  })
  .catch((err) => console.log(err));


/*--[ ■ ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■ ]--*/
/*La Funcion presenta es la que inserta el contenido visible de las tarjetas por area 
  Creando nodos e insertando informacion. llamando a otra funcion para hacer el codigo mas legible*/

function createTarjeta(data) {
  //Div Carta con datos
  const card = document.createElement("div");
  card.classList.add("card");

  //campos nombre - datos

  const nombreContenedor = document.createElement("p");
  nombreContenedor.classList.add("nombreContenedor");      
  nombreContenedor.innerHTML = data.nombre;

  //Campos SVG - DATOS

  const svgContenedor = document.createElement("div");
  svgContenedor.classList.add("svgContenedor");             /*--[ ■ Clase ]--*/

  const svgImagen = document.createElement("img");
  svgImagen.classList.add("svgContenedor_img");             /*--[ ■ Clase ]--*/
  svgImagen.src = data.direccion;

  svgContenedor.appendChild(svgImagen);

  //Insercion a Tarjeta
  card.appendChild(svgContenedor);
  card.appendChild(nombreContenedor);
  indexDatos.appendChild(card);

  /*--[ ■ Evento del CLick ]--*/
  card.addEventListener("click", () => {
    container_tarjetaFlotante(data);
  });
}

/*--[ ■ ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■ ]--*/
/*Dicha funcion se encarga de mostrar la zona para la tarjeta flotante de donse se muestra info complementaria 
Limpia y eliminar tarjeta al cliquear sobre esta*/

function container_tarjetaFlotante(data) {

  /* [Ocultar - NO Ocultar] */
  contenedorTF.style.visibility = "visible";        /*--[ ■ Fondo Transparente ]--*/

  if (data.datos.imagen !== "") {
      tagTarjetaFlotante.style.overflow="hidden";
}else{
        
        tagTarjetaFlotante.style.overflow="visible";
  }

  llamada_componentes_tarjetaFlotante(data);

  contenedorTF.addEventListener("click", () => {

    contenedorTF.style.visibility = "hidden";       /*--[ ■ Fondo Transparente ]--*/
    tagTarjetaFlotante.className = "";

    while (tagTarjetaFlotante.hasChildNodes()) {
      tagTarjetaFlotante.removeChild(tagTarjetaFlotante.firstChild);
    }

  });


  /*--[ ■ ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■ ]--*/
/*Accede al json para sacar la info - Crea los nodos para estructurar la tarjeta y los rrellena */

  function llamada_componentes_tarjetaFlotante(data) {

    /*--[ ■ Contenedor Imagen ]--*/
    const tj_ImagenContenedor = document.createElement("div");
    tj_ImagenContenedor.classList.add(  "tj_ImagenContenedor"); /*--[ ■ Clase ]--*/

    const tj_Imagen = document.createElement("img");
    tj_Imagen.classList.add("tj_Imagen");                       /*--[ ■ Clase ]--*/
    tj_Imagen.src = data.datos.imagen;

    
    /*--[ ■ Contenedor Svg  ]--*/
    const tj_svgContenedor = document.createElement("div");
    tj_svgContenedor.classList.add("tj_svgContenedor");
    
    const tj_svgImagen = document.createElement("img");
    tj_svgImagen.classList.add("tj_svgContenedor_img");
    tj_svgImagen.src = data.direccion;

    /*--[ ■ Insercion Imagenes SVG ]--*/
    
    tj_ImagenContenedor.appendChild(tj_Imagen);
    tj_svgContenedor.appendChild(tj_svgImagen);
    tj_ImagenContenedor.appendChild(tj_svgContenedor);

    /*--[ ■ Contenedor NombreTitulo  e Informacion]--*/
    const tj_NombreContenedor = document.createElement("p");
    tj_NombreContenedor.classList.add(
      "tj_tarjeta_nombreContenedor",
      "tfTexto"
    );
    tj_NombreContenedor.innerHTML = data.nombre;

    const tj_InformacionContenedor = document.createElement("p");
    tj_InformacionContenedor.classList.add(
      "tj_InformacionContenedor",
      "tfTexto"
    ); 
    tj_InformacionContenedor.innerHTML = data.datos.informacion;

    /*--[ ■ Insercion Tarjeta Flotante Degradado]--*/

    tagTarjetaFlotante.appendChild(tj_ImagenContenedor); 
    tagTarjetaFlotante.appendChild(tj_NombreContenedor);
    tagTarjetaFlotante.appendChild(tj_InformacionContenedor);

    tagTarjetaFlotante.classList.add("evento_tarjeta_Flotante");
  }
}
