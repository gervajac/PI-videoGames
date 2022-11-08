require('dotenv').config();
const {API_KEY} = process.env;
const { Router } = require('express');
const {Category} = require('../db.js');
const genres = Router();

genres.get("/", async (req, res, next) => {
	try{
		const genres = await Category.findAll();
		res.status(200).json({count:genres.length ,genres});
	} catch(error){
		next(error);
	}
});

module.exports = genres;

/*module.exports = genres;

const getGenres = async () => {
	const apiGenres = await axios.get("https://api.rawg.io/api/genres?key=1c2e5616d523474c8d03ab478ccd169e");
	const genres = await apiGenres.data.results.map(genre => {
	  return {
		name: genre.name
	  };
	});
	return genres;
  };
  */