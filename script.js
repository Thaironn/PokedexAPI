document.addEventListener('DOMContentLoaded', async () => {
  const pokeContainer = document.getElementById('pokeContainer');
  const pokemonCount = 24;
  const colors = {
      fire: '#FF0000',
      grass: '#90EE90',
      electric: '#FCF7DE',
      water: '#DEF3FD',
      ground: '#f4e7da',
      rock: '#d5d5d4',
      fairy: '#fceaff',
      poison: '#98d7a5',
      bug: '#f8d5a3',
      dragon: '#97b3e6',
      psychic: '#eaeda1',
      flying: '#F5F5F5',
      fighting: '#E6E0D4',
      normal: '#F5F5F5'
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
          <p>${types}</p>

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

  const getTypeClass = (type) => {
      return '';
  };

  fetchPokemons();
});
