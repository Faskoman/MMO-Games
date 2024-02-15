import { MouseEventHandler, useCallback, useState } from "react";
import { useParams } from "react-router";
import { PokemonEncounters } from "./PokemonEncounters";
import { useAsync } from "./useAsync";
import { getPokemonData } from "./pokeApi";
import type { PokemonData } from "./pokeApi";
import styles from "./PokemonData.module.scss";

export function PokemonData() {
  const {
    isLoading,
    pokemonData,
    isEncountersDialogOpen,
    openEncountersDialog,
    closeEncountersDialog,
    pokemonName,
  } = usePokemonData();

  if (isLoading) {
    return (
      <article className={styles.pokemonData}>
        <p className={styles.loadingIndicator}>Loading...</p>
      </article>
    );
  }

  return (
    <>
      <article className={styles.pokemonData}>
        <article>
          <h2>{pokemonName}</h2>
          <img
            src={pokemonData?.sprites.other["official-artwork"].front_default}
            alt=""
          />
        </article>
        <article className={styles.pokemonStats}>
          <h3>Stats</h3>
          <ul>
            <li>HP: {pokemonData && getStat(pokemonData, "hp")}</li>
            <li>Attack: {pokemonData && getStat(pokemonData, "attack")}</li>
            <li>Defense: {pokemonData && getStat(pokemonData, "defense")}</li>
            <li>
              Special attack:{" "}
              {pokemonData && getStat(pokemonData, "special-attack")}
            </li>
            <li>
              Special defense:{" "}
              {pokemonData && getStat(pokemonData, "special-defense")}
            </li>
            <li>Speed: {pokemonData && getStat(pokemonData, "speed")}</li>
          </ul>
        </article>
        <menu>
          <li>
            <a href="" onClick={openEncountersDialog}>
              Where to find?
            </a>
          </li>
        </menu>
      </article>
      {isEncountersDialogOpen && (
        <PokemonEncounters
          pokemonName={pokemonName}
          onCloseClick={closeEncountersDialog}
        />
      )}
    </>
  );
}

function usePokemonData() {
  const { pokemonName } = useParams();

  if (!pokemonName) {
    throw new Error("Pokemon name is required");
  }

  const getCurrentPokemonData = useCallback(
    () => getPokemonData(pokemonName),
    [pokemonName]
  );
  const { isLoading, data: pokemonData } = useAsync(getCurrentPokemonData);
  const [isEncountersDialogOpen, setIsEncountersDialogOpen] = useState(false);

  const openEncountersDialog: MouseEventHandler<HTMLAnchorElement> = (e) => {
    e.preventDefault();

    setIsEncountersDialogOpen(true);
  };

  const closeEncountersDialog = () => setIsEncountersDialogOpen(false);

  return {
    isLoading,
    pokemonData,
    isEncountersDialogOpen,
    openEncountersDialog,
    closeEncountersDialog,
    pokemonName,
  };
}

function getStat(pokemonData: PokemonData, statName: string) {
  return pokemonData.stats.find((stat) => stat.stat.name === statName)
    ?.base_stat;
}
