import React from "react";
import styles from './styles/Card.module.css';



let prevId = 1;

export default function Games(props) {


    const { img, name, rating, categories, platforms } = props
    return (
        <div className={styles.recipe}>
            
            <div>
                <img className={styles.recipeImg} src={img} alt="Not found"/>
            </div>
            
            <div>
                <h2 className={styles.recipeName}>{name}</h2>            
            </div>
            <div className={styles.dietcointainer}>
                <h3>⭐ {rating}</h3>
            </div>
            <div>
                 {categories?.map(e => {
                    return (
                        <h5 className={styles.genres} key={prevId++}>{e.name}</h5>
                    )
                })}
            </div>
            <div className={styles.platformc}>
                {platforms?.map(e => {
                    return (
                        <h5 className={styles.platforms} key={prevId++}>{e.name}</h5>
                    )
                })}
            </div>
            
        </div>
    )
};