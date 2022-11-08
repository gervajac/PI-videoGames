import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getVideogames } from '../actions';
import styles from './styles/SearchBar.module.css';


export default function Searchbar() {
    const dispatch = useDispatch();
    const [input, setInput] = useState('');

    function handleChange(e) {    
        e.preventDefault();    
        setInput(e.target.value);
    };

    function handleSubmit(e) {
       
        try {
            dispatch(getVideogames(input));
            
        } catch (error) {            
            return error;
        }

        setInput('')
        
    };

   

    return (
        <div className={styles.search}>
            <input type="text" className="searchInput" placeholder="Search game by name" value={input} onChange={e => handleChange(e)}/>
            <button className={styles.searchButton} type="submit" onClick={e => handleSubmit(e)}>Search</button>
        </div>
    )

};