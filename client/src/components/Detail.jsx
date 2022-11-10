import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getVideogameDetail } from '../actions/index';
import { Link, useParams } from 'react-router-dom'
import style from "./styles/Detail.module.css";


export default function GameDetails(props) {
    const dispatch = useDispatch();
    const params = useParams()
    
    useEffect(() => {
        
        dispatch(getVideogameDetail(params.idVideogame))
        
    }, [dispatch, params.idVideogame]);
    
    
    const gameDetails = useSelector(state => state.videogameDetail);
    console.log(gameDetails,"platformsss")
 
    return (

        <div className={style.imageDetail}>
        
        <div className={style.details} key={params.idVideogame}>            
                  
            <div className={style.divimg}>
                <img className={style.detailImg} 
                src={gameDetails.background_image ? 
                gameDetails.background_image : 
                'https://store.hp.com/app/assets/images/uploads/prod/video-game-genres1597871118726439.jpg'} alt="Pic not found"/>
            </div>

            <h1 className={style.texts}>{gameDetails.name}</h1>

            <div className={style.ddsh}>
                <h2 className={style.texts}>Genre: </h2> 
                {gameDetails.genres?.map(e => {
                    return(
                        <h2 className={style.dishesanddiets} key={e.name?? e}>{e.name?? e}</h2>
                    )
                })}
            </div>
            <div className={style.ddsh}>
                 <h2 className={style.texts}>Platforms </h2> 
                
             
                      {gameDetails.platforms?.length > 0 ? gameDetails.platforms?.map(e => {
                       
                    return(
                        <h2 className={style.dishesanddiets} key={e}>{e.name?? e}</h2>
                    )
                }) :
                gameDetails.platform?.map(e => {
                    return(
                        <h2 className={style.dishesanddiets} key={e.name?? e}>{e.name?? e}</h2>
                    )
                })}  
            </div>
              
            <div className={style.ddsh}>
                <h3 className={style.scores}>Rating: {gameDetails.rating}</h3>
                
            </div>   

            <div className={style.ddsh}>
            <h3 className={style.scores}>Released: {gameDetails.released}</h3>
            </div>

            <div className={style.ddsh}>
                <h3 className={style.texts}> {gameDetails.description} </h3>
            </div>
            
            <Link to="/home"><button className={style.backButton}>Go back to all games</button></Link>
            
        </div>
    </div>         
    )      
        
}