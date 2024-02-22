import axios from "axios";

const apiClient = axios.create({
    baseURL: "https://rickandmortyapi.com/api",
});

export async function getEpisodes() {
    try {
        const [res1, res2, res3] = await Promise.all([
            apiClient.get<{ results: { name: string }[] }>("/episode"),
            apiClient.get<{ results: { name: string }[] }>("/episode?page=2"),
            apiClient.get<{ results: { name: string }[] }>("/episode?page=3")
        ]);

        const allResults = [...res1.data.results, ...res2.data.results, ...res3.data.results];

        return allResults.map(({ name }) => name);
    } catch (error) {
        console.error("Error fetching data:", error);
        return [];
    }
}

// export type EncountersResponse = {
//     location_area: {
//         name: string;
//     };
//     version_details: {
//         max_chance: number;
//         version: {
//             name: string;
//         };
//     }[];
// }[];

// export async function getPokemonEncounters(pokemonName: string) {
//     const res = await apiClient.get<EncountersResponse>(
//         `/pokemon/${pokemonName.toLowerCase()}/encounters`
//     );

//     return res.data;
// }

// export type PokemonData = {
//     sprites: { other: { "official-artwork": { front_default: string } } };
//     stats: { stat: { name: string }; base_stat: number }[];
// };

// export async function getPokemonData(pokemonName: string) {
//     const res = await apiClient.get<PokemonData>(
//         `/pokemon/${pokemonName.toLowerCase()}`
//     );

//     return res.data;
// }