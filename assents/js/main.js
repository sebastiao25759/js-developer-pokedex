const pokemonList = document.getElementById("pokemonList");
const loadMoreButton = document.getElementById("loadMoreButton");

//estrutura do modal
const modalOverlay = document.getElementById("modalOverlay");
function openModal(pokemonName) {
    const modal = document.getElementById(`${pokemonName}Modal`);
    modal.style.display = "block";
    modalOverlay.style.display = "block";
  }

  function closeModal(pokemonName) {
    const modal = document.getElementById(`${pokemonName}Modal`);
    modal.style.display = "none";
    modalOverlay.style.display = "none";
  }
//fim da estrutura do modal

const maxRecords = 151;
const limit = 10;
let offset = 0;

function covertPokemonToLi(pokemon) {
  return `
    <li class="pokemon ${pokemon.type}">
        <span class="number">#${pokemon.number}</span>
        <span class="name">${pokemon.name}</span>

        <div class="detail">
        <ol class="types">
            ${pokemon.types
              .map((type) => `<li class="type ${type}">${type}</li>`)
              .join("")}
        </ol>
        <img src="${pokemon.photo}" alt="${pokemon.name}">
        </div>
        <button class="buttonDetail" onclick="openModal('${pokemon.name}')">Characteristics</button>
        <div class="modal" id="${pokemon.name}Modal">
          <div class="modalTipo">Ability: ${pokemon.ability}</div>
          <div class="modalTipo">Weight: ${pokemon.weight}</div>
          <div class="modalTipo">Height: ${pokemon.height}</div>
          <div class="modalTipo">HP: ${pokemon.hp}</div>
          <div class="modalTipo">Attack: ${pokemon.attack}</div>
          <div class="modalTipo">Defense: ${pokemon.defense}</div>
          <div class="modalTipo">Special Attack: ${pokemon.specialAttack}</div>
          <div class="modalTipo">Special Defense: ${pokemon.specialDefense}</div>
          <div class="modalTipo">Speed: ${pokemon.speed}</div>
          <img src="${pokemon.photo}" alt="${pokemon.name}">
          <button class="closeModal" onclick="closeModal('${pokemon.name}')">Close</button>
        </div>
    </li>
    `;
}

function loadPokemonItens(offset, limit) {
  pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
    const newHtml = pokemons.map(covertPokemonToLi).join("");
    pokemonList.innerHTML += newHtml;
  });
}

loadPokemonItens(offset, limit);

loadMoreButton.addEventListener("click", () => {
  offset += limit;

  const qtdRecordNextPage = offset + limit;

  if (qtdRecordNextPage >= maxRecords) {
    const newlimit = maxRecords - offset;
    loadPokemonItens(offset, newlimit);
    loadMoreButton.parentElement.removeChild(loadMoreButton);
  } else {
    loadPokemonItens(offset, limit);
  }
});
