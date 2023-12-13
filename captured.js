document.addEventListener('DOMContentLoaded', () => {
  const capturedContainer = document.getElementById('capturedContainer');
  let capturedPokemons = JSON.parse(sessionStorage.getItem('capturedPokemons')) || [];

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

  const displayCapturedPokemons = () => {
    capturedContainer.innerHTML = '';
    capturedPokemons.forEach(pokemon => {
      createCapturedPokemonCard(pokemon);
    });
  };

  const createCapturedPokemonCard = (pokemon) => {
    const existingCard = document.querySelector(`.captured-pokemon-card[data-id="${pokemon.id}"]`);

    if (!existingCard) {
      const card = document.createElement('div');
      card.classList.add('pokemon-card', 'captured-pokemon-card'); 
      card.setAttribute('data-id', pokemon.id);

      const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
      const id = pokemon.id;
      const types = pokemon.types.map(type => type.type.name).join(', ');

      const backgroundColor = getBackgroundColor(pokemon.types);

      card.style.backgroundColor = backgroundColor;

      const img = document.createElement('img');
      img.src = pokemon.sprites.front_default;
      img.alt = name;
      img.classList.add('pokemon-img');

      const info = document.createElement('div');
      info.innerHTML = `
        <p><strong>${name}</strong></p>
        <p>ID: ${id}</p>
        <div class="types">${getTypesHTML(pokemon.types)}</div>
      `;

      const removeButton = document.createElement('button');
      removeButton.textContent = 'Remover';
      removeButton.classList.add('capture-btn'); 
      removeButton.addEventListener('click', () => {
        removeCapturedPokemon(pokemon.id);
      });

      info.style.color = '#333'; 

      card.appendChild(img);
      card.appendChild(info);
      card.appendChild(document.createElement('br')); // Adiciona uma quebra de linha
      card.appendChild(removeButton);

      capturedContainer.appendChild(card);
    }
  };

  const removeCapturedPokemon = (pokemonId) => {
    capturedPokemons = capturedPokemons.filter(pokemon => pokemon.id !== pokemonId);
    sessionStorage.setItem('capturedPokemons', JSON.stringify(capturedPokemons));
    displayCapturedPokemons();
  };

  const getBackgroundColor = (types) => {
    // Use a cor do primeiro tipo ou a cor padrão se não houver tipos
    const firstType = types.length > 0 ? types[0].type.name : 'normal';
    return colors[firstType] || '#FFFFFF'; 
  };

  const getTypesHTML = (types) => {
    return types.map(type => {
      const typeClass = getTypeClass(type.type.name);
      return `<span class="type ${typeClass}">${type.type.name}</span>`;
    }).join(' ');
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

  displayCapturedPokemons();
});
