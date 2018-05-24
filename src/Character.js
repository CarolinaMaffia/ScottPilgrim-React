import React, { Component } from 'react';
import characters from './Characters.js';
import './App.css';
import PropTypes from 'prop-types';

//Componente que crea el Personaje
class Character extends Component {
  static propTypes = {
    character: PropTypes.shape({
      id: PropTypes.string.isRequired,
      smallImg: PropTypes.string.isRequired,
      
    }).isRequired,
    setActive: PropTypes.func.isRequired,
    active: PropTypes.bool.isRequired
  };

  setActive = () => {
    // Acá usamos la prop quie recibió que se llama setActive
    // Y le tenemos que pasar el id actual para que pueda actualizar el estado del padre
    // Acá podemos ver todas las propiedades del objeto character (descomentar la linea para ver si se quiere)
    //  console.log(this.props.character);
    this.props.setActive(this.props.character.id);
  }

  render() {
    const { character, active } = this.props;
    const characterClass = `character-box ${active ? 'active' : ''}`;
    // console.log()
    return (
      <div className={characterClass} onClick={this.setActive}>
        <img className="avatar" alt="scott-character" src={character.smallImg} />
        <p className="character-name">{character.name}</p>
      </div>
    );
  }
}

//Componente que activa al personaje

export default class CharacterSelect extends Component {
  static propTypes = {
    characters: PropTypes.arrayOf(PropTypes.object).isRequired,// Quiero recibir los characters por props porque React, es la manera correcta de hacerlo
  };

  state = {
    active: this.props.characters[0].id
    // vamos a usar el id para identificar al activo, e inicializamos con el primer character activo
  }

  setActive = (id) => { // Recordemos que en las funciones de clases declaradas con = () => esta sintaxis no necesitan binding
    // En esta parte le tiene que llegar un id valido para actualizar el estado
    // Luego vamos a llamar a esta función desde el hijo pasandola como props
    this.setState({ active: id });
  }

  // testImg = character =>
  //   <Img largeImg={characters.largeImg}
  //     />

  renderCharacter = character => // Vamos a usar más componentes porque es la manera correcta de hacerlo en react
    <Character
      key={character.id} // Recordemos que necesitamos la key cuando iteramos
      character={character} // Le pasamos el item
      setActive={this.setActive} // Le pasamos la función al hijo para poder llamarla desde ahí
      active={character.id === this.state.active} // Acá le decimos que está activo si el id es el mismo que está en nuestro estado
    />

  /* Esto es igual a
    renderCharacter = character =>  {
      return (
        <Character
          key={character.id} // Recordemos que necesitamos la key cuando iteramos
          character={character}
          setActive={this.setActive} // Le pasamos la función al hijo para poder llamarla desde ahí
          active={character.id === this.state.active} // Acá le decimos que está activo si el id es el mismo que está en nuestro estado
        />
      );
    }
    Recordemos que arrow functions sin llaves hace funcionar a la flechita como un return
  */
  render() {
    // Esto se llama destructuring, no quiero mansplainear pero por si las dudas no lo sabías
    // Es igual a:
    // console.log( this.props.active);
    const { characters } = this.props;
    const activeCharacter = this.props.characters.find(item => item.id === this.state.active);
    console.log(activeCharacter)

    return (  
    <div>
      <div className="containerOne">
              <div className="character-container">
                 <img src={activeCharacter.largeImg} className="character-larg-image" alt="scott pilgrim character" />
              </div>      
              <div className="character-stats">
                  <div className="name">
                      <h2>{activeCharacter.name}</h2>  
                  </div>
                  <div className="stats">
                      <span className="tag"> Age: </span>
                      <p>{activeCharacter.age}</p>             
                  </div>
                  <div className="stats">
                      <span className="tag"> Skills: </span>
                      <p>{activeCharacter.skills}</p>             
                  </div>
                  <div className="stats">
                      <span className="tag"> Rating: </span>
                      <p>{activeCharacter.rating}</p>             
                  </div>
              </div>
          </div>
      <div className="character-select">
          { characters.map(this.renderCharacter) }
          { /*
              Acá usamos .map() sobre el array pero le pasamos directamente una función
              Y funca similar a como lo tratabamos antes pero lo dejamos más prolijo y separado
              La función va a recibir como parametro cada item
              es como si hicieramos
              characters.map(character => this.renderCharacter(character))
              Pero más prolijo, compacto y performante
              vamos arriba a la función renderCharacter
          */ }
      </div>
    </div>
    );
  }
}




/*
  Conclusión:
  Qué logramos? Logramos tener una arquitectura con responsabilidades más separadas,
  tenemos un componente character y un characterSelect que tiene la lógica para seleccionarlo,
  y devuelve una lista de personajes, pero nada más
  Y nuestro componente character se encarga de ponerse activo por si mismo y evitamos tener código duplicado

Gabriel Miranda, [24.04.18 16:25]
de los 2 maps que generabamos antes
  La parte de como se ve tiene que ser resuelta con estilos css unicamente
*/

export  { CharacterSelect, Character }