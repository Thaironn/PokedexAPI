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
    // Verificar se o Pokémon já está na página
    const existingCard = document.querySelector(`.captured-pokemon-card[data-id="${pokemon.id}"]`);

    if (!existingCard) {
      const card = document.createElement('div');
      card.classList.add('pokemon-card', 'captured-pokemon-card'); // Adiciona ambas as classes
      card.setAttribute('data-id', pokemon.id); // Adiciona um atributo de dados para identificar o Pokémon

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
      removeButton.classList.add('capture-btn'); // Adiciona a classe do botão de captura
      removeButton.addEventListener('click', () => {
        // Chama a função para remover o Pokémon quando o botão "Remover" é clicado
        removeCapturedPokemon(pokemon.id);
      });

      // Adiciona estilos personalizados ao card
      card.style.backgroundColor = '#fff'; // Cor de fundo padrão
      info.style.color = '#333'; // Cor do texto padrão

      card.appendChild(img);
      card.appendChild(info);
      card.appendChild(removeButton);

      capturedContainer.appendChild(card);
    }
  };

  // Função para remover o Pokémon do array e atualizar a sessionStorage
  const removeCapturedPokemon = (pokemonId) => {
    capturedPokemons = capturedPokemons.filter(pokemon => pokemon.id !== pokemonId);
    sessionStorage.setItem('capturedPokemons', JSON.stringify(capturedPokemons));

    // Atualiza a exibição
    displayCapturedPokemons();
  };

  displayCapturedPokemons();
});
