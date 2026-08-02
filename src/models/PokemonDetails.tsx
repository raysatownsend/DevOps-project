export interface PokemonDetail {
    name: string,
    types: [{
        type: {
           name: string,
        }
    }],
    abilities: [{
        ability: {
            name: string,
        }
    }],
    moves:[{
        move:{
            name: string,
            url: string,
        }
    }],

}