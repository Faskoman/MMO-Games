import { Link } from "react-router-dom";
import { getPokemons } from "./pokeApi";
import { useAsync } from "./useAsync";
import styles from "./Pokemons.module.scss";

export function Pokemons() {
  const { isLoading, data } = useAsync(getPokemons);

  if (isLoading) {
    return (
      <menu className={styles.wrapper}>
        <p>Loading...</p>
      </menu>
    );
  }

  return (
    <menu className={styles.wrapper}>
      {data?.map((pokemonName) => (
        <li key={pokemonName} className={styles.listItem}>
          <Link to={`/${pokemonName}`} className={styles.link}>
            {pokemonName}
          </Link>
        </li>
      ))}
    </menu>
  );
}
