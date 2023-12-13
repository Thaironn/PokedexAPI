document.addEventListener('DOMContentLoaded', () => {
  const capturedContainer = document.getElementById('capturedContainer');
  let capturedPokemons = JSON.parse(sessionStorage.getItem('capturedPokemons')) || [];

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

      const removeButton = document.createElement('button');
      removeButton.textContent = 'Remover';
      removeButton.classList.add('capture-btn'); 
      removeButton.addEventListener('click', () => {
        removeCapturedPokemon(pokemon.id);
      });

    
      card.style.backgroundColor = '#fff';
      info.style.color = '#333'; 

      card.appendChild(img);
      card.appendChild(info);
      card.appendChild(removeButton);

      capturedContainer.appendChild(card);
    }
  };


  const removeCapturedPokemon = (pokemonId) => {
    capturedPokemons = capturedPokemons.filter(pokemon => pokemon.id !== pokemonId);
    sessionStorage.setItem('capturedPokemons', JSON.stringify(capturedPokemons));
    displayCapturedPokemons();
  };

  displayCapturedPokemons();
});
