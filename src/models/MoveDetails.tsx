export interface MoveDetails {
    moveDetails: string,

    moveName: string,
    
    effect_entries: [{
        effect: string,
        language: {
            name: string,
        }
        short_effect:string,
    }]

    flavor_text_entries:[{
        flavor_text: string,
        language: {
            name: string,
        }
    }]

    contest_type: {
        name: string,
    }

    learned_by_pokemon: [{
        name: string,
    }]

    damage_class: string,


}