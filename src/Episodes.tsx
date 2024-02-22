import { Link } from "react-router-dom";
import { getEpisodes } from "./ramApi";
import { useAsync } from "./useAsync";
import styles from "./Games.module.scss";

export function Episodes() {
  const { isLoading, data } = useAsync(getEpisodes);

  if (isLoading) {
    return (
      <menu className={styles.wrapper}>
        <p>Loading...</p>
      </menu>
    );
  }

//   return (
//     <menu className={styles.wrapper}>
//       {data?.map((title: any) => (
//         <li key={title} className={styles.listItem}>
//           <Link to={`/${title}`} className={styles.link}>
//             {title}
//           </Link>
//         </li>
//       ))}
//     </menu>
//   );
// }
  return (
    <menu className={styles.wrapper}>
      {data?.map((title: any) => (
        <li key={title} className={styles.listItem}>
          <a href={`/${title}`} className={styles.link}>
            {title}
          </a>
        </li>
      ))}
    </menu>
  );
}
