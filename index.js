let base_url = "https://pokeapi.co/api/v2/pokemon";

function getPokemonList(url) {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      let pokemon = data.results;
      let container = document.querySelector(".pokemon-list-container");
      container.innerHTML = "";
      pokemon.forEach((btn) => {
        container.innerHTML += `<button onclick="getPokemonInfo('${btn.url}')">${btn.name}</button>`;
      });
      if (data.previous == null) {
        container.innerHTML += `<br></br><button class="poke-next poke-but" onclick="getPokemonList('${data.next}')">Next</button>`;
        document.getElementsByClassName(".previ").disabled = true;
      } else {
        container.innerHTML += `<br></br><button class="previ poke-but" onclick="getPokemonList('${data.previous}')">Prev</button><button class="poke-next" onclick="getPokemonList('${data.next}')">Next</button>`;
      }
    });
}

getPokemonList(base_url);

function getPokemonInfo(url) {
  // console.log(url)
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      document.querySelector(
        ".pokemon-info"
      ).innerHTML = `<div class="poke-details"><img class="poke-img" src="${data.sprites.other["official-artwork"].front_default}">
      <div class="poke-name"><h2>${data.id}.${data.name}</h2>
      <div>
      <p>types: <span>${data.types[0].type.name}</span></p>
      </div>
      </div></div>`;
    });
}
