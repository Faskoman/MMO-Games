import axios from "axios";

const apiClient = axios.create({
    baseURL: "https://pokeapi.co/api/v2",
});

export async function getPokemons() {
    const res = await apiClient.get<{ results: { name: string }[] }>(
        "/pokemon?limit=151"
    );

    return res.data.results.map(({ name }) => name);
}

export type EncountersResponse = {
    location_area: {
        name: string;
    };
    version_details: {
        max_chance: number;
        version: {
            name: string;
        };
    }[];
}[];

export async function getPokemonEncounters(pokemonName: string) {
    const res = await apiClient.get<EncountersResponse>(
        `/pokemon/${pokemonName.toLowerCase()}/encounters`
    );

    return res.data;
}

export type PokemonData = {
    sprites: { other: { "official-artwork": { front_default: string } } };
    stats: { stat: { name: string }; base_stat: number }[];
};

export async function getPokemonData(pokemonName: string) {
    const res = await apiClient.get<PokemonData>(
        `/pokemon/${pokemonName.toLowerCase()}`
    );

    return res.data;
}