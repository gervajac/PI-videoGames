import axios from 'axios';
import { GET_VIDEOGAMES, GET_VIDEOGAME_DETAIL, ALPHABETICAL_SORT, GET_GENRES, FILTER_BY_GENRE, GET_PLATFORMS, RATING_SORT, FILTER_BY_PLATFORM} from './types';


export function getVideogames(name){
	return async function(dispatch){
		var data;
		if(name){
			data = await axios.get(`http://localhost:3001/videogames?name=${name}`);
		} 
		else {
		 	data = await axios.get("http://localhost:3001/videogames");
		}

		return dispatch({
            type: GET_VIDEOGAMES, 
            payload: data.data
        });
	}
}

export function getVideogameDetail(id){
	return async function(dispatch){
		console.log(id, )
		const data = await axios.get(`http://localhost:3001/videogame/${id}`);
		console.log(data, "hola")
		return dispatch({
            type: GET_VIDEOGAME_DETAIL, 
            payload: data.data
        });
	}
}

export function postVideogame(payload){
	console.log(payload, "este es el payload")
	return async function(dispatch){
		try{
			const data = await axios.post(`http://localhost:3001/videogame`, payload);
			console.log(data, "esta es la data")
			return data;
		}catch(error) { 
               alert("cant get add videogame")
		}
	}
};

export function getGenres(){
	return async function(dispatch){
		const data = await axios.get(`http://localhost:3001/genres`);
		return dispatch({
            type: GET_GENRES, 
            payload: data.data
        });
	}
}

export function getPlatforms(){
	return async function(dispatch){
		const data = await axios.get(`http://localhost:3001/platforms`);
		return dispatch({
            type: GET_PLATFORMS, 
            payload: data.data
        });
	}
}


export function filterVideogamesByGenre(categories){
	console.log(categories,"ESTE ES EL PAYLOAD DE LAA CTION")
	return {
	  type: FILTER_BY_GENRE,
	  payload: categories,
	};
  };

  export function filterVideogamesByPlatform(platforms){
	return {
	  type: FILTER_BY_PLATFORM,
	  payload: platforms,
	};
  };


  export function alphabeticalSort(payload) {
    return {
        type: ALPHABETICAL_SORT,
        payload
    }
};

export function ratingSort(payload) {
	return function (dispatch) {
	  return dispatch({ 
		type: RATING_SORT, 
		payload
	});
	};
}  
  
  
