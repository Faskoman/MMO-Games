import { Outlet } from "react-router";
import { Episodes } from "./Episodes";
import "./App.scss";

function App() {
  return (
    <main>
      <h1 className="app-title">MMO Games</h1>
      <Episodes />
      <Outlet />
    </main>
  );
}

export default App;
