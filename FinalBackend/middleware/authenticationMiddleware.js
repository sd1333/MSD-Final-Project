const jwt = require('jsonwebtoken')

exports.authenticateFarmer = (req, res, next) => {

    let authHeader = req.headers.authorization
    let token;


    if (authHeader) {
        token = authHeader.split(' ')[1]
    } else {
        res.status(401).json({
            success: false,
            message: "Access denied"
        })
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            res.status(401).json({
                success: false,
                message: "Access denied"
            })
        } else if (user.role == "farmer" || "superuser") {
            let info = jwt.decode(token)
            req.user = info.farmer

            next()

        }
        else {
            res.status(401).json({
                success: false,
                message: "Access denied"
            })
        }
    })

}

exports.authenticateCustomer = (req, res, next) => {

    let authHeader = req.headers.authorization
    let token;

    if (authHeader) {
        token = authHeader.split(' ')[1]
    } else {
        res.status(401).json({
            success: false,
            message: "Access denied"
        })
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            res.status(401).json({
                success: false,
                message: "Access denied"
            })
        } else {
            let info = jwt.decode(token)
            req.user = info.customer
            next()
        }

    })

}

exports.authenticateSuperUser = (req, res, next) => {


    let authHeader = req.headers.authorization
    let token;


    if (authHeader) {
        token = authHeader.split(' ')[1]
    } else {
        res.status(401).json({
            success: false,
            message: "Access denied"
        })
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {

        if (err) {
            console.log('meow2')
            res.status(401).json({
                success: false,
                message: "Access denied"
            })
        } else if (user.farmer.role == "superuser") {
            let info = jwt.decode(token)
            req.user = info.farmer

            next()

        }
        else {
            console.log('meow3')
            res.status(401).json({
                success: false,
                message: "Access denied"
            })
        }
    })

}