
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
  
  const cargarTabla = () =>{
    //1. referncia a la tabla
    let tbody = document.querySelector("#tbody-pokemon");
    //Antes de el for limpia  una tabla 
    tbody.innerHTML = "";
    //2. por cada pokemon generar una fila
    for(let i=0; i < pokemones.length; ++ i){
      let p= pokemones[i];
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
      tdTipo.innerText = p.tipo;
      //TODO: Esto no va a funcionar
      tdDescripcion.innerHTML = p.descripcion;
      tdNro.innerText = i + 1;
      //TODO: Como agrego un boton para las acciones
      tr.appendChild(tdNro);
      tr.appendChild(tdNombre);
      tr.appendChild(tdTipo);
      tr.appendChild(tdDescripcion);
      tr.appendChild(tdAcciones);
      tbody.appendChild(tr);

    }
    
  }; //
  document.querySelector("#pokemon-form").addEventListener('submit',(e)=> {
      e.preventDefault();//evito que el formulario no recargue
      let nombre = document.querySelector("#nombre-txt").value;
      let descripcion = tinymce.get("descripcion-txt").getContent();
      let legendario = document.querySelector("#legendario-si").checked;
      let tipo = document.querySelector("#tipo-select").value;
      
      let pokemon = {};
      pokemon.nombre = nombre;
      pokemon.descripcion = descripcion;
      pokemon.legendario = legendario;
      pokemon.tipo = tipo;
      pokemones.push(pokemon);
      cargarTabla();
      Swal.fire("Pokemon Registrado");
  });
  
  