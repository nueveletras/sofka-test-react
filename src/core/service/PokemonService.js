export class PokemonService {
    getAllPokemons(){
        return fetch('https://pokeapi.co/api/v2/pokemon/?offset=0&limit=50').then(res => res.json()).then(d => {
        return d.results});
    }

    getPokemonInfo(id){
        return fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`).then(res => res.json()).then(d => {
        return d});
    }
}