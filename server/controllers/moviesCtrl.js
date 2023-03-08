const Movie = require('../models/movieSchema')




const moviesCtrl = {
    
    getMovies: async (req,res)=>{
        try {
            const page = parseInt(req.query.page) -1 || 0 ;
            const limit = parseInt(req.query.limit) || 5 ;
            const search = req.query.search || "";
            let sort = req.query.sort || "rating"
            let genre = req.query.genre || "All"
             
            const genreOptions = [
                "Action",
                "Romance", 
                "Fantasy",
                "Drama",
                "Crime",
                "Adventure", 
                "Thriller", 
                "Sci-fi",
                "Music",
                "Family"
            ]
            
            genre === "All"
                ?(genre=[...genreOptions])
                :(genre=req.query.genre.split(','));
            
            req.query.sort ? (sort = req.query.sort.split(',')) : (sort=[sort])
    
            let sortBy = {};
            if(sort[1]){
                sortBy[sort[0]] = sort[1]
            }else{
                sortBy[sort[0]] = 'asc'
            }
            
            const movies = await Movie.find({name:{$regex: search,$options:'i'}})
                .where('genre')
                .in([...genre])
                .sort(sortBy)
                .skip(page*limit)
                .limit(limit)
            
            const total = await Movie.countDocuments({
                genre : {$in : [...genre]},
                name : {$regex : search,$options:'i'}
            })
    
            const response = {
                error : false,
                total,
                page : page +1,
                limit ,
                genres : genreOptions,
                movies
            }
    
            res.status(200).json(response)
    
        } catch (err) {
            console.log(err)
            res.status(500).json({error : true , message:"internal Server Error"})
        }
    },
}

//this piece of code to add movies data from '/config/movies.json' to dataBase
/* const movies = require('../config/movies.json')  */
/* const insertMovies = async () => {
    try {
        const docs = await Movie.insertMany(movies);
        return Promise.resolve(docs)
    } catch (err) {
        return Promise.reject(err)
    }
}

insertMovies()
    .then(() => console.log("success"))
    .catch((err) => console.log(err))  */

module.exports = moviesCtrl


