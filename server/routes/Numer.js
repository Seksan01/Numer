const express = require('express')

const NumerCtrl = require('../controllers/numer-ctrl')

const router = express.Router()


router.get('/getbisection', NumerCtrl.getbisection)
router.get('/getfalseposition', NumerCtrl.getfalseposition)
router.get('/getonepoint', NumerCtrl.getonepoint)
router.get('/getnewton', NumerCtrl.getnewton)
router.get('/getsecant', NumerCtrl.getsecant)
router.get('/getinte', NumerCtrl.getinte)
router.get('/getdiff', NumerCtrl.getdiff)
module.exports = router