
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
      console.log(pokemon);
  });
  
  