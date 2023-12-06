document.addEventListener('DOMContentLoaded', async () => {
    const pokeContainer = document.getElementById('pokeContainer');
    const pokemonCount = 20;
  
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
  
      const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
      const id = pokemon.id.toString().padStart(3, '0');
      const types = pokemon.types.map(type => type.type.name).join(', ');
  
      const img = document.createElement('img');
      img.src = pokemon.sprites.front_default;
      img.alt = name;
      img.classList.add('pokemon-img');
  
      const info = document.createElement('div');
      info.innerHTML = `
        <p><strong>${name}</strong></p>
        <p>ID: ${id}</p>
        <p>Type: ${types}</p>
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
  
    fetchPokemons();
  });
  