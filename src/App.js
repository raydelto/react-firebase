import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';


class App extends Component {
  constructor() {
    super();
    this.state = {};
  }

  getData(){
    this.database.ref('agenda').once('value')
    .then((val) => {
      this.setState({ agenda: val.val() });
    });
  }

  componentWillMount() {
    var config = {
      apiKey: "AIzaSyBo9dqAKnMcbHTyq8WqVRet0-5bLo27fok",
      authDomain: "itla-prueba.firebaseapp.com",
      databaseURL: "https://itla-prueba.firebaseio.com",
      storageBucket: "itla-prueba.appspot.com"
    };
    firebase.initializeApp(config);
    this.database = firebase.database();
    this.getData();
  }

  agregar(){
    console.log('test' +  this.txtNombre.value);
    this.database.ref('agenda').push({
      nombre: this.txtNombre.value,
      apellido: this.txtApellido.value,
      telefono: this.txtTelefono.value
    });

    this.txtNombre.value = '';
    this.txtApellido.value = '';
    this.txtTelefono.value = '';
    this.getData();
    this.forceUpdate();
    
  }

  render() {
    let agenda = this.state.agenda ? this.state.agenda : null;
    return (
      <div className="App">
        {agenda &&           
          Object.keys(agenda).map((key,i) =>{
            return (
                <li key={i}>{agenda[`${key}`]['nombre']} {agenda[`${key}`]['apellido']} {agenda[`${key}`]['telefono']}</li>
            )
          })
        }

        {!this.state.agenda &&
          <div>La lista de contactos est&aacute; vac&iacute;a.</div>
        }

        <input placeholder="Nombre" type="text" ref={(ref) => this.txtNombre = ref}/>
        <input placeholder="Apellido" type="text" ref={(ref) => this.txtApellido = ref}/>
        <input placeholder="Telefono" type="text" ref={(ref) => this.txtTelefono = ref}/>
        <button onClick={()=>{this.agregar()}}>Agregar</button>

      </div>
    );
  }
}

export default App;
