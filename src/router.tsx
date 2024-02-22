// import { createBrowserRouter } from "react-router-dom";
// import App from "./App";
// import { PokemonData } from "./PokemonData";
// import { getEpisodeData } from "./ramApi";

// export const router = createBrowserRouter([
//   {
//     path: "/",
//     Component: App,
//     children: [
//       {
//         index: true,
//         element: <p>Please choose an episode to see its details.</p>,
//       },
//       {
//         path: "/:episodeName",
//         Component: EpisodeData,
//         loader({ params }) {
//           return getEpisodeData(params.episodeName!);
//         },
//         errorElement: <p>Episode does not exist.</p>,
//       },
//     ],
//   },
// ]);
