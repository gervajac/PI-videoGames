require('dotenv').config();
const axios = require('axios');

const { Router } = require('express');
const {Videogame, Category, Platform} = require('../db.js');
const videogame = Router();

videogame.get("/:idVideogame", async (req, res, next) => {
	try{
		const {idVideogame} = req.params;
		// Busqueda de un juego
		if(idVideogame){
			var game = null;

			if(idVideogame.length === 36){
				game = await Videogame.findByPk(idVideogame,{
				    include: [Category, Platform]
				});
			}
			else {
				const dataAPI = await axios.get(`https://api.rawg.io/api/games/${idVideogame}?key=5b9a51ae13e147b7bccf3a7f55d6a2ac`);
				// Si se encuentra el juego
				if(dataAPI.data.detail !== "Not found."){
					game = {
						name: dataAPI.data.name,
						background_image: dataAPI.data.background_image,
						categories: dataAPI.data.genres,
						description: dataAPI.data.description,
						released: dataAPI.data.released,
						genres: dataAPI.data.genres,
						rating: dataAPI.data.rating,
						platforms: dataAPI.data.platforms.map(plat => {return{
							id: plat.platform.id,
							name: plat.platform.name
						}}),
					};
				}
			}
			console.log(game)
			if(game) res.status(200).json(game);

			// Si no hay resultados
		}
		else{
			res.status(200).json({msg: "Game Not Found"});
		}
	} catch(error){
		next(error);
	}
});

videogame.post("/", async (req, res, next) => {
	try{
		const {name, description, background_image, releaseDate, rating, platforms, genres} = req.body;
		console.log(platforms, genres, "1111111111111")
		const game = await Videogame.create({
		name, 
		description, 
		background_image, 
		releaseDate, 
		rating,
		platform: platforms,
		genres
		});
		delete game.platforms
		res.status(200).json({game});
	} catch(error){
		next(error);
	}
});

module.exports = videogame;