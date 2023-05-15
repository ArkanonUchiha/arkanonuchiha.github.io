const POKEMON_CONTAINER = document.querySelector('.pokemon-container');
const SPINNER = document.querySelector('#spinner');
const PREVIOUS_BUTTON = document.querySelector('#previous');
const NEXT_BUTTON = document.querySelector('#next');

let offset = 1;
let limit = 8;

function fetchPokemon(id) {
  fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
    .then(response => response.json())
    .then(pokemon => {
      createPokemonCard(pokemon);
      SPINNER.style.display = "none";
    });
}

function fetchPokemons(offset, limit) {
  SPINNER.style.display = "block";
  for (let i = offset; i <= offset + limit; i++) {
    fetchPokemon(i);
  }
}

function createPokemonCard(pokemon) {
  // VALIDACION DEL RECURSO CON OPERADORES DE CORTO CIRCUITO
  // const POKEMON_IMAGE = (((((pokemon || {}).sprites || {}).other || {}).home || {}).front_default || {});


  // VALIDACION DEL RECURSO CON EL OPERADOR OPTIONAL CHAINING (?) Y EL OPERADOR DE FUSION NULA (??)
  const POKEMON_IMAGE = pokemon?.sprites?.other?.home?.front_default ?? '';

  const POKEMON_CARD_FLIP = document.createElement('div');
  POKEMON_CARD_FLIP.classList.add('pokemon-card-flip');

  const CARD_CONTAINER = document.createElement('div');
  CARD_CONTAINER.classList.add('card-container');

  POKEMON_CARD_FLIP.appendChild(CARD_CONTAINER);

  const POKEMON_CARD = document.createElement('div');
  POKEMON_CARD.classList.add('pokemon-card');

  const SPRITE_CONTAINER = document.createElement('div');
  SPRITE_CONTAINER.classList.add('img-container');

  const SPRITE = document.createElement('img');
  SPRITE.src = POKEMON_IMAGE;

  SPRITE_CONTAINER.appendChild(SPRITE);

  const POKEMON_NUMBER = document.createElement('p');
  POKEMON_NUMBER.classList.add('pokemon-number');
  POKEMON_NUMBER.textContent = `#${ pokemon.id.toString().padStart(3, 0) }`;
  
  const POKEMON_NAME = document.createElement('p');
  POKEMON_NAME.classList.add('pokemon-name');
  POKEMON_NAME.textContent = pokemon.name;

  POKEMON_CARD.appendChild(SPRITE_CONTAINER);
  POKEMON_CARD.appendChild(POKEMON_NUMBER);
  POKEMON_CARD.appendChild(POKEMON_NAME);


  const POKEMON_CARD_BACK = document.createElement('div');
  POKEMON_CARD_BACK.classList.add('pokemon-card-back');

  POKEMON_CARD_BACK.appendChild(createProgressBar(pokemon.stats));

  CARD_CONTAINER.appendChild(POKEMON_CARD);
  CARD_CONTAINER.appendChild(POKEMON_CARD_BACK);

  POKEMON_CONTAINER.appendChild(POKEMON_CARD_FLIP);
}

function removeChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

function createProgressBar(stats) {
  const POKEMON_STATS_CONTAINER = document.createElement('div');
  POKEMON_STATS_CONTAINER.classList.add('pokemon-stats-container');

  for (let i = 0; i < 3; i++) {
    const STAT = stats[i];
    const STAT_PERCENT = STAT.base_stat / 2 + "%";

    const POKEMON_SINGLE_STAT_CONTAINER = document.createElement('div');
    POKEMON_SINGLE_STAT_CONTAINER.classList.add('pokemon-stat-container');

    const POKEMON_STAT_NAME = document.createElement('div');
    POKEMON_STAT_NAME.classList.add('pokemon-state-name');
    POKEMON_STAT_NAME.textContent = STAT.stat.name;

    const PROGRESS = document.createElement('div');
    PROGRESS.classList.add('progress');

    const PROGRESS_BAR = document.createElement('div');
    PROGRESS_BAR.classList.add('progress-bar');
    PROGRESS_BAR.setAttribute('aria-valuenow', STAT.base_stat);
    PROGRESS_BAR.setAttribute('aria-valuemin', 0);
    PROGRESS_BAR.setAttribute('aria-valuemax', 200);
    PROGRESS_BAR.style.width = STAT_PERCENT;
    PROGRESS_BAR.textContent = STAT.base_stat;

    PROGRESS.appendChild(PROGRESS_BAR);
    POKEMON_SINGLE_STAT_CONTAINER.appendChild(POKEMON_STAT_NAME);
    POKEMON_SINGLE_STAT_CONTAINER.appendChild(PROGRESS);
    POKEMON_STATS_CONTAINER.appendChild(POKEMON_SINGLE_STAT_CONTAINER);
  }
  return POKEMON_STATS_CONTAINER;
}

PREVIOUS_BUTTON.addEventListener('click', () => {
  if (offset != 1) {
    offset -= 9;
    removeChildNodes(POKEMON_CONTAINER);
    fetchPokemons(offset, limit);
  }
});

NEXT_BUTTON.addEventListener('click', () => {
  offset += 9;
  removeChildNodes(POKEMON_CONTAINER);
  fetchPokemons(offset, limit);
});

fetchPokemons(offset, limit);
