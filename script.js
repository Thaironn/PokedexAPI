document.addEventListener('DOMContentLoaded', async () => {
  const pokeContainer = document.getElementById('pokeContainer');
  const pokemonCount = 24;
  const colors = {
    normal: '#A8A878',
    fire: '#F08030',
    water: '#6890F0',
    grass: '#78C850',
    flying: '#A890F0',
    fighting: '#C03028',
    poison: '#A040A0',
    electric: '#F8D030',
    ground: '#E0C068',
    rock: '#B8A038',
    psychic: '#F85888',
    ice: '#98D8D8',
    bug: '#A8B820',
    ghost: '#705898',
    steel: '#B8B8D0',
    dragon: '#7038F8',
    dark: '#705848',
    fairy: '#EE99AC'
  };

  const fetchPokemons = async () => {
      for (let i = 1; i <= pokemonCount; i++) {
          await getPokemon(i);
      }
  };

  const getPokemon = async (id) => {
      const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
      const resp = await fetch(url);
      const data = await resp.json();
      createPokemonCard(data);
  };

  const createPokemonCard = (pokemon) => {
      const card = document.createElement('div');
      card.classList.add('pokemon-card');
      card.id = `pokemon_${pokemon.id}`;
      

      const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
      const id = pokemon.id
      const types = pokemon.types.map(type => type.type.name).join(', ');

      const backgroundColor = getBackgroundColor(pokemon.types);

      card.style.backgroundColor = backgroundColor;

      const typesHTML = pokemon.types.map(type => {
          const typeClass = getTypeClass(type.type.name);
          return `<span class="type ${typeClass}">${type.type.name}</span>`;
      }).join(' ');

      const img = document.createElement('img');
      img.src = pokemon.sprites.front_default;
      img.alt = name;
      img.classList.add('pokemon-img');

      const info = document.createElement('div');
      info.innerHTML = `
          <p><strong>${name}</strong></p>
          <p>#${id}</p>

          <div class="types">
            <p>${typesHTML}</p>
          </div>

          <button>
            <a href="info.html?id=${id}">
                <img src="lupa.png" alt="Texto Alternativo da Imagem">
            </a>
          </button>
      `;


      const captureBtn = document.createElement('button');
      captureBtn.textContent = 'Capture';
      captureBtn.classList.add('capture-btn');
      captureBtn.onclick = () => capturePokemon(pokemon);

      card.appendChild(img);
      card.appendChild(info);
      card.appendChild(captureBtn);

      pokeContainer.appendChild(card);
  };

  const capturePokemon = (pokemon) => {
      const capturedPokemons = JSON.parse(sessionStorage.getItem('capturedPokemons')) || [];
      capturedPokemons.push(pokemon);
      sessionStorage.setItem('capturedPokemons', JSON.stringify(capturedPokemons));
  };

  const getBackgroundColor = (types) => {
      const primaryType = types[0].type.name;
      return colors[primaryType] || '#FFFFFF'; 
  };

  function getTypeClass(type) {
    const lowercaseType = type.toLowerCase();
    const typeClassMap = {
      normal: 'normal-type',
      fire: 'fire-type',
      water: 'water-type',
      grass: 'grass-type',
      flying: 'flying-type',
      fighting: 'fighting-type',
      poison: 'poison-type',
      electric: 'electric-type',
      ground: 'ground-type',
      rock: 'rock-type',
      psychic: 'psychic-type',
      ice: 'ice-type',
      bug: 'bug-type',
      ghost: 'ghost-type',
      steel: 'steel-type',
      dragon: 'dragon-type',
      dark: 'dark-type',
      fairy: 'fairy-type'
    };

  return typeClassMap[lowercaseType] || '';
}

  fetchPokemons();
});
