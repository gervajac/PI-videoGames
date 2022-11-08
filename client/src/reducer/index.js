import { GET_VIDEOGAMES, GET_VIDEOGAME_DETAIL, GET_GENRES, GET_PLATFORMS, ALPHABETICAL_SORT, RATING_SORT, POST_VIDEOGAME, FILTER_BY_GENRE, FILTER_BY_PLATFORM} from '../actions/types';


const initialState = {
	videogamesLoaded: [], // juegos cargados
	videogamesList: [], // lista a la que se le aplicaran los filtros
	videogameDetail: {},
	genres:[],
	platforms:[],
}

export default function rootReducer(state = initialState, action){
	switch(action.type){
		case GET_VIDEOGAMES:
		if(action.payload.hasOwnProperty("msg")){
			console.log(action.payload.msg)
			return{
				...state,
				videogamesList: action.payload
			};
		}
		else{
			return{
				...state,
				videogamesLoaded: action.payload.games,
				videogamesList: action.payload.games
			};	
		}
		case GET_VIDEOGAME_DETAIL:
		if(action.payload.hasOwnProperty("msg")){
			console.log(action.payload.msg)
			return{
				...state,
				videogameDetail: action.payload
			};
		}
		else{
			return{
				...state,
				videogameDetail: action.payload
			};
		}
		case POST_VIDEOGAME:
			return{
				...state,
			};
		case GET_GENRES:
		return{
			...state,
			genres: action.payload.genres
		};
		case GET_PLATFORMS:
		return{
			...state,
			platforms: action.payload.platforms
		};
		case FILTER_BY_GENRE: {
			const allVideogames = [...state.videogamesLoaded];
			const videogamesByGenres = []
			 allVideogames.map(videogame => {
				const existcategory = videogame.categories.some(e => e.name === action.payload)
				if(existcategory){
					videogamesByGenres.push(videogame)
				}
			});
			return {
			  ...state,
			  videogamesList: videogamesByGenres, 
			};
		  }

		  case FILTER_BY_PLATFORM: {
			const allVideogames = [...state.videogamesLoaded];
			console.log(allVideogames,"ASIIIII")
			const videogamesByPlatforms = []
			 allVideogames.map(videogame => {
				const existPlatform = videogame.platforms.some(e => e.name === action.payload)
				console.log(existPlatform,"ASI2222222")
				if(existPlatform){
					videogamesByPlatforms.push(videogame)
				}
			});
			console.log(videogamesByPlatforms,"ASI2333333333333")
			return {
			  ...state,
			  videogamesList: videogamesByPlatforms, 
			};
		  }

		case RATING_SORT:
			let sortedGamesByRating = [...state.videogamesLoaded] 
			sortedGamesByRating = action.payload === 'asc' ?
			state.videogamesLoaded.sort(function(a, b) {
			  if (a.rating > b.rating) return 1;
			  if (a.rating < b.rating) return -1;
			  return 0;
			}) :
			state.videogamesLoaded.sort(function(a, b) {
			  if (a.rating < b.rating) return 1;
			  if (a.rating > b.rating) return -1;
			  return 0;
			});
			return {
			  ...state,
			  videogames: sortedGamesByRating
			};

		  case ALPHABETICAL_SORT:   
          let sortedGames = [...state.videogamesLoaded]       
          sortedGames = action.payload === 'atoz' ?
          state.videogamesLoaded.sort(function(a, b) {
            if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
            if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
            return 0;
          }) :
          state.videogamesLoaded.sort(function(a, b) {
            if (a.name.toLowerCase() < b.name.toLowerCase()) return 1;
            if (a.name.toLowerCase() > b.name.toLowerCase()) return -1;
            return 0;
          });          
          return {
            ...state,
            videogames: sortedGames
          };

		  default:
			return state;
		}
	  };
	

	

