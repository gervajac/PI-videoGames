import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getVideogames, filterVideogamesByGenre, alphabeticalSort, ratingSort, getGenres, getPlatforms, filterVideogamesByPlatform} from '../actions';
import Card from './Card';
import { Link } from 'react-router-dom'
import Paginated from './Paginated';
import Searchbar from './Searchbar';
import styles from './styles/Home.module.css';



let prevId = 1;

export default function Home() {
    
    const dispatch = useDispatch();
    const allGenres = useSelector((state) => state.genres);
    const allGames = useSelector((state) => state.videogamesLoaded);
    const gamesFiltered = useSelector((state) => state.videogamesList);
    const allPlatforms = useSelector((state) => state.platforms);
    
    const [order, setOrder] = useState('')
    
    
    const [page, setPaginated] = useState(1);
    const [recipesPage, setRecipesPage] = useState(9);
    const [isFiltered, setIsFiltered] = useState(false)
    const quantityRecipesPage = page * recipesPage;
    const firstRecipePage = quantityRecipesPage - recipesPage;
    const showRecipesPage = allGames.slice(firstRecipePage, quantityRecipesPage);
    const showGamesPage = gamesFiltered.slice(firstRecipePage, quantityRecipesPage);
    const arrayToMap = isFiltered ? showGamesPage : showRecipesPage
    
    
    const paged = function(pageNumber) {
        setPaginated(pageNumber)
    };

    

    useEffect(() => {
        dispatch(getVideogames())
        dispatch(getGenres())
        dispatch(getPlatforms())
    }, [dispatch]);


   

    function handleClick(e) {
        e.preventDefault();
        dispatch(getVideogames());
        setPaginated(1);
    }

    const HandleFilteredByGenre = (e) => {
        e.preventDefault();
        setPaginated(1);
        setIsFiltered(true)
        dispatch(filterVideogamesByGenre(e.target.value)); 
        };

    const HandleFilteredByPlatform = (e) => {
         e.preventDefault();
         setPaginated(1);
          setIsFiltered(true)
            dispatch(filterVideogamesByPlatform(e.target.value)); 
         };
      

      function handleAlphabeticalSort(e) {
        e.preventDefault();                
        dispatch(alphabeticalSort(e.target.value))
        setPaginated(1);
        setOrder(`Order ${e.target.value}`);
    }

    const handleOrderByRating = (e) => {
        e.preventDefault();
        dispatch(ratingSort(e.target.value));
        setPaginated(1);
        setOrder(`Order ${e.target.value}`);
      };
    

    
    
    return(
        <div className={styles.home}>
            <div className={styles.one}>
            <h1 className={styles.initialMsg}>Explore the games!</h1>
            </div>
            <div>
                <button className={styles.refreshButton} onClick={handleClick}>Refresh games</button>
                <Link to="/addvideogame">
                    <button className={styles.addButton}>Add new game</button>
                </Link>
            </div>
            <div>
            <label className={styles.filters}>Sort:</label>
             <select name="categories" onChange={(e) => HandleFilteredByGenre(e)} >
                <option value="default">TODOS LOS GENEROS</option>
                  {allGenres.map(categories =>
                 <option key={categories.id} value={categories.name}>
                 {categories.name.toUpperCase()}
                </option>
                 )}
            </select>
            <select name="platforms" onChange={(e) => HandleFilteredByPlatform(e)} >
                <option value="default">TODAS LAS PLATAFORMAS</option>
                  {allPlatforms.map(platforms =>
                 <option key={platforms.id} value={platforms.name}>
                 {platforms.name.toUpperCase()}
                </option>
                 )}
          </select>
                <select className={styles.select} name="alphabetical" onChange={e => handleAlphabeticalSort(e)}>
                    <option selected disabled>Alphabetical</option>
                    <option value="atoz">A to Z</option>
                    <option value="ztoa">Z to A</option>
                </select>
                <select name="numerical" onChange={(e) => handleOrderByRating(e)}>
                     <option selected disabled> Rating </option>
                     <option value="asc">From Min to Max</option>
                    <option value="desc">From Max to Min</option>
                 </select>
            </div>
                
                 <Paginated recipesPage={recipesPage} allRecipes={allGames.length} paged={paged}/>
           
            <Searchbar/>

            <div className={styles.allrecipes}>
            {
                arrayToMap.map(e => {
                    
                    return (
                        <div className={styles.eachRecipe} key={prevId++}>
                            <Link className={styles.linkRecetas} to={`/videogame/${e.id}`}>
                                <Card
                                    id={e.id}
                                    name={e.name}
                                    img={e.background_image}
                                    rating={e.rating}
                                    categories={e.categories}
                                    platforms={e.platforms}                           
                                     />
                            </Link>
                        </div>
                    )
                })
            }
            </div>            
            
                <Paginated recipesPage={recipesPage} allGames={allGames.length} paged={paged}/>
            
               

        </div>






    )
}