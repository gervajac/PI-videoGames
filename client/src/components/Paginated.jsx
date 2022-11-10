import React from "react";
import styles from  './styles/Paginated.module.css';

export default function paginated({gamesPage, allGamesPerPage, paged}) {
    
    const pages = [];
        
    for (let i = 1; i <= Math.ceil(allGamesPerPage/gamesPage); i++) {
        pages.push(i)
    };    
      
    return(
        
        <div>
            
            {pages.length <= 1 ? 
            <></> :
            <nav className={styles.pagination}>
                <ul className={styles.pages}>
                    {pages?.map(p =>(
                        <li className={styles.page} key={p}>
                            <button className={styles.pageBtn} onClick={() => paged(p)} style={{width:"30px"}}>{p}</button>
                        </li>
                    ))}
                </ul>
            </nav>
            }  

        </div>
    )
};