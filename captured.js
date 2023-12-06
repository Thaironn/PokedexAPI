document.addEventListener('DOMContentLoaded', () => {
    const capturedContainer = document.getElementById('capturedContainer');
    const capturedPokemons = JSON.parse(sessionStorage.getItem('capturedPokemons')) || [];
  
    const displayCapturedPokemons = () => {
      capturedContainer.innerHTML = '';
  
      capturedPokemons.forEach(pokemon => {
        createCapturedPokemonCard(pokemon);
      });
    };
  
    const createCapturedPokemonCard = (pokemon) => {
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
  
      card.appendChild(img);
      card.appendChild(info);
  
      capturedContainer.appendChild(card);
    };
  
    displayCapturedPokemons();
  });
  