
tinymce.init({
  selector: '#descripcion-txt',
  height: 200,
  menubar: false,
  plugins: [
    'advlist autolink lists link image charmap print preview anchor',
    'searchreplace visualblocks code fullscreen',
    'insertdatetime media table paste code help wordcount'
  ],
  toolbar: 'undo redo | formatselect | ' +
    'bold italic backcolor | alignleft aligncenter ' +
    'alignright alignjustify | bullist numlist outdent indent | ' +
    'removeformat | help',
  content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
});

const pokemones = []; //definir arreglo en js
const eliminar = async function () {

  let res = await Swal.fire({
    title: "Desea enviar el pokemon al profesor oak",
    //Boton cancelar
    showCancelButton: true,
    //Boton confirmar
    confirmButtonText: "Enviar"
  });
  //la persona dijo que si?
  if (res.isConfirmed) {
    //1. Saber que el boton funcione
    //2. Sacar el nmero del boton
    let nro = this.nro;
    //3- Eliminar el pokemon de la lista
    pokemones.splice(nro, 1);
    //4 Recargar tabla
    cargarTabla();
  } else
    Swal.fire("operacion cancelada");



}

const cargarTabla = () => {
  //1. referncia a la tabla
  let tbody = document.querySelector("#tbody-pokemon");
  //Antes de el for limpia  una tabla 
  tbody.innerHTML = "";
  //2. por cada pokemon generar una fila
  for (let i = 0; i < pokemones.length; ++i) {
    let p = pokemones[i];
    console.log(p);
    //Crea un elemento que no existe, pero no lo agrega a la pagina
    //Pero puedo crear cualquier etiqueta html aqui
    let tr = document.createElement("tr")
    //3. Por cada atributo de los pokemon (Nombre, tipo , etc) genera una celda
    let tdNombre = document.createElement("td");
    let tdTipo = document.createElement("td");
    let tdDescripcion = document.createElement("td");
    let tdNro = document.createElement("td");
    let tdAcciones = document.createElement("td");

    tdNombre.innerText = p.nombre;
    //TODO: Mostrar el icono y no el numero
    let icono = document.createElement("i");
    if (p.tipo == "1") {
      //Agregar icono agua
      //<i class="fas fa-tint"></i>
      icono.classList.add("fas", "fa-tint", "text-primary", "fa-2x")
    } else if (p.tipo == "2") {
      //Agregar icono fuego
      //<i class="fas fa-fire"></i>
      icono.classList.add("fas", "fa-fire", "text-danger", "fa-2x")
    } else if (p.tipo == "3") {
      //Agrregar planta 
      //<i class="fab fa-envira"></i>
      icono.classList.add("fab", "fa-envira", "text-success", "fa-2x")
    } else {
      //Agregar electrico
      //<i class="fas fa-bolt"></i>
      icono.classList.add("fas", "fa-bold", "text-warning", "fa-2x")
    }
    tdTipo.classList.add("text-center");
    tdTipo.appendChild(icono);

    tdDescripcion.innerHTML = p.descripcion;
    tdNro.innerText = i + 1;

    //Creo boton
    let boton = document.createElement("button");
    boton.nro = i; //Guardar cualquier cosa
    boton.addEventListener("click", eliminar);
    //le agrego el texto al boton
    boton.innerText = "Enviar al profesor oak";
    //Hago que el boton sea rojo
    boton.classList.add("btn", "btn-danger");
    tdAcciones.classList.add("text-center");

    //Agrego el boton al td
    tdAcciones.appendChild(boton);

    tr.appendChild(tdNro);
    tr.appendChild(tdNombre);
    tr.appendChild(tdTipo);
    tr.appendChild(tdDescripcion);
    tr.appendChild(tdAcciones);
    tbody.appendChild(tr);

  }

}; //
document.querySelector("#pokemon-form").addEventListener('submit', (e) => {
  e.preventDefault();//evito que el formulario no recargue
  let nombre = document.querySelector("#nombre-txt").value;
  let descripcion = tinymce.get("descripcion-txt").getContent();
  let legendario = document.querySelector("#legendario-si").checked;
  let tipo = document.querySelector("#tipo-select").value;
  let esValido = true;

  document.querySelector("#nombre-txt").classList.remove("is-invalid");
  document.querySelector("#descripcion-txt").classList.remove("is-invalid");
  if (nombre.trim() == "") {
    document.querySelector("#nombre-txt").classList.add("is-invalid");
    esValido = false;
  }

  if (descripcion.trim() == "") {
     document.querySelector("#descripcion-txt").classList.add("is-invalid");
    esValido = false;
  }
  if (esValido) {

    let pokemon = {};
    pokemon.nombre = nombre;
    pokemon.descripcion = descripcion;
    pokemon.legendario = legendario;
    pokemon.tipo = tipo;
    pokemones.push(pokemon);
    cargarTabla();
    Swal.fire("Registro Exitoso", "Pokemon Registrado", "info");
  }
});


document.querySelector("#limpiar-btn").addEventListener("click", () => {
  //limpiar los elementos 
  //limpiar un input text
  document.querySelector("#nombre-txt").value = "";
  // limpiar un tinymce
  tinymce.get("descripcion-txt").setContent("");
  document.querySelector("#legendario-si").checked = true;
  // limpiar un select (tambien seleccionando la primera opcion)
  document.querySelector("#tipo-select").value = "1";
})

