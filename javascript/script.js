const nomepokemon = document.querySelector('.nomepokemon');
const numeropokemon = document.querySelector('.numeropokemon');
const pokemonimagem = document.querySelector('.pokemonimg');

const form = document.querySelector('.form');
const input_busca = document.querySelector('.input_busca');
const botao_anterior = document.querySelector('.botao-anterior');
const botao_proximo = document.querySelector('.botao-proximo');

let acharpokemon = 1;

const buscarPokemon = async (pokemon) =>{

    const respostaAPI = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
   
    if(respostaAPI.status === 200){
    const dados = await respostaAPI.json();
    return dados
    }
}

 const renderPokemon = async (pokemon) => {
    
    nomepokemon.innerHTML = 'carregando';

    const dados = await buscarPokemon(pokemon);

    if (dados){
    pokemonimagem.style.display = 'block'   
    nomepokemon.innerHTML = dados.name;
    numeropokemon.innerHTML = dados.id;
    pokemonimagem.src = dados['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];

    input_busca.value = '';
    acharpokemon = dados.id;


    }else{
        pokemonimagem.style.display = 'none'
        nomepokemon.innerHTML = 'Não existe';
        numeropokemon.innerHTML = '';

    }
 }
 form.addEventListener('submit', (event) =>{

    event.preventDefault();
    renderPokemon(input_busca.value.toLowerCase())
 
 });
 botao_anterior.addEventListener('click', () =>{
    if (acharpokemon > 1){
        acharpokemon -= 1;
        renderPokemon(acharpokemon)
    }
 });
 botao_proximo.addEventListener('click', () =>{
    acharpokemon += 1;
    renderPokemon(acharpokemon)
 });



 renderPokemon(acharpokemon);
