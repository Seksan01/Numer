const bi = require('../models/bisectionmodel')
const fa = require('../models/falsepositionmodel')
const one = require('../models/onepointmodel')
const newt = require('../models/newtonmodel')
const se = require('../models/secantmodel')
const Di = require('../models/diffmodel')
const Inte = require('../models/integralmodel')
getbisection = async (req, res) => {
    await bi.find({}, (err, bisections) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!bisections.length) {
            return res
                .status(404)
                .json({ success: false, error: `Index not found` })
        }
        return res.status(200).json({ success: true, data: bisections })
    }).catch(err => console.log(err))
}

getfalseposition = async (req, res) => {
    await fa.find({}, (err, falseposition) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!falseposition.length) {
            return res
                .status(404)
                .json({ success: false, error: `Index not found` })
        }
        return res.status(200).json({ success: true, data: falseposition })
    }).catch(err => console.log(err))
}
getonepoint = async (req, res) => {
    await one.find({}, (err, onepoint) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!onepoint.length) {
            return res
                .status(404)
                .json({ success: false, error: `Index not found` })
        }
        return res.status(200).json({ success: true, data: onepoint })
    }).catch(err => console.log(err))
}
getnewton = async (req, res) => {
    await newt.find({}, (err, newton) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!newton.length) {
            return res
                .status(404)
                .json({ success: false, error: `Index not found` })
        }
        return res.status(200).json({ success: true, data: newton })
    }).catch(err => console.log(err))
}
getsecant = async (req, res) => {
    await se.find({}, (err, secant) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!secant.length) {
            return res
                .status(404)
                .json({ success: false, error: `Index not found` })
        }
        return res.status(200).json({ success: true, data: secant })
    }).catch(err => console.log(err))
}
getdiff = async (req, res) => {
    await Di.find({}, (err, diff) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!diff.length) {
            return res
                .status(404)
                .json({ success: false, error: `Index not found` })
        }
        return res.status(200).json({ success: true, data: diff })
    }).catch(err => console.log(err))
}
getinte = async (req, res) => {
    await Inte.find({}, (err, integral) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!integral.length) {
            return res
                .status(404)
                .json({ success: false, error: `Index not found` })
        }
        return res.status(200).json({ success: true, data: integral })
    }).catch(err => console.log(err))
}

module.exports = {
    
    getbisection,
    getfalseposition,
    getonepoint,
    getnewton,
    getsecant,
    getdiff,
    getinte
}