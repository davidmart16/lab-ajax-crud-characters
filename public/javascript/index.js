const charactersAPI = new APIHandler('https://minions-api.herokuapp.com');

window.addEventListener('load', () => {


  //Mostrar todos
  document.getElementById('fetch-all').addEventListener('click', function (event) {

    
    event.preventDefault()
    document.querySelector('.characters-container').innerHTML = ''
    printTheMinions() 
    function printTheMinions(){

      charactersAPI
      .getFullList()
      .then(response => {

        response.data.forEach(element => {
          
          let list = ''
          list += `<div class="character-info">
            <div class="name">Character Name: ${element.name}</div>
            <div class="occupation">Character Occupation: ${element.occupation}</div>
            <div class="cartoon">Is a Cartoon?: ${element.cartoon}</div>
            <div class="weapon">Weapon: ${element.weapon}</div>
           </div>`

         
          document.querySelector('.characters-container').innerHTML += list

        });

      })
      .catch(err => console.log('ERROR',err))
    }

  });

  // buscar por id
  document.getElementById('fetch-one').addEventListener('click', function (event) {
    
    
    event.preventDefault()
    
    const idRecive = document.querySelector('#ID').value
    
    printOneMinion()

    function printOneMinion() {
      
      charactersAPI
      .getOneRegister(idRecive)
      .then(response => {
        const { name, occupation, id, cartoon, weapon} = response.data

        const inputs = document.querySelectorAll('.character-info div')
          inputs[0].innerText = "Character Name:" + name
          inputs[1].innerText = "Character Occupation: " + occupation
          inputs[2].innerText = "Is a Cartoon?: " + cartoon
          inputs[3].innerText = "Weapon: " + weapon

      
      })  
      .catch(err => console.log('ERROR',err))
      
    }

  });

  //eliminar por id
  document.getElementById('delete-one').addEventListener('click', function (event) {

    event.preventDefault()
    
    const idRecive = document.querySelector('#delete').value
    
    deleteOneMinion()

    function deleteOneMinion() {

      //console.log("voy a eliminar el num:",idRecive)
      charactersAPI
      .deleteOneRegister(idRecive)
      .then(() => {
        console.log("has eliminado un minion")
        alert("Has eliminado un minion")
      }) //tengo que meter aqui un cambio de color al boton para que salga que elimino un minion
      .catch(err => console.log('ERROR en la eliminacion',err))


    }

  });

  //Editar uno
  document.getElementById('edit-character-form').addEventListener('submit', function (event) {

    event.preventDefault()

    const inputs = document.querySelectorAll('#edit-character-form input')

    const minion = {
      id: inputs[0].value,
      name: inputs[1].value,
      occupation: inputs[2].value,
      weapon: inputs[3].value
      // cartoon: inputs[4].checked     
    }

    charactersAPI
    .updateOneRegister(minion)
    .then(response => document.querySelectorAll('#edit-character-form input').forEach(input => input.value = ''))
    .catch(err => console.log('ERROR en la edicion',err))
    

  });


  //Crear un minion
  document.getElementById('new-character-form').addEventListener('submit', function (event) {

    event.preventDefault()

    createAMinion() 

    function createAMinion(){

      const inputs = document.querySelectorAll('#new-character-form input')
      const minion = {
        name: inputs[0].value,
        occupation: inputs[1].value,
        cartoon: inputs[2].value,
        weapon: inputs[3].value
      }
      charactersAPI
      .createOneRegister (minion)
      .then(() => document.querySelector('#new-character-form input').forEach(input.value = ''))
      .catch(err => {
      
        console.log('ERROR en la creacion',err)
        // document.getElementById('id-button').style.backgroundColor = 'red'   
        //esto me lo han explicado y entendido pero escribi solo parte, decidiendo dejarlo asi
      })
    }
    
  });
});
