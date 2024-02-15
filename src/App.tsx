import { Outlet } from "react-router";
import { Pokemons } from "./Pokemons";
import "./App.scss";

function App() {
  return (
    <main>
      <h1 className="app-title">Pokedex</h1>
      <Pokemons />
      <Outlet />
    </main>
  );
}

export default App;
