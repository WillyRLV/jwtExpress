const jwt = require('jsonwebtoken')


const controllerPrivate = {
    getPrivate: (req, res, next) => {
        console.log(res.locals);
        // authorization = req.get('authorization').substring(7);
        // authorization = req.get('authorization').split(" ")[1];
        // authorization = req.headers.authorization.split(" ")[1];
        res.json({ a: req.token, b: req.cookies, c: req.signedCookies })
        // console.log(req.headers);
        // res.json({success:true, session:req.app})

        // res.render('pages/plans',{title:'Planes de acción'});
    }
}

module.exports = controllerPrivate