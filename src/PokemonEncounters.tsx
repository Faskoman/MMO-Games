import axios from "axios";
import styles from "./PokemonEncounters.module.scss";
import { useCallback } from "react";
import { useAsync } from "./useAsync";

type EncountersResponse = {
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

async function getPokemonEncounters(pokemonName: string) {
  const res = await axios.get<EncountersResponse>(
    `https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}/encounters`
  );

  return res.data;
}

type PokemonEncountersProps = { pokemonName: string; onCloseClick: () => void };

export function PokemonEncounters({
  pokemonName,
  onCloseClick,
}: PokemonEncountersProps) {
  const getCurrentPokemonEncounters = useCallback(
    () => getPokemonEncounters(pokemonName),
    [pokemonName]
  );
  const { data, isLoading } = useAsync(getCurrentPokemonEncounters);

  if (isLoading) {
    return (
      <div className={styles.wrapper}>
        <article className={styles.dialog}>
          <h2>{pokemonName} - Encounters</h2>
          <p>Loading...</p>
        </article>
      </div>
    );
  }

  const encounters = toEncounters(data!);

  return (
    <div className={styles.wrapper}>
      <article className={styles.dialog}>
        <h2>{pokemonName} - Encounters</h2>
        <ul className={styles.gameList}>
          {Array.from(encounters.entries()).map(([version, locations]) => (
            <li key={version}>
              <h3>{version}</h3>
              <ul>
                {locations.map(({ location, chance }) => (
                  <li key={location} className={styles.areaListItem}>
                    {location} ({chance}%)
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
        <menu>
          <li>
            <a
              href=""
              onClick={(e) => {
                e.preventDefault();

                onCloseClick();
              }}
            >
              Close
            </a>
          </li>
        </menu>
      </article>
    </div>
  );
}

type Location = {
  location: string;
  chance: number;
};

function toEncounters(encountersResponse: EncountersResponse) {
  const encountersMap = new Map<string, Location[]>();

  for (const { location_area, version_details } of encountersResponse) {
    for (const { version, max_chance } of version_details) {
      if (!encountersMap.has(version.name)) {
        encountersMap.set(version.name, []);
      }

      const locations = encountersMap.get(version.name);

      locations?.push({ location: location_area.name, chance: max_chance });
    }
  }

  return encountersMap;
}
