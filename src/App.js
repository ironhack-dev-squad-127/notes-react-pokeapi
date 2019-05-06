import React from 'react';
import './App.css';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      pokemons: null
    }
  }
  // Example of url: "https://pokeapi.co/api/v2/pokemon/25/"
  getId(url) {
    return url.substring(34, url.length-1)
  }
  render() {
    return (
      <div className="App">
        <h1>React PokeAPI</h1>
        {/* If `this.state.pokemons` is falsy (null) */}
        {!this.state.pokemons && <div>Loading...</div>}
        {/* If `this.state.pokemons` is truthy (an array) */}
        {this.state.pokemons && <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Picture</th>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            {/* Loop through `this.state.pokemons` */}
            {this.state.pokemons.map(pokemon => <tr key={pokemon.url}>
              <td>{this.getId(pokemon.url)}</td>
              <td><img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${this.getId(pokemon.url)}.png`}/></td>
              <td>{pokemon.name}</td>
            </tr>)}
          </tbody> 
        </table>}
      </div>
    );
  }
  componentDidMount() {
    axios.get('https://pokeapi.co/api/v2/pokemon?limit=150')
      .then(response => {
        console.log(response.data.results)
        this.setState({
          pokemons: response.data.results
        })
      })
  }
}

export default App;
