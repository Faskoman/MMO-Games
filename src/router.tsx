import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import { PokemonData } from "./PokemonData";
import { getPokemonData } from "./pokeApi";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      {
        index: true,
        element: <p>Please choose a pokemon to see its details.</p>,
      },
      {
        path: "/:pokemonName",
        Component: PokemonData,
        loader({ params }) {
          return getPokemonData(params.pokemonName!);
        },
        errorElement: <p>Pokemon does not exist.</p>,
      },
    ],
  },
]);
