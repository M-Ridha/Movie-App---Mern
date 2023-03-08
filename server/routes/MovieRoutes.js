const router = require('express').Router()
const moviesCtrl = require('../controllers/moviesCtrl')



router.get('/movies',moviesCtrl.getMovies)





module.exports = router