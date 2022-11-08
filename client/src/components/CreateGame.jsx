import React from "react";
import { useState, useEffect } from 'react'
import { useDispatch, useSelector, } from 'react-redux';
import { Link, useHistory } from "react-router-dom";
import { getGenres, getPlatforms, postVideogame } from '../actions/index'
import style from './styles/CreateGame.module.css'



function validate(input) {
    const errors = {};
    if (!input.name) errors.name = 'Please complete with a videoGame name';
    if (!input.description) errors.summary = 'Please add some comments about your videoGame';
    if (input.rating < 1 || input.rating > 5) errors.rating = 'The score must be a number between 1 and 5';
    if (!input.genres.length) errors.genres = 'You must select at least one genre';
    return errors;
};


export default function AddvideoGame() {
    const dispatch = useDispatch();
    const genres = useSelector(state => state.genres);
    const platforms = useSelector(state => state.platforms);
    const history = useHistory();
    const [errors, setErrors] = useState({})
    
    const [input, setInput] = useState({
        name:"",
        description:"",
        releaseDate:"",
        rating:"",
        background_image:"",
        genres:[],
        platforms:[]
       
    })

   /* const videogamesPlatforms = [
        "PC",
        "PlayStation5",
        "PlayStation4",
        "Xbox One",
        "Xbox 360",
        "Nintendo Switch",
        "Android",
      ];
      */
useEffect(() => {
    dispatch(getGenres());
    dispatch(getPlatforms())
},[dispatch]);

function handleChange(e) {
    e.preventDefault();
    setInput((prevInput) => {
        const newInput = {
            ...prevInput,
            [e.target.name]: e.target.value
        }
        const validations = validate(newInput);
        setErrors(validations)
        return newInput
    });
};

function handleCheckBox(e) {
       
    let newArray = input.genres;
    let find = newArray.indexOf(e.target.value);
    
    if (find >= 0) {
        newArray.splice(find, 1)
    } else {
        newArray.push(e.target.value)
    }
    
    setInput({
        ...input,
        genres: newArray
    });
    const validations = validate(input);
    setErrors(validations)
}

function handleCheckBoxPlatform(e) {
       
    let newArray = input.platforms;
    let find = newArray.indexOf(e.target.value);
    
    if (find >= 0) {
        newArray.splice(find, 1)
    } else {
        newArray.push(e.target.value)
    }
    
    setInput({
        ...input,
        platforms: newArray
    });
    const validations = validate(input);
    setErrors(validations)
}

















function handleSubmit(e) {
    e.preventDefault();

    if (Object.values(errors).length > 0) {
        alert("Please complete the information required");
    } else if (
       input.name === '' && 
       input.description === '' && 
       input.background_image === '' &&
       input.rating === '' &&
       input.releaseDate === '' &&
       !input.genres.length &&
       !input.platforms.length) {
       alert("Please complete the form");}
   else {
       dispatch(postVideogame(input));
       alert('New game added successfully!')
       setInput({
           name: "",
           description: '',
           background_image: '',
           rating: '',
           releaseDate: '',
           genres: [],
           platforms: [],
       });
       history.push('/home')
   }
};




    return (
        <div className={style.addRecipe}>
            <h1 className={style.msg}>Creat your Game!</h1>
            <form onSubmit={e => handleSubmit(e)}>
                <div className={style.form}>
                    <div className={style.prettierForm}>
                        <div className={style.nameInput}>
                            <label className={style.msgs}>Name:</label>
                            <input className={style.inputs} name="name" type="text" value={input.name} onChange={e => handleChange(e)}/>
                            {errors.name && (
                                <span className={style.errors}>{errors.name}</span>
                            )}
                        </div>
                        <div className={style.nameInput}>
                            <label className={style.msgs}>Description:</label>
                            <textarea name="description" type="text" rows="4" cols="30" value={input.description} onChange={e => handleChange(e)}/>
                            {errors.description && (
                                <span className={style.errors}>{errors.description}</span>
                            )}
                        </div>
                        <div className={style.nameInput}>
                            <label className={style.msgs}>rating</label>
                            <input name="rating" type="number" value={input.rating} onChange={e => handleChange(e)}/>
                            {errors.score && (
                                <span className={style.errors}>{errors.rating}</span>
                            )}
                        </div>
                        <div className={style.nameInput}>
                            <label className={style.msgs}>background_image</label>
                            <input name="background_image" value={input.background_image} onChange={e => handleChange(e)}/>
                            {errors.background_image && (
                                <span className={style.errors}>{errors.background_image}</span>
                            )}
                        </div>
                        <div className={style.nameInput}>
                            <label className={style.msgs}>released</label>
                            <input name="releaseDate" type="date" value={input.releaseDate} onChange={e => handleChange(e)}/>
                            {errors.releaseDate && (
                                <span className={style.errors}>{errors.releaseDate}</span>
                            )}
                        </div>
                        
                        <div className={style.checkSelect}>
                        <label className={style.msgs}>genres</label>
                        {genres.map((d) =>{
                            return (
                                <div key={d.id} className={style.checks}>
                                    <label className={style.dietTypes}>{d.name}</label>
                                    <input className={style.checks} type="checkbox" name={d.name} value={d.name} selected={input.genres.includes(d.name)} onChange={e => handleCheckBox(e)}/>
                                </div>
                            )
                        })}
                        {errors.genres && (
                            <span className={style.errors}>{errors.genres}</span>
                        )}
                        </div>
                        <div className={style.checkSelect}>
                        <label className={style.msgs}>platforms</label>
                        {platforms.map((d) =>{
                            return (
                                <div key={d.id} className={style.checks}>
                                    <label className={style.dietTypes}>{d.name}</label>
                                    <input className={style.checks} type="checkbox" name={d.name} value={d.name} selected={input.platforms.includes(d.name)} onChange={e => handleCheckBoxPlatform(e)}/>
                                </div>
                            )
                        })}
                        {errors.platforms && (
                            <span className={style.errors}>{errors.platforms}</span>
                        )}
                        </div>
                        
                    </div>
                </div>
                <button className={style.submitButton} type="submit">Submit videogame</button>
                <Link to="/home"><button className={style.goBackButton}>Go back</button></Link>
            </form>
        </div>

    )

};