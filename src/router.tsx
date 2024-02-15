import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import { PokemonData } from "./PokemonData";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      {
        path: "/:pokemonName",
        Component: PokemonData,
      },
    ],
  },
]);
