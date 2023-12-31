const pokeApi = {};

function convertPokeApiDetailToPokemon(pokeDetail) {
  const pokemon = new Pokemon();
  pokemon.number = pokeDetail.id;
  pokemon.name = pokeDetail.name;
  pokemon.types = pokeDetail.types.map((typeSlot) => typeSlot.type.name);

  const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name);
  const [type] = types;

  pokemon.type = types;
  pokemon.type = type;

  pokemon.photo = pokeDetail.sprites.other.dream_world.front_default;

  pokemon.abilities = pokeDetail.abilities.map(
    (abilitySlot) => abilitySlot.ability.name
  );

  const abilities = pokeDetail.abilities.map(
    (abilitySlot) => abilitySlot.ability.name
  );

  const [ability] = abilities;
  pokemon.ability = abilities;
  pokemon.ability = ability;

  pokemon.weight = pokeDetail.weight;
  pokemon.height = pokeDetail.height;

  //Adicionando os stats
  pokemon.stats = pokeDetail.stats.map((statSlot) => statSlot.base_stat);

  const hpStat = pokeDetail.stats.find(
    (statSlot) => statSlot.stat.name === "hp"
  );
  pokemon.hp = hpStat ? hpStat.base_stat : 0; // Se não encontrar, atribui 0 ou um valor padrão

  const attackStat = pokeDetail.stats.find(
    (statSlot) => statSlot.stat.name === "attack"
  );
  pokemon.attack = attackStat ? attackStat.base_stat : 0; // Se não encontrar, atribui 0 ou um valor padrão

  const defenseStat = pokeDetail.stats.find(
    (statSlot) => statSlot.stat.name === "defense"
  );
  pokemon.defense = defenseStat ? defenseStat.base_stat : 0; // Se não encontrar, atribui 0 ou um valor padrão

  const specialAttackStat = pokeDetail.stats.find(
    (statSlot) => statSlot.stat.name === "special-attack"
  );
  pokemon.specialAttack = specialAttackStat ? specialAttackStat.base_stat : 0; // Se não encontrar, atribui 0 ou um valor padrão

  const specialDefenseStat = pokeDetail.stats.find(
    (statSlot) => statSlot.stat.name === "special-defense"
  );
  pokemon.specialDefense = specialDefenseStat
    ? specialDefenseStat.base_stat
    : 0; // Se não encontrar, atribui 0 ou um valor padrão

  const speedStat = pokeDetail.stats.find(
    (statSlot) => statSlot.stat.name === "speed"
  );
  pokemon.speed = speedStat ? speedStat.base_stat : 0; // Se não encontrar, atribui 0 ou um valor padrão
  //Fim dos stats

  return pokemon;
}

pokeApi.getPokemonDetail = (pokemon) => {
  return fetch(pokemon.url)
    .then((response) => response.json())
    .then(convertPokeApiDetailToPokemon);
};

pokeApi.getPokemons = (offset = 0, limit = 5) => {
  const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;

  return fetch(url)
    .then((response) => response.json())
    .then((jsonBody) => jsonBody.results)
    .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
    .then((detailRequests) => Promise.all(detailRequests))
    .then((pokemonsDetails) => pokemonsDetails);
};

const teste = async () => {
  const teste = await fetch(
    `https://pokeapi.co/api/v2/ability?offset=${offset}&limit=${limit}`
  );
  try {
    if (!teste.ok) {
      throw new Error("Não foi possível obter as habilidades");
    }
    console.log(teste);
  } catch (error) {
    console.log("error");
  }
};
